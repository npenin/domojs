import type { CliContext } from "@akala/cli";
import { Container } from "@akala/commands";
import Configuration, { ProxyConfiguration } from "@akala/config";
import app, { pubsub, Sidecar, SidecarConfiguration } from "@akala/sidecar";
import { Container as pmContainer } from '@akala/pm'
import { MqttClient, MqttEvents, protocol } from "@domojs/mqtt";
import devices from '../../device-commands.js'
import { EndpointProxy } from "../../clients/EndpointProxy.js";
import { type Commissionnee } from "../../clusters/index.js";
import { BridgeConfiguration, RootNode } from "../../clients/RootNode.js";
import { ClusterInstance } from "../../clients/shared.js";
import { IsomorphicBuffer, ObservableObject, packagejson } from "@akala/core";
import registerAdapter from "./register-adapter.js";
import { clusterId } from "../../clusters/Commissionnee.js";
import { clusterFactory, MatterClusterIds, oTAProvider } from "../../../index.js";

export function Commissionnee(state: State): ClusterInstance<Commissionnee>
{
    return new ObservableObject({
        async registerCommand(name, grantRoot)
        {
            const result = await registerAdapter.call(state, name, grantRoot);
            if (result.transport || result.transportOptions)
                return [result as SidecarConfiguration['pubsub'], result?.id]
            return [null, result?.id];
        },
        id: clusterId,
    });
}

export interface State extends Sidecar<{}, MqttEvents>
{
    self: RootNode<'commissionning'>;
    adapters: Record<string, EndpointProxy>;
    config: ProxyConfiguration<SelfConfiguration>
}

export type SelfConfiguration = SidecarConfiguration & BridgeConfiguration;

export const versionParser = /^(?<range>[*^~])?(?<version>(?<major>\d+)(?:\.(?<minor>\d+|x)(?:\.(?<patch>\d+|x))?)?)?$/;

export type VersionRange = '*' | '^' | '~' | ''

export interface ParsedVersion
{ range: VersionRange, version: string, major: number, minor: number, patch: number }

export function parseVersion(version: string): ParsedVersion
{
    const parsedVersion = versionParser.exec(version)?.groups;
    const result: ParsedVersion = { range: '', version: '', major: 0, minor: 0, patch: 0 };
    if (!parsedVersion)
    {
        result.range = '*';
        return result;
    }
    if (parsedVersion.patch == 'x' || parsedVersion.patch === undefined)
    {
        result.patch = 0
        result.version = `${parsedVersion.major}.${parsedVersion.minor}.0`;
        result.range = '~'
    }
    else
        result.patch = Number(parsedVersion.patch);
    if (parsedVersion.minor == 'x' || parsedVersion.minor == undefined)
    {
        result.minor = 0
        result.version = `${parsedVersion.major}.0.0`;
        result.range = '^'
    }
    else
        result.minor = Number(parsedVersion.minor);
    if (!version || !parsedVersion.version)
    {
        result.major = 0
        result.version = '';
        result.range = '*'
    }
    else 
    {
        if (parsedVersion.major)
            result.major = Number(parsedVersion.major);

        if (!result.version && parsedVersion.version)
            result.version = parsedVersion.version
    }

    if (!result.range && parsedVersion.range)
        result.range = parsedVersion.range as VersionRange

    return result as ParsedVersion;
}

function uuidToBuffer(uuid: string)
{
    // Remove hyphens from the UUID
    const hex = uuid.replaceAll('-', '');

    // Create a buffer from the hex string
    const buffer = IsomorphicBuffer.from(hex, 'hex');

    return buffer;
}

function bufferToUuid(buffer: IsomorphicBuffer)
{
    // Convert the buffer to a hex string
    const hex = buffer.toString('hex');

    // Format the hex string into a UUID format
    const uuid = [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20, 32)
    ].join('-');

    return uuid;
}

function versionToNumber(version: string): number
{
    const parsedVersion = parseVersion(version);
    return parsedVersion.major * 1_000_000 + parsedVersion.minor * 1_000 + parsedVersion.patch;
}

function versionNumberToString(version: number): string
{
    const major = Math.floor(version / 1_000_000);
    const minor = Math.floor((version % 1_000_000) / 1_000);
    const patch = version % 1_000;

    return `${major}.${minor}.${patch}`;
}

export default async function init(this: State, context: CliContext<{ configFile: string }, State['config']>, pm: pmContainer & Container<any>, container: devices.container & Container<void>)
{
    if (context.state)
        this.config = context.state;
    else
        this.config = await Configuration.newAsync(context.options.configFile);


    if (!context.state.has('endpointsMapping'))
        context.state.set('endpointsMapping', {});

    const sidecar = Object.assign(this, await app<{}, MqttEvents>(context, pm));
    sidecar.sidecars['@domojs/devices'] = Promise.resolve(container);

    await context.state.commit();

    const commissionner = Commissionnee(this);

    const [pubsubConfig] = await commissionner.target.registerCommand('devices');
    if (pubsubConfig)
    {
        await (sidecar.pubsub as MqttClient).disconnect(protocol.ReasonCodes.NormalDisconnection);
        delete sidecar.pubsub;
        delete sidecar.config.pubsub;
        await pubsub(sidecar, pubsubConfig, context.abort.signal);
    }

    this.self = new RootNode('devices', {
        commissionning: commissionner,
        oTASoftwareUpdateProvider: (() =>
        {
            const tokenCache: Record<string, { location: string }> = {};

            return clusterFactory({
                id: MatterClusterIds.OTASoftwareUpdateProvider,
                async QueryImageCommand(
                    VendorID: number,
                    ProductID: number,
                    SoftwareVersion: number,
                    ProtocolsSupported,
                    HardwareVersion: number,
                    Location: string,
                    RequestorCanConsent: boolean,
                    MetadataForProvider: IsomorphicBuffer)
                {
                    if (!ProtocolsSupported?.includes(oTAProvider.DownloadProtocolEnum.HTTPS))
                        return [
                            oTAProvider.StatusEnum.DownloadProtocolNotSupported,
                            0,
                            '',
                            SoftwareVersion,
                            SoftwareVersion.toString(),
                            new IsomorphicBuffer(0),
                            false,
                            new IsomorphicBuffer(0),
                        ];

                    const res = await fetch(Location);
                    const latest = await res.json() as packagejson.CoreProperties;


                    const currentVersion = versionToNumber(latest.version);

                    const token = crypto.randomUUID();
                    tokenCache[token] = {
                        location: Location
                    };

                    if (currentVersion > SoftwareVersion)
                        return [
                            oTAProvider.StatusEnum.UpdateAvailable,
                            0,
                            latest.dist.tarball,
                            currentVersion,
                            latest.version,
                            uuidToBuffer(token),
                            RequestorCanConsent,
                            null
                        ];

                    return [
                        oTAProvider.StatusEnum.NotAvailable,
                        0,
                        '',
                        SoftwareVersion,
                        SoftwareVersion.toString(),
                        new IsomorphicBuffer(0),
                        false,
                        new IsomorphicBuffer(0),
                    ];
                },
                async ApplyUpdateRequestCommand(token, newVersion)
                {
                    if (bufferToUuid(token) in tokenCache)
                        return [
                            oTAProvider.ApplyUpdateActionEnum.Proceed,
                            0
                        ]
                },
                async NotifyUpdateAppliedCommand(token, version)
                {
                    delete tokenCache[bufferToUuid(token)];
                }
            });
        })()
    }, context.state);

    // this.self.endpoints.push(await this.self.newEndpoint('house', {
    //     modeSelect: modeSelect([
    //         {
    //             Label: 'A la maison',
    //             Mode: 0,
    //             SemanticTags: []
    //         },
    //         {
    //             Label: 'En Vacances',
    //             Mode: 1,
    //             SemanticTags: []
    //         }
    //     ], '')
    // }))

    await this.self.attach(sidecar.pubsub);
}

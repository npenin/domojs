import { CliContext } from "@akala/cli";
import { Container } from "@akala/commands";
import Configuration, { ProxyConfiguration } from "@akala/config";
import app, { pubsub, Sidecar, SidecarConfiguration } from "@akala/sidecar";
import { Container as pmContainer } from '@akala/pm'
import { MqttClient, MqttEvents, protocol } from "@domojs/mqtt";
import devices from '../../device-commands.js'
import { EndpointProxy } from "../../clients/EndpointProxy.js";
import { ClusterMap, type Commissionnee } from "../../clusters/index.js";
import { BridgeConfiguration, RootNode } from "../../clients/RootNode.js";
import { ClusterInstance } from "../../clients/shared.js";
import { ObservableObject } from "@akala/core";
import registerAdapter from "./register-adapter.js";
import { clusterId } from "../../clusters/Commissionnee.js";


export function Commissionnee(state: State): ClusterInstance<Commissionnee>
{
    return new ObservableObject({
        async registerCommand(name)
        {
            const result = await registerAdapter.call(state, name);
            return [result, result?.id]
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

export default async function (this: State, context: CliContext<{ configFile: string }, State['config']>, pm: pmContainer & Container<any>, container: devices.container & Container<void>)
{
    if (!context.state)
        this.config = await Configuration.newAsync(context.options.configFile);
    else
        this.config = context.state;


    if (!context.state.has('endpointsMapping'))
        context.state.set('endpointsMapping', {});

    // if (!this.config.has('store'))
    // {
    //     context.state.set('store', {
    //         "provider": "file+json://./",
    //         "models": {
    //             "DeviceInit": {
    //                 "members": {
    //                     "name": {
    //                         "isKey": true,
    //                         "type": {
    //                             "type": "string",
    //                             "length": 250
    //                         },
    //                         "generator": "business"
    //                     },
    //                     "body": {
    //                         "isKey": false,
    //                         "type": {
    //                             "type": "string"
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });

    // }

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
    }, context.state);

    await this.self.attach(sidecar.pubsub);
}
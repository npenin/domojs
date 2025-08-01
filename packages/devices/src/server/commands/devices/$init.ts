import { CliContext } from "@akala/cli";
import { Container } from "@akala/commands";
import Configuration, { ProxyConfiguration } from "@akala/config";
import app, { Sidecar, SidecarConfiguration } from "@akala/sidecar";
import { Container as pmContainer } from '@akala/pm'
// import { Commissionner, FabricServer, FabricClient } from "../../clients/index.js";
import { MqttEvents } from "@domojs/mqtt";
import devices from '../../device-commands.js'
import { Endpoint, EndpointProxy } from "../../clients/Endpoint.js";
import Commissionnee from "../../clusters/Commissionnee.js";
import { ClusterIds, ClusterMap } from "../../clusters/index.js";
import { RootNode } from "../../clients/RootNode.js";

export interface State extends Sidecar<{}, MqttEvents>
{
    self: RootNode<'commissionning'>;
    adapters: Record<string, EndpointProxy<ClusterMap>>;
    config: ProxyConfiguration<SelfConfiguration>
}

export interface SelfConfiguration extends SidecarConfiguration
{
    endpointsMapping: Record<string, number>
}

export default async function (this: State, context: CliContext<{ configFile: string }, State['config']>, pm: pmContainer & Container<any>, container: devices.container & Container<void>)
{
    if (!context.state)
        this.config = await Configuration.newAsync(context.options.configFile);
    else
        this.config = context.state;


    if (!context.state.has('endpointsMapping'))
        context.state.set('endpointsMapping', {});

    if (!this.config.has('store'))
    {
        context.state.set('store', {
            "provider": "file+json://./",
            "models": {
                "DeviceInit": {
                    "members": {
                        "name": {
                            "isKey": true,
                            "type": {
                                "type": "string",
                                "length": 250
                            },
                            "generator": "business"
                        },
                        "body": {
                            "isKey": false,
                            "type": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        });

    }

    const sidecar = Object.assign(this, await app(context, pm));
    sidecar.sidecars['@domojs/devices'] = Promise.resolve(container);

    await context.state.commit();

    this.self = new RootNode('devices', {
        commissionning: Commissionnee(this),
    }, context.state);

    await this.self.attach(sidecar.pubsub);


    const [pubsubConfig] = await this.self.clusters.commissionning.target.registerCommand('devices');
    if (pubsubConfig)
        context.state.set('pubsub', pubsubConfig);

    // await FabricServer.register('devices', this, new Commissionner(this, 'devices'));

}
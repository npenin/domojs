import { allProperties, AsyncEventBus, AsyncSubscription, combineAsyncSubscriptions, IsomorphicBuffer, ObservableArray, Subscription, UrlTemplate } from "@akala/core";
import { ClusterIds, ClusterMap } from "../clusters/index.js";
import { Endpoint, EndpointProxy, MixedClusterMap } from "./Endpoint.js";
import { ClusterIdNames, ClusterInstance, Node } from "./index.js";
import { MqttEvents } from "@domojs/mqtt";
import { AggregatorEndpoint } from "./Aggregator.js";
import { ProxyConfiguration } from "@akala/config";


export interface BridgeConfiguration
{
    endpointsMapping: Record<string, number>;
}

export class RootNode<TClusterMapKeys extends Exclude<keyof ClusterMap, 'descriptor' | 'aggregator'>> extends AggregatorEndpoint<TClusterMapKeys> implements Node
{
    constructor(public readonly name: string, clusters: MixedClusterMap<never, ClusterMap>, private config: ProxyConfiguration<BridgeConfiguration>)
    {
        super(0, clusters);

        const root = new Endpoint<ClusterMap, TClusterMapKeys>(0, this.clusters);
        this.endpoints.push(root);
    }
    async offline(): Promise<void>
    {
    }

    override async attach(bus: AsyncEventBus<MqttEvents>): Promise<AsyncSubscription>
    {
        const sub = this.subscribeEndpoints(bus, `domojs/${this.name}`);
        return () => Promise.resolve(sub());
    }

    public async newEndpoint<TClusterMapKeys extends Exclude<keyof ClusterMap, 'descriptor'>>(name: string, clusters: MixedClusterMap<TClusterMapKeys, ClusterMap>)
    {
        return new Endpoint(await this.getEndpointId(name), clusters);
    }


    public async getEndpointId(name: string): Promise<number>
    {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(name));
        const hashedName = IsomorphicBuffer.fromArrayBuffer(hash).toString('hex')
        if (!this.config.endpointsMapping)
            this.config.set('endpointsMapping', {});
        const id = this.config.endpointsMapping.get<number>(hashedName);
        if (id)
            return id;
        const maxId = Object.values(this.config.endpointsMapping.extract()).reduce((previous, current) => Math.max(previous, current), 0);
        const newId = maxId + 1;
        this.config.endpointsMapping.set(hashedName, newId);
        this.config.commit();
        return newId;
    }
}

import { AsyncEventBus, AsyncSubscription, logger, ObservableArray } from "@akala/core";
import { ClusterMap } from "../clusters/index.js";
import { Endpoint, MixedClusterMap } from "./Endpoint.js";
import { EndpointProxy } from "./EndpointProxy.js";
import { MqttEvents } from "@domojs/mqtt";

const log = logger.use('domojs:devices:aggregator')

export class AggregatorEndpoint<TClusterMapKeys extends Exclude<keyof ClusterMap, 'descriptor'>> extends Endpoint<TClusterMapKeys> 
{
    constructor(uniqueId: string, id: number, clusters: MixedClusterMap<never>)
    {
        super(uniqueId, id, clusters);

        this.endpoints = new ObservableArray<Endpoint>([]);
        this.endpoints.maxListeners = Number.MAX_SAFE_INTEGER;
        this.teardown(this.endpoints.addListener(async (ev) =>
        {
            log.data(ev);
            this.descriptor.setValue('PartsList', this.endpoints.map(ev => Number(ev.id)));
        }));
        this.teardown(() =>
        {
            return !!Object.values(this.endpointSubscriptions).flatMap(es => Object.values(es)).map(sub => sub())?.length;
        })
    }
    public readonly endpoints: ObservableArray<Endpoint | EndpointProxy>;

    private readonly endpointSubscriptions: Record<string, Record<string, AsyncSubscription>> = {};

    public subscribeEndpoints(bus: AsyncEventBus<MqttEvents>, prefix: string)
    {
        if (this.endpointSubscriptions[prefix])
            throw new Error(`this endpoint is already subscribed to a prefix as '${prefix}'`)
        this.endpointSubscriptions[prefix] = {};
        return this.endpoints.addListener(async ev =>
        {
            switch (ev.action)
            {
                case "pop":
                case "shift":
                    await Promise.all(ev.oldItems.map(ep => this.endpointSubscriptions[prefix][ep.id]?.()));
                    break;
                case "push":
                case "unshift":
                case "init":
                    await Promise.all(ev.newItems.map(async ep => this.endpointSubscriptions[prefix][ep.id] = await ep.attach(bus, prefix)));
                    break;
                case "replace":
                    await Promise.all(ev.replacedItems.map(async ri =>
                    {
                        await this.endpointSubscriptions[prefix][ri.oldItem.id]?.();
                        this.endpointSubscriptions[prefix][ri.newItem.id] = await ri.newItem.attach(bus, prefix);
                    }));
                    break;
            }
        }, { triggerAtRegistration: true })
    }
}
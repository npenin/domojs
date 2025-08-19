import { allProperties, AsyncEvent, AsyncEventBus, AsyncSubscription, combineAsyncSubscriptions, ObjectEvent, ObservableArray, ObservableObject, Subscription, UrlTemplate } from "@akala/core";
import { ClusterInstanceLight, ClusterInstance, Cluster, ClusterDefinition, NonWatchableClusterInstance, RemoteClusterInstance } from "./shared.js";
import { Descriptor, DescriptorClusterId } from "../behaviors/descriptor.js";
import { MqttEvents } from "@domojs/mqtt";
import { EndpointProxy } from "./EndpointProxy.js";

export type SemiPartial<K extends keyof TClusterMap, TClusterMap extends Record<string, Cluster<any, any, any>>> =
    Partial<{ [key in Exclude<keyof TClusterMap, K>]: TClusterMap[key] }>
    & { [key in K]: TClusterMap[key] }

export type MixedClusterMapInstance<K extends keyof TClusterMap, TClusterMap extends Record<string, Cluster<any, any, any>>> =
    Partial<{ [key in Exclude<keyof TClusterMap, K>]: ClusterInstanceLight<TClusterMap[key]> | ClusterInstance<TClusterMap[key]> }>
    & { [key in K]: ClusterInstanceLight<TClusterMap[key]> | ClusterInstance<TClusterMap[key]> }

export type MixedClusterMap<K extends keyof TClusterMap, TClusterMap extends Record<string, Cluster<any, any, any>>> =
    Partial<{ [key in Exclude<keyof TClusterMap, K>]: ClusterInstance<TClusterMap[key]> }>
    & { [key in K]: ClusterInstance<TClusterMap[key]> }

export type MixedClusterDefinition<K extends keyof TClusterMap, TClusterMap extends Record<string, Cluster<any, any, any>>> =
    Partial<{ [key in Exclude<keyof TClusterMap, K>]: ClusterDefinition<TClusterMap[key]> }>
    & { [key in K]: ClusterDefinition<TClusterMap[key]> }

export type TClusterWatch<
    TClusterMap extends Record<string, Cluster<any, any, any>>,
> = [
        keyof TClusterMap,
        ObjectEvent<NonWatchableClusterInstance<TClusterMap[keyof TClusterMap]>, keyof NonWatchableClusterInstance<TClusterMap[keyof TClusterMap]>>];

export class Endpoint<
    TClusterMap extends Record<string, Cluster<any, any, any>>,
    TClusterMapKeys extends Exclude<keyof TClusterMap, 'descriptor'> = never>
    extends AsyncEvent<TClusterWatch<TClusterMap>, void>
{
    readonly clusters: MixedClusterMap<TClusterMapKeys, TClusterMap>;
    protected readonly descriptor: ReturnType<typeof Descriptor<TClusterMap, TClusterMapKeys>>;
    private readonly clusterSubscriptions: Partial<Record<number, Subscription>> = {};

    constructor(
        public readonly id: number,
        clusters: MixedClusterMap<TClusterMapKeys, TClusterMap>
    )
    {
        super(undefined, () => { });
        if ('descriptor' in clusters)
            this.descriptor = clusters.descriptor as ReturnType<typeof Descriptor<TClusterMap, TClusterMapKeys>>;
        else
            this.descriptor = Descriptor<TClusterMap, TClusterMapKeys>();

        this.clusters = Object.fromEntries(Object.entries(clusters).concat([['descriptor', this.descriptor]])) as MixedClusterMap<TClusterMapKeys, TClusterMap>;

        this.clusterSubscriptions[DescriptorClusterId] = this.descriptor.on(allProperties, ev =>
        {
            this.emit('descriptor', ev as any);
            if (ev.property == 'ServerList')
            {
                const clustersById: Record<number, keyof typeof this.clusters> = Object.fromEntries(Object.entries(this.clusters).map(e => [(e[1] as ClusterInstance<any>).target.id, e[0] as keyof typeof this.clusters]));

                for (const clusterId of this.descriptor.target.ServerList)
                {
                    this.clusterSubscriptions[clusterId]?.();

                    this.clusterSubscriptions[clusterId] = (this.clusters[clustersById[clusterId]] as ClusterInstance<Cluster<any, any, any>>).on(allProperties as any, ev =>
                    {
                        this.emit(clustersById[clusterId], ev);
                    })
                }
            }
        })

        this.descriptor.setEndpoint(this);
    }

    public patch(patch: {
        [P in keyof TClusterMap]?: Partial<ClusterInstanceLight<TClusterMap[P]>>;
    })
    {
        Object.entries(patch).forEach(e =>
        {
            if (this.clusters[e[0]])
                Object.assign(this.clusters[e[0]], e[1]);
            else
            {
                if (!(e[1] instanceof ObservableObject))
                    throw new Error(`${e[0]} is not defined and thus, should be provided as a cluster instance`);
                const clusters = this.descriptor.getValue('ServerList');
                this.descriptor.setValue('ServerList', clusters.concat([e[1].getValue('id')]));
            }
        });
    }

    public static async attach<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: Endpoint<TClusterMap, TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    public static async attach<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: EndpointProxy<TClusterMap, TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    public static async attach<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: Endpoint<TClusterMap, TClusterMapKeys> | EndpointProxy<TClusterMap, TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    public static async attach<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: Endpoint<TClusterMap, TClusterMapKeys> | EndpointProxy<TClusterMap, TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    {
        const template = UrlTemplate.parse(`${prefix}/${endpointName || endpoint.id}/{cluster}/{attributeOrCommand}/{action}`);

        return combineAsyncSubscriptions(await bus.on(`${prefix}/${endpointName || endpoint.id}/#`, async (data, ev) =>
        {
            if (typeof data !== 'string')
                data = data.toString('utf8');
            if (ev.publishedTopic)
            {
                const match = UrlTemplate.match(ev.publishedTopic, template)?.variables as Record<'cluster' | 'attributeOrCommand' | 'action', string>;
                if (!match)
                    return;
                const cluster: ClusterInstance<any> = endpoint.clusters[match.cluster];
                if (!cluster)
                    return;
                switch (match.action)
                {
                    case 'execute':
                        const result = await cluster.target[match.attributeOrCommand](...JSON.parse(data));
                        await bus.emit(`${prefix}/${endpointName || endpoint.id}/${match.cluster}/${match.attributeOrCommand}`, JSON.stringify(Array.isArray(result) ? result : typeof result == 'undefined' ? [] : [result]), { qos: 1 });
                        break;
                    case 'set':
                        cluster.setValue(match.attributeOrCommand, JSON.parse(data));
                    default:
                        let value = cluster.getValue(match.attributeOrCommand);
                        if (value instanceof ObservableArray)
                            value = value.array;
                        await bus.emit(`${prefix}/${endpointName || endpoint.id}/${match.cluster}/${match.attributeOrCommand}`, JSON.stringify(value), { qos: 1 });
                        break;
                }
            }
        }, { noLocal: true }), 'descriptor' in endpoint ? endpoint.descriptor?.on(allProperties, async ev =>
        {
            await bus.emit(`${prefix}/${endpointName || endpoint.id}/descriptor/${ev.property}`, JSON.stringify(ev.value), { qos: 1 });
        }) : null);
    }

    public attach(bus: AsyncEventBus<MqttEvents>, prefix: string, endpointName?: string): Promise<AsyncSubscription>
    {
        return Endpoint.attach(bus, prefix, this, endpointName);
    }
}
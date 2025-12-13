import { allProperties, AsyncEvent, AsyncEventBus, AsyncSubscription, Binding, combineAsyncSubscriptions, isPromiseLike, ObjectEvent, ObservableArray, ObservableObject, Subscription, UrlTemplate } from "@akala/core";
import { ClusterInstanceLight, ClusterInstance, Cluster, ClusterDefinition, NonWatchableClusterInstance, RemoteClusterInstance } from "./shared.js";
import { Descriptor, DescriptorClusterId } from "../behaviors/descriptor.js";
import { MqttEvents, protocol } from "@domojs/mqtt";
import { EndpointProxy } from "./EndpointProxy.js";
import { ClusterMap } from "../clusters/index.js";
import { Descriptor as DescriptorCluster } from "../../codegen/clusters/descriptor-cluster.js";

export type SemiPartial<K extends keyof ClusterMap> =
    Partial<{ [key in Exclude<keyof ClusterMap, K>]: ClusterMap[key] }>
    & { [key in K]: ClusterMap[key] }

export type MixedClusterMapInstance<K extends keyof ClusterMap> =
    Partial<{ [key in Exclude<keyof ClusterMap, K>]: ClusterInstanceLight<ClusterMap[key]> | ClusterInstance<ClusterMap[key]> }>
    & { [key in K]: ClusterInstanceLight<ClusterMap[key]> | ClusterInstance<ClusterMap[key]> }

export type MixedClusterMap<K extends keyof ClusterMap> =
    Partial<{ [key in Exclude<keyof ClusterMap, K>]: ClusterInstance<ClusterMap[key]> }>
    & { [key in K]: ClusterInstance<ClusterMap[key]> }

export type MixedClusterDefinition<K extends keyof ClusterMap> =
    Partial<{ [key in Exclude<keyof ClusterMap, K>]: ClusterDefinition<ClusterMap[key]> }>
    & { [key in K]: ClusterDefinition<ClusterMap[key]> }

export type TClusterWatch<TKey extends keyof ClusterMap> = [
    TKey,
    ObjectEvent<NonWatchableClusterInstance<ClusterMap[TKey]>, keyof NonWatchableClusterInstance<ClusterMap[TKey]>>];

export class Endpoint<
    TClusterMapKeys extends Exclude<keyof ClusterMap, 'descriptor'> = never>
    extends AsyncEvent<TClusterWatch<keyof ClusterMap>, void>
{
    readonly clusters: MixedClusterMap<TClusterMapKeys | 'descriptor'>;
    protected readonly descriptor: ReturnType<typeof Descriptor< TClusterMapKeys>>;
    private readonly clusterSubscriptions: Partial<Record<number, Subscription>> = {};

    constructor(
        public readonly id: number,
        clusters: MixedClusterMap<TClusterMapKeys>
    )
    {
        super(undefined, () => { });
        if ('descriptor' in clusters)
            this.descriptor = clusters.descriptor as ReturnType<typeof Descriptor< TClusterMapKeys>>;
        else
            this.descriptor = Descriptor<TClusterMapKeys>();

        this.clusters = Object.fromEntries(Object.entries(clusters).concat([['descriptor', this.descriptor]])) as MixedClusterMap<TClusterMapKeys | 'descriptor'>;

        this.clusterSubscriptions[DescriptorClusterId] = this.descriptor.on(allProperties, ev =>
        {
            this.emit('descriptor', ev as any);
            if (ev.property == 'ServerList')
            {
                const clustersById: Record<number, keyof typeof this.clusters> = Object.fromEntries(Object.entries(this.clusters as any).map(e => [(e[1] as ClusterInstance<any>).target.id, e[0] as keyof typeof this.clusters]));

                for (const clusterId of this.descriptor.target.ServerList)
                {
                    if (clusterId == DescriptorClusterId)
                        continue;
                    this.clusterSubscriptions[clusterId]?.();

                    this.clusterSubscriptions[clusterId] = (this.clusters[clustersById[clusterId]] as ClusterInstance<Cluster<any, any, any>>).on(allProperties as any, ev =>
                    {
                        this.emit(clustersById[clusterId], ev as any);
                    })
                }
            }
        })

        this.descriptor.setEndpoint(this);
    }

    public patch(patch: {
        [P in keyof ClusterMap]?: Partial<ClusterInstanceLight<ClusterMap[P]>>;
    })
    {
        Object.entries(patch).forEach(e =>
        {
            if (this.clusters[e[0]])
            {
                // Object.assign(this.clusters[e[0]], e[1]);
                Object.entries(e[1]).forEach(e2 => this.clusters[e[0]].setValue(e2[0], e2[1]))
            }
            else
            {
                if (!(e[1] instanceof ObservableObject))
                    throw new Error(`${e[0]} is not defined and thus, should be provided as a cluster instance`);
                const clusters = this.descriptor.getValue('ServerList');
                this.descriptor.setValue('ServerList', clusters.concat([e[1].getValue('id')]));
            }
        });
    }

    public static async attach<TClusterMapKeys extends Exclude<keyof ClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: Endpoint<TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    public static async attach<TClusterMapKeys extends Exclude<keyof ClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: EndpointProxy<TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    public static async attach<TClusterMapKeys extends Exclude<keyof ClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: Endpoint<TClusterMapKeys> | EndpointProxy<TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    public static async attach<TClusterMapKeys extends Exclude<keyof ClusterMap, "descriptor">>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpoint: Endpoint<TClusterMapKeys> | EndpointProxy<TClusterMapKeys>, endpointName?: string): Promise<AsyncSubscription>
    {
        const template = UrlTemplate.parse(`${prefix}/${endpointName || endpoint.id}/{cluster}/{attributeOrCommand}/{action}`);
        const sub = combineAsyncSubscriptions(await bus.on(`${prefix}/${endpointName || endpoint.id}/#`, async (data, ev) =>
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
                    case 'reply':
                        break;
                    case 'execute':
                        const props = protocol.toPropertyMap(ev.properties ?? []);
                        const responseTopic = props.responseTopic ?? `${prefix}/${endpointName || endpoint.id}/${match.cluster}/${match.attributeOrCommand}`;
                        const result = await cluster.target[match.attributeOrCommand](...JSON.parse(data));

                        await bus.emit(responseTopic, JSON.stringify(Array.isArray(result) ? result : typeof result == 'undefined' ? [] : [result]), {
                            qos: 1, properties: props.correlationData ?
                                protocol.fromPropertyMap({ correlationData: props.correlationData }) :
                                []
                        });

                        break;
                    case 'set':
                        cluster.setValue(match.attributeOrCommand, JSON.parse(data));
                    default:
                        let value = cluster.getValue(match.attributeOrCommand);
                        if (value instanceof Binding)
                            value = value.getValue();
                        if (value instanceof ObservableArray)
                            value = value.array;
                        await bus.emit(`${prefix}/${endpointName || endpoint.id}/${match.cluster}/${match.attributeOrCommand}`, JSON.stringify(typeof value == 'undefined' || value === null ? false : value), { qos: 1 });
                        break;
                }
            }
        }, { noLocal: true }), 'descriptor' in endpoint ? endpoint.descriptor?.on(allProperties, async ev =>
        {
            await bus.emit(`${prefix}/${endpointName || endpoint.id}/descriptor/${ev.property}`, JSON.stringify(ev.value), { qos: 1 });
        }) : null);

        const match = {
            attributeOrCommand: 'ServerList',
            cluster: 'descriptor'
        } as const;

        let value = (endpoint.clusters.descriptor as ClusterInstance<DescriptorCluster>).getValue(match.attributeOrCommand);
        if (value instanceof Binding)
            value = value.getValue();
        if (value instanceof ObservableArray)
            value = value.array;
        await bus.emit(`${prefix}/${endpointName || endpoint.id}/${match.cluster}/${match.attributeOrCommand}`, JSON.stringify(typeof value == 'undefined' || value === null ? false : value), { qos: 1 });


        return sub;
    }

    public attach(bus: AsyncEventBus<MqttEvents>, prefix: string, endpointName?: string): Promise<AsyncSubscription>
    {
        return Endpoint.attach(bus, prefix, this, endpointName);
    }
}
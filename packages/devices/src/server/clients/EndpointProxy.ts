import { AsyncEvent, AsyncEventBus, AsyncSubscription, Deferred, ObservableArray } from "@akala/core";
import { MqttEvents } from "@domojs/mqtt";
import { ClusterIdNames, ClusterMap as ClusterMapType } from "../clusters/index.js";
import { MixedClusterDefinition, Endpoint } from "./Endpoint.js";
import { Cluster, ClusterInstance, clusterProxyFactory, ClusterInstanceLight, ClusterDefinition, RemoteClusterInstance } from "./shared.js";
import { ClusterIds, ClusterMap, MatterClusterIds } from "../clusters/_shared.js";
import descriptor from "../../codegen/clusters/descriptor-cluster.js";


export type MixedRemoteClusterMap<K extends keyof ClusterMapType> =
    Partial<{ [key in Exclude<keyof ClusterMapType, K>]: RemoteClusterInstance<ClusterMapType[key]> }>
    & { [key in K]: RemoteClusterInstance<ClusterMapType[key]> }


export class EndpointProxy<TClusterMapKeys extends Exclude<keyof ClusterMapType, 'descriptor'> = never> extends AsyncEvent<[number, ClusterInstance<any>], void>
{
    readonly clusters: MixedRemoteClusterMap<TClusterMapKeys | 'descriptor'>;

    public readonly endpoints = new ObservableArray<EndpointProxy<never>>([]);

    constructor(
        public readonly id: number,
        public readonly parent: { name: string; },
        pubsub: AsyncEventBus<MqttEvents>,
        clusters: MixedClusterDefinition<TClusterMapKeys>
    )
    {
        super();

        clusters['descriptor'] = ClusterMap[MatterClusterIds.Descriptor];

        this.clusters = Object.fromEntries(Object.entries<ClusterDefinition<Cluster<any, any, any>>>(clusters).
            map(e => [e[0],
            clusterProxyFactory(
                e[1],
                `${parent.name}/${id}/${e[0]}`,
                pubsub,
                Object.values(clusters).map(c => (c as ClusterDefinition<any>).id)
            )])) as MixedRemoteClusterMap<TClusterMapKeys | 'descriptor'>;


        // this.clusters.descriptor.target.PartsList.then(endpoints =>
        // {
        //     endpoints?.map(ep => ep !== this.id && EndpointProxy.fromBus(pubsub, parent.name, ep).then(ep => this.endpoints.push(ep)));
        // })
    }

    public patch(patch: {
        [P in keyof ClusterMapType]?: Partial<ClusterInstanceLight<ClusterMapType[P]>>;
    })
    {
        Object.entries(patch).forEach(e =>
        {
            if (this.clusters[e[0]])
                Object.assign(this.clusters[e[0]], e[1]);

            else
                throw new Error(`${e[0]} is not defined and thus cannot be patched`);
        });
    }

    public attach(bus: AsyncEventBus<MqttEvents>, prefix: string, endpointName?: string): Promise<AsyncSubscription>
    {
        return Endpoint.attach<TClusterMapKeys>(bus, prefix, this, endpointName);
    }

    public static async fromBus<TClusterMapKeys extends Exclude<keyof ClusterMapType, 'descriptor'> = never>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpointId: number): Promise<EndpointProxy<TClusterMapKeys>>
    {
        let result = new Deferred<EndpointProxy<TClusterMapKeys>>();

        await bus.once(`${prefix}/${endpointId}/descriptor/ServerList`, async (data, ev) =>
        {
            if (typeof data !== 'string')
                data = data.toString('utf8');
            const serverList: number[] = JSON.parse(data);
            result.resolve(new EndpointProxy<TClusterMapKeys>(endpointId, { name: prefix }, bus, Object.fromEntries(serverList.map(clusterId => [ClusterIdNames[clusterId], ClusterMap[clusterId]])) as MixedClusterDefinition<TClusterMapKeys>));
        });
        await bus.emit(`${prefix}/${endpointId}/descriptor/ServerList/get`, '{}', { qos: 1 });

        const endpoint = await result;

        return endpoint;
    }
}

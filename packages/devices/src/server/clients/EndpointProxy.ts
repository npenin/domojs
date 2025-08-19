import { AsyncEvent, AsyncEventBus, AsyncSubscription, Deferred } from "@akala/core";
import { MqttEvents } from "@domojs/mqtt";
import { ClusterMap } from "../clusters/_shared.js";
import { ClusterIdNames } from "../clusters/index.js";
import { MixedClusterDefinition, Endpoint } from "./Endpoint.js";
import { Cluster, ClusterInstance, clusterProxyFactory, ClusterInstanceLight, ClusterDefinition, RemoteClusterInstance } from "./shared.js";


export type MixedRemoteClusterMap<K extends keyof TClusterMap, TClusterMap extends Record<string, Cluster<any, any, any>>> =
    Partial<{ [key in Exclude<keyof TClusterMap, K>]: RemoteClusterInstance<TClusterMap[key]> }>
    & { [key in K]: RemoteClusterInstance<TClusterMap[key]> }


export class EndpointProxy<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, 'descriptor'> = never> extends AsyncEvent<[number, ClusterInstance<any>], void>
{
    readonly clusters: MixedRemoteClusterMap<TClusterMapKeys, TClusterMap>;

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly parent: { name: string; },
        pubsub: AsyncEventBus<MqttEvents>,
        clusters: MixedClusterDefinition<TClusterMapKeys, TClusterMap>
    )
    {
        super();

        this.clusters = Object.fromEntries(Object.entries<TClusterMap[keyof TClusterMap]>(clusters).map(e => [e[0], clusterProxyFactory(e[1], `${parent.name}/${id}/${e[0]}`, pubsub, Object.values(clusters).map(c => (c as ClusterDefinition<any>).id))])) as MixedRemoteClusterMap<TClusterMapKeys, TClusterMap>;
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
                throw new Error(`${e[0]} is not defined and thus cannot be patched`);
        });
    }

    public attach(bus: AsyncEventBus<MqttEvents>, prefix: string, endpointName?: string): Promise<AsyncSubscription>
    {
        return Endpoint.attach<TClusterMap, TClusterMapKeys>(bus, prefix, this, endpointName);
    }

    public static async fromBus<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, 'descriptor'> = never>(bus: AsyncEventBus<MqttEvents>, prefix: string, endpointName: string): Promise<EndpointProxy<TClusterMap, TClusterMapKeys>>
    {
        let result = new Deferred<EndpointProxy<TClusterMap, TClusterMapKeys>>();

        await bus.once(`${prefix}/${endpointName}/descriptor/ServerList`, async (data, ev) =>
        {
            if (typeof data !== 'string')
                data = data.toString('utf8');
            const serverList: number[] = JSON.parse(data);
            result.resolve(new EndpointProxy<TClusterMap, TClusterMapKeys>(parseInt(endpointName), endpointName, { name: prefix }, bus, Object.fromEntries(serverList.map(clusterId => [ClusterIdNames[clusterId], ClusterMap[clusterId]])) as MixedClusterDefinition<TClusterMapKeys, TClusterMap>));
        });
        await bus.emit(`${prefix}/${endpointName}/descriptor/ServerList/get`, '{}', { qos: 1 });

        return await result;
    }
}

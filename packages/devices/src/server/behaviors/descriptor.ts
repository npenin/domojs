import { ObservableObject } from '@akala/core';
import { descriptorCluster, ClusterIds } from '../../codegen/clusters/clusters-index.js'
import { Endpoint, ClusterInstance, ClusterInstanceLight, Cluster } from '../clients/index.js'

export const DescriptorClusterId = 29;

export function Descriptor<TClusterMap extends Record<string, Cluster<any, any, any>>, TClusterMapKeys extends Exclude<keyof TClusterMap, 'descriptor'>>():
    ClusterInstance<descriptorCluster.Descriptor> & { setEndpoint(ep: Endpoint<TClusterMap, TClusterMapKeys>): void }
{
    const descriptor = new ObservableObject({
        ClientList: [],
        DeviceTypeList: [],
        PartsList: [],
        ServerList: [],
        SupportsTagList: true,
        TagList: [],
        id: DescriptorClusterId,
    } as ClusterInstanceLight<descriptorCluster.Descriptor>);
    return Object.assign(descriptor,
        {
            setEndpoint(ep: Endpoint<TClusterMap, TClusterMapKeys>)
            {
                descriptor.setValue('ServerList', Object.values(ep.clusters).map(c => (c as ClusterInstance<Cluster<unknown, unknown, {}>>).target.id));
            }
        }
    );
}
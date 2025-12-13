import { ObservableObject } from '@akala/core';
import { descriptorCluster } from '../../codegen/clusters/clusters-index.js'
import type { Endpoint, ClusterInstance, ClusterInstanceLight, Cluster } from '../clients/index.js'
import type { ClusterMap } from "../clusters/index.js";

export const DescriptorClusterId = 29;

export function Descriptor<TClusterMapKeys extends Exclude<keyof ClusterMap, 'descriptor'>>():
    ClusterInstance<descriptorCluster.Descriptor> & { setEndpoint(ep: Endpoint<TClusterMapKeys>): void }
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
            setEndpoint(ep: Endpoint<TClusterMapKeys>)
            {
                descriptor.setValue('ServerList', Object.values(ep.clusters as any).map(c => (c as ClusterInstance<Cluster<unknown, unknown, {}>>).target.id));
            }
        }
    );
}
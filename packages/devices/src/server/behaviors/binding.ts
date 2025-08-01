import { ObservableObject } from '@akala/core';
import { bindingCluster, ClusterIds } from '../../codegen/clusters/clusters-index.js'
import { Endpoint, ClusterInstance, ClusterInstanceLight, Cluster } from '../clients/index.js'

export function Binding(): ClusterInstance<bindingCluster.Binding>
{
    return new ObservableObject({
        Binding: [],
        id: ClusterIds.Binding,
    } as ClusterInstanceLight<bindingCluster.Binding>);

}
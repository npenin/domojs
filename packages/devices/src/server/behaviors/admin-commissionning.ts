import { ErrorWithStatus, HttpStatusCode, IsomorphicBuffer, ObservableObject } from '@akala/core';
import { adminCommissioningCluster, ClusterIds } from '../../codegen/clusters/clusters-index.js'
import { Cluster, ClusterCommandsImpl, ClusterEvents, clusterFactory, ClusterInstanceLight, OptionalKeys } from '../clients/index.js'

export function AdministratorCommissioning()
{
    let commissionning: {} | { verifier: IsomorphicBuffer, discriminator: number, iterations: number, salt: IsomorphicBuffer } | undefined;

    const descriptor = clusterFactory<adminCommissioningCluster.AdministratorCommissioning>({
        id: ClusterIds.AdministratorCommissioning,
        AdminFabricIndex: 0,
        AdminVendorId: 0,
        async OpenCommissioningWindowCommand(timeout, verifier, discriminator, iterations, salt)
        {
            if (this.WindowStatus != adminCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen)
                throw new ErrorWithStatus(HttpStatusCode.Forbidden, 'The window is already open');

            descriptor.setValue('WindowStatus', adminCommissioningCluster.CommissioningWindowStatusEnum.EnhancedWindowOpen);

            commissionning = { verifier, discriminator, iterations, salt };

            setTimeout(() =>
            {
                commissionning = undefined;
                descriptor.setValue('WindowStatus', adminCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen);
            }, timeout);
        },

        async RevokeCommissioningCommand()
        {

        },
        SupportsBasic: true,
        WindowStatus: adminCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen,
        async OpenBasicCommissioningWindowCommand(timeout: number)
        {
            if (this.WindowStatus != adminCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen)
                throw new ErrorWithStatus(HttpStatusCode.Forbidden, 'The window is already open');

            descriptor.setValue('WindowStatus', adminCommissioningCluster.CommissioningWindowStatusEnum.BasicWindowOpen);
            commissionning = {};

            setTimeout(() =>
            {
                commissionning = undefined;
                descriptor.setValue('WindowStatus', adminCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen);
            }, timeout);
        }
    });
    return descriptor;
}
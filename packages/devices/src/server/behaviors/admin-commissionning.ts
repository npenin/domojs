import { ErrorWithStatus, HttpStatusCode, IsomorphicBuffer, ObservableObject } from '@akala/core';
import { administratorCommissioningCluster, ClusterIds } from '../../codegen/clusters/clusters-index.js'
import { Cluster, ClusterCommandsImpl, ClusterEvents, ClusterInstanceLight } from '../clients/index.js'

export function AdministratorCommissioning()
{
    let commissionning: {} | { verifier: IsomorphicBuffer, discriminator: number, iterations: number, salt: IsomorphicBuffer } | undefined;

    const descriptor = new ObservableObject<ClusterInstanceLight<administratorCommissioningCluster.AdministratorCommissioning> & ClusterEvents<administratorCommissioningCluster.AdministratorCommissioning>>({
        id: ClusterIds.AdministratorCommissioning,
        async OpenCommissioningWindowCommand(timeout, verifier, discriminator, iterations, salt)
        {
            if (this.target.WindowStatus != administratorCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen)
                throw new ErrorWithStatus(HttpStatusCode.Forbidden, 'The window is already open');

            this.setValue('WindowStatus', administratorCommissioningCluster.CommissioningWindowStatusEnum.EnhancedWindowOpen);

            commissionning = { verifier, discriminator, iterations, salt };

            setTimeout(() =>
            {
                commissionning = undefined;
                this.setValue('WindowStatus', administratorCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen);
            }, timeout);
        },
        async RevokeCommissioningCommand()
        {

        },
        SupportsBasic: true,
        WindowStatus: administratorCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen,
        async OpenBasicCommissioningWindowCommand(timeout)
        {
            if (this.target.WindowStatus != administratorCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen)
                throw new ErrorWithStatus(HttpStatusCode.Forbidden, 'The window is already open');

            this.setValue('WindowStatus', administratorCommissioningCluster.CommissioningWindowStatusEnum.BasicWindowOpen);
            commissionning = {};

            setTimeout(() =>
            {
                commissionning = undefined;
                this.setValue('WindowStatus', administratorCommissioningCluster.CommissioningWindowStatusEnum.WindowNotOpen);
            }, timeout);
        }
    });
    return descriptor;
}
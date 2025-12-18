import { IsomorphicBuffer, ObservableObject } from '@akala/core';

import { ClusterIds, generalCommissioningCluster } from '../../codegen/clusters/clusters-index.js';
import { ClusterEvents, ClusterInstance, ClusterInstanceLight } from '../clients/index.js';
import { NetworkRecoveryReasonEnum } from '../../codegen/clusters/GeneralCommissioningCluster.js';

export function GeneralCommissioning(): ClusterInstance<generalCommissioningCluster.GeneralCommissioning>
{
    let commissioning: {} | { verifier: IsomorphicBuffer, discriminator: number, iterations: number, salt: IsomorphicBuffer } | undefined;
    let timeout: NodeJS.Timeout | undefined;
    let regulatoryConfig = generalCommissioningCluster.RegulatoryLocationTypeEnum.IndoorOutdoor;

    const descriptor = new ObservableObject<
        ClusterInstanceLight<generalCommissioningCluster.GeneralCommissioning> &
        ClusterEvents<generalCommissioningCluster.GeneralCommissioning>
    >({
        id: ClusterIds.GeneralCommissioning,
        IsCommissioningWithoutPower: false,
        NetworkRecoveryReason: NetworkRecoveryReasonEnum.Unspecified,
        TCUpdateDeadline: 0,
        async ArmFailSafeCommand(duration, breadcrumbArg)
        {
            if (commissioning)
                return [generalCommissioningCluster.CommissioningErrorEnum.BusyWithOtherAdmin, 'Busy'];

            if (duration > 900) // Max allowed by spec (15 minutes)
                return [generalCommissioningCluster.CommissioningErrorEnum.NoFailSafe, 'Duration too long'];

            commissioning = {};

            if (timeout)
                clearTimeout(timeout);
            timeout = setTimeout(() =>
            {
                commissioning = undefined;
            }, duration * 1000);

            this.target.Breadcrumb = breadcrumbArg;

            return [
                generalCommissioningCluster.CommissioningErrorEnum.OK,
                'OK'
            ];
        },

        async SetRegulatoryConfigCommand(config, countryCode, breadcrumbArg)
        {
            if (!commissioning)
                return [generalCommissioningCluster.CommissioningErrorEnum.NoFailSafe, 'Failsafe not armed'];

            regulatoryConfig = config;
            this.setValue('RegulatoryConfig', config);
            this.target.Breadcrumb = breadcrumbArg;

            return [
                generalCommissioningCluster.CommissioningErrorEnum.OK,
                'OK'
            ];
        },

        async CommissioningCompleteCommand()
        {
            if (!commissioning)
                return [generalCommissioningCluster.CommissioningErrorEnum.NoFailSafe, 'Failsafe not armed'];

            commissioning = undefined;
            if (timeout)
                clearTimeout(timeout);
            timeout = undefined;

            return [generalCommissioningCluster.CommissioningErrorEnum.OK, ''];
        },

        // Static or read-only attributes
        BasicCommissioningInfo: {
            FailSafeExpiryLengthSeconds: 120,
            MaxCumulativeFailsafeSeconds: 900,
        },
        Breadcrumb: 0n,
        LocationCapability: generalCommissioningCluster.RegulatoryLocationTypeEnum.IndoorOutdoor,
        RecoveryIdentifier: null,
        RegulatoryConfig: regulatoryConfig,
        async SetTCAcknowledgementsCommand(tcVersion, userResponse)
        {
            if (!commissioning)
                return [
                    generalCommissioningCluster.CommissioningErrorEnum.NoFailSafe,];

            this.setValue('TCAcceptedVersion', tcVersion);
            this.setValue('TCAcknowledgements', userResponse);

            return [
                generalCommissioningCluster.CommissioningErrorEnum.OK
            ];
        },
        SupportsConcurrentConnection: false,
        SupportsNetworkRecovery: false,
        SupportsTermsAndConditions: false,
        TCAcceptedVersion: 0,
        TCAcknowledgements: [],
        TCAcknowledgementsRequired: false,
        TCMinRequiredVersion: 0
    });

    return descriptor;
}

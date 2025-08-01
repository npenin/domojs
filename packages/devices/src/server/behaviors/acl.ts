import { ObservableObject } from '@akala/core';
import { accessControlCluster, ClusterIds } from '../../codegen/clusters/clusters-index.js'
import { ClusterEvents, ClusterInstanceLight } from '../clients/index.js'

export function Acl()
{
    const acls = new ObservableObject<ClusterInstanceLight<accessControlCluster.AccessControl> & ClusterEvents<accessControlCluster.AccessControl>>({
        id: ClusterIds.AccessControl,
        AccessControlEntriesPerFabric: 10,
        ACL: [],
        AccessControlEntryChanged: null,
        SubjectsPerAccessControlEntry: 4,
        TargetsPerAccessControlEntry: 4,
        AccessControlExtensionChanged: null,
        ARL: [],
        CommissioningARL: [],
        Extension: [],
        FabricRestrictionReviewUpdate: null,
        SupportsExtension: true,
        SupportsManagedDevice: true,
        async ReviewFabricRestrictionsCommand(arl)
        {
            // Validate the ARL entry structure
            if (!arl || typeof arl !== 'object')
            {
                throw new Error('Invalid ARL entry');
            }

            // Example: Check if the ARL entry matches any existing restrictions
            const restrictionFound = acls.target.ARL.some(restriction =>
            {
                // Compare relevant fields (subjects, targets, etc.)
                return JSON.stringify(restriction) === JSON.stringify(arl);
            });

            // Update the FabricRestrictionReviewUpdate event
            // acls.setValue('FabricRestrictionReviewUpdate', [
            //     restrictionFound ? 1n : 0n,
            //     restrictionFound,
            //     timestamp: Date.now(),
            // ]);

            // Optionally, return the result
            return [restrictionFound ? 1n : 0n];
        },
    });

    acls.on('ACL', ev =>
    {
        acls.setValue('AccessControlEntryChanged', [
            '',
            0,
            accessControlCluster.ChangeTypeEnum.Changed,
            ev.value[0],
        ])
    })

    acls.on('Extension', ev =>
    {
        acls.setValue('AccessControlExtensionChanged', [
            '',
            0,
            accessControlCluster.ChangeTypeEnum.Changed,
            ev.value[0],
        ])
    })

    return Object.assign(acls,
        {
            async AddAccessControlEntry(
                entry: accessControlCluster.AccessControlEntryStruct
            ): Promise<void>
            {
                // Add entry to ACL, respecting AccessControlEntriesPerFabric
                if (acls.target.ACL.length < this.AccessControlEntriesPerFabric)
                    acls.setValue('ACL', acls.target.ACL.concat([entry]));
                else
                    throw new Error('Maximum entries per fabric reached');
            },
            async RemoveAccessControlEntry(
                index: number
            ): Promise<void>
            {
                acls.setValue('ACL', acls.target.ACL.toSpliced(index, 1));
            }
        }
    );
}
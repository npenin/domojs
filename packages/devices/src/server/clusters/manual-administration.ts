import type { Cluster, ClusterDefinition } from "../clients/index.js";

export const clusterId = 0xfc04

export type ManualAdministrationCluster<T> = Cluster<{}, {
    add: {
        inputparams: [
            info: T,
        ],
        outputparams: [endpointId: number[]]
    },
    remove: {
        inputparams: [
            endpointId: number
        ],
        outputparams: []
    }
}, {}>;


export const ManualAdministrationCluster: ClusterDefinition<ManualAdministrationCluster<any>> = {
    id: clusterId,
    commands: [
        'add',
        'remove'
    ] as const,
    attributes: [] as const,
    events: [] as const
}
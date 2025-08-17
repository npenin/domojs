import type { Cluster } from "../clients/index.js";


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

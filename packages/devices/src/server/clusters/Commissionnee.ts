import type { PubSubConfiguration } from "../../index.js";
import type { Cluster, ClusterDefinition } from "../clients/index.js";

export const clusterId = 0xfc01

export type Commissionnee = Cluster<{}, {
    register: {
        inputparams: [name: string];
        outputparams: [PubSubConfiguration];
    };
}, {}> & { id: typeof clusterId; };

export const CommissionningCluster: ClusterDefinition<Commissionnee> = {
    id: clusterId,
    commands: [
        'register'
    ] as const,
    attributes: [] as const,
    events: [] as const
}
import type { Cluster, ClusterDefinition } from "../clients/index.js";

export const clusterId = 0xfc05

export type LocationCluster = Cluster<{
    location: `${number} ${number}`,
    altitude: number,
    accuracy: number,
}, {
    }, {}>;


export const LocationCluster: ClusterDefinition<LocationCluster> = {
    id: clusterId,
    commands: [
    ] as const,
    attributes: ['location', 'altitude', 'accuracy'] as const,
    events: [] as const
}
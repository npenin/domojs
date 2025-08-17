import { Metadata } from "@akala/commands";
import type { Cluster, ClusterDefinition } from "../clients/index.js";

export const clusterId = 0xfc03;

export type Commands = Cluster<{ Actions: Metadata.Container; }, {
    exec: {
        inputparams: [cmd: Metadata.Command, params: any[]];
        outputparams: [Error | undefined, unknown];
    };
}, {}>;


export const CommandsCluster: ClusterDefinition<Commands> = {
    id: clusterId,
    commands: [
        'exec'
    ] as const,
    attributes: ['Actions'] as const,
    events: [] as const
}

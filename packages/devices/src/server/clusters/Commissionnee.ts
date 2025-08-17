import { ObservableObject } from "@akala/core";
import type { PubSubConfiguration } from "../../index.js";
import type { Cluster, ClusterInstance, ClusterDefinition } from "../clients/index.js";
import registerAdapter from "../commands/devices/register-adapter.js";
import { State } from "../commands/devices/$init.js";

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

export default function (state: State): ClusterInstance<Commissionnee>
{
    return new ObservableObject({
        async registerCommand(name)
        {
            return [await registerAdapter.call(state, name)]
        },
        id: clusterId,
    });
}
import { ObservableObject } from "@akala/core";
import { PubSubConfiguration } from "../../index.js";
import { Cluster, ClusterInstance, ClusterDefinition } from "../clients/index.js";
import { ClusterIds } from "./_shared.js";
import registerAdapter from "../commands/devices/register-adapter.js";
import { State } from "../commands/devices/$init.js";


export type Commissionnee = Cluster<{}, {
    register: {
        inputparams: [name: string];
        outputparams: [PubSubConfiguration];
    };
}, {}> & { id: ClusterIds.commissionning; };

export const CommissionningCluster: ClusterDefinition<Commissionnee> = {
    id: ClusterIds.commissionning,
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
        id: ClusterIds.commissionning,
    });
}
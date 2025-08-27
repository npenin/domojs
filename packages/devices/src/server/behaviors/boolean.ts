import { BooleanState } from "../../codegen/clusters/boolean-state-cluster.js";
import { clusterFactory, ClusterInstance } from "../clients/shared.js";
import { MatterClusterIds } from "../clusters/_shared.js";

export default function (defaultState: boolean): ClusterInstance<BooleanState>
{
    const result = clusterFactory<BooleanState>({
        id: MatterClusterIds.BooleanState,
        StateValue: defaultState
    });

    result.on('StateValue', ev =>
    {
        if (ev.oldValue != ev.value)
            result.setValue('StateChange', [ev.value])
    })

    return result;
}
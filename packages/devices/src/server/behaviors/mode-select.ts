import { ClusterIds, modeSelectCluster } from '../../codegen/clusters/clusters-index.js'
import { type ClusterInstance, type ClusterInstanceLight, clusterFactory } from '../clients/index.js'

export default function ModeSelect(modes: modeSelectCluster.ModeOptionStruct[], description: string):
    ClusterInstance<modeSelectCluster.ModeSelect>
{
    const self = clusterFactory({
        id: ClusterIds.ModeSelect,
        async ChangeToModeCommand(newMode)
        {
            self.setValue('CurrentMode', newMode);
        },
        CurrentMode: 0,
        SupportedModes: modes,
        StartUpMode: 0,
        Description: description,
        SupportsOnOff: false
    } as ClusterInstanceLight<modeSelectCluster.ModeSelect>);
    return self;
}
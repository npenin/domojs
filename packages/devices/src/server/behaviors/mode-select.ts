import { ClusterIds, modeSelect } from '../../codegen/clusters/clusters-index.js'
import { type ClusterInstance, type ClusterInstanceLight, clusterFactory } from '../clients/index.js'

export default function ModeSelect(modes: modeSelect.ModeOptionStruct[], description: string):
    ClusterInstance<modeSelect.ModeSelect>
{
    const self = clusterFactory({
        id: ClusterIds.ModeSelect,
        async ChangeToModeCommand(newMode)
        {
            self.setValue('CurrentMode', newMode);
        },
        OnMode: 0,
        StandardNamespace: 0,
        CurrentMode: 0,
        SupportedModes: modes,
        StartUpMode: 0,
        Description: description,
        SupportsOnOff: false
    } as ClusterInstanceLight<modeSelect.ModeSelect>);
    return self;
}
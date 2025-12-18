import { ObservableObject } from "@akala/core";
import { ClusterIds, ClusterInstance, ClusterInstanceLight, ClusterMap, Endpoint, MatterClusterIds, windowCovering } from "@domojs/devices";
import { Rfxtrx, Rfy, Type } from "@domojs/rfx-parsers";

export class RfyEndpoint extends Endpoint
{
    constructor(id: number, remote: Pick<Rfy.Device, 'unitCode' | 'id1' | 'id2' | 'id3'>, gateway: Rfxtrx)
    {
        super(id.toString(), id,
            {
                windowCovering: RfyWindowCovering(gateway, remote),
            });
    }
}

export function RfyWindowCovering(gateway: Rfxtrx, remote: Pick<Rfy.Device, 'unitCode' | 'id1' | 'id2' | 'id3'>): ClusterInstance<windowCovering.WindowCovering>
{
    return new ObservableObject({
        id: MatterClusterIds.WindowCovering,
        ConfigStatus: windowCovering.ConfigStatusBitmap.Operational,
        EndProductType: windowCovering.EndProductTypeEnum.RollerShutter,
        Type: windowCovering.TypeEnum.Shutter,
        OperationalStatus: windowCovering.OperationalStatusBitmap.Global,
        SupportsAbsolutePosition: false,
        SupportsLift: true,
        SupportsTilt: false,
        SupportsPositionAwareLift: false,
        SupportsPositionAwareTilt: false,
        UpOrOpenCommand: async () =>
        {
            await gateway.send(Type.RFY.Standard, {
                command: Rfy.Internal.Commands.UpOrOpen,
                id1: remote.id1,
                id2: remote.id2,
                id3: remote.id3,
                unitCode: remote.unitCode
            });
        },
        DownOrCloseCommand: async () =>
        {
            await gateway.send(Type.RFY.Standard, {
                command: Rfy.Internal.Commands.DownOrClose,
                id1: remote.id1,
                id2: remote.id2,
                id3: remote.id3,
                unitCode: remote.unitCode
            });
        },
        StopMotionCommand: async () =>
        {
            await gateway.send(Type.RFY.Standard, {
                command: Rfy.Internal.Commands.UpOrOpen,
                id1: remote.id1,
                id2: remote.id2,
                id3: remote.id3,
                unitCode: remote.unitCode
            });
        },
        Mode: windowCovering.ModeBitmap.__NotSet,
    } as ClusterInstanceLight<windowCovering.WindowCovering>);
}

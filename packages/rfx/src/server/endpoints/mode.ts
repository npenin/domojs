import { clusterFactory, ClusterIds, ClusterMap, Endpoint, MatterClusterIds } from "@domojs/devices";
import { InterfaceControl, Rfxtrx } from "@domojs/rfx-parsers";

export class ModeEndpoint<TName extends Extract<keyof TEnum, string>, TEnum extends { [key in TName]: number }> extends Endpoint<ClusterMap>
{
    static getEndpoints(gateway: Rfxtrx, idStart: number): Endpoint<ClusterMap>[]
    {
        return ([3, 4, 5, 6] as const).flatMap(n => Object.entries(InterfaceControl[`protocols_msg${n}`]).map((e: [keyof typeof InterfaceControl[`protocols_msg${typeof n}`], number | string]) => typeof e[1] == 'number' ?
            new ModeEndpoint(idStart + n - 3, n, InterfaceControl[`protocols_msg${n}`], e[0], gateway) : null).filter(e => e))
    }
    constructor(id: number, n: 3 | 4 | 5 | 6, msg: TEnum, name: TName, gateway: Rfxtrx)
    {
        super(id,
            {
                onOff: clusterFactory({
                    id: MatterClusterIds.OnOff,
                    OnOff: (gateway.modes[`msg${n}`] & msg[name]) != 0,
                    async OnCommand()
                    {
                        await gateway.setModes({ ...gateway.modes, [`msg${n}`]: gateway.modes[`msg${n}`] | msg[name] })
                    },
                    async OffCommand()
                    {
                        await gateway.setModes({ ...gateway.modes, [`msg${n}`]: gateway.modes[`msg${n}`] & ~msg[name] })
                    },
                    ToggleCommand()
                    {
                        return this.OnOff ? this.OnCommand() : this.OffCommand();
                    },
                    SupportsDeadFrontBehavior: false,
                    SupportsLighting: false,
                    SupportsOffOnly: false,
                })
            });
    }
}

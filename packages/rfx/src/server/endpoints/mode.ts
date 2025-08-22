import { clusterFactory, ClusterIds, ClusterMap, Endpoint, MatterClusterIds, RootNode } from "@domojs/devices";
import { InterfaceControl, Rfxtrx } from "@domojs/rfx-parsers";
import { GatewayEndpoint } from "./gateway.js";

export class ModeEndpoint<TName extends Extract<keyof TEnum, string>, TEnum extends { [key in TName]: number }> extends Endpoint
{
    static async getEndpoints(gateway: Rfxtrx, gatewayName: string, root: RootNode<never>): Promise<Endpoint[]>
    {
        return Promise.all(([3, 4, 5, 6] as const).flatMap(n => Object.entries(InterfaceControl[`protocols_msg${n}`]).map(async (e: [keyof typeof InterfaceControl[`protocols_msg${typeof n}`], number | string]) => typeof e[1] == 'number' ?
            new ModeEndpoint(await root.getEndpointId(`${gatewayName}-mode-${n}-${e[0]}`), n, InterfaceControl[`protocols_msg${n}`], e[0], gateway) : null))).then(v => v.filter(e => e));
    }
    constructor(id: number, n: 3 | 4 | 5 | 6, msg: TEnum, name: TName, gateway: Rfxtrx)
    {
        super(id,
            {
                fixedLabel: clusterFactory({
                    id: MatterClusterIds.FixedLabel,
                    LabelList: [
                        {
                            Label: 'name',
                            Value: name
                        }
                    ]
                }),
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

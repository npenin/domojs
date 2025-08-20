import { OutletDefined, OutletDefinition } from "@akala/client";
import { Formatter, formatters } from "@akala/core";
import { ClusterMap, EndpointProxy } from "@domojs/devices";
import { outlet as SwitchButtonButtonOutlet } from "../switch-button-button/switch-button-button.js";
import { outlet as TiltWindowCoveringButtonOutlet } from "../lift-window-covering-button/lift-window-covering-button.js";

export class DeviceButtonSelector implements Formatter<Promise<OutletDefinition<any> | OutletDefined<any>>>
{
    public async format(value: EndpointProxy): Promise<OutletDefinition<any> | OutletDefined<any>>
    {
        if (!value)
            return;
        switch (typeof value)
        {
            case 'object':
                if (value.clusters?.descriptor?.target?.localServerList?.length)
                {
                    if (value.clusters.switch_)
                        return SwitchButtonButtonOutlet;
                    if (value.clusters.windowCovering)
                        if (await value.clusters.windowCovering.target.SupportsLift)
                            return TiltWindowCoveringButtonOutlet;
                }
                break;
            default:
                throw new Error(`Invalid value for DeviceButtonSelector: ${value}`);
        }
    }
}

formatters.register('#deviceButtonSelector', DeviceButtonSelector);
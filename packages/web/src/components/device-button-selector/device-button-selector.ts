import { OutletDefined, OutletDefinition } from "@akala/client";
import { Formatter, formatters } from "@akala/core";
import { ClusterMap, EndpointProxy } from "@domojs/devices";
import { outlet as SwitchButtonButtonOutlet } from "../switch-button-button/switch-button-button.js";
import { outlet as TiltWindowCoveringButtonOutlet } from "../lift-window-covering-button/lift-window-covering-button.js";

export class DeviceButtonSelector implements Formatter<OutletDefinition<any> | OutletDefined<any>>
{
    public format(value: EndpointProxy<ClusterMap>): OutletDefinition<any> | OutletDefined<any>
    {
        switch (typeof value)
        {
            case 'object':
                if (value.clusters.descriptor?.target?.ServerList?.length)
                {
                    if (value.clusters.switch_)
                        return SwitchButtonButtonOutlet;
                    if (value.clusters.windowCovering)
                        if (value.clusters.windowCovering.target.SupportsTilt)
                            return TiltWindowCoveringButtonOutlet;
                }
            default:
                throw new Error(`Invalid value for DeviceButtonSelector: ${value}`);
        }
    }
}

formatters.register('deviceButtonSelector', DeviceButtonSelector);
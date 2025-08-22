import { OutletDefined, OutletDefinition } from "@akala/client";
import { Formatter, formatters } from "@akala/core";
import { ClusterMap, EndpointProxy } from "@domojs/devices";
import WindowCovering from "../devices/window-covering/windowCovering.js";

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
                    if (value.clusters.windowCovering)
                        return WindowCovering;
                }
                break;
            default:
                throw new Error(`Invalid value for DeviceButtonSelector: ${value}`);
        }
    }
}

formatters.register('deviceButtonSelector', DeviceButtonSelector);
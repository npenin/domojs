import * as devices from "../../../devices";
import { Container } from "@akala/commands";
import deviceType from "../../devicetype-commands";
import { sidecar } from '@akala/pm';


export default async function (this: devices.DeviceTypeCollection & { initializing: boolean }, container: Container<any> & deviceType.container, pm: Container<any>)
{
    container.register('pm', pm);
    try
    {
        var webc = await sidecar()['@akala/server'];

        await webc.dispatch('remote-container', '/api/devices/types', require('../../../../devicetype-commands.json'))
    }
    catch (e)
    {
        if (e.code !== 'INVALID_CMD')
            throw e;
    }
}
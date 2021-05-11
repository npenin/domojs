import * as devices from "../../../devices";
import { Container, serve } from "@akala/commands";
import deviceType from "../../devicetype-commands";
import { sidecar, SidecarMap } from '@akala/pm';


export default async function (this: devices.DeviceTypeCollection & { initializing: boolean }, container: Container<any> & deviceType.container, pm: Container<any>, options: any)
{
    container.register('pm', pm);

    var webc = await sidecar<SidecarMap>()['@akala/server'];

    await webc.dispatch('remote-container', '/api/devices/types', require('../../../../devicetype-commands.json'))

    return await serve(container, options);
}
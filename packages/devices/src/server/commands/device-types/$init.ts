import '@akala/server'
import * as devices from "../../../devices";
import { Container, serve } from "@akala/commands";
import { deviceTypeContainer } from "../../..";
import * as web from '@akala/server'
import { connect } from '@akala/pm';


export default async function (this: devices.DeviceTypeCollection & { initializing: boolean }, container: Container<any> & deviceTypeContainer, pm: Container<any>, options: any)
{
    container.register('pm', pm);

    const { container: webc } = await web.connect(await connect('server'), {}, 'socket');

    await webc.dispatch('remote-container', '/api/devices/types', require('../../../../devicetype-commands.json'))

    return await serve(container, options);
}
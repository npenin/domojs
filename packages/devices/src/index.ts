
import deviceTypeContainer from './server/devicetype-commands.js'
import deviceContainer from './server/device-commands.js'

import * as devices from './devices.js';
import { sidecarSingleton } from '@akala/pm';
import { Container, Metadata } from '@akala/commands';
export { devices, deviceContainer, deviceTypeContainer }


export async function registerDeviceType(container: Container<void>, signal: AbortSignal, ...deviceTypes: devices.DeviceType[])
{
    var deviceType = await sidecarSingleton({ container, preferRemote: false, signal })['@domojs/devicetype'];
    for (var dt of deviceTypes)
        await deviceType.dispatch('register', dt);
}

export function command(name: string, cmd: devices.CommandDescription): Metadata.Command[]
{
    switch (cmd.type)
    {
        case 'button':
            return [{ name, config: { "": { inject: [] }, "cli": { inject: [] }, '@domojs/devicetype': cmd } }];
        case 'range':
        case 'input':
            return [{ name, config: { "": { inject: ["param.0"] }, "cli": { inject: ["param.0"] }, '@domojs/devicetype': cmd } }];
        case 'toggle':
            return [
                { name, config: { "": { inject: [] }, "cli": { inject: [] }, '@domojs/devicetype': cmd } }
            ];

    }
}

declare module '@akala/pm'
{
    interface SidecarMap
    {
        ['@domojs/devices']: deviceContainer.container;
        ['@domojs/devicetype']: deviceTypeContainer.container;
    }
}

declare module '@akala/commands'
{
    interface ConfigurationMap
    {
        '@domojs/devicetype': devices.CommandDescription
    }
}


export { Gateway } from './Gateway.js'
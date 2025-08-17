

import { Metadata } from '@akala/commands/browser';
import { CommandDescription } from './devices.js';
export * from './server/clients/index.js';
import devices from './server/device-commands.js'
import type { SidecarConfiguration } from '@akala/sidecar';

declare module '@akala/pm'
{
    export interface SidecarMap
    {
        '@domojs/devices': devices.container;
    }
}


export type PubSubConfiguration = SidecarConfiguration['pubsub'];

export function command(name: string, cmd: CommandDescription): Metadata.Command[]
{
    switch (cmd.type)
    {
        case 'onoff':
            return [{ name, config: { "": { inject: ["params.0"] }, "cli": { inject: ["params.0"] }, '@domojs/devicetype': cmd } }];
        case 'button':
            return [{ name, config: { "": { inject: [] }, "cli": { inject: [] }, '@domojs/devicetype': cmd } }];
        case 'range':
        case 'input':
            return [{ name, config: { "": { inject: ["params.0"] }, "cli": { inject: ["params.0"] }, '@domojs/devicetype': cmd } }];
        case 'toggle':
            return [
                { name, config: { "": { inject: [] }, "cli": { inject: [] }, '@domojs/devicetype': cmd } }
            ];

    }
}

declare module '@akala/commands'
{
    interface ConfigurationMap
    {
        '@domojs/devicetype': CommandDescription
    }
}
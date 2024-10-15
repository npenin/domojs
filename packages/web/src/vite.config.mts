import { plugin as akala } from '@akala/vite';
import { Container, Metadata, Processors } from '@akala/commands';
import { ObservableObject, Parser, each, logger } from '@akala/core';
import { meta, start } from '@akala/pm'
import { buildCliContext } from '@akala/cli';

const connectionMap: Record<string, { sessionId: string, sessionSignature: string }> = {}

const context = buildCliContext(logger('vite'), 'local');
context.options.keepAttached = true;
// context.options.verbose = true;
context.options.name = 'pm';
context.options.program = import.meta.resolve('@akala/pm/commands.json')
context.options.configFile = '../../.akala.json#pm'
const pm = new Container<{}>('pm', {});
start.call({}, pm, 'pm', context)
console.log('pwet')

export default {
    build: {
        // generate .vite/manifest.json in outDir
        manifest: true,
    },
    plugins: [
        akala({
            // auth: {
            //     path: '@akala/authentication/commands.json',
            //     init: ['file', null, 'my-very-secret-key']
            // }
            pm: {
                path: '@akala/pm/commands.json'
            },
            "@domojs/devicetype": {
                path: '@domojs/devices/devicetype-commands.json'
            }
        }, [{
            priority: 0, processor: new Processors.AuthHandler(async (container, command, params) =>
            {
                console.log(command.name);
                // if (!params.auth && command.config.auth?.required)
                //     throw new ErrorWithStatus(403, 'User is not authorized');


                // console.log(connectionId, authConfig, command, params);
                // console.log(command.config);
                let trigger = params._trigger;
                if (!trigger || !command.config[trigger])
                    trigger = '';
                if (command.config[trigger] && command.config[trigger].inject)
                {
                    const parser = new Parser();
                    (command.config[trigger] as Metadata.GenericConfiguration).inject?.forEach((param, i) =>
                    {
                        // console.log(param, i);
                        if (param === 'auth')
                            params.auth = params.param[i];
                        if (typeof param == 'string' && param?.startsWith('auth.'))
                        {
                            if (!params.auth)
                                params.auth = {}
                            // console.log(params.param)
                            ObservableObject.setValue(params, parser.parse(param), params.param[i]);
                        }
                    });
                    if (command.config.auth?.required)
                    {
                        if (typeof params.connectionId == 'string')
                            connectionMap[params.connectionId] = params.auth as any;

                    }
                }
                // console.log(params);
            })
        }])
    ],
} as import('vite').UserConfig
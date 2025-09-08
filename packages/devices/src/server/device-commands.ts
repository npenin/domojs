//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, type ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceContainer
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/devices/$init.ts').default>, Argument1<typeof import('./commands/devices/$init.ts').default>, Argument2<typeof import('./commands/devices/$init.ts').default>]): ReturnType<typeof import('./commands/devices/$init.ts').default>
		dispatch (cmd:'register-adapter', ...args: [Argument0<typeof import('./commands/devices/register-adapter.ts').default>, Argument1<typeof import('./commands/devices/register-adapter.ts').default>]): ReturnType<typeof import('./commands/devices/register-adapter.ts').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/devices/$init.ts').default>, Argument1<typeof import('./commands/devices/$init.ts').default>, Argument2<typeof import('./commands/devices/$init.ts').default>]): ReturnType<typeof import('./commands/devices/$init.ts').default>
		'register-adapter'(...args: [Argument0<typeof import('./commands/devices/register-adapter.ts').default>, Argument1<typeof import('./commands/devices/register-adapter.ts').default>]): ReturnType<typeof import('./commands/devices/register-adapter.ts').default>
	}
   export const meta={"name":"devices","commands":[{"name":"$init","config":{"fs":{"path":"dist/server/commands/devices/$init.js","source":"src/server/commands/devices/$init.ts","inject":["params.0","params.1","params.2"]},"cli":{"inject":["context","pm","$container"]},"":{"inject":["params.0","params.1","params.2"]}}},{"name":"register-adapter","config":{"fs":{"inject":["params.0","params.1"],"path":"dist/server/commands/devices/register-adapter.js","source":"src/server/commands/devices/register-adapter.ts"},"":{"inject":["params.0","params.1"]},"mqtt":{"topics":["domojs/devices"],"inject":["json"]}}}],"$schema":"https://raw.githubusercontent.com/npenin/akala/main/packages/commands/container-schema.json"} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("deviceContainer", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { deviceContainer as default };
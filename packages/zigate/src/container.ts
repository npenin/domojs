//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, type ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/$init.ts').default>, Argument1<typeof import('./commands/$init.ts').default>, Argument2<typeof import('./commands/$init.ts').default>]): ReturnType<typeof import('./commands/$init.ts').default>
		dispatch (cmd:'exec', ...args: [Argument0<typeof import('./commands/exec.ts').default>, Argument1<typeof import('./commands/exec.ts').default>, Argument2<typeof import('./commands/exec.ts').default>]): ReturnType<typeof import('./commands/exec.ts').default>
		dispatch (cmd:'getStatus', ...args: [Argument0<typeof import('./commands/getStatus.ts').default>]): ReturnType<typeof import('./commands/getStatus.ts').default>
		dispatch (cmd:'pendingDevices', ...args: []): ReturnType<typeof import('./commands/pendingDevices.ts').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/$init.ts').default>, Argument1<typeof import('./commands/$init.ts').default>, Argument2<typeof import('./commands/$init.ts').default>]): ReturnType<typeof import('./commands/$init.ts').default>
		'exec'(...args: [Argument0<typeof import('./commands/exec.ts').default>, Argument1<typeof import('./commands/exec.ts').default>, Argument2<typeof import('./commands/exec.ts').default>]): ReturnType<typeof import('./commands/exec.ts').default>
		'getStatus'(...args: [Argument0<typeof import('./commands/getStatus.ts').default>]): ReturnType<typeof import('./commands/getStatus.ts').default>
		'pendingDevices'(...args: []): ReturnType<typeof import('./commands/pendingDevices.ts').default>
	}
   export const meta={"name":"@domojs/zigate","commands":[{"name":"$init","config":{"fs":{"path":"dist/commands/$init.js","source":"src/commands/$init.ts","inject":["params.0","params.1","params.2"]},"cli":{"inject":["context","$container","signal"]},"":{"inject":["params.0","params.1","params.2"]}}},{"name":"exec","config":{"fs":{"path":"dist/commands/exec.js","source":"src/commands/exec.ts","inject":["params.0","params.1","params.2"]},"":{"inject":["params.0","params.1","params.2"]},"cli":{"usage":"exec <device> <command> [value]","inject":["options.device","options.command","params.0"]}}},{"name":"getStatus","config":{"fs":{"path":"dist/commands/getStatus.js","source":"src/commands/getStatus.ts","inject":["params.0"]},"":{"inject":["params.0"]}}},{"name":"pendingDevices","config":{"fs":{"path":"dist/commands/pendingDevices.js","source":"src/commands/pendingDevices.ts","inject":[]},"":{"inject":[]}}}],"$schema":"https://raw.githubusercontent.com/npenin/akala/main/packages/commands/container-schema.json"} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("commands", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { commands as default };
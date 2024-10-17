//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/$init.js').default>, Argument1<typeof import('./commands/$init.js').default>, Argument2<typeof import('./commands/$init.js').default>]): ReturnType<typeof import('./commands/$init.js').default>
		dispatch (cmd:'exec', ...args: [Argument0<typeof import('./commands/exec.js').default>, Argument1<typeof import('./commands/exec.js').default>, Argument2<typeof import('./commands/exec.js').default>]): ReturnType<typeof import('./commands/exec.js').default>
		dispatch (cmd:'getStatus', ...args: [Argument0<typeof import('./commands/getStatus.js').default>]): ReturnType<typeof import('./commands/getStatus.js').default>
		dispatch (cmd:'pendingDevices', ...args: []): ReturnType<typeof import('./commands/pendingDevices.js').default>
		dispatch (cmd:'save', ...args: [Argument0<typeof import('./commands/save.js').default>, Argument1<typeof import('./commands/save.js').default>]): ReturnType<typeof import('./commands/save.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/$init.js').default>, Argument1<typeof import('./commands/$init.js').default>, Argument2<typeof import('./commands/$init.js').default>]): ReturnType<typeof import('./commands/$init.js').default>
		'exec'(...args: [Argument0<typeof import('./commands/exec.js').default>, Argument1<typeof import('./commands/exec.js').default>, Argument2<typeof import('./commands/exec.js').default>]): ReturnType<typeof import('./commands/exec.js').default>
		'getStatus'(...args: [Argument0<typeof import('./commands/getStatus.js').default>]): ReturnType<typeof import('./commands/getStatus.js').default>
		'pendingDevices'(...args: []): ReturnType<typeof import('./commands/pendingDevices.js').default>
		'save'(...args: [Argument0<typeof import('./commands/save.js').default>, Argument1<typeof import('./commands/save.js').default>]): ReturnType<typeof import('./commands/save.js').default>
	}
   export const meta={"name":"@domojs/zigate","commands":[{"name":"$init","config":{"fs":{"path":"dist/commands/$init.js","source":"src/commands/$init.ts","inject":["param.0","param.1","param.2"]},"cli":{"inject":["context","$container","signal"]},"":{"inject":["param.0","param.1","param.2"]}}},{"name":"exec","config":{"fs":{"path":"dist/commands/exec.js","source":"src/commands/exec.ts","inject":["param.0","param.1","param.2"]},"":{"inject":["param.0","param.1","param.2"]},"cli":{"usage":"exec <device> <command> [value]","inject":["options.device","options.command","param.0"]}}},{"name":"getStatus","config":{"fs":{"path":"dist/commands/getStatus.js","source":"src/commands/getStatus.ts","inject":["param.0"]},"":{"inject":["param.0"]}}},{"name":"pendingDevices","config":{"fs":{"path":"dist/commands/pendingDevices.js","source":"src/commands/pendingDevices.ts","inject":[]},"":{"inject":[]}}},{"name":"save","config":{"fs":{"inject":["param.0","param.1","connectionAsContainer"],"path":"dist/commands/save.js","source":"src/commands/save.ts"},"jsonrpc":{"inject":["param.0","param.1","connectionAsContainer"]},"":{"inject":[]}}}]} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("commands", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { commands as default };
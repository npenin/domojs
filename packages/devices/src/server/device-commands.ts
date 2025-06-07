//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceContainer
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/devices/$init.js').default>, Argument1<typeof import('./commands/devices/$init.js').default>, Argument2<typeof import('./commands/devices/$init.js').default>]): ReturnType<typeof import('./commands/devices/$init.js').default>
		dispatch (cmd:'exec', ...args: [Argument1<typeof import('./commands/devices/exec.js').default>, Argument2<typeof import('./commands/devices/exec.js').default>, Argument3<typeof import('./commands/devices/exec.js').default>]): ReturnType<typeof import('./commands/devices/exec.js').default>
		dispatch (cmd:'get-by-category', ...args: [Argument1<typeof import('./commands/devices/get-by-category.js').default>]): ReturnType<typeof import('./commands/devices/get-by-category.js').default>
		dispatch (cmd:'get-by-name', ...args: [Argument1<typeof import('./commands/devices/get-by-name.js').default>]): ReturnType<typeof import('./commands/devices/get-by-name.js').default>
		dispatch (cmd:'get-by-room', ...args: [Argument1<typeof import('./commands/devices/get-by-room.js').default>]): ReturnType<typeof import('./commands/devices/get-by-room.js').default>
		dispatch (cmd:'register', ...args: [Argument3<typeof import('./commands/devices/register.js').default>]): ReturnType<typeof import('./commands/devices/register.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/devices/$init.js').default>, Argument1<typeof import('./commands/devices/$init.js').default>, Argument2<typeof import('./commands/devices/$init.js').default>]): ReturnType<typeof import('./commands/devices/$init.js').default>
		'exec'(...args: [Argument1<typeof import('./commands/devices/exec.js').default>, Argument2<typeof import('./commands/devices/exec.js').default>, Argument3<typeof import('./commands/devices/exec.js').default>]): ReturnType<typeof import('./commands/devices/exec.js').default>
		'get-by-category'(...args: [Argument1<typeof import('./commands/devices/get-by-category.js').default>]): ReturnType<typeof import('./commands/devices/get-by-category.js').default>
		'get-by-name'(...args: [Argument1<typeof import('./commands/devices/get-by-name.js').default>]): ReturnType<typeof import('./commands/devices/get-by-name.js').default>
		'get-by-room'(...args: [Argument1<typeof import('./commands/devices/get-by-room.js').default>]): ReturnType<typeof import('./commands/devices/get-by-room.js').default>
		'register'(...args: [Argument3<typeof import('./commands/devices/register.js').default>]): ReturnType<typeof import('./commands/devices/register.js').default>
	}
   export const meta={"name":"devices","commands":[{"name":"$init","config":{"fs":{"path":"dist/server/commands/devices/$init.js","source":"src/server/commands/devices/$init.ts","inject":["params.0","params.1","params.2"]},"cli":{"options":{"path":{"normalize":true}},"inject":["$container","pm","options.path","options.deviceType","options"]},"":{"inject":["params.0","params.1","params.2"]}}},{"name":"exec","config":{"fs":{"inject":["livedb","params.0","params.1","params.2","$modules.@domojs/devices.deviceType"],"path":"dist/server/commands/devices/exec.js","source":"src/server/commands/devices/exec.ts"},"jsonrpc":{"inject":["livedb","params.0","params.1","params.2","$modules.@domojs/devices.deviceType"]},"":{"inject":["livedb","params.0","params.1","params.2","$modules.@domojs/devices.deviceType"]},"http":{"inject":["livedb","route.name","route.cmd","body","$modules.@domojs/devices.deviceType"],"method":"get","route":"/device/{name}/{cmd}"}}},{"name":"get-by-category","config":{"fs":{"inject":["livedb","params.0"],"path":"dist/server/commands/devices/get-by-category.js","source":"src/server/commands/devices/get-by-category.ts"},"jsonrpc":{"inject":["livedb","params.0"]},"":{"inject":["livedb","params.0"]},"http":{"inject":["livedb","route.category"],"method":"get","route":"/category/{category?}"}}},{"name":"get-by-name","config":{"fs":{"inject":["livedb","params.0"],"path":"dist/server/commands/devices/get-by-name.js","source":"src/server/commands/devices/get-by-name.ts"},"jsonrpc":{"inject":["livedb","params.0"]},"":{"inject":["livedb","params.0"]},"http":{"inject":["livedb","route.name"],"method":"get","route":"/device/{name}"}}},{"name":"get-by-room","config":{"fs":{"inject":["livedb","params.0"],"path":"dist/server/commands/devices/get-by-room.js","source":"src/server/commands/devices/get-by-room.ts"},"jsonrpc":{"inject":["livedb","params.0"]},"":{"inject":["livedb","params.0"]},"http":{"inject":["livedb","route.category"],"method":"get","route":"/category/{category?}"}}},{"name":"register","config":{"fs":{"path":"dist/server/commands/devices/register.js","source":"src/server/commands/devices/register.ts","inject":["ignore","ignore","$container","params.0"]},"":{"inject":["livedb","$modules.@domojs/devices.deviceType","$container","params.0"]},"jsonrpc":{"inject":["livedb","$modules.@domojs/devices.deviceType","$container","params.0"]}}}],"$schema":"https://raw.githubusercontent.com/npenin/akala/main/packages/commands/container-schema.json"} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("deviceContainer", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { deviceContainer as default };
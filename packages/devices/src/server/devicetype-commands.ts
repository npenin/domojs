//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceTypeContainer
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/device-types/$init.js').default>, Argument1<typeof import('./commands/device-types/$init.js').default>, Argument2<typeof import('./commands/device-types/$init.js').default>]): ReturnType<typeof import('./commands/device-types/$init.js').default>
		/** 
		  * registers a device with type `type` with the content provided in `content`
		  * @typedef args0 - $container
		  * @typedef args1 - type
		  * @typedef args2 - content
		  * @param {[args0, args1, args2]} args
		  */
		dispatch (cmd:'add', ...args: [Argument1<typeof import('./commands/device-types/add.js').default>, Argument2<typeof import('./commands/device-types/add.js').default>]): ReturnType<typeof import('./commands/device-types/add.js').default>
		dispatch (cmd:'list', ...args: []): ReturnType<typeof import('./commands/device-types/list.js').default>
		dispatch (cmd:'push-status', ...args: [Argument0<typeof import('./commands/device-types/push-status.js').default>]): ReturnType<typeof import('./commands/device-types/push-status.js').default>
		dispatch (cmd:'register', ...args: [Argument0<typeof import('./commands/device-types/register.js').default>]): ReturnType<typeof import('./commands/device-types/register.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/device-types/$init.js').default>, Argument1<typeof import('./commands/device-types/$init.js').default>, Argument2<typeof import('./commands/device-types/$init.js').default>]): ReturnType<typeof import('./commands/device-types/$init.js').default>
		/** 
		  * registers a device with type `type` with the content provided in `content`
		  * @typedef args0 - $container
		  * @typedef args1 - type
		  * @typedef args2 - content
		  * @param {[args0, args1, args2]} args
		  */
		'add'(...args: [Argument1<typeof import('./commands/device-types/add.js').default>, Argument2<typeof import('./commands/device-types/add.js').default>]): ReturnType<typeof import('./commands/device-types/add.js').default>
		'list'(...args: []): ReturnType<typeof import('./commands/device-types/list.js').default>
		'push-status'(...args: [Argument0<typeof import('./commands/device-types/push-status.js').default>]): ReturnType<typeof import('./commands/device-types/push-status.js').default>
		'register'(...args: [Argument0<typeof import('./commands/device-types/register.js').default>]): ReturnType<typeof import('./commands/device-types/register.js').default>
	}
   export const meta={"name":"device-types","commands":[{"name":"$init","config":{"fs":{"path":"dist/server/commands/device-types/$init.js","source":"src/server/commands/device-types/$init.ts","inject":["param.0","param.1","param.2"]},"cli":{"inject":["context","$container","pm"]},"":{"inject":["param.0","param.1","param.2"]}}},{"name":"add","config":{"fs":{"inject":["$container","param.0","param.1"],"path":"dist/server/commands/device-types/add.js","source":"src/server/commands/device-types/add.ts"},"":{"inject":["$container","param.0","param.1"]},"jsonrpc":{"inject":["$container","param.0","param.1"]},"cli":{"inject":["$container","options.type","stdin"],"usage":"add <type>"},"http":{"inject":["$container","route.type","body"],"type":"json","method":"post","route":"/new/{type}"},"doc":{"description":"registers a device with type `type` with the content provided in `content`","inject":["$container","type","content"],"options":{"type":"the device type (you can list device types using the list command)","content":"a json object that has at least a name: name, category and, optionally a room."}}}},{"name":"list","config":{"fs":{"inject":[],"path":"dist/server/commands/device-types/list.js","source":"src/server/commands/device-types/list.ts"},"":{"inject":[]},"cli":{"inject":[]},"http":{"inject":[],"method":"get","route":"/list"}}},{"name":"push-status","config":{"fs":{"path":"dist/server/commands/device-types/push-status.js","source":"src/server/commands/device-types/push-status.ts","inject":["param.0"]},"":{"inject":["param.0"]}}},{"name":"register","config":{"fs":{"inject":["param.0","$container","connectionAsContainer","connection"],"path":"dist/server/commands/device-types/register.js","source":"src/server/commands/device-types/register.ts"},"jsonrpc":{"inject":["param.0","$container","connectionAsContainer","connection"]},"":{"inject":["param.0","$container","connectionAsContainer","connection"]}}}],"$schema":"https://raw.githubusercontent.com/npenin/akala/main/packages/commands/container-schema.json"} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("deviceTypeContainer", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { deviceTypeContainer as default };
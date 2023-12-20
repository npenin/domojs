//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceTypeContainer
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: []): ReturnType<typeof import('./commands/device-types/$init.js').default>
		dispatch (cmd:'add', ...args: [Argument1<typeof import('./commands/device-types/add.js').default>, Argument2<typeof import('./commands/device-types/add.js').default>]): ReturnType<typeof import('./commands/device-types/add.js').default>
		dispatch (cmd:'list', ...args: []): ReturnType<typeof import('./commands/device-types/list.js').default>
		dispatch (cmd:'push-status', ...args: [Argument0<typeof import('./commands/device-types/push-status.js').default>]): ReturnType<typeof import('./commands/device-types/push-status.js').default>
		dispatch (cmd:'register', ...args: [Argument0<typeof import('./commands/device-types/register.js').default>]): ReturnType<typeof import('./commands/device-types/register.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./commands/device-types/$init.js').default>
		'add'(...args: [Argument1<typeof import('./commands/device-types/add.js').default>, Argument2<typeof import('./commands/device-types/add.js').default>]): ReturnType<typeof import('./commands/device-types/add.js').default>
		'list'(...args: []): ReturnType<typeof import('./commands/device-types/list.js').default>
		'push-status'(...args: [Argument0<typeof import('./commands/device-types/push-status.js').default>]): ReturnType<typeof import('./commands/device-types/push-status.js').default>
		'register'(...args: [Argument0<typeof import('./commands/device-types/register.js').default>]): ReturnType<typeof import('./commands/device-types/register.js').default>
	}
}

export { deviceTypeContainer as default };
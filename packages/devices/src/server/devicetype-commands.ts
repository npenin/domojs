/* eslint-disable @typescript-eslint/no-unused-vars */
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceTypeContainer
{
	export interface container 
	{
		dispatch (cmd:'list', ...args: []): ReturnType<typeof import('./commands/device-types/list').default>
		dispatch (cmd:'push-status', ...args: [Argument0<typeof import('./commands/device-types/push-status').default>]): ReturnType<typeof import('./commands/device-types/push-status').default>
		dispatch (cmd:'$init', ...args: []): ReturnType<typeof import('./commands/device-types/$init').default>
		dispatch (cmd:'add', ...args: [Argument1<typeof import('./commands/device-types/add').default>, Argument2<typeof import('./commands/device-types/add').default>]): ReturnType<typeof import('./commands/device-types/add').default>
		dispatch (cmd:'register', ...args: [Argument0<typeof import('./commands/device-types/register').default>]): ReturnType<typeof import('./commands/device-types/register').default>
	}
	export interface proxy 
	{
		'list'(...args: []): ReturnType<typeof import('./commands/device-types/list').default>
		'push-status'(...args: [Argument0<typeof import('./commands/device-types/push-status').default>]): ReturnType<typeof import('./commands/device-types/push-status').default>
		'$init'(...args: []): ReturnType<typeof import('./commands/device-types/$init').default>
		'add'(...args: [Argument1<typeof import('./commands/device-types/add').default>, Argument2<typeof import('./commands/device-types/add').default>]): ReturnType<typeof import('./commands/device-types/add').default>
		'register'(...args: [Argument0<typeof import('./commands/device-types/register').default>]): ReturnType<typeof import('./commands/device-types/register').default>
	}
}

export { deviceTypeContainer as default };
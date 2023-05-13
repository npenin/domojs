/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceContainer
{
	export interface container 
	{
		dispatch(cmd: '$init', ...args: []): ReturnType<typeof import('./commands/devices/$init.js').default>
		dispatch(cmd: 'exec', ...args: [Argument1<typeof import('./commands/devices/exec.js').default>, Argument2<typeof import('./commands/devices/exec.js').default>, Argument3<typeof import('./commands/devices/exec.js').default>]): ReturnType<typeof import('./commands/devices/exec.js').default>
		dispatch(cmd: 'get-by-category', ...args: [Argument1<typeof import('./commands/devices/get-by-category.js').default>]): ReturnType<typeof import('./commands/devices/get-by-category.js').default>
		dispatch(cmd: 'get-by-name', ...args: [Argument1<typeof import('./commands/devices/get-by-name.js').default>]): ReturnType<typeof import('./commands/devices/get-by-name.js').default>
		dispatch(cmd: 'get-by-room', ...args: [Argument1<typeof import('./commands/devices/get-by-room.js').default>]): ReturnType<typeof import('./commands/devices/get-by-room.js').default>
		dispatch(cmd: 'register', ...args: [Argument3<typeof import('./commands/devices/register.js').default>]): ReturnType<typeof import('./commands/devices/register.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./commands/devices/$init.js').default>
		'exec'(...args: [Argument1<typeof import('./commands/devices/exec.js').default>, Argument2<typeof import('./commands/devices/exec.js').default>, Argument3<typeof import('./commands/devices/exec.js').default>]): ReturnType<typeof import('./commands/devices/exec.js').default>
		'get-by-category'(...args: [Argument1<typeof import('./commands/devices/get-by-category.js').default>]): ReturnType<typeof import('./commands/devices/get-by-category.js').default>
		'get-by-name'(...args: [Argument1<typeof import('./commands/devices/get-by-name.js').default>]): ReturnType<typeof import('./commands/devices/get-by-name.js').default>
		'get-by-room'(...args: [Argument1<typeof import('./commands/devices/get-by-room.js').default>]): ReturnType<typeof import('./commands/devices/get-by-room.js').default>
		'register'(...args: [Argument3<typeof import('./commands/devices/register.js').default>]): ReturnType<typeof import('./commands/devices/register.js').default>
	}
}

export { deviceContainer as default };
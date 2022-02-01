/* eslint-disable @typescript-eslint/no-unused-vars */
import { Argument1, Argument2, Argument3, Argument4 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace deviceContainer
{
	export interface container 
	{
		dispatch(cmd: '$init', ...args: []): ReturnType<typeof import('./commands/devices/$init').default>
		dispatch(cmd: 'add', ...args: [Argument3<typeof import('./commands/devices/add').default>, Argument4<typeof import('./commands/devices/add').default>]): ReturnType<typeof import('./commands/devices/add').default>
		dispatch(cmd: 'exec', ...args: [Argument1<typeof import('./commands/devices/exec').default>, Argument2<typeof import('./commands/devices/exec').default>, Argument3<typeof import('./commands/devices/exec').default>]): ReturnType<typeof import('./commands/devices/exec').default>
		dispatch(cmd: 'get-by-category', ...args: [Argument1<typeof import('./commands/devices/get-by-category').default>]): ReturnType<typeof import('./commands/devices/get-by-category').default>
		dispatch(cmd: 'get-by-name', ...args: [Argument1<typeof import('./commands/devices/get-by-name').default>]): ReturnType<typeof import('./commands/devices/get-by-name').default>
		dispatch(cmd: 'get-by-room', ...args: [Argument1<typeof import('./commands/devices/get-by-room').default>]): ReturnType<typeof import('./commands/devices/get-by-room').default>
		dispatch(cmd: 'register', ...args: [Argument3<typeof import('./commands/devices/register').default>]): ReturnType<typeof import('./commands/devices/register').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./commands/devices/$init').default>
		'add'(...args: [Argument3<typeof import('./commands/devices/add').default>, Argument4<typeof import('./commands/devices/add').default>]): ReturnType<typeof import('./commands/devices/add').default>
		'exec'(...args: [Argument1<typeof import('./commands/devices/exec').default>, Argument2<typeof import('./commands/devices/exec').default>, Argument3<typeof import('./commands/devices/exec').default>]): ReturnType<typeof import('./commands/devices/exec').default>
		'get-by-category'(...args: [Argument1<typeof import('./commands/devices/get-by-category').default>]): ReturnType<typeof import('./commands/devices/get-by-category').default>
		'get-by-name'(...args: [Argument1<typeof import('./commands/devices/get-by-name').default>]): ReturnType<typeof import('./commands/devices/get-by-name').default>
		'get-by-room'(...args: [Argument1<typeof import('./commands/devices/get-by-room').default>]): ReturnType<typeof import('./commands/devices/get-by-room').default>
		'register'(...args: [Argument3<typeof import('./commands/devices/register').default>]): ReturnType<typeof import('./commands/devices/register').default>
	}
}

export { deviceContainer as default };
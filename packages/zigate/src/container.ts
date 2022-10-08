/* eslint-disable @typescript-eslint/no-unused-vars */
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: []): ReturnType<typeof import('./commands/$init').default>
		dispatch (cmd:'exec', ...args: [Argument0<typeof import('./commands/exec').default>, Argument1<typeof import('./commands/exec').default>, Argument2<typeof import('./commands/exec').default>]): ReturnType<typeof import('./commands/exec').default>
		dispatch (cmd:'pendingDevices', ...args: []): ReturnType<typeof import('./commands/pendingDevices').default>
		dispatch (cmd:'save', ...args: [Argument0<typeof import('./commands/save').default>, Argument1<typeof import('./commands/save').default>]): ReturnType<typeof import('./commands/save').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./commands/$init').default>
		'exec'(...args: [Argument0<typeof import('./commands/exec').default>, Argument1<typeof import('./commands/exec').default>, Argument2<typeof import('./commands/exec').default>]): ReturnType<typeof import('./commands/exec').default>
		'pendingDevices'(...args: []): ReturnType<typeof import('./commands/pendingDevices').default>
		'save'(...args: [Argument0<typeof import('./commands/save').default>, Argument1<typeof import('./commands/save').default>]): ReturnType<typeof import('./commands/save').default>
	}
}

export { commands as default };
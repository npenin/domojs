/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch(cmd: '$init', ...args: []): ReturnType<typeof import('./commands/$init.js').default>
		dispatch(cmd: 'exec', ...args: [Argument0<typeof import('./commands/exec.js').default>, Argument1<typeof import('./commands/exec.js').default>, Argument2<typeof import('./commands/exec.js').default>]): ReturnType<typeof import('./commands/exec.js').default>
		dispatch(cmd: 'getStatus', ...args: [Argument0<typeof import('./commands/getStatus.js').default>]): ReturnType<typeof import('./commands/getStatus.js').default>
		dispatch(cmd: 'pendingDevices', ...args: []): ReturnType<typeof import('./commands/pendingDevices.js').default>
		dispatch(cmd: 'save', ...args: [Argument0<typeof import('./commands/save.js').default>, Argument1<typeof import('./commands/save.js').default>]): ReturnType<typeof import('./commands/save.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./commands/$init.js').default>
		'exec'(...args: [Argument0<typeof import('./commands/exec.js').default>, Argument1<typeof import('./commands/exec.js').default>, Argument2<typeof import('./commands/exec.js').default>]): ReturnType<typeof import('./commands/exec.js').default>
		'getStatus'(...args: [Argument0<typeof import('./commands/getStatus.js').default>]): ReturnType<typeof import('./commands/getStatus.js').default>
		'pendingDevices'(...args: []): ReturnType<typeof import('./commands/pendingDevices.js').default>
		'save'(...args: [Argument0<typeof import('./commands/save.js').default>, Argument1<typeof import('./commands/save.js').default>]): ReturnType<typeof import('./commands/save.js').default>
	}
}

export { commands as default };
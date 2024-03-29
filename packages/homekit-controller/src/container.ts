/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch(cmd: '$init', ...args: [Argument0<typeof import('./commands/$init.js').default>]): ReturnType<typeof import('./commands/$init.js').default>
		dispatch(cmd: 'device-discovered', ...args: []): ReturnType<typeof import('./commands/device-discovered.js').default>
		dispatch(cmd: 'exec', ...args: [Argument0<typeof import('./commands/device-types/exec.js').default>, Argument1<typeof import('./commands/device-types/exec.js').default>, Argument2<typeof import('./commands/device-types/exec.js').default>]): ReturnType<typeof import('./commands/device-types/exec.js').default>
		dispatch(cmd: 'save', ...args: [Argument0<typeof import('./commands/device-types/save.js').default>, Argument1<typeof import('./commands/device-types/save.js').default>]): ReturnType<typeof import('./commands/device-types/save.js').default>
		dispatch(cmd: 'setup-pair', ...args: [Argument0<typeof import('./commands/setup-pair.js').default>, Argument2<typeof import('./commands/setup-pair.js').default>]): ReturnType<typeof import('./commands/setup-pair.js').default>
		dispatch(cmd: 'verify-pair', ...args: [Argument0<typeof import('./commands/verify-pair.js').default>]): ReturnType<typeof import('./commands/verify-pair.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/$init.js').default>]): ReturnType<typeof import('./commands/$init.js').default>
		'device-discovered'(...args: []): ReturnType<typeof import('./commands/device-discovered.js').default>
		'exec'(...args: [Argument0<typeof import('./commands/device-types/exec.js').default>, Argument1<typeof import('./commands/device-types/exec.js').default>, Argument2<typeof import('./commands/device-types/exec.js').default>]): ReturnType<typeof import('./commands/device-types/exec.js').default>
		'save'(...args: [Argument0<typeof import('./commands/device-types/save.js').default>, Argument1<typeof import('./commands/device-types/save.js').default>]): ReturnType<typeof import('./commands/device-types/save.js').default>
		'setup-pair'(...args: [Argument0<typeof import('./commands/setup-pair.js').default>, Argument2<typeof import('./commands/setup-pair.js').default>]): ReturnType<typeof import('./commands/setup-pair.js').default>
		'verify-pair'(...args: [Argument0<typeof import('./commands/verify-pair.js').default>]): ReturnType<typeof import('./commands/verify-pair.js').default>
	}
}

export { commands as default };
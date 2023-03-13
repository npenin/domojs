/* eslint-disable @typescript-eslint/no-unused-vars */
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/$init').default>]): ReturnType<typeof import('./commands/$init').default>
		dispatch (cmd:'device-discovered', ...args: []): ReturnType<typeof import('./commands/device-discovered').default>
		dispatch (cmd:'exec', ...args: [Argument0<typeof import('./commands/device-types/exec').default>, Argument1<typeof import('./commands/device-types/exec').default>, Argument2<typeof import('./commands/device-types/exec').default>]): ReturnType<typeof import('./commands/device-types/exec').default>
		dispatch (cmd:'save', ...args: [Argument0<typeof import('./commands/device-types/save').default>, Argument1<typeof import('./commands/device-types/save').default>]): ReturnType<typeof import('./commands/device-types/save').default>
		dispatch (cmd:'setup-pair', ...args: [Argument0<typeof import('./commands/setup-pair').default>, Argument2<typeof import('./commands/setup-pair').default>]): ReturnType<typeof import('./commands/setup-pair').default>
		dispatch (cmd:'verify-pair', ...args: [Argument0<typeof import('./commands/verify-pair').default>]): ReturnType<typeof import('./commands/verify-pair').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/$init').default>]): ReturnType<typeof import('./commands/$init').default>
		'device-discovered'(...args: []): ReturnType<typeof import('./commands/device-discovered').default>
		'exec'(...args: [Argument0<typeof import('./commands/device-types/exec').default>, Argument1<typeof import('./commands/device-types/exec').default>, Argument2<typeof import('./commands/device-types/exec').default>]): ReturnType<typeof import('./commands/device-types/exec').default>
		'save'(...args: [Argument0<typeof import('./commands/device-types/save').default>, Argument1<typeof import('./commands/device-types/save').default>]): ReturnType<typeof import('./commands/device-types/save').default>
		'setup-pair'(...args: [Argument0<typeof import('./commands/setup-pair').default>, Argument2<typeof import('./commands/setup-pair').default>]): ReturnType<typeof import('./commands/setup-pair').default>
		'verify-pair'(...args: [Argument0<typeof import('./commands/verify-pair').default>]): ReturnType<typeof import('./commands/verify-pair').default>
	}
}

export { commands as default };
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace scrapper
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: []): ReturnType<typeof import('./server/commands/scrapper/$init').default>
		dispatch (cmd:'cleanFileName', ...args: [Argument0<typeof import('./server/commands/scrapper/cleanFileName').default>]): ReturnType<typeof import('./server/commands/scrapper/cleanFileName').default>
		dispatch (cmd:'scrapTVShowFileName', ...args: [Argument0<typeof import('./server/commands/scrapper/scrapTVShowFileName').default>]): ReturnType<typeof import('./server/commands/scrapper/scrapTVShowFileName').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./server/commands/scrapper/$init').default>
		'cleanFileName'(...args: [Argument0<typeof import('./server/commands/scrapper/cleanFileName').default>]): ReturnType<typeof import('./server/commands/scrapper/cleanFileName').default>
		'scrapTVShowFileName'(...args: [Argument0<typeof import('./server/commands/scrapper/scrapTVShowFileName').default>]): ReturnType<typeof import('./server/commands/scrapper/scrapTVShowFileName').default>
	}
}

export { scrapper as default };
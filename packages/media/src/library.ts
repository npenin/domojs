/* eslint-disable @typescript-eslint/no-unused-vars */
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace library
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./server/commands/library/$init').default>, Argument1<typeof import('./server/commands/library/$init').default>]): ReturnType<typeof import('./server/commands/library/$init').default>
		dispatch (cmd:'add-folder', ...args: [Argument0<typeof import('./server/commands/library/add-folder').default>, Argument1<typeof import('./server/commands/library/add-folder').default>]): ReturnType<typeof import('./server/commands/library/add-folder').default>
		dispatch (cmd:'add-library', ...args: [Argument0<typeof import('./server/commands/library/add-library').default>]): ReturnType<typeof import('./server/commands/library/add-library').default>
		dispatch (cmd:'add-scrapper', ...args: [Argument0<typeof import('./server/commands/library/add-scrapper').default>]): ReturnType<typeof import('./server/commands/library/add-scrapper').default>
		dispatch (cmd:'browse', ...args: [Argument1<typeof import('./server/commands/library/browse').default>, Argument2<typeof import('./server/commands/library/browse').default>]): ReturnType<typeof import('./server/commands/library/browse').default>
		dispatch (cmd:'dropbox', ...args: [Argument0<typeof import('./server/commands/library/dropbox').default>, Argument1<typeof import('./server/commands/library/dropbox').default>, Argument2<typeof import('./server/commands/library/dropbox').default>, Argument3<typeof import('./server/commands/library/dropbox').default>, Argument4<typeof import('./server/commands/library/dropbox').default>, Argument5<typeof import('./server/commands/library/dropbox').default>, Argument6<typeof import('./server/commands/library/dropbox').default>, Argument7<typeof import('./server/commands/library/dropbox').default>]): ReturnType<typeof import('./server/commands/library/dropbox').default>
		dispatch (cmd:'register-scrapper', ...args: [Argument2<typeof import('./server/commands/library/register-scrapper').default>, Argument3<typeof import('./server/commands/library/register-scrapper').default>]): ReturnType<typeof import('./server/commands/library/register-scrapper').default>
		dispatch (cmd:'rm-folder', ...args: [Argument0<typeof import('./server/commands/library/rm-folder').default>, Argument1<typeof import('./server/commands/library/rm-folder').default>]): ReturnType<typeof import('./server/commands/library/rm-folder').default>
		dispatch (cmd:'rm-library', ...args: [Argument0<typeof import('./server/commands/library/rm-library').default>]): ReturnType<typeof import('./server/commands/library/rm-library').default>
		dispatch (cmd:'rm-scrapper', ...args: [Argument0<typeof import('./server/commands/library/rm-scrapper').default>, Argument1<typeof import('./server/commands/library/rm-scrapper').default>]): ReturnType<typeof import('./server/commands/library/rm-scrapper').default>
		dispatch (cmd:'scrap', ...args: [Argument1<typeof import('./server/commands/library/scrap').default>, Argument2<typeof import('./server/commands/library/scrap').default>]): ReturnType<typeof import('./server/commands/library/scrap').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./server/commands/library/$init').default>, Argument1<typeof import('./server/commands/library/$init').default>]): ReturnType<typeof import('./server/commands/library/$init').default>
		'add-folder'(...args: [Argument0<typeof import('./server/commands/library/add-folder').default>, Argument1<typeof import('./server/commands/library/add-folder').default>]): ReturnType<typeof import('./server/commands/library/add-folder').default>
		'add-library'(...args: [Argument0<typeof import('./server/commands/library/add-library').default>]): ReturnType<typeof import('./server/commands/library/add-library').default>
		'add-scrapper'(...args: [Argument0<typeof import('./server/commands/library/add-scrapper').default>]): ReturnType<typeof import('./server/commands/library/add-scrapper').default>
		'browse'(...args: [Argument1<typeof import('./server/commands/library/browse').default>, Argument2<typeof import('./server/commands/library/browse').default>]): ReturnType<typeof import('./server/commands/library/browse').default>
		'dropbox'(...args: [Argument0<typeof import('./server/commands/library/dropbox').default>, Argument1<typeof import('./server/commands/library/dropbox').default>, Argument2<typeof import('./server/commands/library/dropbox').default>, Argument3<typeof import('./server/commands/library/dropbox').default>, Argument4<typeof import('./server/commands/library/dropbox').default>, Argument5<typeof import('./server/commands/library/dropbox').default>, Argument6<typeof import('./server/commands/library/dropbox').default>, Argument7<typeof import('./server/commands/library/dropbox').default>]): ReturnType<typeof import('./server/commands/library/dropbox').default>
		'register-scrapper'(...args: [Argument2<typeof import('./server/commands/library/register-scrapper').default>, Argument3<typeof import('./server/commands/library/register-scrapper').default>]): ReturnType<typeof import('./server/commands/library/register-scrapper').default>
		'rm-folder'(...args: [Argument0<typeof import('./server/commands/library/rm-folder').default>, Argument1<typeof import('./server/commands/library/rm-folder').default>]): ReturnType<typeof import('./server/commands/library/rm-folder').default>
		'rm-library'(...args: [Argument0<typeof import('./server/commands/library/rm-library').default>]): ReturnType<typeof import('./server/commands/library/rm-library').default>
		'rm-scrapper'(...args: [Argument0<typeof import('./server/commands/library/rm-scrapper').default>, Argument1<typeof import('./server/commands/library/rm-scrapper').default>]): ReturnType<typeof import('./server/commands/library/rm-scrapper').default>
		'scrap'(...args: [Argument1<typeof import('./server/commands/library/scrap').default>, Argument2<typeof import('./server/commands/library/scrap').default>]): ReturnType<typeof import('./server/commands/library/scrap').default>
	}
}

export { library as default };
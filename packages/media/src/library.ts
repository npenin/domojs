/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace library
{
	export interface container 
	{
		dispatch(cmd: '$init', ...args: [Argument0<typeof import('./server/commands/library/$init.js').default>, Argument1<typeof import('./server/commands/library/$init.js').default>]): ReturnType<typeof import('./server/commands/library/$init.js').default>
		dispatch(cmd: 'add-folder', ...args: [Argument0<typeof import('./server/commands/library/add-folder.js').default>, Argument1<typeof import('./server/commands/library/add-folder.js').default>]): ReturnType<typeof import('./server/commands/library/add-folder.js').default>
		dispatch(cmd: 'add-library', ...args: [Argument0<typeof import('./server/commands/library/add-library.js').default>]): ReturnType<typeof import('./server/commands/library/add-library.js').default>
		dispatch(cmd: 'add-scrapper', ...args: [Argument0<typeof import('./server/commands/library/add-scrapper.js').default>, Argument1<typeof import('./server/commands/library/add-scrapper.js').default>]): ReturnType<typeof import('./server/commands/library/add-scrapper.js').default>
		dispatch(cmd: 'browse', ...args: [Argument1<typeof import('./server/commands/library/browse.js').default>, Argument2<typeof import('./server/commands/library/browse.js').default>]): ReturnType<typeof import('./server/commands/library/browse.js').default>
		dispatch(cmd: 'dropbox', ...args: [Argument0<typeof import('./server/commands/library/update-index.js').default>, Argument1<typeof import('./server/commands/library/update-index.js').default>, Argument2<typeof import('./server/commands/library/update-index.js').default>, Argument3<typeof import('./server/commands/library/update-index.js').default>, Argument4<typeof import('./server/commands/library/update-index.js').default>, Argument5<typeof import('./server/commands/library/update-index.js').default>, Argument6<typeof import('./server/commands/library/update-index.js').default>, Argument7<typeof import('./server/commands/library/update-index.js').default>]): ReturnType<typeof import('./server/commands/library/update-index.js').default>
		dispatch(cmd: 'list-folders', ...args: [Argument0<typeof import('./server/commands/library/list-folders.js').default>]): ReturnType<typeof import('./server/commands/library/list-folders.js').default>
		dispatch(cmd: 'list-libraries', ...args: []): ReturnType<typeof import('./server/commands/library/list-libraries.js').default>
		dispatch(cmd: 'list-scrappers', ...args: []): ReturnType<typeof import('./server/commands/library/list-scrappers.js').default>
		dispatch(cmd: 'register-scrapper', ...args: [Argument2<typeof import('./server/commands/library/register-scrapper.js').default>, Argument3<typeof import('./server/commands/library/register-scrapper.js').default>]): ReturnType<typeof import('./server/commands/library/register-scrapper.js').default>
		dispatch(cmd: 'rm-folder', ...args: [Argument0<typeof import('./server/commands/library/rm-folder.js').default>, Argument1<typeof import('./server/commands/library/rm-folder.js').default>]): ReturnType<typeof import('./server/commands/library/rm-folder.js').default>
		dispatch(cmd: 'rm-library', ...args: [Argument0<typeof import('./server/commands/library/rm-library.js').default>]): ReturnType<typeof import('./server/commands/library/rm-library.js').default>
		dispatch(cmd: 'rm-scrapper', ...args: [Argument0<typeof import('./server/commands/library/rm-scrapper.js').default>, Argument1<typeof import('./server/commands/library/rm-scrapper.js').default>]): ReturnType<typeof import('./server/commands/library/rm-scrapper.js').default>
		dispatch(cmd: 'scrap', ...args: [Argument1<typeof import('./server/commands/library/scrap.js').default>, Argument2<typeof import('./server/commands/library/scrap.js').default>]): ReturnType<typeof import('./server/commands/library/scrap.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./server/commands/library/$init.js').default>, Argument1<typeof import('./server/commands/library/$init.js').default>]): ReturnType<typeof import('./server/commands/library/$init.js').default>
		'add-folder'(...args: [Argument0<typeof import('./server/commands/library/add-folder.js').default>, Argument1<typeof import('./server/commands/library/add-folder.js').default>]): ReturnType<typeof import('./server/commands/library/add-folder.js').default>
		'add-library'(...args: [Argument0<typeof import('./server/commands/library/add-library.js').default>]): ReturnType<typeof import('./server/commands/library/add-library.js').default>
		'add-scrapper'(...args: [Argument0<typeof import('./server/commands/library/add-scrapper.js').default>, Argument1<typeof import('./server/commands/library/add-scrapper.js').default>]): ReturnType<typeof import('./server/commands/library/add-scrapper.js').default>
		'browse'(...args: [Argument1<typeof import('./server/commands/library/browse.js').default>, Argument2<typeof import('./server/commands/library/browse.js').default>]): ReturnType<typeof import('./server/commands/library/browse.js').default>
		'dropbox'(...args: [Argument0<typeof import('./server/commands/library/update-index.js').default>, Argument1<typeof import('./server/commands/library/update-index.js').default>, Argument2<typeof import('./server/commands/library/update-index.js').default>, Argument3<typeof import('./server/commands/library/update-index.js').default>, Argument4<typeof import('./server/commands/library/update-index.js').default>, Argument5<typeof import('./server/commands/library/update-index.js').default>, Argument6<typeof import('./server/commands/library/update-index.js').default>, Argument7<typeof import('./server/commands/library/update-index.js').default>]): ReturnType<typeof import('./server/commands/library/update-index.js').default>
		'list-folders'(...args: [Argument0<typeof import('./server/commands/library/list-folders.js').default>]): ReturnType<typeof import('./server/commands/library/list-folders.js').default>
		'list-libraries'(...args: []): ReturnType<typeof import('./server/commands/library/list-libraries.js').default>
		'list-scrappers'(...args: []): ReturnType<typeof import('./server/commands/library/list-scrappers.js').default>
		'register-scrapper'(...args: [Argument2<typeof import('./server/commands/library/register-scrapper.js').default>, Argument3<typeof import('./server/commands/library/register-scrapper.js').default>]): ReturnType<typeof import('./server/commands/library/register-scrapper.js').default>
		'rm-folder'(...args: [Argument0<typeof import('./server/commands/library/rm-folder.js').default>, Argument1<typeof import('./server/commands/library/rm-folder.js').default>]): ReturnType<typeof import('./server/commands/library/rm-folder.js').default>
		'rm-library'(...args: [Argument0<typeof import('./server/commands/library/rm-library.js').default>]): ReturnType<typeof import('./server/commands/library/rm-library.js').default>
		'rm-scrapper'(...args: [Argument0<typeof import('./server/commands/library/rm-scrapper.js').default>, Argument1<typeof import('./server/commands/library/rm-scrapper.js').default>]): ReturnType<typeof import('./server/commands/library/rm-scrapper.js').default>
		'scrap'(...args: [Argument1<typeof import('./server/commands/library/scrap.js').default>, Argument2<typeof import('./server/commands/library/scrap.js').default>]): ReturnType<typeof import('./server/commands/library/scrap.js').default>
	}
}

export { library as default };
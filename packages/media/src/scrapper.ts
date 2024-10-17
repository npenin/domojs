//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace scrapper
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: []): ReturnType<typeof import('./server/commands/scrapper/$init.js').default>
		dispatch (cmd:'cleanFileName', ...args: [Argument0<typeof import('./server/commands/scrapper/cleanFileName.js').default>]): ReturnType<typeof import('./server/commands/scrapper/cleanFileName.js').default>
		dispatch (cmd:'iTunes-like', ...args: [Argument0<typeof import('./server/commands/scrapper/iTunes-like.js').default>]): ReturnType<typeof import('./server/commands/scrapper/iTunes-like.js').default>
		dispatch (cmd:'mpeg-tag', ...args: [Argument0<typeof import('./server/commands/scrapper/mpeg-tag.js').default>]): ReturnType<typeof import('./server/commands/scrapper/mpeg-tag.js').default>
		dispatch (cmd:'musicbrainz', ...args: [Argument0<typeof import('./server/commands/scrapper/musicbrainz.js').default>]): ReturnType<typeof import('./server/commands/scrapper/musicbrainz.js').default>
		dispatch (cmd:'scrapTVShowFileName', ...args: [Argument0<typeof import('./server/commands/scrapper/scrapTVShowFileName.js').default>]): ReturnType<typeof import('./server/commands/scrapper/scrapTVShowFileName.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: []): ReturnType<typeof import('./server/commands/scrapper/$init.js').default>
		'cleanFileName'(...args: [Argument0<typeof import('./server/commands/scrapper/cleanFileName.js').default>]): ReturnType<typeof import('./server/commands/scrapper/cleanFileName.js').default>
		'iTunes-like'(...args: [Argument0<typeof import('./server/commands/scrapper/iTunes-like.js').default>]): ReturnType<typeof import('./server/commands/scrapper/iTunes-like.js').default>
		'mpeg-tag'(...args: [Argument0<typeof import('./server/commands/scrapper/mpeg-tag.js').default>]): ReturnType<typeof import('./server/commands/scrapper/mpeg-tag.js').default>
		'musicbrainz'(...args: [Argument0<typeof import('./server/commands/scrapper/musicbrainz.js').default>]): ReturnType<typeof import('./server/commands/scrapper/musicbrainz.js').default>
		'scrapTVShowFileName'(...args: [Argument0<typeof import('./server/commands/scrapper/scrapTVShowFileName.js').default>]): ReturnType<typeof import('./server/commands/scrapper/scrapTVShowFileName.js').default>
	}
   export const meta={"name":"scrapper","commands":[{"name":"$init","config":{"fs":{"inject":["pm","$container"],"path":"dist/server/commands/scrapper/$init.js","source":"src/server/commands/scrapper/$init.ts"},"":{"inject":["pm","$container"]}}},{"name":"cleanFileName","config":{"fs":{"inject":["param.0"],"path":"dist/server/commands/scrapper/cleanFileName.js","source":"src/server/commands/scrapper/cleanFileName.ts"},"":{"inject":["param.0"]}}},{"name":"iTunes-like","config":{"fs":{"path":"dist/server/commands/scrapper/iTunes-like.js","source":"src/server/commands/scrapper/iTunes-like.ts","inject":["param.0"]},"":{"inject":["param.0"]}}},{"name":"mpeg-tag","config":{"fs":{"path":"dist/server/commands/scrapper/mpeg-tag.js","source":"src/server/commands/scrapper/mpeg-tag.ts","inject":["param.0"]},"":{"inject":["param.0"]}}},{"name":"musicbrainz","config":{"fs":{"path":"dist/server/commands/scrapper/musicbrainz.js","source":"src/server/commands/scrapper/musicbrainz.ts","inject":["param.0"]},"":{"inject":["param.0"]}}},{"name":"scrapTVShowFileName","config":{"fs":{"inject":["param.0"],"path":"dist/server/commands/scrapper/scrapTVShowFileName.js","source":"src/server/commands/scrapper/scrapTVShowFileName.ts"},"":{"inject":["param.0"]}}}]} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("scrapper", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { scrapper as default };
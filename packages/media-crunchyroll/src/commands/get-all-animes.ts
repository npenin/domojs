import type { Media } from "@domojs/media";
import State from "../state.js";
import cr from 'crunchyroll.js'
import fsHandler, { FileSystemProvider } from '@akala/fs'
// import { writeFile, stat } from 'fs/promises'
import { eachAsync, HttpStatusCode } from '@akala/core'
import { pathToFileURL } from 'node:url'

export default async function getAllAnimes(this: State): Promise<Media[]>
export default async function getAllAnimes(this: State, outFile: string): Promise<undefined>
export default async function getAllAnimes(this: State, outFile?: string): Promise<Media[] | undefined>
{
    debugger;
    await cr.login(this.userName, await this.getSecret('password'), this.locale);
    let start = 0;
    let result: Media[] = [];
    const localesFilter = this.locales.extract();
    let stopAt: Date | undefined;
    let fs: FileSystemProvider;
    if (outFile)
    {
        fs = await fsHandler.process(new URL(pathToFileURL(outFile).toString()));
        try
        {
            stopAt = (await fs.stat(outFile)).mtime;
        }
        catch (e)
        {
            if (e.code !== 'ENOENT' && e.statusCode !== HttpStatusCode.NotFound)
                throw e;
        }
    }
    const stop = new Error('already processed');

    do
    {
        console.log(start);
        const res = (await cr.getAllAnimes(start, 50, 'newly_added'));
        start += res.items.length;
        try
        {
            await eachAsync(res.items, async anime =>
            {
                if (stopAt && anime.last_public && new Date(anime.last_public) < stopAt)
                    throw stop;

                if (anime.type == 'movie_listing')
                {
                    result.push({
                        id: anime.channel_id + ':' + anime.id,
                        path: anime.id,
                        type: 'video',
                        name: anime.title,
                        displayName: anime.title,
                        overview: anime.description,
                        subType: 'movie',
                    })
                    return;
                }

                try
                {

                    let seasons = (await cr.getSeasons(anime.id)).items;
                    seasons = seasons.filter(s => s.audio_locales.find(l => l in localesFilter));
                    if (!seasons.length)
                        return;
                    await eachAsync(seasons, async season =>
                    {
                        try
                        {
                            await eachAsync((await cr.getEpisodes(season.id)).items, async episode =>
                            {
                                if (episode.audio_locale in localesFilter && (!localesFilter[episode.audio_locale].length || localesFilter[episode.audio_locale].find(x => episode.subtitle_locales.indexOf(x) > -1)))
                                    result.push({
                                        id: anime.channel_id + ':' + episode.id,
                                        path: "crunchyroll://episode?id=" + episode.id,
                                        type: 'video',
                                        name: anime.title,
                                        displayName: episode.title,
                                        episode: episode.episode_number,
                                        season: season.season_number,
                                        overview: episode.description,
                                        cover: episode.images?.thumbnail?.reduce((previous, current) => previous && previous.width > current.width ? previous : current, undefined as cr.Picture | undefined)?.source,
                                        subType: 'tvshow',
                                    })
                                else
                                    console.log(episode)
                            })
                        }
                        catch (e)
                        {
                            console.error(season);
                            throw e;
                        }

                    })
                }
                catch (e)
                {
                    console.error(anime);
                    throw e;
                }

            })
            if (res.total < start)
                break;
        }
        catch (e)
        {
            if (e === stop)
                break;
            else
                throw e;
        }
    }
    while (true);

    if (outFile)
        await fs.writeFile(outFile, JSON.stringify(result, null, 4))
    else
        return result;
}
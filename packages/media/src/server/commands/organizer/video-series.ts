import { Media, Music, TVShow, Video } from "../../index.js";
import path from 'path'

export default function (media: Video[]): (Video & { newPath?: string })[]
{
    return media.map(m =>
    {
        if (m.subType !== 'tvshow')
            return m;
        return { ...m, newPath: `/${m.name}/${m.displayName}${path.extname(m.path)}` }
    })
}
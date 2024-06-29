import { Media, Music, TVShow, Video } from "../../index.js";
import path from 'path'

export default function (media: Video[]): (Video & { newRelativePath?: string[] })[]
{
    return media.map(m =>
    {
        if (m.subType !== 'movie')
            return m;
        return { ...m, newRelativePath: [`/${m.displayName}${path.extname(m.path.toString())}`] }
    })
}
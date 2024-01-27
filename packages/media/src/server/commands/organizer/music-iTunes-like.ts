import { Media, Music } from "../../index.js";
import path from 'path'

export default function (media: Music[]): (Music & { newPath: string })[]
{
    if (media.reduce((previous, current, i) => previous && (i == 0 || media[i - 1].artist == current.artist), true))
        return media.map(m => ({ ...m, newPath: `/${m.artist}/${m.album}/${m.trackNo && m.trackNo + ' ' || ''}/${m.name}${path.extname(m.path)}` }))
    else
        return media.map(m => ({ ...m, newPath: `/Compilations/${m.album}/${m.trackNo && m.trackNo + ' ' || ''}/${m.name}${path.extname(m.path)}` }))
}
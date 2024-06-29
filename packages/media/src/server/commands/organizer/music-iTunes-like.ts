import { Music } from "../../index.js";
import path from 'path'

export default function organize(album: Music[]): (Music & { newRelativePath?: string[] })[]
{
    const artists: Record<string, Music[]> = album.reduce((group, media) =>
    {
        if (!group[media.artist])
            group[media.artist] = [];

        group[media.artist].push(media)
        return group;
    }, {});
    const artistsSongs = Object.values(artists).sort((a, b) => b.length - a.length);
    if (artistsSongs.length == 1 && !artistsSongs[0][0].artist)
        return album;

    if (artistsSongs.filter(m => m.length > 10).length > 1)
    {
        //same album name but different artists
        return artistsSongs.flatMap(mm => organize(mm));
    }

    if (artistsSongs.length == 1 || artistsSongs[0].length > 3 && artistsSongs.every((v, i) => i == 0 && v[0].artist || v.length < 3 || i > 0 && v[0].artist === undefined))
        return album.map(m => ({ ...m, newRelativePath: [m.relativePath[0], artistsSongs[0][0].artist, m.album, `${m.trackNo && ((m.discNo && m.discNo + '-' || '') + m.trackNo.toString().padStart(2, '0') + ' ') || ''}${m.name}${path.extname(m.path.toString())}`] }))
    else
        return album.map(m => ({ ...m, newRelativePath: [m.relativePath[0], 'Compilations', m.album, `${m.trackNo && ((m.discNo && m.discNo + '-' || '') + m.trackNo.toString().padStart(2, '0') + ' ') || ''}${m.name}${path.extname(m.path.toString())}`] }))

}
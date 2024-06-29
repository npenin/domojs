import { Media } from "../../index.js";
import path from 'path'


export default function (media: Media)
{
    if (media.type !== 'music')
        return media;

    if (media.album || media.artist || media.artists || media.trackNo)
        return media;

    let mediaPath = media.relativePath || (media.path instanceof URL ? media.path.pathname.split('/') : media.path.split('/'));
    const name = mediaPath[mediaPath.length - 1];
    const r = /^(?:(?:(?<discNo>\d+)-)?(?<trackNo>\d+) )?(?<name>.+)+\.[a-z0-9]+$/i.exec(name);
    if (!r)
        return media;

    media.name = r.groups.name;
    if (media.name.startsWith('-'))
        media.name = media.name.substring(1).trimStart();
    if (r.groups.discNo)
        media.discNo = Number(r.groups.discNo);
    if (r.groups.trackNo)
        media.trackNo = Number(r.groups.trackNo);
    if (mediaPath.length > 2)
        media.album = decodeURIComponent(mediaPath[mediaPath.length - 2]);
    // if (media.album == 'Unknown Album')
    //     media.album = undefined;
    // else
    if (media.album?.endsWith(']'))
    {
        const r = / *\[(?:CD|Disc)\ *(\d+)\]$/.exec(media.album);
        if (r)
        {
            media.discNo = Number(r[1]);
            media.album = media.album.substring(0, r.index);
        }
    }
    if (mediaPath.length > 3)
        media.artist = decodeURIComponent(mediaPath[mediaPath.length - 3]);
    if (media.artist == 'Compilations' || media.artist == 'Various Artists' || media.artist == 'Unknown Artist' || media.artist == 'Artiste inconnu')
        media.artist = undefined;
    if (media.album == 'Compilations' || media.album == 'Unknown Album' || media.album == 'Album Inconnu')
        media.album = undefined;
    if (!media.artist)
    {
        const s = media.name.split('-');
        if (s.length == 2)
        {
            media.artist = s[0].trimEnd();
            media.name = s[1].trimStart();
        }
    }
    if (media.artist)
    {
        const s = media.artist.split('_ • _')
        if (s.length > 1)
        {
            media.artist = s[0];
            if (!/^[\d,\.]+ [Mk]/.test(s[1]))
                media.album = s[1];;
            if (s.length > 2 && /^\d{4}[\s ]*$/.test(s[2]))
                media.year = Number(s[2]);
        }
    }
    return media;

}
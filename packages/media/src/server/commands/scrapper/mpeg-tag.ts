import { Media } from "../../index.js";
import path from 'path'


export default function (media: Media)
{
    if (media.type !== 'music')
        return media;

    debugger;
    if (media.album || media.artist || media.artists || media.trackNo)
        return media;

    let mediaPath = media.path;
    const name = path.basename(mediaPath);
    const r = /^(?:(?:(?<discNo>\d+)-)?(?<trackNo>\d+) )?(?<name>.+)+\.[a-z0-9]+$/i.exec(name);
    if (!r)
        return media;

    media.name = decodeURIComponent(r.groups.name);
    if (r.groups.discNo)
        media.discNo = Number(r.groups.discNo);
    if (r.groups.trackNo)
        media.trackNo = Number(r.groups.trackNo);
    mediaPath = path.dirname(mediaPath);
    media.album = decodeURIComponent(path.basename(mediaPath));
    mediaPath = path.dirname(mediaPath);
    media.artist = decodeURIComponent(path.basename(mediaPath));
    if (media.artist == 'Compilations')
        media.artist = undefined;

    return media;

}
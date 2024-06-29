import { ErrorWithStatus } from "@akala/core";
import { Media } from "../../index.js";

type MbMedia = Media & { mb?: MBRecording | (MBRecording[]) }

function delay(delay: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
}

function throttle<T>(delayRate: number, threshold: number) {
    const open = new Array<Promise<void>>(threshold);
    let rr = -1;
    console.time('throttle');
    return function (handler: () => Promise<T>): Promise<T> {
        rr = (rr + 1) % threshold;
        if (!open[rr]) {
            const result = handler();
            open[rr] = result.then(() => delay(delayRate))
            return result;
        }
        else {
            const result = open[rr].then(() => handler())
            open[rr] = result.then(() => delay(delayRate))
            return result;
        }

    }
}

interface MBResponse {
    created: string,
    count: number,
    offset: number,
    recordings: MBRecording[]
}

interface MBRecording {
    id: string,
    score: number,
    title: string,
    length: number,
    video: null | boolean,
    'artist-credit':
    {
        name: string,
        artist: {
            id: string,
            name: string,
            'sort-name': string,
            disambiguation: string
        }
    }[],
    'first-release-date': string,
    releases:
    {
        id: string,
        'status-id': string,
        count: number,
        title: string,
        status: string,
        'artist-credit': {
            name: string,
            artist: {
                id: string,
                name: string,
                'sort-name': string,
                disambiguation: string
            }
        }[],
        'release-group': {
            id: string,
            'type-id': string,
            'primary-type-id': string,
            title: string,
            'primary-type': string,
            'secondary-types': [
                "Compilation"
            ],
            'secondary-type-ids': string[]
        },
        date: string,
        country: string,
        'release-events':
        {
            date: string,
            area: {
                id: string,
                name: string,
                'sort-name': string,
                'iso-3166-1-codes': string[]
            }
        }[],
        'track-count': number,
        media:
        {
            position: number,
            format: string,
            track:
            {
                id: string,
                number: string,
                title: string,
                length: number
            }[],
            'track-count': number,
            'track-offset': number
        }[]
    }[],
    tags?: { name: string, count: number }[]
    isrcs?: string[]
}

const doc = {
    "alias": "(part of) any alias attached to the recording (diacritics are ignored)",
    "arid": "the MBID of any of the recording artists",
    "artist": "(part of) the combined credited artist name for the recording, including join phrases (e.g. \"Artist X feat.\")",
    "artistname": "(part of) the name of any of the recording artists",
    "comment": "(part of) the recording's disambiguation comment",
    "country": "the 2-letter code (ISO 3166-1 alpha-2) for the country any release of this recording was released in",
    "creditname": "(part of) the credited name of any of the recording artists on this particular recording",
    "date": "the release date of any release including this recording (e.g. \"1980-01-22\")",
    "dur": "the recording duration in milliseconds",
    "firstreleasedate": "the release date of the earliest release including this recording (e.g. \"1980-01-22\")",
    "format": "the format of any medium including this recording (insensitive to case, spaces, and separators)",
    "isrc": "any ISRC associated to the recording",
    "number": "the free-text number of the track on any medium including this recording (e.g. \"A4\")",
    "position": "the position inside its release of any medium including this recording (starts at 1)",
    "primarytype": "the primary type of any release group including this recording",
    "qdur": "the recording duration, quantized (duration in milliseconds / 2000)",
    "recording": "(part of) the recording's name, or the name of a track connected to this recording (diacritics are ignored)",
    "recordingaccent": "(part of) the recordings's name, or the name of a track connected to this recording (with the specified diacritics)",
    "reid": "the MBID of any release including this recording",
    "release": "(part of) the name of any release including this recording",
    "rgid": "the MBID of any release group including this recording",
    "rid": "the recording's MBID",
    "secondarytype": "any of the secondary types of any release group including this recording",
    "status": "the status of any release including this recording",
    "tag": "(part of) a tag attached to the recording",
    "tid": "the MBID of a track connected to this recording",
    "tnum": "the position of the track on any medium including this recording (starts at 1, pre-gaps at 0)",
    "tracks": "the number of tracks on any medium including this recording",
    "tracksrelease": "the number of tracks on any release (as a whole) including this recording",
    "type": "legacy release group type field that predates the ability to set multiple types (see calculation code)",
    "video": "a boolean flag (true/false) indicating whether or not the recording is a video recording",
}

function upToFirstSpecialCharacter(value: number): number
function upToFirstSpecialCharacter(value: string): string
function upToFirstSpecialCharacter(value: string | number): string | number {
    if (typeof value !== 'string')
        return value;
    for (let i = 0; i < value.length; i++) {
        switch (value[i]) {
            case '+':
            case '-':
            case '&&':
            case '||':
            case '!':
            case '(':
            case ')':
            case '{':
            case '}':
            case '[':
            case ']':
            case '^':
            case '"':
            case '~':
            case '*':
            case '?':
            case ':':
            case '\\':
            case '/':
                return value.substring(0, i);
        }
    }
    return value;
}

export default async function musicbrainz(this: { throttled: ReturnType<typeof throttle> }, media: MbMedia): Promise<MbMedia> {
    if (!this.throttled)
        this.throttled = throttle<any>(1000, 1);

    const throttled = this.throttled;

    function mb(query: Partial<Record<keyof typeof doc, string | number>>): Promise<MBResponse> {
        return throttled(async () => {
            const criteria = Object.entries(query).filter(e => e[1]);
            if (criteria.length == 0)
                return { count: 0, recordings: [] } as MBResponse;
            const url = 'http://musicbrainz.org/ws/2/recording/?fmt=json&query=' + criteria.map(e => e[0] + ':' + encodeURIComponent(JSON.stringify(e[1].toString().replace(/\+|-|&&|\|\||!|\(|\)|\{|\}|\[|\]|\^|"|~|\*|\?|:|\\|\//g, '\\$1')))).join('%20AND%20');
            console.timeLog('throttle', url);
            const res = await fetch(url, { headers: { 'User-Agent': 'domojs' } });
            if (res.status == 503)
                return await delay(60000).then(() => mb(query))
            if (!res.ok)
                throw new ErrorWithStatus(res.status, await res.text());
            return await res.json();
        }) as any
    }

    if (media.type !== 'music')
        return media;


    let recording: MBRecording;
    if (media.mb) {
        if (Array.isArray(media.mb))
            recording = media.mb.find(mb => mb.id == media.ids.musicbrainz)
        else
            recording = media.mb;
    }

    if (!recording) {
        let result = await mb({ recording: media.name, artist: media.artist, release: media.album, number: media.trackNo });

        if (result.count == 0) {
            result = await mb({ recording: media.name, release: media.album, number: media.trackNo });

            if (result.count == 0) {
                result = await mb({ release: upToFirstSpecialCharacter(media.album), number: media.trackNo, artist: media.artist });

                if (result.count > 1) {
                    result.recordings = result.recordings.filter(r => upToFirstSpecialCharacter(media.name).trimEnd() == r.title && r.releases.find(r => r.title.startsWith(upToFirstSpecialCharacter(media.album)) && r.media && r.media[0]?.track && Number(r.media[0]?.track[0]?.number) == media.trackNo))
                    result.count = result.recordings.length;
                }

                if (result.count != 1 && !areSame(result.recordings)) {
                    result = await mb({ recording: trim(media.name, '0123456789 '), number: media.trackNo, release: media.album });

                    if (result.count != 1 && !areSame(result.recordings)) {
                        result = await mb({ number: media.trackNo, release: media.album });

                        if (result.count != 1 && !areSame(result.recordings))
                            return media;
                    }
                }
            }
        }

        if (result.count == 1)
            media.mb = result.recordings[0];
        else
            media.mb = result.recordings;
    }
    if (!Array.isArray(media.mb)) {
        recording = media.mb;
        if (recording && recording.releases.find(r => r.title == media.album && r['artist-credit'][0].name == media.artist))
            media.albumArtist = media.artist;
    } else {
        console.log(media.mb);
        recording = media.mb.find(r => r.releases?.find(r => r.title == media.album));
        if (!recording) {
            if (media.ids?.musicbrainz)
                recording = media.mb.find(mb => mb.id == media.ids.musicbrainz);
            else
                recording = media.mb[0];
        }
        if (recording.releases.find(r => r.title == media.album && r['artist-credit'][0].name == media.artist))
            media.albumArtist = media.artist;
    }
    if (recording) {
        media.mb = recording;
        media.name = recording.title;
        media.artist = recording['artist-credit'][0].name;
        if (!media.ids)
            media.ids = {};
        media.ids.musicbrainz = recording.id;
        if (!media.length)
            media.length = Math.floor(recording.length / 1000);
        if (recording['first-release-date'])
            media.year = Number(recording['first-release-date'].substring(0, 4));

        if (recording.tags)
            media.tokens = (media.tokens || []).concat(recording.tags?.map(t => t.name))

    }
    return media;
}

function trim(name: string, arg1: string): string {
    for (let i = name.length - 1; i >= 0; i--) {
        if (arg1.indexOf(name[i]) == -1) {
            if (i == name.length - 1)
                return name;
            return name.substring(0, i + 1);
        }
    }
    return '';
}
function areSame(recordings: MBRecording[]) {
    if (!recordings || !recordings.length)
        return false;
    if (recordings.length == 1)
        return true;
    if (recordings[0].isrcs)
        return recordings.every((r, i) => i == 0 || r.isrcs?.every(isrc => recordings[0].isrcs.indexOf(isrc) > -1));
    return recordings.every((r, i) => i == 0 || r.title == recordings[0].title);
}


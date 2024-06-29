import { Media } from "../../index.js";
import NodeID3 from 'node-id3'
import { LibraryState } from "../../state.js";
import { FsProvider } from "../processFolder.js";

export default async function (this: LibraryState, media: Media & { fs: FsProvider }): Promise<Media>
{
    if (media.type !== 'music')
        return media;

    if (media.album && (media.artist || media.artists) && media.trackNo && media.name)
        return media;


    if (!URL.canParse(media.path) && !media.fs)
        throw new Error('The media path has to be a URL');
    if (media.fs)
    {
        try
        {
            const tags = NodeID3.read(await media.fs.readFile(media.path))

            Object.entries(tags).forEach(t =>
            {
                switch (t[0] as keyof typeof tags)
                {
                    case "time":
                        media.length = t[1] || media.length;
                        break;
                    case "trackNumber":
                        if (t[1])
                        {
                            const tracks = t[1].split('/').map(x => Number(x));
                            if (!isNaN(tracks[0]))
                                media.trackNo = tracks[0];
                            if (tracks.length > 1 && !isNaN(tracks[1]))
                                media.totalTracks = tracks[1];
                        }
                        break;
                    case "partOfSet":
                        if (t[1])
                        {
                            const discs = t[1].split('/').map(x => Number(x));
                            if (!isNaN(discs[0]))
                                media.discNo = discs[0];
                            if (discs.length > 1 && !isNaN(discs[1]))
                                media.totalDiscs = discs[1];
                        }
                        break;
                    case "image":
                        switch (typeof t[1])
                        {
                            case "string":
                                media.cover = t[1];
                                break;
                            case "object":
                                media.cover = (t[1] as Exclude<typeof tags['image'], string>).imageBuffer.toString('base64url')
                        }
                        break;
                    case "bpm":
                    case "composer":
                    case "copyright":
                    case "encodingTime":
                    case "date":
                    case "playlistDelay":
                    case "originalReleaseTime":
                    case "recordingTime":
                    case "releaseTime":
                    case "taggingTime":
                    case "encodedBy":
                    case "textWriter":
                    case "fileType":
                    case "involvedPeopleList":
                    case "contentGroup":
                    case "subtitle":
                    case "initialKey":
                    case "language":
                    case "length":
                    case "musicianCreditsList":
                    case "mediaType":
                    case "mood":
                    case "originalTitle":
                    case "originalFilename":
                    case "originalTextwriter":
                    case "originalArtist":
                    case "originalYear":
                    case "fileOwner":
                    case "performerInfo":
                    case "conductor":
                    case "remixArtist":
                    case "producedNotice":
                    case "publisher":
                    case "recordingDates":
                    case "internetRadioName":
                    case "internetRadioOwner":
                    case "albumSortOrder":
                    case "performerSortOrder":
                    case "titleSortOrder":
                    case "size":
                    case "ISRC":
                    case "encodingTechnology":
                    case "setSubtitle":
                    case "comment":
                    case "unsynchronisedLyrics":
                    case "synchronisedLyrics":
                    case "userDefinedText":
                    case "popularimeter":
                    case "private":
                    case "uniqueFileIdentifier":
                    case "chapter":
                    case "tableOfContents":
                    case "commercialUrl":
                    case "copyrightUrl":
                    case "fileUrl":
                    case "artistUrl":
                    case "audioSourceUrl":
                    case "radioStationUrl":
                    case "paymentUrl":
                    case "publisherUrl":
                    case "userDefinedUrl":
                    case "eventTimingCodes":
                    case "commercialFrame":

                    case "album":
                    case "artist":
                    case "genre":
                    case "year":
                    case "title":
                        media[t[0]] = t[1] || media[t[0]];
                        break;
                }
            })

            return media;
        }
        catch (e)
        {
            console.error(media.path);
            console.trace(e);
            return media;
        }
    }
}
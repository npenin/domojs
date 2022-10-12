import { TVShow, Movie } from "../../index";
import { extensions } from "../processFolder";


const episodeNumber = /(?:\.E(?:p(?:isode)?)?|Part|Chapitre)\.?([0-9]+)(?:v\d)?/i;
const seasonNumber = /(?:\.S(?:aison)?)\.?([0-9]+)/i;
const name = /(([&,]|[A-Z!][A-Z!0-9]*|[A-Z!0-9]*[A-Z!'])+(\.|$))+/i;

export default function scrapTVShowFileName<T extends TVShow | Movie>(media: T): T
{
    var seasonMatch = seasonNumber.exec(media.name);
    var episodeMatch = episodeNumber.exec(media.name);
    var itemName = media.name.replace(extensions[media.type], '');
    if (!episodeMatch || !episodeMatch[1])
    {
        if (!seasonMatch)
        {
            episodeMatch = /([0-9]+)(?:x|\.)([0-9]+)/.exec(media.name);
            if (episodeMatch && episodeMatch[2])
            {
                seasonMatch = episodeMatch;
                episodeMatch = [false, episodeMatch[2]] as RegExpExecArray;
                episodeMatch.index = episodeMatch.index;
            }
        }
        if (!episodeMatch)
        {
            //console.log(media.name);
            episodeMatch = /(?:\.S(?:aison)?)\.?([0-9]+)\.?(?:E(?:p(?:isode)?)?|Part|Chapitre\.?)?([0-9]+)(?:v\d)?/i.exec(media.name);
            if (episodeMatch && episodeMatch[2])
            {
                seasonMatch = episodeMatch;
                episodeMatch = [false, episodeMatch[2]] as RegExpExecArray;
                episodeMatch.index = seasonMatch.index
            }
            else
                episodeMatch = /(?:[^0-9v]|^)([0-9]{1,3})(?=\W|$)/.exec(media.name);
            if (!episodeMatch)
                episodeMatch = /(?:[^0-9]|^)([0-9]{1,3})(?:[^0-9]|$)/.exec(media.name);
        }

    }
    else
    {
        if (seasonMatch && seasonMatch[0])
        {
            media.name = media.name.substring(0, seasonMatch.index) + media.name.substring(seasonMatch.index + seasonMatch[0].length);
            seasonMatch[0] = null;
            episodeMatch = /(?:[^0-9]|^)([0-9]{1,3})(?:v\d)?(?:[^0-9]|$)/.exec(media.name);
        }
    }

    if (episodeMatch && episodeMatch[0])
    {
        media.name = media.name.substring(0, episodeMatch.index) + media.name.substring(episodeMatch.index + episodeMatch[0].length);
    }
    if (seasonMatch && seasonMatch[0])
    {
        media.name = media.name.substring(0, seasonMatch.index) + media.name.substring(seasonMatch.index + seasonMatch[0].length);
    }
    var maxLength = Math.min(seasonMatch && seasonMatch.index || media.name.length, episodeMatch && episodeMatch.index || media.name.length);
    if (episodeMatch !== null && episodeMatch && episodeMatch[1])
        media.episode = Number(episodeMatch[1]);
    var itemNameMatch = name.exec(media.name);

    if (itemNameMatch)
    {
        if (itemNameMatch.index + itemNameMatch[0].length > maxLength)
            itemName = itemNameMatch[0].substr(0, maxLength);
        else
            itemName = itemNameMatch[0];
    }
    else
        itemName = media.name;
    media.name = itemName.replace(/prologue|oav|ova|Film|Movie/gi, '').replace(/\./g, ' ').replace(/ $/, '');
    media.displayName = media.name;

    media.id = 'media:video:' + media.name;
    if (seasonMatch)
    {
        media.subType = 'tvshow';
        if (media.subType == 'tvshow')
        {
            media.season = Number(seasonMatch[1]);
            media.displayName = media.displayName + ' - S' + media.season;
            media.id += ':' + media.season.toString().padStart(2, '0');
        }
    }
    if (episodeMatch)
    {
        media.displayName = media.displayName + ' - E' + media.episode;
        media.id += ':' + media.episode.toString().padStart(3, '0');
    }
    return media;
}
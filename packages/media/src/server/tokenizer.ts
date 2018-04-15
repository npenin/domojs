import * as akala from '@akala/server';
import { meta as scrapper } from './scrapper';
import * as path from 'path'

akala.worker.createClient('media').then((client) =>
{
    var s = scrapper.createClient(client)({
        scrap: function (media)
        {
            switch (media.type)
            {
                case 'video':
                    media.tokens = media.name.split(' ').concat(media.path.split(/[ \/]/g));
                    if (media.actors)
                        media.actors.forEach((actor) =>
                        {
                            media.tokens.push.call(media.tokens, actor.split(' '));
                        })
                    media.id = 'media:' + media.type + ':' + media.name;
                    if (media.episode)
                    {
                        media.collection = media.id;
                        media.id += ':' + media.episode;
                    }
                    break;
                case 'music':
                    media.tokens = media.name.split(' ').concat(media.path.split(/[ \/]/g));
                    if (media.artists)
                        media.artists.forEach((artist) =>
                        {
                            media.tokens = media.tokens.push.call(media.tokens, artist.split(' '));
                        });
                    media.id = 'media:' + media.type + ':' + media.artist + ':' + media.album + ':' + media.trackNo;
                    break;
            }
            return media;
        }
    }).$proxy();
    s.register({ type: 'video', priority: 0 });
    s.register({ type: 'music', priority: 0 });
});
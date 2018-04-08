import * as akala from '@akala/server';
import { meta as scrapper } from './scrapper';
import * as path from 'path'

akala.worker.createClient('media').then((client) =>
{
    var s = scrapper.createClient(client)({
        scrap: function (media)
        {
            media.tokens = media.name.split(' ').concat(media.path.split(/[ \/]/g));
            return media;
        }
    }).$proxy();
    s.register({ type: 'video', priority: 0 });
    s.register({ type: 'music', priority: 0 });
});
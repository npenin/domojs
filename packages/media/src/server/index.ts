import * as akala from '@akala/server';
import { EventEmitter } from 'events';
export { meta as scrapper } from './scrapper';
export * from '../../metadata';
import { AssetRegistration } from '@akala-modules/core'

akala.injectWithName(['$isModule', '$master', '$worker'], function (isModule: akala.worker.IsModule, master: akala.worker.MasterRegistration, worker: EventEmitter)
{
    if (isModule('@domojs/media'))
    {
        master(__filename, './master');
        worker.on('ready', function ()
        {
            require("./fileNameScrapper");
            require("./tokenizer");
        });


        akala.injectWithName([AssetRegistration.name], function (virtualasset: PromiseLike<AssetRegistration>)
        {
            virtualasset.then((va) =>
            {
                va.register('/js/tiles.js', require.resolve('../client/tile'));
                va.register('/js/routes.js', require.resolve('../client/routes'));
            });
            // virtualasset.then((va) => va.register('/js/device.js', path.resolve(__dirname, './device.js')));
        })();
    }
})();
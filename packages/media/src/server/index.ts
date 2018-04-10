import * as akala from '@akala/server';
import { EventEmitter } from 'events';
export { meta as scrapper } from './scrapper';
export * from '../../metadata';


akala.injectWithName(['$isModule', '$master', '$module'], function (isModule: akala.worker.IsModule, master: akala.worker.MasterRegistration, worker: EventEmitter)
{
    if (isModule('@domojs/media'))
    {
        master(__filename, './master');
        worker.on('ready', function ()
        {
            require("./fileNameScrapper");
        })
    }
})();
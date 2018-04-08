import * as akala from '@akala/server';
export { meta as scrapper } from './scrapper';
export * from '../../metadata';


akala.injectWithName(['$isModule', '$master'], function (isModule: akala.worker.IsModule, master: akala.worker.MasterRegistration)
{
    if (isModule('@domojs/media'))
    {
        master(__dirname, './master');

        require("./fileNameScrapper");
    }
})();
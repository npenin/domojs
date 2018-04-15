import * as akala from '@akala/server';
import { DbClient } from '@domojs/db';

akala.injectWithName(['$router'], function (router: akala.worker.Router)
{
    router.get('/api/library/:library', akala.command(['params.library', 'db', '$config'], function (library: string, db:DbClient, config)
    {
        var lib=config.libraries[library];
        if(lib)
        {
            
        }
    }))
})();
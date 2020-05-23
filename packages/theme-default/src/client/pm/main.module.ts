import * as akala from '@akala/core'
import * as ac from '@akala/commands'


export const module = akala.module('@akala/pm', '@domojs/theme-default');
module.injectWithName(['$resolveUrl'], function (resolveUrl)
{
    module.register('pm', ac.Processors.JsonRpc.connect(resolveUrl('/api/pm')).then((socket) => new ac.Container('pm', null, socket)));
})();


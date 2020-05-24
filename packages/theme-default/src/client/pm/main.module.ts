import * as akala from '@akala/core'
import * as ac from '@akala/commands'
import * as client from '@akala/client'


export const module = akala.module('@akala/pm', '@domojs/theme-default');
module.register('pm', ac.Processors.JsonRpc.connect(client.resolveUrl('/api/pm')).then((socket) => new ac.Container('pm', null, socket)));


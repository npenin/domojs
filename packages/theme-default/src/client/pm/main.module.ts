import * as akala from '@akala/core'
import * as ac from '@akala/commands'


export const module = akala.module('@akala/pm', '@domojs/theme-default');

module.register('pm', ac.Processors.JsonRpc.connect('/api/pm').then((socket) => new ac.Container('pm', null, socket)));


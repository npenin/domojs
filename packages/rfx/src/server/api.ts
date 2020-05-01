// import { api } from '../api'
import * as akala from '@akala/server'
import * as fs from 'fs'
import { PacketType } from 'rfxtrx';
import { promisify } from 'util'

// akala.api.buildServer(api, { rest: '/api' }, {
//     types()
//     {
//         return Promise.all(Object.keys(PacketType).map(async k =>
//         {
//             if (await promisify(fs.exists)('views/new-' + k + '.html'))
//             {
//                 return { name: k, view: '@domojs/rfx/new-' + k + '.html' };
//             }
//         })).then(values => { return values.filter(v => !!v) });
//     }
// })

import * as akala from '@akala/core'
import * as ac from '@akala/commands'
import * as client from '@akala/client'
import * as web from '@domojs/theme-default'
const deviceMetaContainer: ac.Metadata.Container = require('../../device-commands.json')

export const module = akala.module('@domojs/devices', '@domojs/theme-default');
const resolveUrl = module.resolve('$resolveUrl');
module.register('$resolveUrl', (url: string) =>
{
    return resolveUrl('/api/devices' + url);
})
module.register('container', ac.proxy(deviceMetaContainer, new ac.Processors.HttpClient(module)));
web.bootstrap.addDependency(module);

export default module;
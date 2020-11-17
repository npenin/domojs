import * as akala from '@akala/core'
import * as ac from '@akala/commands'
import * as web from '@domojs/theme-default'
const deviceMetaContainer: ac.Metadata.Container = require('../../device-commands.json')

export const mdule = akala.module('@domojs/devices', '@domojs/theme-default');
const resolveUrl = mdule.resolve('$resolveUrl');
mdule.register('$resolveUrl', (url: string) =>
{
    return resolveUrl('/api/devices' + url);
})
mdule.register('container', ac.proxy(deviceMetaContainer, new ac.Processors.HttpClient(mdule as any)));
web.bootstrap.addDependency(mdule);

export default mdule;
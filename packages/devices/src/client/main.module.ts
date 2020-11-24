import * as akala from '@akala/core'
import * as ac from '@akala/commands'
import * as web from '@domojs/theme-default'
const deviceMetaContainer: ac.Metadata.Container = require('../../device-commands.json')
const deviceTypeMetaContainer: ac.Metadata.Container = require('../../devicetype-commands.json')

export const mdule = akala.module('@domojs/devices', '@domojs/devices/type');
const resolveUrl = mdule.resolve('$resolveUrl');
mdule.register('$resolveUrl', (url: string) =>
{
    return resolveUrl('/api/devices/' + url);
})
mdule.register('container', ac.proxy(deviceMetaContainer, new ac.Processors.HttpClient(mdule as any)));
web.bootstrap.addDependency(mdule);

export default mdule;


export const mdule2 = akala.module('@domojs/devices/type', '@domojs/theme-default');
mdule2.register('$resolveUrl', (url: string) =>
{
    return resolveUrl('/api/devices/types/' + url);
})
mdule2.register('container', ac.proxy(deviceTypeMetaContainer, new ac.Processors.HttpClient(mdule2 as any)));
web.bootstrap.addDependency(mdule2);

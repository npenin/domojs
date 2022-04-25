import * as akala from '@akala/server';
import * as path from 'path';
import requireIfExists from 'require-optional'
import { State } from '../state';
import { sidecar } from '@akala/pm'
import { logger, LogLevels } from '@akala/core';

const log = logger('domojs:theme-default', LogLevels.info);


export default async function $init(this: State, enableAllCommands: boolean)
{
    this.modules = {};
    this.sidecar = sidecar();
    const container = await this.sidecar['@akala/server'];

    await container.dispatch('webpack-html', { title: 'Output management', template: path.join(__dirname, '../../../views/index.html'), excludeChunks: ['sw'] });

    await container.dispatch('asset', 'main', require.resolve('../../client'))
    // await container.dispatch('asset', 'akala.js', require.resolve('@akala/client/akala'));
    await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/immediate'));
    await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/router'));
    await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/cache'));
    await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/shell'));

    await container.dispatch('webpack-alias', '@akala/core', require.resolve('@akala/core'));
    await container.dispatch('webpack-alias', '@akala/client', require.resolve('@akala/client'));
    await container.dispatch('webpack-alias', '@domojs/theme-default', require.resolve('../../client/public_api'));

    if (enableAllCommands)
    {
        log.info('enabling all pm commands');
        await container.dispatch('asset', 'main', require.resolve('../../client/pm'))
        await container.dispatch('require', require.resolve('../pm'), process.cwd())
    }

    var fa = requireIfExists('@fortawesome/fontawesome-pro');
    if (fa)
        await container.dispatch('asset', 'main', require.resolve('@fortawesome/fontawesome-pro/css/all.css'));
    else
    {
        fa = requireIfExists('@fortawesome/fontawesome-free');
        if (fa)
            await container.dispatch('asset', 'main', require.resolve('@fortawesome/fontawesome-free/css/all.css'));
    }
    await container.dispatch('route', '/sw.js', '/sw.js', { pre: true, get: true, root: path.resolve('./build')/*, headers: { 'Service-Worker-Allowed': '/' }*/ }, process.cwd());
    // await container.dispatch('route', '/', null, { pre: true, use: true, get: true, root: path.resolve('./build') });
}
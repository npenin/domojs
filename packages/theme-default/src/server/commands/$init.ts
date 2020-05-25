import * as akala from '@akala/server';
import * as net from 'net'
import * as path from 'path';
import requireIfExists from 'require-optional'
import { State } from '../state';
import { Container } from '@akala/commands';

const log = akala.log('domojs:theme-default')

export default async function $init(this: State, socketPath: string, enableAllCommands: boolean)
{
    this.modules = {};
    console.log(socketPath);
    if (!socketPath)
        throw new Error('path to akala-server is not defined');
    this.socketPath = socketPath;
    var socket = await new Promise<net.Socket>((resolve, reject) =>
    {
        var socket = net.connect({ path: socketPath }, function ()
        {
            console.log('connected to ' + socketPath);
            resolve(socket)
        }).on('error', reject);
    });
    var container = akala.connect(socket);

    await container.dispatch('webpack-html', { title: 'Output management', template: path.join(__dirname, '../../../views/index.html'), excludeChunks: ['sw'] });

    await container.dispatch('asset', 'main', require.resolve('../../client'))
    // await container.dispatch('asset', 'akala.js', require.resolve('@akala/client/akala'));
    await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/immediate'));
    // await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/router'));
    // await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/cache'));
    // await container.dispatch('asset', 'sw', require.resolve('@akala/client/dist/service-workers/shell'));

    if (enableAllCommands)
    {
        log('enabling all pm commands');
        await container.dispatch('asset', 'main', require.resolve('../../client/pm'))
        await container.dispatch('require', require.resolve('../pm'))
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
    await container.dispatch('route', '/sw.js', '/sw.js', { pre: true, get: true, root: path.resolve('./build'), headers: { 'Service-Worker-Allowed': '/' } });
    // await container.dispatch('route', '/', null, { pre: true, use: true, get: true, root: path.resolve('./build') });
}
import { State } from '../state';


export default async function (this: State)
{
    console.log(this.socketPath);
    try
    {
        const container = await this.sidecar['@akala/server'];

        await container.dispatch('remove-asset', 'main', require.resolve('../../client'))
        await container.dispatch('remove-asset', 'sw', require.resolve('@akala/client/dist/service-workers/immediate'));
        await container.dispatch('remove-asset', 'sw', require.resolve('@akala/client/dist/service-workers/router'));
        await container.dispatch('remove-asset', 'sw', require.resolve('@akala/client/dist/service-workers/cache'));
        await container.dispatch('remove-asset', 'sw', require.resolve('@akala/client/dist/service-workers/shell'));

        // await container.dispatch('remove-asset', '/js/tiles.js', path.resolve(__dirname, '../../tile.js'))
        // await container.dispatch('remove-asset', '/js/akala.js', require.resolve('@akala/client/akala'));
        // await container.dispatch('remove-asset', '/js/sw.js', require.resolve('@akala/client/dist/service-workers/immediate'));
        // await container.dispatch('remove-asset', '/js/sw.js', require.resolve('@akala/client/dist/service-workers/router'));
        // await container.dispatch('remove-asset', '/js/sw.js', require.resolve('@akala/client/dist/service-workers/cache'), { headers: { 'Service-Worker-Allowed': '/' } });
        // await container.dispatch('remove-asset', '/js/sw.js', require.resolve('@akala/client/dist/service-workers/shell'));
        // await container.dispatch('remove-asset', '/css/module.css', path.resolve(__dirname, '../../../assets/css/module.css'));
        // await container.dispatch('remove-asset', '/css/module.css', require.resolve('@fortawesome/fontawesome-pro/css/all.css'));
        // await container.dispatch('remove-asset', '/css/module.css', require.resolve('@fortawesome/fontawesome-free/css/all.css'));
    }
    catch (e)
    {
        console.error(e);
    }
}
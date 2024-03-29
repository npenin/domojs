import { Container, Processors } from "@akala/commands";
import { ChannelState } from '../../channel-state.js';
import taskManager from '../../task-manager.js';

export default async function (this: ChannelState, container: Container<ChannelState> & taskManager)
{
    this.triggers = {};
    var c = new Container('console', {});
    await Processors.FileSystem.discoverCommands(require.resolve('../../../console.json'), c, { isDirectory: false })
    await container.dispatch('new-channel', 'console', c);
    c = new Container('http', {});
    await Processors.FileSystem.discoverCommands(require.resolve('../../../http.json'), c, { isDirectory: false })
    await container.dispatch('new-channel', 'http', c);
    c = new Container('fs', {});
    await Processors.FileSystem.discoverCommands(require.resolve('../../../fs.json'), c, { isDirectory: false })
    await container.dispatch('new-channel', 'fs', c);
    // await container.dispatch('new', {
    //     steps: [
    //         {
    //             channel: 'console',
    //             command: 'log',
    //             parameters: [{ $interpolate: 'pwic {{ 1+1 }}' }]
    //         }
    //     ]
    // } as Task)
}
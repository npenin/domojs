import { Container, Processors, proxy } from "@akala/commands";
import { ChannelState, Task } from "../../channel-state";
import { Channel } from "../../server";
import taskManager from "../../task-manager";

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
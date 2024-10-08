import * as fs from 'fs';
import { promisify } from 'util'
import { ChannelState } from '../../fs-channel-state.js';
import taskManager from '../../task-manager.js';
import { Container } from '@akala/commands';

export default async function watch(this: ChannelState, container: taskManager & Container<ChannelState>, path: string, eventName?: string)
{
    var stat = await promisify(fs.stat)(path);
    var id: string | undefined = void 0;
    if (stat.isDirectory() || stat.isFile())
    {
        id = crypto.randomUUID();
        var watcher = fs.watch(path, function (event, fileName)
        {
            if (!eventName || eventName == event)
                container.dispatch(id!, { path: fileName, mtime: new Date().toJSON() });
        });

        this.triggers[id] = watcher;
    }
    return id;
}
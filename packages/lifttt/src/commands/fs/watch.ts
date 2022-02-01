import * as fs from 'fs';
import { promisify } from 'util'
import { v4 as uuid } from 'uuid'
import { ChannelState } from '../../fs-channel-state';
import taskManager from '../../task-manager';
import { Container } from '@akala/commands';

export default async function watch(this: ChannelState, container: taskManager & Container<ChannelState>, path: string, eventName?: string)
{
    var stat = await promisify(fs.stat)(path);
    if (stat.isDirectory() || stat.isFile())
    {
        var id = uuid();
        var watcher = fs.watch(path, function (event, fileName)
        {
            if (!eventName || eventName == event)
                container.dispatch(id, { path: fileName, mtime: new Date().toJSON() });
        });

        this.triggers[id] = watcher;
    }
    return id;
}
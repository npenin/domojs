import { SelfDefinedCommand, Container } from "@akala/commands";
import { eachAsync, Interpolate, mapAsync } from "@akala/core";
import { ChannelState, Task } from '../../channel-state.js';
import { SerializableObject } from "@akala/core";

export default async function (this: ChannelState, container: Container<void>, task: Task)
{
    var triggerId: string;
    if (task.trigger)
        triggerId = await container.resolve<Container<void>>(task.trigger.channel).dispatch(task.trigger.command, task.trigger.parameters);
    else
        triggerId = crypto.randomUUID();
    var results = {};
    const interpolator = new Interpolate();
    container.register(new SelfDefinedCommand(async function (this: ChannelState, ...params: SerializableObject[])
    {
        if (this.triggers[triggerId].preventNextRun)
        {
            this.triggers[triggerId].preventNextRun!--;
            return false;
        }
        await eachAsync(task.steps, async step =>
        {
            var args: (string | SerializableObject)[];
            if (!step.parameters)
                args = [];
            else
            {
                args = await mapAsync(step.parameters, async p =>
                {
                    if (typeof p == 'object' && typeof p.$interpolate == 'string')
                        return (await interpolator.build(p.$interpolate))(results);
                    return p;
                }, true);
                args.push(...params);
            }
            var result = await container.resolve<Container<void>>(step.channel).dispatch(step.command, { param: args, results });
            if (step.name)
                results[step.name] = result;
        });
    }, triggerId, ['$params']));
    this.triggers[triggerId] = task;
    debugger;
    if (!task.trigger)
        container.dispatch(triggerId);
    task.id = crypto.randomUUID();
}
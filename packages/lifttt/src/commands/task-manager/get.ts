import { Command, Container } from "@akala/commands";
import { v4 as uuid } from 'uuid'
import { eachAsync, map } from "@akala/core";
import { ChannelState, Task } from "../../channel-state";

export default async function (this: ChannelState)
{
    return Object.values(this.triggers);
}
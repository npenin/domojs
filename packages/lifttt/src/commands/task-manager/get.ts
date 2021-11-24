import { ChannelState } from "../../channel-state";

export default async function (this: ChannelState)
{
    return Object.values(this.triggers);
}
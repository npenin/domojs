import { ChannelState } from '../../channel-state.js';

export default async function (this: ChannelState)
{
    return Object.values(this.triggers);
}
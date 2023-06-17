import { ChannelState } from '../../channel-state.js'

export default async function pauseTrigger(this: ChannelState, triggerId: string)
{
    this.triggers[triggerId].preventNextRun = -1;
}
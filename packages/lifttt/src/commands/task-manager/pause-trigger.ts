import { ChannelState } from '../../channel-state'

export default async function pauseTrigger(this: ChannelState, triggerId: string)
{
    this.triggers[triggerId].preventNextRun = -1;
}
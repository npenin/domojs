import { ChannelState } from '../../channel-state'

export default async function resumeTrigger(this: ChannelState, triggerId: string)
{
    this.triggers[triggerId].preventNextRun = 0;
}
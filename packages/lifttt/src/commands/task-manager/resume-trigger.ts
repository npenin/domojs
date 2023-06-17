import { ChannelState } from '../../channel-state.js'

export default async function resumeTrigger(this: ChannelState, triggerId: string)
{
    this.triggers[triggerId].preventNextRun = 0;
}
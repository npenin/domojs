import { ChannelState } from '../../channel-state'

export default function preventNextRun(this: ChannelState, triggerId: string)
{
    this.triggers[triggerId].preventNextRun++;
}
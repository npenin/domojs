import { ChannelState } from '../../channel-state.js'

export default function preventNextRun(this: ChannelState, triggerId: string)
{
    this.triggers[triggerId].preventNextRun++;
}
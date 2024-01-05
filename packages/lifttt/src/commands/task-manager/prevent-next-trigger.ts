import { ChannelState } from '../../channel-state.js'

export default function preventNextRun(this: ChannelState, triggerId: string)
{
    if (!this.triggers[triggerId].preventNextRun)
        this.triggers[triggerId].preventNextRun = 1;
    else
        this.triggers[triggerId].preventNextRun!++;
}
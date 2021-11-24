import { ChannelState } from "../../channel-state";
import { Container, SelfDefinedCommand } from "@akala/commands";

export default function (this: ChannelState, name: string, remoteContainer: Container<void>, self: Container<ChannelState>)
{
    remoteContainer.register(new SelfDefinedCommand(function ()
    {
        self.unregister(name);
    }, '$disconnect'));

    // remoteContainer.proxy = function ()
    // {
    //     return remoteContainer;
    // }

    self.register(name, remoteContainer);
}
import { ChannelState } from "../../channel-state";
import { Container, Command } from "@akala/commands";

export default function (this: ChannelState, name: string, remoteContainer: Container<void>, self: Container<ChannelState>)
{
    remoteContainer.register(new Command(function ()
    {
        self.unregister(name);
    }, '$disconnect'));

    remoteContainer.proxy = function ()
    {
        return remoteContainer;
    }

    self.register(name, remoteContainer);
} 
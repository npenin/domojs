import { Command, Container } from "@akala/commands";
import { State } from "../../player";

export default async function addPlayer(this: State, name: string, remotePlayer: Container<void>)
{
    if (typeof this.players[name] != 'undefined')
        this.players[name] = remotePlayer;

    remotePlayer.register(new Command(() =>
    {
        delete this.players[name];
    }, '$disconnect'))
}
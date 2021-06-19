import { Command, Container } from "@akala/commands";
import { PlayerStatus, State } from "../../player";

export default async function addPlayer(this: State, name: string, remotePlayer: Container<PlayerStatus>)
{
    if (typeof this.players[name] != 'undefined')
        this.players[name] = remotePlayer;
    remotePlayer.state = {};

    remotePlayer.register(new Command(() =>
    {
        delete this.players[name];
    }, '$disconnect'))
}
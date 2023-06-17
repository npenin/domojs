import { Container, SelfDefinedCommand } from "@akala/commands";
import { PlayerStatus, State } from '../../player.js';

export default async function addPlayer(this: State, name: string, remotePlayer: Container<PlayerStatus>)
{
    if (typeof this.players[name] != 'undefined')
        this.players[name] = remotePlayer;
    remotePlayer.state = {};

    remotePlayer.register(new SelfDefinedCommand(() =>
    {
        delete this.players[name];
    }, '$disconnect'))
}
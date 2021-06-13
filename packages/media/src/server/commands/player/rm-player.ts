import { Container } from "@akala/commands";
import { State } from "../../player";

export default async function rmPlayer(this: State, remotePlayer: Container<void>, name?: string)
{
    if (typeof this.players[name] != 'undefined')
        delete this.players[name];
}
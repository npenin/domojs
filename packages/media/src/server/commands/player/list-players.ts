import { State } from "../../player";

export default async function listPlayers(this: State)
{
    return Object.keys(this.players);
}
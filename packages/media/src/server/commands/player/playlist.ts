import { State } from "../../player";

export default async function playlist(this: State, name: string)
{
    return this.players[name].dispatch('playlist');
}
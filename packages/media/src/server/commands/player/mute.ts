import { State } from "../../player";

export default async function mute(this: State, name: string)
{
    return this.players[name].dispatch('mute');
}
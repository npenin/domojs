import { State } from "../../player";

export default async function pause(this: State, name: string)
{
    return this.players[name].dispatch('pause');
}
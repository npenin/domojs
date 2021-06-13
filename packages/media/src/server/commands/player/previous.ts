import { State } from "../../player";

export default async function previous(this: State, name: string)
{
    return this.players[name].dispatch('previous');
}
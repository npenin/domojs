import { State } from "../../player";

export default async function next(this: State, name: string)
{
    return this.players[name].dispatch('next');
}
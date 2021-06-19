import { State } from "../../player";

export default async function status(this: State, name: string, status?: { displayName: string, isMuted: false, volume: number, })
{
    if (status)
        Object.assign(this.players[name].state, status);
    else
        return Object.assign(this.players[name].state, await this.players[name].dispatch('status'));
}
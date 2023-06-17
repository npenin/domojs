import { State } from '../../player.js';

export default async function playlist(this: State, name: string)
{
    return this.players[name].dispatch('playlist');
}
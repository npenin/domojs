import { State } from '../../player.js';

export default async function play(this: State, name: string)
{
    return this.players[name].dispatch('play');
}
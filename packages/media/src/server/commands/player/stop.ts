import { State } from '../../player.js';

export default async function stop(this: State, name: string)
{
    return this.players[name].dispatch('stop');
}
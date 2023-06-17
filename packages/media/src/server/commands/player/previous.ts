import { State } from '../../player.js';

export default async function previous(this: State, name: string)
{
    return this.players[name].dispatch('previous');
}
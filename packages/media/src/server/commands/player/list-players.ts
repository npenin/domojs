import { State } from '../../player.js';

export default async function listPlayers(this: State)
{
    return Object.keys(this.players);
}
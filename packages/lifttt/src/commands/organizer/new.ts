import { Container } from '@akala/commands';
import { OrganizerState } from '../../organizer-state.js';

export default async function register(this: OrganizerState, container: Container<void>, id?: string)
{
    if (!id)
        id = crypto.randomUUID();

    this.organizers[id] = container;
    return id;
}
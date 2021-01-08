import { Container } from '@akala/commands';
import { v4 as uuid } from 'uuid'
import { OrganizerState } from '../../organizer-state';

export default async function register(this: OrganizerState, container: Container<void>, id?: string)
{
    if (!id)
        id = uuid();

    this.organizers[id] = container;
    return id;
}
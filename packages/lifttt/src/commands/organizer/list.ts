import { OrganizerState } from '../../organizer-state.js';

export default async function list(this: OrganizerState)
{
    return this.organizers;
}
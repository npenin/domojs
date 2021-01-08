import { OrganizerState } from "../../organizer-state";

export default async function list(this: OrganizerState)
{
    return this.organizers;
}
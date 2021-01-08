import { Container } from "@akala/commands";

export interface OrganizerState
{
    organizers: { [key: string]: Container<void> };
}

import { Container } from "@akala/commands";

export interface State
{
    players: { [key: string]: Container<void> }
}
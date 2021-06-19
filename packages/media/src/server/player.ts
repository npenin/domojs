import { Container } from "@akala/commands";

export interface State
{
    players: { [key: string]: Container<PlayerStatus> }
}

export interface PlayerStatus
{
    displayName?: string;
    isMuted?: boolean;
    volume?: number;
    volumeStep?: number;
    isStandBy?: boolean;
}
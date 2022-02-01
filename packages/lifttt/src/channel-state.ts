import { SerializableObject } from "@akala/json-rpc-ws";

export interface ChannelState
{
    triggers: { [key: string]: Task };
}

export interface Task
{
    preventNextRun?: number;
    id?: string;
    trigger?: Step;
    steps: Step[];
}

export interface Step
{
    name?: string;
    asCondition?: boolean;
    channel: string;
    command: string;
    parameters: SerializableObject[]
}
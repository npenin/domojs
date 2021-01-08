import { Container } from "@akala/commands";
import * as fs from 'fs'
import { PayloadDataType } from "@akala/json-rpc-ws";

export interface ChannelState
{
    triggers: { [key: string]: fs.FSWatcher };
}

export interface Task
{
    preventNextRun?: number;
    id?: string;
    trigger: Step;
    steps: Step[];
}

export interface Step
{
    name?: string;
    asCondition?: boolean;
    channel: string;
    command: string;
    parameters: PayloadDataType<void>
}

export interface Task
{
    id?: string;
    trigger: Step;
    steps: Step[];
}

export interface Step
{
    name?: string;
    asCondition?: boolean;
    channel: string;
    command: string;
    parameters: PayloadDataType<void>
}
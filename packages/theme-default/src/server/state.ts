import { Container } from "@akala/commands";

export interface ModuleDefinition
{
    name: string
    clientScripts: { [entry: string]: string[] | string };
}

export interface State
{
    socketPath: string;
    modules: { [key: string]: ModuleDefinition };
    pm: Container<void>
}
import { Container } from "@akala/commands";
import { NetConnectOpts } from "net";

export interface ModuleDefinition
{
    name: string
    clientScripts: { [entry: string]: string[] | string };
}

export interface State
{
    socketPath: NetConnectOpts;
    modules: { [key: string]: ModuleDefinition };
    pm: Container<void>
}
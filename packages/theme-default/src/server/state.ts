import { Container } from "@akala/commands";
import { NetConnectOpts } from "net";
import * as akala from '@akala/server'
import * as pm from '@akala/pm'

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
    sidecar: pm.Sidecar
}
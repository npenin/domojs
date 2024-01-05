
export interface Service
{
    type: string;
    name: string;
    // connection?: jsonrpc.Connection;
}

export interface State
{
    services: { byTypes: { [type: string]: { [name: string]: Service } }, byNames: { [name: string]: Service } };
}
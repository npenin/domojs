export interface ModuleDefinition
{
    name: string
    clientScripts: { [entry: string]: string[] | string };
}

export interface State
{
    modules: { [key: string]: ModuleDefinition };
}
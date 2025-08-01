export type DynSecAclType =
    | "subscribeLiteral"
    | "subscribePattern"
    | "publishClientSend"
    | "publishClientReceive"
    | "publishPatternSend"
    | "publishPatternReceive";

export type DynSecAccessLevel = "deny" | "readonly" | "readwrite";

// --- Client Commands ---

export interface CreateClientCommand
{
    command: "createClient";
    username: string;
    password: string;
    clientid?: string;
    textname?: string;
    textdescription?: string;
    roles?: { rolename: string }[];
}

export interface CreateClientResponse
{
    command: "createClient";
    username: string;
    returncode?: number;
    error?: string;
}

export interface DeleteClientCommand
{
    command: "deleteClient";
    username: string;
}

export interface DeleteClientResponse
{
    command: "deleteClient";
    username: string;
    returncode?: number;
    error?: string;
}

export interface ModifyClientCommand
{
    command: "modifyClient";
    username: string;
    password?: string;
    clientid?: string;
    textname?: string;
    textdescription?: string;
}

export interface ModifyClientResponse
{
    command: "modifyClient";
    username: string;
    returncode?: number;
    error?: string;
}

export interface GetClientCommand
{
    command: "getClient";
    username: string;
}

export interface GetClientResponse
{
    command: "getClient";
    client: {
        username: string;
        clientid?: string;
        textname?: string;
        textdescription?: string;
        roles: { rolename: string }[];
    };
    returncode?: number;
    error?: string;
}

export interface ListClientsCommand
{
    command: "listClients";
}

export interface ListClientsResponse
{
    command: "listClients";
    clients: {
        username: string;
        clientid?: string;
        textname?: string;
        textdescription?: string;
    }[];
    returncode?: number;
    error?: string;
}

// --- ACLs ---

export interface AddRoleACLCommand
{
    command: "addRoleACL";
    rolename: string;
    acltype: DynSecAclType;
    topic: string;
    priority?: number;
    allow?: boolean
}

export interface AddRoleACLResponse
{
    command: "addRoleACL";
    rolename: string;
    returncode?: number;
    error?: string;
}

export interface RemoveRoleACLCommand
{
    command: "removeRoleACL";
    rolename: string;
    acltype: DynSecAclType;
    topic: string;
}

export interface RemoveRoleACLResponse
{
    command: "removeRoleACL";
    rolename: string;
    returncode?: number;
    error?: string;
}

// --- Roles ---

export interface CreateRoleCommand
{
    command: "createRole";
    rolename: string;
    textname?: string;
    textdescription?: string;
}

export interface CreateRoleResponse
{
    command: "createRole";
    rolename: string;
    returncode?: number;
    error?: string;
}

export interface AddClientRoleCommand
{
    command: "addClientRole";
    username: string;
    rolename: string;
}

export interface AddClientRoleResponse
{
    command: "addClientRole";
    username: string;
    rolename: string;
    returncode?: number;
    error?: string;
}

// --- System ---

export interface SetSuperuserRoleCommand
{
    command: "setSuperuserRole";
    rolename: string;
}

export interface SetSuperuserRoleResponse
{
    command: "setSuperuserRole";
    rolename: string;
    returncode?: number;
    error?: string;
}

export interface SetDefaultACLAccessCommand
{
    command: "setDefaultACLAccess";
    access: DynSecAccessLevel;
}

export interface SetDefaultACLAccessResponse
{
    command: "setDefaultACLAccess";
    access: DynSecAccessLevel;
    returncode?: number;
    error?: string;
}

export type DynSecCommandPayload =
    | CreateClientCommand
    | DeleteClientCommand
    | ModifyClientCommand
    | GetClientCommand
    | ListClientsCommand
    | AddRoleACLCommand
    | RemoveRoleACLCommand
    | AddClientRoleCommand
    | CreateRoleCommand
    | SetSuperuserRoleCommand
    | SetDefaultACLAccessCommand;

export type DynSecCommandResponse =
    | CreateClientResponse
    | DeleteClientResponse
    | ModifyClientResponse
    | GetClientResponse
    | ListClientsResponse
    | AddRoleACLResponse
    | RemoveRoleACLResponse
    | AddClientRoleResponse
    | CreateRoleResponse
    | SetSuperuserRoleResponse
    | SetDefaultACLAccessResponse;

export interface DynSecRequest
{
    commands: DynSecCommandPayload[];
}

export interface DynSecResponse
{
    responses: DynSecCommandResponse[];
}

import { AsyncEventBus, base64, Deferred, ErrorWithStatus, EventOptions, fromAsyncEventBus, HttpStatusCode, IsomorphicBuffer, ObservableArray, Queue } from "@akala/core";
import { State } from "./$init.js";
import { DynSecRequest, DynSecResponse } from '../../mosquitto-dynsec.js'
import { SidecarConfiguration } from "@akala/sidecar";
import { MqttEvents } from "@domojs/mqtt";
// import { Commissionner, FabricClient } from "../../clients/index.js";
import { Endpoint, EndpointProxy } from "../../clients/Endpoint.js";

const queue = new Queue<{ pubsub: AsyncEventBus<MqttEvents>, message: DynSecRequest, defer: Deferred<DynSecResponse> }>(async (e, next) =>
{
    await e.pubsub.once('$CONTROL/dynamic-security/v1/response', s =>
        typeof s === 'string' ?
            e.defer.resolve(JSON.parse(s)) : e.defer.resolve(JSON.parse(s.toString('utf-8'))), { noLocal: true });

    await e.pubsub.emit('$CONTROL/dynamic-security/v1', JSON.stringify(e.message));


    await e.defer;

    next(true);
});

/**
 * 
 * @param this 
 * @param name 
 * @returns the password to be used to connect to the mosquitto
 */
export default async function (this: State, node: string): Promise<SidecarConfiguration['pubsub']>
{
    const pwd = base64.base64EncArr(crypto.getRandomValues(new Uint8Array(24)));

    const root = node.split('.')[0];

    if (node === 'devices')
    {
        const guestDefer = new Deferred<DynSecResponse>();

        queue.enqueue({
            pubsub: this.pubsub,
            message: {
                "commands": [
                    {
                        command: 'createRole',
                        rolename: 'domojs-guest',
                    },
                    {
                        "command": "createClient",
                        "username": 'domojs-guest',
                        "password": 'domojs',
                        "clientid": "",
                        "textname": root,
                        "textdescription": `DomoJS guest client`,
                        "roles": [{ rolename: "domojs-guest" }]
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "subscribeLiteral",
                        "topic": `domojs/devices/root/commissionning/registerCommand`,
                        "priority": 0,
                        allow: true
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "publishClientSend",
                        "topic": `domojs/devices/root/commissionning/registerCommand/execute`,
                        "priority": 0,
                        allow: true
                    },
                ]
            },
            defer: guestDefer
        });

        const guestResponse = await guestDefer;
        console.log(guestResponse);
    }

    const defer = new Deferred<DynSecResponse>();
    queue.enqueue({
        pubsub: this.pubsub,
        message: {
            "commands": [
                {
                    command: 'createRole',
                    rolename: 'domojs-' + node,
                },
                {
                    "command": "createClient",
                    "username": root,
                    "password": pwd,
                    "clientid": "",
                    "textname": root,
                    "textdescription": `DomoJS ${root} client`,
                    "roles": [{ rolename: node == 'devices' ? 'admin' : '' }].filter(s => s.rolename)
                },
                {
                    command: "addClientRole",
                    username: root,
                    rolename: "domojs-" + node
                },
                {
                    "command": "addRoleACL",
                    "rolename": "domojs-" + node,
                    "acltype": "subscribePattern",
                    "topic": `domojs/#`,
                    "priority": 0,
                    allow: true
                },
                {
                    "command": "addRoleACL",
                    "rolename": "domojs-" + node,
                    "acltype": "publishClientSend",
                    "topic": `domojs/${node}/#`,
                    "priority": 0,
                    allow: true
                },
                {
                    "command": "addRoleACL",
                    "rolename": "domojs-" + node,
                    "acltype": "publishClientSend",
                    "topic": `domojs/${node}`,
                    "priority": 0,
                    allow: true
                },
                {
                    "command": "addRoleACL",
                    "rolename": "domojs-" + node,
                    "acltype": "publishClientSend",
                    "topic": `domojs/devices/${node}`,
                    "priority": 0,
                    allow: true
                },
                {
                    "command": "addRoleACL",
                    "rolename": "domojs-" + node,
                    "acltype": "publishClientSend",
                    "topic": `domojs/devices/${node}/#`,
                    "priority": 0,
                    allow: true
                },
                {
                    "command": "addRoleACL",
                    "rolename": "domojs-" + node,
                    "acltype": "publishClientSend",
                    "topic": `domojs/devices`,
                    "priority": 0,
                    allow: true
                }
            ]
        },
        defer
    });

    const result = await defer;

    const clientResponse = result.responses.find(c => c.command === 'createClient');

    const client = new EndpointProxy(this.self.endpoints.length, node, this.self, this.pubsub, {});
    this.self.endpoints.push(client);

    if (clientResponse.error === 'Client already exists')
        return null;

    return {
        transport: this.config.pubsub.transport,
        transportOptions: { ...this.config.pubsub.transportOptions?.extract() ?? {}, password: pwd, username: node }
    }
}
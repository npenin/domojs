import { AsyncEventBus, base64, Deferred, Queue } from "@akala/core";
import { State } from "./$init.js";
import { DynSecCommandPayload, DynSecRequest, DynSecResponse } from '../../mosquitto-dynsec.js'
import type { SidecarConfiguration } from "@akala/sidecar";
import { MqttEvents } from "@domojs/mqtt";
import { EndpointProxy } from "../../clients/EndpointProxy.js";

const queue = new Queue<{ pubsub: AsyncEventBus<MqttEvents>, message: DynSecRequest, defer: Deferred<DynSecResponse> }>(async (e, next) =>
{
    await e.pubsub.once('$CONTROL/dynamic-security/v1/response', s =>
        typeof s === 'string' ?
            e.defer.resolve(JSON.parse(s)) : e.defer.resolve(JSON.parse(s.toString('utf-8'))), { noLocal: true });

    await e.pubsub.emit('$CONTROL/dynamic-security/v1', JSON.stringify(e.message), { qos: 1 });


    await e.defer;

    next(true);
});

/**
 * 
 * @param this 
 * @param name 
 * @returns the password to be used to connect to the mosquitto
 */
export default async function (this: State, node: string, grantRoot?: boolean): Promise<Partial<SidecarConfiguration['pubsub']> & { id: number }>
{
    const pwd = base64.base64EncArr(crypto.getRandomValues(new Uint8Array(24)));

    let userName = node;
    const root = node.split('/');
    if (root.length > 1)
        userName = root.join('-');

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
                        "textname": 'guest',
                        "textdescription": `DomoJS guest client`,
                        "roles": [{ rolename: "domojs-guest" }]
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "subscribeLiteral",
                        "topic": `domojs/devices/0/commissionning/registerCommand`,
                        "priority": 0,
                        allow: true
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "publishClientSend",
                        "topic": `domojs/devices/0/commissionning/registerCommand/execute`,
                        "priority": 0,
                        allow: true
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "subscribePattern",
                        "topic": `domojs/devices/0/descriptor/+`,
                        "priority": 0,
                        allow: true
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "publishClientSend",
                        "topic": `domojs/devices/0/descriptor/+/get`,
                        "priority": 0,
                        allow: true
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "publishClientSend",
                        "topic": `domojs/+/+/+/+/+`,
                        "priority": 0,
                        allow: true
                    },
                    {
                        "command": "addRoleACL",
                        "rolename": "domojs-guest",
                        "acltype": "subscribePattern",
                        "topic": `domojs/+/+/+/+`,
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
    const nodeId = await this.self?.getEndpointId(node) ?? 0;

    const commands: DynSecCommandPayload[] = [
        {
            command: 'createRole',
            rolename: 'domojs-' + userName,
        }
    ];

    // Create admin role for nodes that need broader permissions
    if (grantRoot)
    {
        commands.push({
            command: 'createRole',
            rolename: userName + '-admin',
        });
    }

    const roles = [{ rolename: 'domojs-' + userName }];
    if (grantRoot)
    {
        roles.push({ rolename: node + '-admin' });
    }
    if (node == 'devices')
    {
        roles.push({ rolename: 'admin' });
    }

    commands.push({
        "command": "createClient",
        "username": userName,
        "password": pwd,
        "clientid": "",
        "textname": node,
        "textdescription": `DomoJS ${node} client`,
        "roles": roles
    });

    commands.push({
        command: "addClientRole",
        username: userName,
        rolename: "domojs-" + userName
    });

    // Standard domojs permissions
    commands.push(
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "subscribePattern",
            "topic": `domojs/#`,
            "priority": 0,
            allow: true
        },
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "publishClientSend",
            "topic": `domojs/${node}/#`,
            "priority": 0,
            allow: true
        },
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "publishClientSend",
            "topic": `domojs/${node}`,
            "priority": 0,
            allow: true
        },
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "subscribePattern",
            "topic": `domojs/devices/0/+/+`,
            "priority": 0,
            allow: true
        },
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "publishClientSend",
            "topic": `domojs/devices/0/+/+/+`,
            "priority": 0,
            allow: true
        },
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "subscribePattern",
            "topic": `domojs/devices/${nodeId}/#`,
            "priority": 0,
            allow: true
        },
        {
            "command": "addRoleACL",
            "rolename": "domojs-" + userName,
            "acltype": "publishClientSend",
            "topic": `domojs/devices/${nodeId}/#`,
            "priority": 0,
            allow: true
        }
    );

    // Add external topic permissions to admin role if grantRoot is true
    if (grantRoot)
    {
        commands.push(
            {
                command: "addClientRole",
                username: userName,
                rolename: userName + '-admin'
            },
            {
                "command": "addRoleACL",
                "rolename": node + '-admin',
                "acltype": "subscribePattern",
                "topic": `${node}/#`,
                "priority": 1,
                allow: true
            },
            {
                "command": "addRoleACL",
                "rolename": node + '-admin',
                "acltype": "publishClientSend",
                "topic": `${node}/#`,
                "priority": 1,
                allow: true
            }
        );
    }

    queue.enqueue({
        pubsub: this.pubsub,
        message: {
            "commands": commands
        },
        defer
    });

    const result = await defer;

    const clientResponse = result.responses.find(c => c.command === 'createClient');

    if (this.self)
    {
        const client = new EndpointProxy(nodeId, { name: 'domojs/devices' }, this.pubsub, {});
        this.self.endpoints.push(client);
    }

    if (clientResponse.error === 'Client already exists')
        return { id: nodeId };

    return {
        id: nodeId,
        transport: this.config.pubsub?.transport,
        transportOptions: { ...this.config.pubsub?.transportOptions?.extract() ?? {}, password: pwd, username: node }
    }
}

import { AsyncEventBus, Deferred, IEvent, Event, ObservableArray, ObservableObject, AsyncTeardownManager, fromEvent } from "@akala/core";
import { MqttEvents, protocol } from "@domojs/mqtt";
import { DescriptorClusterId } from "../behaviors/descriptor.js";

// export interface NodeDiscoveryAnnouncement
// {
//     discriminator: number,          // discriminator
//     vendorProductId: `${number}+${number}`;
//     deviceType: DeviceTypes,    // device type
//     deviceName: string,         // device name
//     commissioningMode: boolean,         // commissioning mode
//     pairingHint: PairingHints,         // pairing hint
//     pairingInstruction: string,         // pairing hint
//     manufacturer: string;
//     rotatingId: boolean,
// };

export function clusterFactory<TCluster extends Cluster<unknown, unknown, any>, const TId>(impl: ClusterInstanceLight<TCluster>): ClusterInstance<TCluster>
{
    return new ObservableObject({
        ...impl
    }) as any;
}

export function clusterProxyFactory<TCluster extends Cluster<unknown, unknown, any>>(cluster: ClusterDefinition<TCluster>, prefixTopic: string, pubsub: AsyncEventBus<MqttEvents>, serverList: number[]): RemoteClusterInstance<TCluster>
{
    const target = Object.assign(new AsyncTeardownManager(), { id: cluster.id });
    Object.defineProperties(target, Object.fromEntries(cluster.commands.map(e => [e.toString() + 'Command', {
        value:
            async (...args) =>
            {
                const defer = new Deferred();
                const sub = await pubsub.on(`${prefixTopic}/${e.toString()}Command`, async (data) =>
                {
                    await sub?.();
                    if (typeof data == 'string')
                        defer.resolve(JSON.parse(data));
                    else
                        defer.resolve(JSON.parse(data.toString('utf-8')));
                },
                    { noLocal: true });

                target.teardown(sub);
                await pubsub.emit(`${prefixTopic}/${e.toString()}Command/execute`, JSON.stringify(args), { qos: 1 });

                return defer.promise;
            },
        configurable: false,
        enumerable: true,
        writable: false
    } as PropertyDescriptor])));
    Object.defineProperties(target, Object.fromEntries(cluster.attributes.flatMap(e =>
    {
        let value;

        if (cluster.id == DescriptorClusterId && e === 'ServerList')
            value = serverList;

        const sync = new Event<[], void>();
        target.teardown(pubsub.on(`${prefixTopic}/${e.toString()}`, async (data) =>
        {
            if (typeof data == 'string')
                value = JSON.parse(data);
            else
                value = JSON.parse(data.toString('utf-8'));
            sync.emit();
        }, { retainAsPublished: true, retainHandling: protocol.subscribe.RetainHandling.SendAtSubscribe }));
        return [['local' + e.toString(), {
            get()
            {
                return value;
            },
            set(newValue)
            {
                pubsub.emit(`${prefixTopic}/${e.toString()}/set`, JSON.stringify(newValue)).then(() => value = newValue);
            }
        } as PropertyDescriptor
        ], [e, {
            async get()
            {
                await pubsub.emit(`${prefixTopic}/${e.toString()}/get`, '{}');
                await new Promise<void>(resolve => sync.addListener(resolve, { once: true }));
                return value;
            },
            set(newValue)
            {
                pubsub.emit(`${prefixTopic}/${e.toString()}/set`, JSON.stringify(newValue)).then(() => value = newValue);
            }
        } as PropertyDescriptor
        ]];
    })));
    Object.defineProperties(target, Object.fromEntries(cluster.events.map(e =>
    {
        let ev: Event<any[], void>;
        return [e, {
            get()
            {
                if (!ev)
                {
                    ev = new Event();
                    target.teardown(pubsub.on(`${prefixTopic}/${e.toString()}`, async (data) =>
                    {
                        if (typeof data == 'string')
                            ev.emit(...JSON.parse(data));
                        else
                            ev.emit(...JSON.parse(data.toString('utf-8')));
                    }));
                    target.teardown(ev);
                }
                return ev;
            },
        } as PropertyDescriptor
        ];
    })));
    return new ObservableObject(target) as any;
}
export { Binding } from '../behaviors/binding.js'

export type Cluster<TAttributes extends Record<string, any>, TCommands extends { [key in keyof TCommands]: ClusterCommand<any, any> }, TEvents extends Record<PropertyKey, unknown[]>> =
    {
        id: number;
        attributes: TAttributes,
        commands: TCommands,
        events: TEvents
    }

export type ClusterDefinition<TCluster extends Cluster<any, any, any>> = {
    id: TCluster['id'],
    attributes: readonly (keyof TCluster['attributes'])[]
    events: readonly (keyof TCluster['events'])[]
    commands: readonly (keyof TCluster['commands'])[]
}

export type NonWatchableClusterInstance<TCluster extends Cluster<any, any, any>> = ClusterInstanceLight<TCluster> & ClusterEvents<TCluster>
export type NonWatchableRemoteClusterInstance<TCluster extends Cluster<any, any, any>> = RemoteClusterInstanceLight<TCluster> & ClusterEvents<TCluster>
export type ClusterInstance<TCluster extends Cluster<any, any, any>> = ObservableObject<NonWatchableClusterInstance<TCluster>>
export type RemoteClusterInstance<TCluster extends Cluster<any, any, any>> = ObservableObject<NonWatchableRemoteClusterInstance<TCluster>>

export type ClusterInstanceLight<TCluster extends Cluster<any, any, any>> = ClusterAttributes<TCluster> & ClusterCommandsImpl<TCluster> &
{
    id: number;
}

export type RemoteClusterInstanceLight<TCluster extends Cluster<any, any, any>> = RemoteClusterAttributes<TCluster> & ClusterCommandsImpl<TCluster> &
{
    id: number;
}

// export type ClusterId<T> = T extends Cluster<infer TId, any, any, any> ? TId : never;
export type ClusterAttributes<T> = T extends Cluster<infer TAttributes, any, any> ? TAttributes : never;
export type ClusterCommands<T> = T extends Cluster<any, infer TCommands, any> ? TCommands : never;
export type ClusterEvents<T> = T extends Cluster<any, any, infer TEvents> ? TEvents : never;

export type RemoteClusterAttributes<T> = T extends Cluster<infer TAttributes, any, any> ? { [key in keyof TAttributes]: Promise<TAttributes[key]> } & { [key in Extract<keyof TAttributes, string> as `local${key}`]: TAttributes[key] } : never;
export type RemoteClusterCommands<T> = T extends Cluster<any, infer TCommands, any> ? TCommands : never;
export type RemoteClusterEvents<T> = T extends Cluster<any, any, infer TEvents> ? TEvents : never;

export type ClusterCommand<TIn extends readonly unknown[], TOut> = { inputparams: TIn, outputparams: TOut }

// export type ClusterCommandsImpl<T> = T extends Cluster<any, infer TCommands, any> ? keyof TCommands extends string ? { [key in `${keyof TCommands}Command`]: ClusterCommandImpl<T, TCommands[keyof TCommands]['inputparams'], TCommands[keyof TCommands]['outputparams']> } : {} : {};

export type ClusterCommandsImpl<T> =
    T extends Cluster<any, infer TCommands, any>
    ? {
        [K in keyof TCommands as `${Extract<K, string>}Command`]:
        ClusterCommandImpl<TCommands[K]['inputparams'], TCommands[K]['outputparams']>;
    } : {};

export type ClusterCommandImpl<TIn extends unknown[], TOut> = TOut extends readonly [] ?
    (...args: TIn) => Promise<void> :
    (...args: TIn) => Promise<TOut>;

export enum PairingHints
{
    /// No pairing hint available
    None = 0,

    /// Device supports IP-based pairing
    IP = 0x0001,

    /// Device supports BLE-based pairing
    BLE = 0x0002,

    /// Device supports on-network discovery
    OnNetwork = 0x0004,

    /// Device has a QR code (e.g., printed on device or screen)
    QRCode = 0x0008,

    /// Device has a manual setup code (e.g., 11-digit numeric code)
    ManualCode = 0x0010,

    /// Device has a numeric or alphanumeric password on the device itself
    PasswordOnDevice = 0x0020,

    /// Device can use NFC tag to share onboarding payload
    NFC = 0x0040,

    /// Device has a voice assistant-based pairing method
    VoiceAssistant = 0x0080,

    /// Device supports a custom method outside spec (OEM-specific)
    Custom = 0x0100,
}

// export class FabricClient extends AsyncTeardownManager
// {
//     private constructor(public readonly name: string, private readonly sidecar: { pubsub?: AsyncEventBus<MqttEvents> }, commissionner: Commissionner)
//     {
//         super();
//     }

//     public static async create(name: string, sidecar: { pubsub?: AsyncEventBus<MqttEvents> }, commissioner: Commissionner): Promise<FabricClient>
//     {

//         const client = new FabricClient(name, sidecar, commissioner);
//         await client.teardown(client.sidecar.pubsub.on(`domojs/${this.name}`, data =>
//         {
//             if (typeof data !== 'string')
//                 data = data.toString('utf8');

//             const node: NodeDiscoveryAnnouncement = JSON.parse(data);
//             if (node.commissioningMode)
//                 commissioner.startCommissionning(node);
//             else
//                 client.addNode(node);
//         }, { noLocal: true }));
//         return client;
//     }
//     public async addNode(node: NodeDiscoveryAnnouncement): Promise<void>
//     {
//         await this.sidecar.pubsub.emit(`domojs/${this.name}`, JSON.stringify(node), { qos: 1 })
//     }

//     public async addEndpoint(nodeName: string, endpoint: Endpoint): Promise<void>
//     {
//         await this.sidecar.pubsub.emit(`domojs/${this.name}/${nodeName}`, JSON.stringify(endpoint), { qos: 1 })
//     }
// }

// export class Commissionner
// {
//     constructor(protected readonly sidecar: Sidecar<any, MqttEvents>, protected readonly fabricName: string)
//     {
//     }

//     startCommissionning(node: NodeDiscoveryAnnouncement)
//     {
//         return this.completeCommissionning(new RootNodeDeviceType(node.deviceName, {
//             accessControl: Acl().target,
//             administratorCommissioning: AdministratorCommissioning().target,
//             binding: {
//                 Binding: []
//             },
//             diagnosticLogs: {
//                 async RetrieveLogsRequestCommand(intent, protocol, designator)
//                 {
//                     switch (intent)
//                     {
//                         case IntentEnum.EndUserSupport:
//                         case IntentEnum.NetworkDiag:
//                         case IntentEnum.CrashLogs:
//                     }
//                     switch (protocol)
//                     {
//                         case TransferProtocolEnum.ResponsePayload:
//                             return [
//                                 diagnosticLogsCluster.StatusEnum.NoLogs,
//                                 new IsomorphicBuffer(0),
//                                 new Date().valueOf(),
//                                 new Date().valueOf()]
//                         case TransferProtocolEnum.BDX:
//                     }
//                 }
//             },
//             ethernetNetworkDiagnostics: {
//                 SupportsErrorCounts: false,
//                 SupportsPacketCounts: false,
//             },
//             fixedLabel: {
//                 LabelList: []
//             },
//             generalCommissioning: GeneralCommissioning(),
//             generalDiagnostics: {
//                 NetworkInterfaces: [],
//                 RebootCount: 0,
//                 SupportsDataModelTest: false,
//                 async TimeSnapshotCommand()
//                 {
//                     const value = new Date().valueOf();
//                     return [value, value];
//                 },
//                 async TestEventTriggerCommand(enable, trigger) { },
//                 TestEventTriggersEnabled: false
//             },
//             operationalCredentials: OperationalCredentials(),
//             groupKeyManagement: {
//                 GroupTable: [],


//             },
//             basicInformation: {
//                 CapabilityMinima: {
//                     CaseSessionsPerFabric: 1,
//                     SubscriptionsPerFabric: 1,
//                 },
//                 ConfigurationVersion: 1,
//                 DataModelRevision: 1,
//                 HardwareVersion: 1,
//                 HardwareVersionString: '',
//                 Location: '',
//                 MaxPathsPerInvoke: 1,
//                 NodeLabel: node.deviceName,
//                 ProductID: 1,
//                 ProductName: this.fabricName + '.' + node.deviceName,
//                 SoftwareVersion: 1,
//                 SoftwareVersionString: '',
//                 SpecificationVersion: 1,
//                 UniqueID: node.discriminator.toString(),
//                 VendorID: 1,
//                 VendorName: this.fabricName + '@domojs'
//             }
//         }));
//     }
//     async completeCommissionning(endpoint: Endpoint): Promise<void>
//     {
//         await this.sidecar.pubsub?.emit(`domojs/${this.fabricName}`, JSON.stringify(endpoint))
//     }
// }

// export class GatewayCommissionner<TGateway extends Gateway<any>> extends Commissionner
// {
//     constructor(sidecar: Sidecar<any, MqttEvents>, fabricName: string, private readonly factory: (node: NodeDiscoveryAnnouncement) => Promise<void>)
//     {
//         super(sidecar, fabricName);
//     }

//     async startCommissionning(node: NodeDiscoveryAnnouncement)
//     {
//         await this.factory(node);
//         return super.startCommissionning(node);
//     }
// }

// export class DomojsMosquittoCommissionner extends Commissionner
// {
//     constructor(sidecar: Sidecar<any, MqttEvents>)
//     {
//         super(sidecar, 'devices')
//     }

//     async startCommissionning(node: NodeDiscoveryAnnouncement)
//     {
//         const result = await (await this.sidecar.sidecars['@domojs/devices']).dispatch('register-adapter', node);

//         if (result)
//         {
//             if (!this.sidecar.config.pubsub)
//                 this.sidecar.config.set('pubsub', {});
//             this.sidecar.config.pubsub.set('transport', result.transport);
//             this.sidecar.config.pubsub.set('transportOptions', result.transportOptions);
//             this.sidecar.config.pubsub.transportOptions.username = node.deviceName;
//             this.sidecar.config.pubsub.transportOptions.setSecret('password', result.transportOptions.password as string);
//             await this.sidecar.config.commit();
//         }

//         await super.completeCommissionning(new Endpoint(node.deviceName, node.deviceType, {
//             basicInformation: {
//                 CapabilityMinima: {
//                     CaseSessionsPerFabric: 1,
//                     SubscriptionsPerFabric: 1,
//                 },
//                 ConfigurationVersion: 1,
//                 DataModelRevision: 1,
//                 HardwareVersion: 1,
//                 HardwareVersionString: '',
//                 Location: '',
//                 MaxPathsPerInvoke: 1,
//                 NodeLabel: node.deviceName,
//                 ProductID: 1,
//                 ProductName: 'RFXCOM.' + node.deviceName,
//                 SoftwareVersion: 1,
//                 SoftwareVersionString: '',
//                 SpecificationVersion: 1,
//                 UniqueID: node.discriminator.toString(),
//                 VendorID: 1,
//                 VendorName: 'RFXCOM@domojs'
//             }
//         }));
//     }
// }

// export class FabricServer extends AsyncTeardownManager
// {
//     private _root: FabricClient;

//     public get root() { return this._root };

//     public readonly nodes: Record<string, Node> = {};

//     public static fabricAdvertisementNode(fabricName: string): NodeDiscoveryAnnouncement
//     {
//         return {
//             commissioningMode: true,
//             deviceName: fabricName,
//             deviceType: DeviceTypes.Aggregator,
//             vendorProductId: '31416+0001',
//             discriminator: 0,
//             manufacturer: 'domojs',
//             pairingHint: PairingHints.None,
//             rotatingId: false,
//             pairingInstruction: '',
//         } as NodeDiscoveryAnnouncement;
//     }

//     private constructor(public readonly name: string, private readonly sidecar: Sidecar<unknown, MqttEvents>, public readonly commissionner: Commissionner)
//     {
//         super();
//     }

//     public static async register<TCommissionner extends Commissionner>(name: string, sidecar: Sidecar<unknown, MqttEvents>, commissionner: TCommissionner): Promise<FabricServer>
//     {
//         if (!sidecar.pubsub || (name === 'devices' && sidecar.config.pubsub.transportOptions.username !== 'devices'))
//             await new DomojsCommissionner(sidecar).startCommissionning(FabricServer.fabricAdvertisementNode(name));
//         if (sidecar.pubsub)
//         {
//             await sidecar.pubsub[Symbol.asyncDispose]();
//             delete sidecar.pubsub;
//         }
//         await pubsub(sidecar, sidecar.config.pubsub.extract());
//         const result = new FabricServer(name, sidecar, commissionner);

//         result._root = await result.teardown(FabricClient.create('devices', sidecar, new Commissionner(sidecar, 'devices')));
//         result._root.addNode(FabricServer.fabricAdvertisementNode(name));

//         await sidecar.pubsub.on(`domojs/${name}`, async data =>
//         {
//             if (typeof data !== 'string')
//                 data = data.toString('utf8');
//             const node = JSON.parse(data) as NodeDiscoveryAnnouncement;
//             if (commissionner && node.commissioningMode)
//                 commissionner.startCommissionning(node);
//             else
//                 await result.addNode({
//                     name: node.deviceName,
//                     endpoints: new ObservableArray([]),
//                     offline: async () => { }
//                 });
//         }, { noLocal: true });

//         return result;
//     }

//     public async addNode(node: Node)
//     {
//         this.nodes[node.name] = node;

//         await this.sidecar.pubsub.emit(`domojs/${this.name}`, JSON.stringify(node));
//     }

//     public async addEndpoint(node: Node, endpoint: Endpoint)
//     {
//         this.nodes[node.name].endpoints.push(endpoint);
//         if (endpoint instanceof AggregatorEndpoint)
//         {
//             if (~node.endpoints.indexOf(endpoint))
//                 node.endpoints.push(endpoint);

//             endpoint.endpoints.addListener(ev =>
//             {
//                 this.sidecar.pubsub.emit(`domojs/${this.name}/${node.name}`, JSON.stringify({
//                     value: node.endpoints,
//                     event: ev
//                 }), { qos: 1 });
//             });
//         }
//     }

//     // public async announce(node: Endpoint)
//     // {
//     //     this._root.addEndpoint(this.name, new Endpoint(node.deviceName,
//     //         node.deviceType,

//     //     );
//     // }
// }

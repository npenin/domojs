import { AllEventKeys, AllEvents, delay, EventArgs, EventEmitter, EventListener, EventOptions, IEvent, IsomorphicBuffer, SocketAdapter, SocketAdapterAkalaEventMap, SocketProtocolAdapter, StatefulSubscription, Subscription, UdpSocketAdapter } from '@akala/core';
import * as dgram from 'dgram';
import * as os from 'os';

export interface WSDiscoveryOptions
{
    uniqueServiceName?: string;
    address?: string;
    port?: number;
    server?: string;
    interval?: number;
}

export interface RemoteInfo
{
    address: string;
    port: number;
}

export interface WSDiscoveryMessage
{
    method?: 'Probe' | 'ProbeMatches' | 'Hello' | 'Bye';
    headers: Record<string, string>;
    body?: string;
    raw: string;
    remote: RemoteInfo;
}

export interface WSDiscoveryDevice
{
    address: string;
    endpointReference: string;
    types: string[];
    scopes: string[];
    xaddrs: string[];
    metadata: Record<string, string>;
}

export interface UdpMessage
{
    message: IsomorphicBuffer;
    remote: RemoteInfo;
}

export type UdpSocketAdapterAkalaEventMap = SocketAdapterAkalaEventMap<UdpMessage>;

// export class UdpSocketAdapter extends EventEmitter<SocketAdapterAkalaEventMap<UdpMessage>> implements SocketAdapter<UdpMessage>
// {
//     constructor(private readonly socket: dgram.Socket)
//     {
//         super();
//     }

//     pipe(socket: SocketAdapter<UdpMessage>)
//     {
//         this.on('message', (message) => socket.send(message));
//         this.on('close', () => socket.close());
//     }

//     public addMembership(address: string, interfaceAddress?: string)
//     {
//         if (!interfaceAddress)
//         {
//             for (const netifs of Object.values(os.networkInterfaces()))
//             {
//                 const netif = netifs?.find(netif => netif.family == 'IPv4');
//                 if (!netif)
//                     continue;
//                 this.socket.addMembership(address, netif.address);
//             }
//         }
//         else
//             this.socket.addMembership(address, interfaceAddress);
//     }

//     public bind(port: number, address?: string)
//     {
//         this.teardown(() => { const wasOpen = this.open; this.socket.close(); return wasOpen })
//         return new Promise<void>(resolve => this.socket.bind(port, address, resolve));
//     }

//     private closed: boolean;

//     get open(): boolean
//     {
//         return !this.closed
//     }

//     close(): Promise<void>
//     {
//         return new Promise(resolve => this.socket.close(() =>
//         {
//             this.closed = true;
//             resolve();
//         }));
//     }

//     send(data: UdpMessage): Promise<void>
//     {
//         if (data.remote?.port)
//             if (data.remote?.address)
//                 return new Promise((resolve, reject) => this.socket.send(data.message.toArray(), data.remote.port, data.remote.address, err =>
//                     err ? reject(err) : resolve()));
//             else
//                 return new Promise((resolve, reject) => this.socket.send(data.message.toArray(), data.remote.port, err => err ? reject(err) : resolve()));
//         else
//             return new Promise((resolve, reject) => this.socket.send(data.message.toArray(), err => err ? reject(err) : resolve()));
//     }

//     private readonly messageListeners: [(ev: unknown, x) => void, (ev: unknown, x) => void][] = [];

//     public off<const TEvent extends AllEventKeys<UdpSocketAdapterAkalaEventMap>>(
//         event: TEvent,
//         handler: EventListener<AllEvents<UdpSocketAdapterAkalaEventMap>[TEvent]>
//     ): boolean
//     {
//         switch (event)
//         {
//             case 'message':
//                 {
//                     let listeners = this.messageListeners;
//                     if (handler)
//                         listeners = listeners.filter(f => f[0] == handler);
//                     var result = false;
//                     for (const listener of listeners)
//                     {
//                         this.socket.off('message', listener[1]);
//                         result = !!this.messageListeners.splice(this.messageListeners.indexOf(listener), 1)?.length || result;
//                     }
//                 }
//                 break;
//             case 'close':
//             case 'error':
//             case 'open':
//                 //eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 this.socket.off(event, handler as any);
//                 break;
//             default:
//                 throw new Error(`Unsupported event ${String(event)}`);
//         }
//         return true;
//     }

//     public on<const TEvent extends AllEventKeys<UdpSocketAdapterAkalaEventMap>>(
//         event: TEvent,
//         handler: EventListener<AllEvents<UdpSocketAdapterAkalaEventMap>[TEvent]>,
//         options?: EventOptions<AllEvents<UdpSocketAdapterAkalaEventMap>[TEvent]>
//     ): Subscription
//     {
//         switch (event)
//         {
//             case 'message':
//                 {
//                     const x = function (data: Uint8Array, remote: dgram.RemoteInfo)
//                     {
//                         return (handler as EventListener<UdpSocketAdapterAkalaEventMap['message']>).call(this, { message: IsomorphicBuffer.fromBuffer(data), remote });
//                     };
//                     this.messageListeners.push([handler, x]);
//                     if (options?.once)
//                         this.socket.once('message', x);
//                     else
//                         this.socket.on('message', x);
//                     return new StatefulSubscription(() =>
//                     {
//                         this.messageListeners.splice(this.messageListeners.findIndex(x => x[0] === handler), 1);
//                         this.socket.off('message', x);
//                     }).unsubscribe;
//                 }

//             case 'close':
//             case 'error':
//             case 'open':
//                 //eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 if (options?.once)
//                     this.socket.once(event, handler);
//                 else
//                     this.socket.on(event, handler);
//                 return new StatefulSubscription(() =>
//                 {
//                     this.socket.off(event, handler);
//                 }).unsubscribe;
//             case Symbol.dispose:
//                 return super.on(event, handler, options);
//             default:
//                 throw new Error(`Unsupported event ${String(event)}`);
//         }
//     }

//     public once<const TEvent extends AllEventKeys<UdpSocketAdapterAkalaEventMap>>(
//         event: TEvent,
//         handler: EventListener<AllEvents<UdpSocketAdapterAkalaEventMap>[TEvent]>
//     ): Subscription
//     {
//         switch (event)
//         {
//             case 'message':
//                 return this.on(event, handler, { once: true } as EventOptions<AllEvents<UdpSocketAdapterAkalaEventMap>[TEvent]>);
//             case 'close':
//             case 'error':
//             case 'open':
//             case Symbol.dispose:
//                 return this.on(event, handler, { once: true } as EventOptions<AllEvents<UdpSocketAdapterAkalaEventMap>[TEvent]>);
//             default:
//                 let x: never = event;
//                 throw new Error(`Unsupported event ${x}`);
//         }
//     }
// }

export class WSDiscovery extends EventEmitter<{ message: IEvent<[WSDiscoveryMessage], void>, device: IEvent<[WSDiscoveryDevice], void> }>
{
    private readonly socket: UdpSocketAdapter;
    private intervalId: NodeJS.Timeout | undefined;

    public static readonly port = 3702;
    public static readonly address = '239.255.255.250';
    public static readonly messageId = 'MessageID';
    public static readonly replyTo = 'ReplyTo';
    public static readonly action = 'Action';
    public static readonly to = 'To';
    public static readonly relatesTo = 'RelatesTo';

    public readonly ready: Promise<void>;

    constructor()
    {
        super();
        this.socket = this.teardown(new UdpSocketAdapter(dgram.createSocket({ type: 'udp4', reuseAddr: true })));

        this.teardown(this.socket.on('message', this.handleMessage.bind(this)));
        this.ready = this.socket.bind(WSDiscovery.port).then(() =>
        {
            this.socket.addMembership(WSDiscovery.address);
        });
    }

    private handleMessage(msgBytes: UdpMessage)
    {
        const msg = msgBytes.message.toString('utf8');

        // Parse SOAP/WS-Addressing envelope
        const message: WSDiscoveryMessage = {
            headers: {},
            raw: msg,
            remote: msgBytes.remote
        };

        // Parse XML envelope
        try
        {
            // Extract method from Action header
            const actionMatch = msg.match(/<Action>(.*?)<\/Action>/);
            if (actionMatch)
            {
                const actionUri = actionMatch[1];
                if (actionUri.includes('Probe') && !actionUri.includes('Matches'))
                    message.method = 'Probe';
                else if (actionUri.includes('ProbeMatches'))
                    message.method = 'ProbeMatches';
                else if (actionUri.includes('Hello'))
                    message.method = 'Hello';
                else if (actionUri.includes('Bye'))
                    message.method = 'Bye';
            }

            // Extract headers
            const messageIdMatch = msg.match(/<MessageID>(.*?)<\/MessageID>/);
            if (messageIdMatch)
                message.headers[WSDiscovery.messageId] = messageIdMatch[1];

            const replyToMatch = msg.match(/<ReplyTo>.*?<Address>(.*?)<\/Address>.*?<\/ReplyTo>/s);
            if (replyToMatch)
                message.headers[WSDiscovery.replyTo] = replyToMatch[1];

            const toMatch = msg.match(/<To>(.*?)<\/To>/);
            if (toMatch)
                message.headers[WSDiscovery.to] = toMatch[1];

            // Extract body
            const bodyMatch = msg.match(/<ProbeMatches>[\s\S]*?<\/ProbeMatches>|<Hello>[\s\S]*?<\/Hello>|<Bye>[\s\S]*?<\/Bye>/);
            if (bodyMatch)
                message.body = bodyMatch[0];

            this.emit('message', message as any);

            // Parse ProbeMatches responses
            if (message.method === 'ProbeMatches' && message.body)
            {
                this.parseProbeMatches(message.body, msgBytes.remote.address);
            }
        }
        catch (e)
        {
            console.error('Error parsing WS-Discovery message:', e);
        }
    }

    private parseProbeMatches(body: string, address: string)
    {
        const probeMatchRegex = /<ProbeMatch>([\s\S]*?)<\/ProbeMatch>/g;
        let match;

        while ((match = probeMatchRegex.exec(body)) !== null)
        {
            const matchBody = match[1];
            const device: WSDiscoveryDevice = {
                address,
                endpointReference: this.extractXmlValue(matchBody, 'EndpointReference/Address'),
                types: this.extractXmlValues(matchBody, 'Types'),
                scopes: this.extractXmlValues(matchBody, 'Scopes/Scope'),
                xaddrs: this.extractXmlValues(matchBody, 'XAddrs'),
                metadata: {}
            };

            this.emit('device', device);
        }
    }

    private extractXmlValue(xml: string, path: string): string
    {
        const parts = path.split('/');
        let regex = `<${parts[0]}>(.*?)</${parts[0]}>`;
        for (let i = 1; i < parts.length; i++)
        {
            regex = `<${parts[i]}>(.*?)</${parts[i]}>`;
        }
        const match = xml.match(new RegExp(regex));
        return match ? match[1] : '';
    }

    private extractXmlValues(xml: string, tagName: string): string[]
    {
        const values: string[] = [];
        const regex = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 'g');
        let match;
        while ((match = regex.exec(xml)) !== null)
        {
            values.push(match[1]);
        }
        return values;
    }

    private createProbeMessage(): string
    {
        const messageId = `uuid:${this.generateUUID()}`;
        return `<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope"
           xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing"
           xmlns:wsd="http://schemas.xmlsoap.org/ws/2005/04/discovery">
  <Header>
    <wsa:Action>http://schemas.xmlsoap.org/ws/2005/04/discovery/Probe</wsa:Action>
    <wsa:MessageID>${messageId}</wsa:MessageID>
    <wsa:ReplyTo>
      <wsa:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</wsa:Address>
    </wsa:ReplyTo>
    <wsa:To>urn:schemas-xmlsoap-org:ws:2005:04:discovery</wsa:To>
  </Header>
  <Body>
    <wsd:Probe/>
  </Body>
</Envelope>`;
    }

    private generateUUID(): string
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
        {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public startProbe(cancel?: AbortSignal): Promise<void>
    {
        const message = this.createProbeMessage();
        const messageBuffer = IsomorphicBuffer.from(message);

        return this.socket.send({
            message: messageBuffer,
            remote: { port: WSDiscovery.port, address: WSDiscovery.address }
        });
    }

    public async probe(timeoutMs: number = 4000): Promise<WSDiscoveryDevice[]>
    {
        const discovered = new Map<string, WSDiscoveryDevice>();

        const sub = this.on('device', device => discovered.set(device.endpointReference, device));

        await this.startProbe();
        await delay(timeoutMs);
        sub();

        return Array.from(discovered.values());
    }

    public close(): Promise<void>
    {
        if (this.intervalId)
            clearInterval(this.intervalId);
        return this.socket.close();
    }
}

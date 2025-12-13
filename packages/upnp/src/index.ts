import { AllEventKeys, AllEvents, delay, EventArgs, EventEmitter, EventListener, EventOptions, HttpStatusCode, IEvent, IsomorphicBuffer, RemoteInfo, SocketAdapter, SocketAdapterAkalaEventMap, SocketProtocolAdapter, StatefulSubscription, Subscription, UdpMessage, UdpSocketAdapter } from '@akala/core';

export interface SSDPOptions
{
    uniqueServiceName?: string;
    searchTarget?: string;
    location?: string;
    server?: string;
    interval?: number; // advertisement interval
}

export interface SSDPMessage
{
    method?: 'M-SEARCH' | 'NOTIFY';
    headers: Record<string, string>;
    raw: string;
    remote: RemoteInfo;
    status?: HttpStatusCode
}


export interface SSDPDevice
{
    searchTarget: string;
    uniqueServiceName: string;
    location?: string;
    server?: string;
    address: string;
    cacheControl: string;
}

import dgram from 'dgram';

// export interface UdpMessage
// {
//     message: IsomorphicBuffer
//     remote: RemoteInfo
// }

// export type UdpSocketAdapterAkalaEventMap = SocketAdapterAkalaEventMap<UdpMessage>;

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

//     /**
//          * Tells the kernel to join a multicast group at the given `multicastAddress` and `multicastInterface` using the `IP_ADD_MEMBERSHIP` socket option. If the `multicastInterface` argument is not
//          * specified, the operating system will choose
//          * one interface and will add membership to it. To add membership to every
//          * available interface, call `addMembership` multiple times, once per interface.
//          *
//          * When called on an unbound socket, this method will implicitly bind to a random
//          * port, listening on all interfaces.
//          *
//          **/
//     public addMembership(address: string, interfaceAddress?: string)
//     {
//         if (!interfaceAddress)
//         {
//             for (const netifs of Object.values(os.networkInterfaces()))
//             {
//                 const netif = netifs.find(netif => netif.family == 'IPv4');
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

export class SSDP extends EventEmitter<{ message: IEvent<[SSDPMessage,], void>, device: IEvent<[SSDPDevice], void> }>
{
    private readonly socket: UdpSocketAdapter;
    private intervalId: NodeJS.Timeout | undefined;

    public static readonly port = 1900;
    public static readonly address = '239.255.255.250';
    public static readonly uniqueServiceName = 'USN';
    public static readonly searchTarget = 'ST';
    public static readonly notifyTarget = 'NT';
    public static readonly notifyTargetStatus = 'NTS';
    public static readonly notifyTargetStatusAlive = 'ssdp:alive';
    public static readonly notifyTargetStatusDead = 'ssdp:byebye';
    public static readonly location = 'LOCATION';
    public static readonly server = 'SERVER';

    public readonly ready: Promise<void>;

    constructor()
    {
        super();
        // this.options = { interval: 30000, server: 'domojs/ssdp', ...options };
        this.socket = this.teardown(new UdpSocketAdapter(dgram.createSocket({ type: 'udp4', reuseAddr: true })));

        this.teardown(this.socket.on('message', this.handleMessage.bind(this)));
        this.ready = this.socket.bind(0).then(() =>
        {
            this.socket.addMembership(SSDP.address);
        });
    }

    private handleMessage(msgBytes: UdpMessage)
    {
        const msg = msgBytes.message.toString('utf8');
        const lines = msg.split('\r\n').filter(l => l.trim());
        const [first, ...headerLines] = lines;
        const headers: Record<string, string> = {};
        headerLines.forEach(line =>
        {
            const indexOfColumn = line.indexOf(':');
            if (indexOfColumn > -1)
                headers[line.substring(0, indexOfColumn).toUpperCase()] = line.substring(indexOfColumn + 1).trim();
            else
                console.error(`${line} is not a valid header`);
        });

        const message: SSDPMessage = {
            headers,
            raw: msg,
            remote: msgBytes.remote
        };

        if (first.startsWith('M-SEARCH'))
        {
            message.method = 'M-SEARCH';
        }
        else if (first.startsWith('NOTIFY'))
        {
            message.method = 'NOTIFY';
        }
        else if (first.startsWith('HTTP/1.1'))
        {
            message.status = parseInt(first.split(' ')[1], 10);
        }

        this.emit('message', message as any);

        // Basic response handling for browsing
        if (message.status === 200)
        {
            const device: SSDPDevice = {
                searchTarget: headers[SSDP.searchTarget],
                uniqueServiceName: headers[SSDP.uniqueServiceName],
                location: headers[SSDP.location],
                server: headers[SSDP.server],
                address: msgBytes.remote.address,
                cacheControl: headers['CACHE-CONTROL']
            };
            this.emit('device', device);
        }
    }

    private respond(options: SSDPOptions, remote: RemoteInfo)
    {
        const response = [
            'HTTP/1.1 200 OK',
            `${SSDP.searchTarget}: ${options.searchTarget}`,
            `${SSDP.uniqueServiceName}: ${options.uniqueServiceName}`,
            `${SSDP.location}: ${options.location}`,
            `${SSDP.server}: ${options.server}`,
            '',
            ''
        ].join('\r\n');

        return this.socket.send({ message: IsomorphicBuffer.from(response), remote });
    }

    public advertise(options: SSDPOptions, cancel?: AbortSignal)
    {
        if (this.intervalId)
            clearInterval(this.intervalId);

        const message = [
            'NOTIFY * HTTP/1.1',
            `HOST: ${SSDP.address}:${SSDP.port}`,
            `${SSDP.notifyTarget}: ${options.searchTarget}`,
            `${SSDP.notifyTargetStatus}: ${SSDP.notifyTargetStatusAlive}`,
            `${SSDP.uniqueServiceName}: ${options.uniqueServiceName}`,
            `${SSDP.location}: ${options.location}`,
            `${SSDP.server}: ${options.server}`,
            `CACHE-CONTROL: max-age=${options.interval * 1.2}`,
            '',
            ''
        ].join('\r\n');

        this.on('message', (message) =>
        {
            if (message.method === 'M-SEARCH' && message.headers[SSDP.searchTarget] === options.searchTarget)
                this.respond(options, message.remote);
        });

        const send = () =>
        {
            this.socket.send({ message: IsomorphicBuffer.from(message), remote: { port: SSDP.port, address: SSDP.address } });
        };

        send();
        this.intervalId = setInterval(send, options.interval);
        cancel?.addEventListener('abort', () => this.stopAdvertising(options));
    }

    public stopAdvertising(options: SSDPOptions)
    {
        if (this.intervalId)
            clearInterval(this.intervalId);
        const message = [
            'NOTIFY * HTTP/1.1',
            `HOST: ${SSDP.address}:${SSDP.port}`,
            `${SSDP.notifyTarget}: ${options.searchTarget}`,
            `${SSDP.notifyTargetStatus}: ${SSDP.notifyTargetStatusDead}`,
            `${SSDP.uniqueServiceName}: ${options.uniqueServiceName}`,
            '',
            ''
        ].join('\r\n');

        return this.socket.send({ message: IsomorphicBuffer.from(message), remote: { port: SSDP.port, address: SSDP.address } });
    }

    /** Browse for SSDP services/devices */
    public startSearch(st: string = 'ssdp:all', mx = 2, cancel?: AbortSignal): Promise<void>
    {
        const message = [
            'M-SEARCH * HTTP/1.1',
            `HOST: ${SSDP.address}:${SSDP.port}`,
            'MAN: "ssdp:discover"',
            `MX: ${mx}`,
            `${SSDP.searchTarget}: ${st}`,
            '',
            ''
        ].join('\r\n');

        return this.socket.send({ message: IsomorphicBuffer.from(message), remote: { port: SSDP.port, address: SSDP.address } });
    }

    /** Browse for SSDP services/devices */
    public async search(st: string = 'ssdp:all', mx = 2): Promise<SSDPDevice[]>
    {
        const discovered = new Map<string, SSDPDevice>();

        const sub = this.on('device', device => discovered.set(device.uniqueServiceName, device));

        const abort = new AbortController();
        await this.startSearch(st, mx, abort.signal);

        await delay((mx + 1) * 1000);
        sub();

        return Array.from(discovered.values());
    }
}

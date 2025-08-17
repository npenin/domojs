import { AsyncEventBus, IsomorphicBuffer, asyncEventBuses, Deferred, UrlTemplate } from '@akala/core';
import { ProtocolEvents } from './shared.js';
import { Socket } from 'net';
import { TLSSocket } from 'tls';
import './protocol/index.js'
import { MqttClient } from './mqtt-client.shared.js';
import { NetSocketAdapter } from '@akala/commands';

asyncEventBuses.useProtocol('mqtt', async (url, config) =>
{
    const socket = new Socket({ ...config, signal: config.abort });

    const defer = new Deferred<void>();
    const port = Number(url.port);
    socket.connect(!isNaN(port) && port ? port : 1883, url.hostname, defer.resolve.bind(defer));
    socket.on('error', defer.reject.bind(defer));

    await defer;

    const protocolEvents = new ProtocolEvents(new NetSocketAdapter(socket));

    socket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password || config.username || config.password)
        await client.connect({ userName: url.username || config.username as string, password: IsomorphicBuffer.from(url.password || config.password as string) });
    else
        await client.connect({});

    return client as AsyncEventBus;
});

asyncEventBuses.useProtocol('mqtts', async (url, config) =>
{
    const socket = new Socket({ ...config, signal: config.abort });
    const tlsSocket = new TLSSocket(socket, config as any);

    const defer = new Deferred<void>();
    const port = Number(url.port);
    socket.connect(!isNaN(port) && port ? port : 8883, url.hostname, defer.resolve.bind(defer));

    socket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })
    tlsSocket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })
    tlsSocket.on('error',
        (x) => defer.reject(x));
    socket.on('error',
        (x) => defer.reject(x));

    await defer;

    const protocolEvents = new ProtocolEvents(new NetSocketAdapter(tlsSocket));

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password)
        await client.connect({ userName: url.username, password: IsomorphicBuffer.from(url.password) });
    else
        await client.connect({});

    return client as AsyncEventBus;
})

asyncEventBuses.useProtocol('mqtt+tls', async (url, config) =>
{
    return asyncEventBuses.process(new URL('mqtts:' + url.host + url.pathname + url.search + url.hash), config);
})

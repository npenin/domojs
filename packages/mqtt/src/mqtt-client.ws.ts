import { AsyncEventBus, IsomorphicBuffer, asyncEventBuses, Deferred, UrlTemplate, WebSocketAdapter } from '@akala/core';
import { ProtocolEvents } from './shared.js';
import './protocol/index.js'
import { MqttClient } from './mqtt-client.shared.js';

asyncEventBuses.useProtocol('mqtt+ws', async (url, config) =>
{
    if (config?.abort)
        config.abort.addEventListener('abort', () => socket.close());

    const defer = new Deferred<void>();
    const port = Number(url.port);
    const socket = new WebSocket(new URL(`ws://${url.hostname}:${port ?? 9001}${url.pathname}${url.search}${url.hash}`), 'mqtt');
    socket.binaryType = 'arraybuffer';
    socket.addEventListener('error', () => defer.reject(new Error('WebSocket connection error')));
    socket.addEventListener('open', () => defer.resolve());

    await defer;

    const protocolEvents = new ProtocolEvents(new WebSocketAdapter(socket));

    socket.addEventListener('error', (err: ErrorEvent) =>
    {
        if (err.error !== config.abort.reason)
            console.error(err);
    })

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);
    if (url.username || url.password || config.username || config.password)
        await client.connect({ userName: config.username as string || url.username, password: IsomorphicBuffer.from(config.password as string || url.password) });
    else
        await client.connect({});

    return client as AsyncEventBus;
});

asyncEventBuses.useProtocol('mqtt+wss', async (url, config) =>
{
    if (config?.abort)
        config.abort.addEventListener('abort', () => socket.close());

    const defer = new Deferred<void>();
    const port = Number(url.port);
    const socket = new WebSocket(new URL(`wss://${url.hostname}:${port ?? 443}${url.pathname}${url.search}${url.hash}`), 'mqtt');
    socket.binaryType = 'arraybuffer';
    socket.addEventListener('error', () => defer.reject(new Error('WebSocket connection error')));
    socket.addEventListener('open', () => defer.resolve());

    await defer;

    const protocolEvents = new ProtocolEvents(new WebSocketAdapter(socket));

    socket.addEventListener('error', (err: ErrorEvent) =>
    {
        if (err.error !== config.abort.reason)
            console.error(err);
    })

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);
    if (url.username || url.password || config.username || config.password)
        await client.connect({ userName: config.username as string || url.username, password: IsomorphicBuffer.from(config.password as string || url.password) });
    else
        await client.connect({});

    return client as AsyncEventBus;
});
import { AsyncEventBus, IsomorphicBuffer, asyncEventBuses, Deferred, UrlTemplate, IntervalRetry, SocketWithConnectionRetry } from '@akala/core';
import { ProtocolEvents } from './shared.js';
import { Socket } from 'net';
import { TLSSocket } from 'tls';
import './protocol/index.js'
import { MqttClient } from './mqtt-client.shared.js';
import { TcpSocketAdapter } from '@akala/core';

asyncEventBuses.useProtocol('mqtt', async (url, config) =>
{
    const socket = new Socket({ ...config, signal: config.abort });

    const defer = new Deferred<void>();
    const port = Number(url.port);
    socket.connect(!isNaN(port) && port ? port : 1883, url.hostname, defer.resolve.bind(defer));
    socket.on('error', defer.reject.bind(defer));

    await defer;

    const retry = IntervalRetry.fixedInterval(() =>
    {
        socket.connect(!isNaN(port) && port ? port : 1883, url.hostname, () => retry.stop());
    }, 10000);

    const protocolEvents = new ProtocolEvents(new SocketWithConnectionRetry(new TcpSocketAdapter(socket), retry));

    socket.on('error', err =>
    {
        if (err.cause !== config.abort.reason)
            console.error(err);
    })

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password || config.username || config.password)
        await client.connect({ userName: config.username as string || url.username, password: IsomorphicBuffer.from(config.password as string || url.password) });
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

    const retry = IntervalRetry.fixedInterval(() =>
    {
        socket.connect(!isNaN(port) && port ? port : 1883, url.hostname, () => retry.stop());
    }, 10000);

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

    const protocolEvents = new ProtocolEvents(new SocketWithConnectionRetry(new TcpSocketAdapter(tlsSocket), retry));

    const client = new MqttClient(config?.['clientId'] as string ?? crypto.randomUUID(), protocolEvents);

    if (url.username || url.password || config.username || config.password)
        await client.connect({ userName: config.username as string || url.username, password: IsomorphicBuffer.from(config.password as string || url.password) });
    else
        await client.connect({});

    return client as AsyncEventBus;
})

asyncEventBuses.useProtocol('mqtt+tls', async (url, config) =>
{
    return asyncEventBuses.process(new URL('mqtts:' + url.host + url.pathname + url.search + url.hash), config);
})

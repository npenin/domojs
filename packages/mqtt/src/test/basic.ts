import { asyncEventBuses, Deferred, delay } from '@akala/core'
import { describe, it } from 'node:test'
import '../mqtt-client.net.js'
import { MqttClient } from '../mqtt-client.shared.js'
import { RetainHandling } from '../protocol/subscribe.js'
import { Socket } from 'net'
import { ProtocolEvents } from '../index.js'
import { TcpSocketAdapter } from '@akala/core'

describe('mosquitto tests', () =>
{

    it('should subscribe fast', { timeout: 60000 }, async (x) =>
    {
        const socket = new Socket({ signal: x.signal });

        const defer = new Deferred<void>();
        socket.connect(1883, 'test.mosquitto.org', defer.resolve.bind(defer));
        socket.on('error', defer.reject.bind(defer));

        await defer;

        const protocolEvents = new ProtocolEvents(new TcpSocketAdapter(socket));

        const mqtt = new MqttClient('akala_v0', protocolEvents);

        console.profile();
        console.time('mqtt')
        await mqtt.connect({});
        console.timeLog('mqtt', 'connected')

        console.profile('subscribe');
        await mqtt.on('presence',
            (data, options) =>
            {
                console.log(data);
                console.log(options);
            }
            , { maxQoS: 0, retainHandling: RetainHandling.SendAtSubscribe });
        console.profileEnd('subscribe')
        console.timeLog('mqtt', 'subscribed')


        await mqtt.emit('presence', 'Hello akala !');
        console.timeLog('mqtt', 'published')

        await mqtt.disconnect();
        console.timeLog('mqtt', 'disconnected')
        console.timeEnd('mqtt');

        await mqtt[Symbol.asyncDispose]();
        console.profileEnd();
    });

    it('should subscribe', { timeout: 60000 }, async (x) =>
    {
        const mqtt = await asyncEventBuses.process(new URL('mqtt://test.mosquitto.org'), { clientId: 'akala_v0', abort: x.signal } as any) as MqttClient;

        await mqtt.on('presence',
            (data, options) =>
            {
                console.log(data);
                console.log(options);
            }
            , { maxQoS: 0, retainHandling: RetainHandling.SendAtSubscribe });



        await mqtt.emit('presence', 'Hello akala !');

        await mqtt.disconnect();

        await mqtt[Symbol.asyncDispose]();
    });

    it('should subscribe on mqtts', { timeout: 60000 }, async (x) =>
    {
        const mqtt = await asyncEventBuses.process(new URL('mqtts://test.mosquitto.org'), { clientId: 'akala_v0', abort: x.signal, ca: await (await fetch('https://test.mosquitto.org/ssl/mosquitto.org.crt')).text() } as any) as MqttClient;

        await mqtt.on('presence',
            (data, options) =>
            {
                console.log(data);
                console.log(options);
            }
            , { maxQoS: 0, retainHandling: RetainHandling.SendAtSubscribe });



        await mqtt.emit('presence', 'Hello akala !');

        await mqtt.disconnect();

        await mqtt[Symbol.asyncDispose]();
    });

    it('should work with existing mqtt', async () =>
    {
        const mqtt = await import("mqtt");
        const client = mqtt.connect("mqtt://test.mosquitto.org");

        client.on("connect", () =>
        {
            client.subscribe("presence", (err) =>
            {
                if (!err)
                {
                    client.publish("presence", "Hello mqtt");
                }
            });
        });

        client.on("message", (topic, message) =>
        {
            // message is Buffer
            console.log(message.toString());
            client.end();
        });
    })
})
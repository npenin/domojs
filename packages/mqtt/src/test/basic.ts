import { asyncEventBuses, delay } from '@akala/core'
import { describe, it } from 'node:test'
import '../mqtt-client.js'
import { MqttClient } from '../mqtt-client.js'
import { RetainHandling } from '../protocol/subscribe.js'

describe('mosquitto tests', () =>
{
    it('should subscribe', { timeout: 60000 }, async (x) =>
    {
        if (x.signal.aborted)
            return;
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
        if (x.signal.aborted)
            return;

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
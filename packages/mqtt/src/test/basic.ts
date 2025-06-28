import { asyncEventBuses, delay } from '@akala/core'
import { describe, it } from 'node:test'
import '../mqtt-client.js'
import { MqttClient } from '../mqtt-client.js'
import { RetainHandling } from '../protocol/subscribe.js'

describe('mosquitto tests', () =>
{
    it.only('should subscribe', { timeout: 60000 }, async (x) =>
    {
        const mqtt = await asyncEventBuses.process(new URL('mqtt://test.mosquitto.org'), { clientId: 'akala_v0', abort: x.signal } as any) as MqttClient;

        x.signal.addEventListener('abort', () => console.log(x.signal.reason));
        await mqtt.on('presence',
            (data, options) =>
            {
                console.log(data);
                console.log(options);
            }
            , { maxQoS: 0, retainHandling: RetainHandling.SendAtSubscribe });



        await mqtt.emit('presence', 'Hello akala !');

        await delay(20000);

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
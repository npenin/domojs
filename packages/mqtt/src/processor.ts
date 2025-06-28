import { Trigger, Configuration } from '@akala/commands'
import { asyncEventBuses, eachAsync, mapAsync } from '@akala/core';
import { MqttClient } from './mqtt-client.js';
import { Properties } from './protocol/_shared.js';

export interface MqttConfiguration extends Configuration
{
    topics: string[],
    qos?: number,
    properties?: Properties,
}

declare module '@akala/commands'
{
    export interface ConfigurationMap
    {
        mqtt: MqttConfiguration;
    }
}

export class MqttProcessor
{
    public static trigger = new Trigger('mqtt', async (container, mqttUrl: URL) =>
    {
        const meta = await container.dispatch('$metadata', true);

        if (mqttUrl.protocol !== 'mqtt:' && mqttUrl.protocol !== 'mqtts:')
            throw new Error('Only ')

        const client = await asyncEventBuses.process(mqttUrl, Object.fromEntries(mqttUrl.searchParams.entries())) as MqttClient
        await eachAsync(meta.commands, async cmd =>
        {
            if (!cmd.config.mqtt)
                return;


            mapAsync(cmd.config.mqtt.topics, async (topic) =>
                await client.on(topic, (data, options) =>
                {
                    container.dispatch(cmd, {
                        data,
                        options,
                        _trigger: MqttProcessor.trigger.name,

                    });
                }, { maxQoS: cmd.config.mqtt.qos ?? 1, properties: cmd.config.mqtt.properties })
                , true);
        });
    })
}
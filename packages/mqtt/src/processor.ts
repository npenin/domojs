import { Trigger, Configuration, Container, Metadata, ICommandProcessor, StructuredParameters, Processors } from '@akala/commands'
import { asyncEventBuses, eachAsync, mapAsync, MiddlewarePromise, NotHandled, UrlTemplate } from '@akala/core';
import { MqttClient } from './mqtt-client.shared.js';
import { Properties } from './protocol/_shared.js';
import { MqttEvents } from './shared.js';

export interface MqttConfiguration extends Configuration
{
    topics: string[];
    qos?: number;
    properties?: Properties;
    publishTopic: string;
    retain?: boolean;
}

declare module '@akala/commands'
{
    export interface ConfigurationMap
    {
        mqtt: MqttConfiguration;
    }
}

export class MqttProcessor implements ICommandProcessor
{
    public static trigger = new Trigger('mqtt', async (container, mqttUrl: URL) =>
    {
        const meta = await container.dispatch('$metadata', true);

        if (mqttUrl.protocol !== 'mqtt:' && mqttUrl.protocol !== 'mqtts:')
            throw new Error('Only ')

        const client = await asyncEventBuses.process<MqttEvents>(mqttUrl, Object.fromEntries(mqttUrl.searchParams.entries()))
        await eachAsync(meta.commands, async cmd =>
        {
            if (!cmd.config.mqtt)
                return;


            await mapAsync(cmd.config.mqtt.topics, async (topic) =>
            {
                const topicTemplate = UrlTemplate.parse(topic);


                await client.on(mqttUrl.pathname + uriTemplateToTopic(topicTemplate), (data, options) =>
                {
                    return container.dispatch(cmd, {
                        data,
                        get payload()
                        {
                            if (typeof data == 'string')
                                return JSON.parse(data);
                            else
                                return JSON.parse(new TextDecoder().decode(data.toArray()));
                        },
                        options,
                        _trigger: MqttProcessor.trigger.name,
                        topic: UrlTemplate.match(options.publishedTopic, topicTemplate).variables

                    });
                }, { maxQoS: cmd.config.mqtt.qos ?? 1, properties: cmd.config.mqtt.properties })
            }
                , true);
        });
    })

    // Implement the required handle method
    public async handle(origin: Container<unknown>, cmd: Metadata.Command, param: StructuredParameters): MiddlewarePromise
    {
        if (!cmd?.config?.mqtt?.publishTopic)
            return NotHandled;

        return Processors.Local.handle(cmd, async (...args) =>
        {
            await this.mqtt.publish(this.prefix + cmd.config.mqtt.publishTopic, JSON.stringify(args), { qos: cmd.config.mqtt?.qos, retain: cmd.config.mqtt?.retain, properties: cmd.config.mqtt.properties })
        }, origin, param)
    }

    constructor(private mqtt: MqttClient, private readonly prefix: string = '') { }
}

function uriTemplateToTopic(topicTemplate: UrlTemplate.UriTemplate): string
{
    return topicTemplate.map(segment =>
    {
        if (typeof segment === 'string')
            return segment;
        // segment is a variable placeholder
        return `+`;
    }).join('/');
}

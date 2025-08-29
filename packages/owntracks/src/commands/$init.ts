import { CliContext } from "@akala/cli";
import app, { SidecarConfiguration } from "@akala/sidecar";
import { BridgeConfiguration, clusterFactory, ClusterIds, ClusterInstance, Endpoint, LocationCluster, registerNode } from "@domojs/devices";
import { ProxyConfiguration } from '@akala/config'
import { Subscription, UrlTemplate } from '@akala/core';
import { MqttEvents } from "@domojs/mqtt";

export async function start(context: CliContext<{}, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{
    const self = await app<{}, MqttEvents>(context);

    // Register OwnTracks node with root permissions to access owntracks/# topics
    const root = await registerNode('owntracks', self, context.state, context.abort.signal, true);

    const deviceLocationTemplate = UrlTemplate.parse('owntracks/{user}/{device}');
    const eventTemplate = UrlTemplate.parse('owntracks/{user}/{device}/event');
    const waypointTemplate = UrlTemplate.parse('owntracks/{user}/{device}/waypoint');
    const infoTemplate = UrlTemplate.parse('owntracks/{user}/{device}/info');
    const cmdTemplate = UrlTemplate.parse('owntracks/{user}/{device}/cmd');

    // Subscribe to OwnTracks topics using proper async subscription
    await self.pubsub.on('owntracks/+/+', async (message, options) =>
    {
        const match = UrlTemplate.match(options.publishedTopic, deviceLocationTemplate)
        if (match?.variables)
        {
            const endpointId = await root.getEndpointId(`${match.variables.user}/${match.variables.device}`);
            const endpoint = root.endpoints.find(ep => ep.id == endpointId);
            const json = JSON.parse(message as string);

            if (!endpoint)
            {
                root.endpoints.push(new Endpoint(endpointId, {
                    location: clusterFactory({
                        id: ClusterIds.location,
                        location: `${json.lat} ${json.lon}`,
                        altitude: json.alt,
                        accuracy: json.acc,
                    })
                }))
            }
            else
            {
                endpoint.patch({
                    location: {
                        location: `${json.lat} ${json.lon}`,
                        altitude: json.alt,
                        accuracy: json.acc,
                    }
                })
            }
        }
        console.log('Received OwnTracks location:', { topic: options?.publishedTopic, message });
        // TODO: Process location messages
    });

    await self.pubsub.on('owntracks/+/+/event', (message, options) =>
    {
        console.log('Received OwnTracks event:', { topic: options?.publishedTopic, message });
        // TODO: Process region enter/leave events
    });

    await self.pubsub.on('owntracks/+/+/waypoint', (message, options) =>
    {
        console.log('Received OwnTracks waypoint:', { topic: options?.publishedTopic, message });
        // TODO: Process waypoint definitions
    });

    await self.pubsub.on('owntracks/+/+/info', (message, options) =>
    {
        console.log('Received OwnTracks info:', { topic: options?.publishedTopic, message });
        // TODO: Process device information
    });
}

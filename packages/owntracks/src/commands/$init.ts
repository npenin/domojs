import { CliContext } from "@akala/cli";
import app, { SidecarConfiguration } from "@akala/sidecar";
import { BridgeConfiguration, clusterFactory, ClusterIds, ClusterInstance, Endpoint, LocationCluster, MatterClusterIds, powerSourceCluster, registerNode } from "@domojs/devices";
import { ProxyConfiguration } from '@akala/config'
import { Subscription, UrlTemplate } from '@akala/core';
import { MqttEvents } from "@domojs/mqtt";

export default async function start(context: CliContext<{}, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{
    const self = await app<{}, MqttEvents>(context);

    // Register OwnTracks node with root permissions to access owntracks/# topics
    const root = await registerNode('owntracks', self, context.state, context.abort.signal, true);
    await root.attach(self.pubsub);

    const deviceLocationTemplate = UrlTemplate.parse('owntracks/{user}/{device}');
    const eventTemplate = UrlTemplate.parse('owntracks/{user}/{device}/event');
    const waypointTemplate = UrlTemplate.parse('owntracks/{user}/{device}/waypoint');
    const infoTemplate = UrlTemplate.parse('owntracks/{user}/{device}/info');
    const cmdTemplate = UrlTemplate.parse('owntracks/{user}/{device}/cmd');

    // Subscribe to OwnTracks topics using proper async subscription
    await self.pubsub.on('owntracks/+/+', async (message, options) =>
    {
        const match = UrlTemplate.match(options.publishedTopic, deviceLocationTemplate);

        if (typeof message !== 'string')
            message = message.toString('utf-8');

        if (match?.variables)
        {
            const endpointId = await root.getEndpointId(`${match.variables.user}/${match.variables.device}`);
            const endpoint = root.endpoints.find(ep => ep.id == endpointId);
            const json = JSON.parse(message as string);

            if (!endpoint)
            {
                if (json._type == 'location')
                    root.endpoints.push(new Endpoint(endpointId, {
                        location: clusterFactory({
                            id: ClusterIds.location,
                            location: `${json.lat} ${json.lon}`,
                            altitude: json.alt,
                            accuracy: json.acc,
                        }),
                        powerSource: clusterFactory({
                            id: MatterClusterIds.PowerSource,
                            Status: powerSourceCluster.PowerSourceStatusEnum.Active,
                            EndpointList: [],
                            Order: 0,
                            Description: 'OwnTracks Device Battery',
                            SupportsBattery: true,
                            SupportsRechargeable: true,
                            SupportsReplaceable: false,
                            SupportsWired: false,
                            BatPresent: true,
                            BatPercentRemaining: json.batt || 100,
                            BatChargeLevel: json.batt ? (json.batt > 20 ? powerSourceCluster.BatChargeLevelEnum.OK :
                                json.batt > 10 ? powerSourceCluster.BatChargeLevelEnum.Warning :
                                    powerSourceCluster.BatChargeLevelEnum.Critical) :
                                powerSourceCluster.BatChargeLevelEnum.OK,
                            BatReplacementNeeded: false,
                            BatReplaceability: powerSourceCluster.BatReplaceabilityEnum.UserReplaceable,
                            BatChargeState: json.bs === 2 ? powerSourceCluster.BatChargeStateEnum.IsCharging :
                                json.bs === 3 ? powerSourceCluster.BatChargeStateEnum.IsAtFullCharge :
                                    powerSourceCluster.BatChargeStateEnum.Unknown,
                            BatFunctionalWhileCharging: true,
                            ActiveBatFaults: [],
                            BatReplacementDescription: 'Replace with compatible rechargeable battery'
                        })
                    }))
            }
            else
            {
                if (json._type == 'location')
                    endpoint.patch({
                        location: {
                            location: `${json.lat} ${json.lon}`,
                            altitude: json.alt,
                            accuracy: json.acc,
                        },
                        powerSource: {
                            BatPercentRemaining: json.batt || 100,
                            BatChargeLevel: json.batt ? (json.batt > 20 ? powerSourceCluster.BatChargeLevelEnum.OK :
                                json.batt > 10 ? powerSourceCluster.BatChargeLevelEnum.Warning :
                                    powerSourceCluster.BatChargeLevelEnum.Critical) :
                                powerSourceCluster.BatChargeLevelEnum.OK,
                            BatChargeState: json.bs === 2 ? powerSourceCluster.BatChargeStateEnum.IsCharging :
                                json.bs === 3 ? powerSourceCluster.BatChargeStateEnum.IsAtFullCharge :
                                    powerSourceCluster.BatChargeStateEnum.Unknown,
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

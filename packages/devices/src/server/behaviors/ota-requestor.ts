import { AsyncEventBus } from "@akala/core";
import { chipOta, clusterFactory, ClusterInstance, MatterClusterIds } from "../clients/index.js";
import { MqttEvents } from "@domojs/mqtt";

export default function (pubsub: AsyncEventBus<MqttEvents>): ClusterInstance<chipOta.OTASoftwareUpdateRequestor>
{
    return clusterFactory({
        id: MatterClusterIds.OTASoftwareUpdateRequestor,
        DefaultOTAProviders: [],
        async AnnounceOTAProviderCommand(nodeid, vendorid, reason, metadata, endpoint)
        {
            switch (reason)
            {
                case chipOta.AnnouncementReasonEnum.SimpleAnnouncement:
                    this.DefaultOTAProviders.push({
                        ProviderNodeID: nodeid,
                        Endpoint: endpoint
                    });

                case chipOta.AnnouncementReasonEnum.UpdateAvailable:
                case chipOta.AnnouncementReasonEnum.UrgentUpdateAvailable:
            }

        },
        UpdatePossible: true,
        UpdateState: chipOta.UpdateStateEnum.Idle,
        UpdateStateProgress: 0,
    })
}
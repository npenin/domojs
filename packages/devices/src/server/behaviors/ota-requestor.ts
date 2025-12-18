import { AsyncEventBus } from "@akala/core";
import { oTARequestor, clusterFactory, ClusterInstance, MatterClusterIds } from "../clients/index.js";
import { MqttEvents } from "@domojs/mqtt";

export default function (pubsub: AsyncEventBus<MqttEvents>): ClusterInstance<oTARequestor.OTASoftwareUpdateRequestor>
{
    return clusterFactory({
        id: MatterClusterIds.OTASoftwareUpdateRequestor,
        DefaultOTAProviders: [],
        async AnnounceOTAProviderCommand(nodeid, vendorid, reason, metadata, endpoint)
        {
            switch (reason)
            {
                case oTARequestor.AnnouncementReasonEnum.SimpleAnnouncement:
                    this.DefaultOTAProviders.push({
                        ProviderNodeID: nodeid,
                        Endpoint: endpoint
                    });

                case oTARequestor.AnnouncementReasonEnum.UpdateAvailable:
                case oTARequestor.AnnouncementReasonEnum.UrgentUpdateAvailable:
            }

        },
        UpdatePossible: true,
        UpdateState: oTARequestor.UpdateStateEnum.Idle,
        UpdateStateProgress: 0,
    })
}
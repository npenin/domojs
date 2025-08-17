import { ClusterIds as MatterClusterIds, ClusterMap as MatterClusterMap, ClusterIdNames as MatterClusterIdNames } from "../../codegen/index.js";
import { clusterId as commissioningClusterId, CommissionningCluster } from "./Commissionnee.js";
import { clusterId as notificationClusterId, NotificationEmitter } from "./Notifications.js";

export enum ClusterIds
{
    commissionning = commissioningClusterId,
    notifications = notificationClusterId,
}

export enum ClusterIdNames
{
    commissionning = commissioningClusterId,
    notifications = 0xFC02,
}

export const ClusterMap = {
    [ClusterIds.commissionning]: CommissionningCluster,
    [ClusterIds.notifications]: NotificationEmitter,
    ...MatterClusterMap
}

Object.entries(MatterClusterIdNames).forEach(e => ClusterIdNames[e[0]] = e[1]);

export { MatterClusterIds, MatterClusterMap, MatterClusterIdNames };
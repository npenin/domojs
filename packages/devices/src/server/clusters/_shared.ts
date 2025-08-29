import { ClusterIds as MatterClusterIds, ClusterMap as MatterClusterMap, ClusterIdNames as MatterClusterIdNames } from "../../codegen/index.js";
import { clusterId as commissioningClusterId, CommissionningCluster } from "./Commissionnee.js";
import { clusterId as notificationClusterId, NotificationEmitter } from "./Notifications.js";
import { clusterId as commandClusterId, CommandsCluster } from "./Commands.js";
import { clusterId as manualAdminClusterId, ManualAdministrationCluster } from "./manual-administration.js";
import { clusterId as locationClusterId, LocationCluster } from "./location.js";

export enum ClusterIds
{
    commissionning = commissioningClusterId,
    notifications = notificationClusterId,
    commands = commandClusterId,
    manualAdmin = manualAdminClusterId,
    location = locationClusterId,
}

export enum ClusterIdNames
{
    commissionning = commissioningClusterId,
    notifications = notificationClusterId,
    commands = commandClusterId,
    manualAdmin = manualAdminClusterId,
    location = locationClusterId,
}

export const ClusterMap = {
    [ClusterIds.commissionning]: CommissionningCluster,
    [ClusterIds.notifications]: NotificationEmitter,
    [ClusterIds.commands]: CommandsCluster,
    [ClusterIds.manualAdmin]: ManualAdministrationCluster,
    [ClusterIds.location]: LocationCluster,
    ...MatterClusterMap
}

Object.entries(MatterClusterIdNames).forEach(e => ClusterIdNames[e[0]] = e[1]);

export { MatterClusterIds, MatterClusterMap, MatterClusterIdNames };
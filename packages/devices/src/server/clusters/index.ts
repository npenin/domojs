export * from './_shared.js'
export * from './Commands.js'
export { Commissionnee, CommissionningCluster } from './Commissionnee.js'
export { Notification, NotificationAction, NotificationEmitter, NotificationSeverity } from './Notifications.js'
export { LocationCluster } from './location.js'
export { ManualAdministrationCluster } from './manual-administration.js'

import { ClusterMap as MatterClusterMap } from '../../codegen/index.js'
import { Commands } from './Commands.js'
import { Commissionnee } from './Commissionnee.js'
import { LocationCluster } from './location.js'
import { ManualAdministrationCluster } from './manual-administration.js'
import { NotificationEmitter } from './Notifications.js'

export type ClusterMap = MatterClusterMap &
{
    commissionning: Commissionnee,
    manualAdmin: ManualAdministrationCluster<any>,
    commands: Commands,
    notifications: NotificationEmitter,
    location: LocationCluster
};
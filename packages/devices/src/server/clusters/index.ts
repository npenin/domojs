export * from './_shared.js'
export * from './Commands.js'
export * from './Commissionnee.js'
export * from './Notifications.js'

import { ClusterMap as MatterClusterMap } from '../../codegen/index.js'
import { Commands } from './Commands.js'
import Commissionning, { Commissionnee } from './Commissionnee.js'
import { ManualAdministrationCluster } from './manual-administration.js'
import { NotificationEmitter } from './Notifications.js'

export { Commissionning }

export type ClusterMap = MatterClusterMap &
{ commissionning: Commissionnee, manualAdmin: ManualAdministrationCluster<any>, commands: Commands, notifications: NotificationEmitter };
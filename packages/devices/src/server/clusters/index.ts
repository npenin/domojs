export * from './_shared.js'
export * from './Commands.js'
export * from './Commissionnee.js'
export * from './Notifications.js'

import { ClusterMap as MatterClusterMap } from '../../codegen/index.js'
import { Commands } from './Commands.js'
import Commissionning, { Commissionnee } from './Commissionnee.js'
import { NotificationEmitter } from './Notifications.js'

export { Commissionning }

export type ClusterMap = Omit<MatterClusterMap,
    'commissionning'
    | 'administratorCommissioning'
    | 'accessControl'
    | 'accountLogin'
    | 'actions'
    | 'oTASoftwareUpdateProvider'
    | 'oTASoftwareUpdateRequestor'
> &
{ commissionning: Commissionnee, commands: Commands, notifications: NotificationEmitter };
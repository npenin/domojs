import { StatusMessage } from './status';
import { Message, MessageType, Protocol } from './common';

Protocol.register<EnablePermissionsControlJoin>('type', MessageType.EnablePermissionsControlJoin, [
    { name: 'state', type: 'uint8' }
])

export type EnablePermissionsControlJoin = { state: 1 | 2 };
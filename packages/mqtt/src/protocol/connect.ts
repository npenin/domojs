import { uint16, uint8 } from '@domojs/protocol-parser';
import { ControlPacketType, Properties, propertiesFrame, Protocol, Message as CoreMessage } from './protocol'

export default interface Message extends CoreMessage
{
    protocol: string;
    version: uint8;
    hasUserName?: boolean;
    hasPassword?: boolean;
    willRetain?: boolean;
    willQoS?: number;
    hasWill?: boolean;
    cleanStart?: boolean;
    reservedConnectFlag: false;
    keepAlive: uint16;
    properties: Properties,
    clientId: string,
    willProperties?: boolean,
    willTopic?: string,
    willPayload?: boolean,
    userName: string,
    password: string,
}

Protocol.register<Message>('type', ControlPacketType.CONNECT, [
    { name: 'protocol', type: 'string', length: 'uint16' },
    { name: 'version', type: 'uint8' },
    { name: 'hasUserName', type: 'bit' },
    { name: 'hasPassword', type: 'bit' },
    { name: 'willRetain', type: 'bit' },
    { name: 'willQoS', type: 'uint2' },
    { name: 'hasWill', type: 'bit' },
    { name: 'cleanStart', type: 'bit' },
    { name: 'reservedConnectFlag', type: 'bit' },
    { name: 'keepAlive', type: 'uint16' },
    { name: 'clientId', type: 'string' },
    Object.assign({}, propertiesFrame, { name: 'willProperties' }),
    { name: 'willTopic', optional: 'hasWill', type: 'string', length: 'uint16' },
    { name: 'willPayload', optional: 'hasWill', type: 'buffer', length: 'uint16' },
    { name: 'userName', optional: 'hasUserName', type: 'string', length: 'uint16' },
    { name: 'password', optional: 'hasPassword', type: 'buffer', length: 'uint16' },
], m =>
{
    m.hasPassword = typeof m.password != 'undefined';
    m.hasUserName = typeof m.userName != 'undefined';
    m.hasWill = typeof m.willTopic != 'undefined' || typeof m.willPayload != 'undefined' || typeof m.willProperties != 'undefined'
    if (m.hasWill && (typeof m.willTopic == 'undefined' || typeof m.willPayload == 'undefined' || typeof m.willProperties === 'undefined'))
        throw new Error('Invalid will');
});
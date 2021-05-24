import { uint8, uint16, parsers } from '@domojs/protocol-parser';

export var Protocol = parsers.object<Message>(
    parsers.property('type', parsers.uint4),
    parsers.property('dup', parsers.boolean),
    parsers.property('qos', parsers.uint2),
    parsers.property('retain', parsers.boolean),
    parsers.property(undefined, subFrame, length: 'vuint', choose: { discriminator: 'type', subFrame: {} } },
]);

export enum ControlPacketType
{
    CONNECT = 1,
    CONNACK = 2,
    PUBLISH = 3,
    PUBACK = 4,
    PUBREC = 5,
    PUBREL = 6,
    PUBCOMP = 7,
    SUBSCRIBE = 8,
    SUBACK = 9,
    UNSUBSCRIBE = 10,
    UNSUBACK = 11,
    PINGREQ = 12,
    PINGRESP = 13,
    DISCONNECT = 14,
    AUTH = 15,
}

export enum ReasonCodes
{
    Success = 0x00,
    NormalDisconnection = 0x00,
    GrantedQoS0 = 0x00,
    GrantedQoS1 = 0x01,
    GrantedQoS2 = 0x02,
    DisconnectWithWillMessage = 0x04,
    NoMatchingSubscriber = 0x10,
    NoSubscriptionExisted = 0x11,
    ContinueAuthentication = 0x18,
    ReAuthenticate = 0x19,
    UnspecifiedError = 0x80,
    MalformedPacker = 0x81,
    ProtocolError = 0x82,
    ImplementationSpecificError = 0x83,
    UnsupportedProtocolVersion = 0x84,
    ClientIdentifierNotValid = 0x85,
    BadUserNameOrPassword = 0x86,
    NotAuthorized = 0x87,
    ServerUnavailable = 0x88,
    ServerBusy = 0x89,
    Banned = 0x8A,
    ServerShuttingDown = 0x8b,
    BadAuthenticationMethod = 0x8c,
    KeepAliveTimeout = 0x8d,
    SessionTakenOver = 0x8e,
    TopicFilterInvali = 0x8f,
    TopicNameInvalid = 0x90,
    PacketIdentifierInUse = 0x91,
    PacketIdentifierNotFound = 0x92,
    ReceiveMaximumExceeded = 0x93,
    TopicAliasInvalid = 0x94,
    PacketTooLarge = 0x95,
    MessageRateTooHigh = 0x96,
    QuotaExceeded = 0x97,
    AdministrativeAction = 0x98,
    PayloadFormatInvalid = 0x99,
    RetainNotSupported = 0x9a,
    QoSNotSupported = 0x9b,
    UseAnotherServer = 0x9c,
    ServerMoved = 0x9d,
    sharedSubscriptionNotSupported = 0x9e,
    ConnectionRateExceeded = 0x9f,
    MaximumConnectTime = 0xa0,
    SubscriptionIdentifierNotSupported = 0xa1,
    wildcardSubscriptionNotSupported = 0xa2,
}

export enum PropertyKeys
{
    payloadFormat = 0x01,
    messageExpiryInterval = 0x02,
    contentType = 0x03,
    responseTopic = 0x08,
    correlationData = 0x09,
    subscriptionIdentifier = 0x0B,
    sessionExpiryInterval = 0x11,
    assignedClientIdentifier = 0x12,
    serverKeepAlive = 0x13,
    authenticationMethod = 0x15,
    authenticationData = 0x016,
    requestProblemInformation = 0x017,
    willDelayInterval = 0x018,
    requestResponseInformation = 0x019,
    responseInformation = 0x01a,
    serverReference = 0x01c,
    reasonString = 0x01f,
    receiveMaximum = 0x021,
    topicAliasMaximum = 0x022,
    topicAlias = 0x023,
    maximumQoS = 0x024,
    retainAvailable = 0x25,
    userProperty = 0x26,
    maximumPacketSize = 0x27,
    wildcardSubscriptionAvailable = 0x28,
    subscriptionIdentifierAvailable = 0x29,
    sharedSubscriptionAvailable = 0x2A,
}

export const propertiesFrame: FrameDescription<{ properties: Properties }> = {
    name: 'properties', type: 'subFrame[]', length: 'vuint', frame: new Frame<{ property: PropertyKeys, value: unknown }>([
        { name: 'property', type: 'uint8' },
        {
            name: 'value', type: 'subFrame', choose: {
                discriminator: 'property',
                subFrame: {
                    [PropertyKeys.payloadFormat]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.messageExpiryInterval]: new Frame([{ name: 'value', type: 'uint32', }]),
                    [PropertyKeys.contentType]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.responseTopic]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.correlationData]: new Frame([{ name: 'value', type: 'buffer', length: 'uint16' }]),
                    [PropertyKeys.subscriptionIdentifier]: new Frame([{ name: 'value', type: 'vuint', }]),
                    [PropertyKeys.sessionExpiryInterval]: new Frame([{ name: 'value', type: 'uint32', }]),
                    [PropertyKeys.assignedClientIdentifier]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.serverKeepAlive]: new Frame([{ name: 'value', type: 'uint16', }]),
                    [PropertyKeys.authenticationMethod]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.authenticationData]: new Frame([{ name: 'value', type: 'buffer', length: 'uint16' }]),
                    [PropertyKeys.requestProblemInformation]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.willDelayInterval]: new Frame([{ name: 'value', type: 'uint32', }]),
                    [PropertyKeys.requestResponseInformation]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.responseInformation]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.serverReference]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.reasonString]: new Frame([{ name: 'value', type: 'string', length: 'uint16' }]),
                    [PropertyKeys.receiveMaximum]: new Frame([{ name: 'value', type: 'uint16', }]),
                    [PropertyKeys.topicAliasMaximum]: new Frame([{ name: 'value', type: 'uint16', }]),
                    [PropertyKeys.topicAlias]: new Frame([{ name: 'value', type: 'uint16', }]),
                    [PropertyKeys.maximumQoS]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.retainAvailable]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.userProperty]: new Frame([{
                        name: 'value', type: 'subFrame[]', length: 1, frame: new Frame<{ name: string, value: string }>([
                            { name: 'name', type: 'string', length: 'uint16' },
                            { name: 'value', type: 'string', length: 'uint16' }
                        ])
                    }]),
                    [PropertyKeys.maximumPacketSize]: new Frame([{ name: 'value', type: 'uint32', }]),
                    [PropertyKeys.wildcardSubscriptionAvailable]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.subscriptionIdentifierAvailable]: new Frame([{ name: 'value', type: 'uint8', }]),
                    [PropertyKeys.sharedSubscriptionAvailable]: new Frame([{ name: 'value', type: 'uint8', }]),
                }
            }
        }
    ])
};

export interface PropertiesMap
{
    payloadFormat: uint8;
    messageExpiryInterval: number;
    contentType: string;
    responseTopic: string;
    correlationData: Buffer;
    subscriptionIdentifier: number;
    sessionExpiryInterval: number;
    assignedClientIdentifier: string;
    serverKeepAlive: uint16;
    authenticationMethod: string;
    authenticationData: Buffer;
    requestProblemInformation: uint8;
    willDelayInterval: number;
    requestResponseInformation: uint8;
    responseInformation: string;
    serverReference: string;
    reasonString: string;
    receiveMaximum: uint16;
    topicAliasMaximum: uint16;
    topicAlias: uint16;
    maximumQoS: uint8;
    retainAvailable: uint8;
    userProperty: string;
    maximumPacketSize: number;
    wildcardSubscriptionAvailable: uint8;
    subscriptionIdentifierAvailable: uint8;
    sharedSubscriptionAvailable: uint8;
}

export type Properties = { property: PropertyKeys, value: unknown }[];


export interface Message
{
    type: ControlPacketType;
    dup?: boolean;
    qos?: number;
    retain?: boolean;
}
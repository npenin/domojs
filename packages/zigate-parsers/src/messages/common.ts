import { uint8, uint16, uint32, int8, int16, int32, float, double, Frame, FrameDescription, uint64, Protocol as CProtocol } from '@domojs/protocol-parser/dist/index';
import { EventEmitter } from 'events';
export { uint8, uint16, uint32, int8, int16, int32, float, double, uint64 }
export enum MessageType
{
    GetVersion = 0x0010,
    Reset = 0x0011,
    ErasePersistentData = 0x0012,
    ZLO_ZLL_FactoryNew_Reset = 0x0013,
    PermitJoin = 0x0014,
    GetDevicesList = 0x0015,
    SetExtendedPanId = 0x0020,
    SetChannelMask = 0x0021,
    SetSecurityStateAndKey = 0x0022,
    SetDeviceType = 0x0023,
    StartNetwork = 0x0024,
    StartNetworkScan = 0x0025,
    RemoveDevice = 0x0026,
    EnablePermissionsControlJoin = 0x0027,
    AuthenticateDevice = 0x0028,
    OutOfBandCommissionningData = 0x0029,
    UserDescriptorSet = 0x002B,
    UserDescriptor = 0x002C,
    ComplexDescriptor = 0x0034,
    Bind = 0x0030,
    Unbind = 0x0031,

    NetworkAddress = 0x0040,
    IEEEAddress = 0x0041,
    NodeDescriptor = 0x0042,
    SimpleDescriptor = 0x0043,
    PowerDescriptor = 0x0044,
    ActiveEndpoint = 0x0045,
    MatchDescriptor = 0x0046,
    ManagementLeave = 0x0047,
    PermitJoining = 0x0049,
    ManagementNetworkUpdate = 0x004A,
    SystemServerDiscovery = 0x004B,
    DeviceAnnounce = 0x004D,
    ManagementLQI = 0x004E,

    AddGroup = 0x0060,
    ViewGroup = 0x0061,
    GetGroupMembership = 0x0062,
    RemoveGroup = 0x0063,
    RemoveAllGroup = 0x0064,
    AddGroupIfIdentify = 0x0065,

    IdentifySend = 0x0070,
    IdentifyQuery = 0x0071,

    MoveToLevel = 0x0080,
    MoveToLevelWithWithoutOnOff = 0x0081,
    MoveStep = 0x0082,
    MoveStopMove = 0x0083,
    MoveStopWithOnOff = 0x0084,

    OnOffWithNoEffect = 0x0092,
    OnOffTimedSend = 0x0093,
    OnOffWithEffectsSend = 0x0094,

    ViewScene = 0x00A0,
    AddScene = 0x00A1,
    RemoveScene = 0x00A2,
    RemoveAllScene = 0x00A3,
    StoreScene = 0x00A4,
    RecallScene = 0x00A5,
    SceneMembership = 0x00A6,
    AddEnhancedScene = 0x00A7,
    ViewEnhancedHost_NodeScene = 0x00A8,
    CopyScene = 0x00A9,

    MoveToHue = 0x00B0,
    MoveHue = 0x00B1,
    StepHue = 0x00B2,
    MoveToSaturation = 0x00B3,
    MoveSaturation = 0x00B4,
    StepSaturation = 0x00B5,
    MoveToHueAndSaturation = 0x00B6,
    MoveToColor = 0x00B7,
    MoveColor = 0x00B8,
    StepColor = 0x00B9,
    EnhancedMoveToHue = 0x00BA,
    EnhancedMoveHue = 0x00BB,
    EnhancedStepHue = 0x00BC,
    EnhancedMoveToHueAndSaturation = 0x00BD,
    ColorLoopSet = 0x00BE,
    StopMoveStep = 0x00BF,

    MoveToColorTemperature = 0x00C0,
    MoveColorTemperature = 0x00C1,
    StepColorTemperature = 0x00C2,

    InitiateTouchlink = 0x00D0,
    TouchlinkFactoryResetTarget = 0x00D1,

    IdentifyTriggerEffect = 0x00E0,

    LockUnlockDoor = 0x00F0,

    ReadAttribute = 0x0100,
    WriteAttribute = 0x0110,
    ConfigureReporting = 0x0120,
    AttributeDiscovery = 0x0140,

    IASZoneEnrollResponse = 0x0400,

    RawAPSData = 0x0530,

    Response = 0x8000,
    Status = 0x8000,
    LogMessage = 0x8001,
    DataIndication = 0x8002,
    ObjectClustersList = 0x8003,
    ObjectAttributesList = 0x8004,
    ObjectCommandsList = 0x8005,
    NonFactoryNewRestart = 0x8006,
    FactoryNewRestart = 0x8007,
    LeaveIndication = 0x8048,
    DefaultResponse = 0x8101,
    ReportIndividualAttribute = 0x8102,

    ZoneStatusChangeNotification = 0x8401,

    RouterDiscoveryConfirm = 0x8701,
    APSDataConfirmFail = 0x8702,
}

export var Protocol: CProtocol<Message> & { send?: (type: MessageType, message: any) => Buffer, receive?: (message: Message) => any } = new CProtocol<Message>([
    { name: 'start', type: 'uint8' },
    { name: 'type', type: 'uint16' },
    { name: 'length', type: 'uint16' },
    { name: 'checksum', type: 'uint8' },
    { name: 'message', type: 'subFrame', choose: { discriminator: 'type', subFrame: {} } },
    { name: 'rssi', type: 'uint8' },
    { name: 'end', type: 'uint8' }]);

Protocol.send = function (this: CProtocol<Message>, type: MessageType, message)
{
    return this.write({ start: 0x01, type: type, message: message, end: 0x03, length: 2, checksum: 0xff, rssi: 0 });
}

Protocol.receive = function (message: Message)
{
    return message.message;
}

export enum Cluster
{
    Basic = 0x0000,
    PowerConfig = 0x0001,
    TemperatureConfig = 0x0002,
    Identify = 0x0003,
    Groups = 0x0004,
    Scenes = 0x0005,
    OnOff = 0x0006,
    OnOffConfig = 0x0007,
    LevelControl = 0x0008,
    Alarms = 0x0009,
    Time = 0x000A,
    BinaryInputBasic = 0x000F,
    PollControl = 0x0020,
    OTA = 0x0019,
    DoorLock = 0x0101,
    HVACThermostat = 0x0201,
    HVACFanControl = 0x0202,
    LightingColorControl = 0x0300,
    Illuminance = 0x0400,
    Temperature = 0x0402,
    Pressure = 0x0403,
    Humidity = 0x0405,
    Occupancy = 0x0406,
    IASZone = 0x0500,
    SmartEnergyMetering = 0x0702,
    Diagnostics = 0x0B05,
    Commissioning = 0x1000,
    XiaomiPrivate1 = 0xFF01,
    XiaomiPrivate2 = 0xFF02,
}

export interface Message
{
    start: 0x01;
    end: 0x03;
    type: MessageType;
    message: any;
    length: uint16;
    checksum: uint8;
    rssi: uint8;
}

// export class Message
// {
//     frameDescription: Frame<this>;
//     public type: MessageType;

//     public data: Buffer;

//     protected isResponse: boolean;

//     public rssi: number;
//     protected sequenceNumber: number;

//     protected canRead(length?: number)
//     {
//         return this.offset + (length || 0) < this.data.length;
//     }

//     private get checksum()
//     {
//         return 0x00 ^ this.type ^ this.data.length ^ this.rssi
//     }

//     public static types: { [type: number]: new (frame: Buffer) => Message }

//     public start: uint8;
//     public end: uint8;

//     private static frame: FrameDescription<Message>[] = [{ type: 'uint8', name: 'start' }, { name: 'type', type: 'uint16' }, { name: 'data', type: 'buffer', length: 'uint8' }];

//     public init(typeOrFrame: MessageType | Buffer, subFrame: FrameDescription<this>[])
//     {
//         if (Buffer.isBuffer(typeOrFrame))
//         {
//             this.offset = 1;
//             this.type = typeOrFrame.readUInt16BE(1);
//             this.isResponse = Boolean(this.type & 0x8000);
//             if (typeOrFrame.readUInt8(5) != this.checksum)
//                 throw new InvalidFrame(typeOrFrame);
//             this.data = typeOrFrame.slice(6, typeOrFrame.readUInt16BE(3) + 6)
//             if (Object.getPrototypeOf(this) == Message.prototype)
//             {
//                 if (this.type in Message.types)
//                     return new Message.types[this.type](typeOrFrame);

//                 if (this.isResponse)
//                     return new Message.types[this.type & 0x7000](typeOrFrame);

//                 throw new Error('Unsupported message type' + this.type);
//             }
//         }
//         else if (typeOrFrame)
//             this.type = typeOrFrame;
//         this.frameDescription = new Frame<this>(Message.frame.concat(subFrame, [{ type: 'uint8', name: 'end' }]));
//     }

//     protected constructor(typeOrFrame: MessageType | Buffer, subFrame: FrameDescription<any>[])
//     {
//         this.init(typeOrFrame, subFrame);
//     }

//     private offset: number;

//     protected slice(length: number)
//     {
//         if (!this.canRead(length))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         if (length == -1)
//             var result = this.data.slice(this.offset);
//         else
//             var result = this.data.slice(this.offset, length + this.offset);
//         this.offset += length;
//         return result;
//     }

//     protected readUInt64(): uint64
//     {
//         return this.slice(8).toString('hex');
//     }


//     protected readUInt8(): uint8
//     {
//         if (!this.canRead())
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readUInt8(this.offset);
//         this.offset += 1;
//         return result;
//     }
//     protected readUInt16LE(): uint16
//     {
//         if (!this.canRead(2))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readUInt16LE(this.offset);
//         this.offset += 2;
//         return result;
//     }
//     protected readUInt16BE(): uint16
//     {
//         if (!this.canRead(2))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readUInt16BE(this.offset);
//         this.offset += 2;
//         return result;
//     }
//     protected readUInt32LE(): uint32
//     {
//         if (!this.canRead(4))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readUInt32LE(this.offset);
//         this.offset += 4;
//         return result;
//     }
//     protected readUInt32BE(): uint32
//     {
//         if (!this.canRead(4))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readUInt32BE(this.offset);
//         this.offset += 4;
//         return result;
//     }
//     protected readInt8(): int8
//     {
//         if (!this.canRead())
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readInt8(this.offset);
//         this.offset += 1;
//         return result;
//     }
//     protected readInt16LE(): int16
//     {
//         if (!this.canRead(2))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readInt16LE(this.offset);
//         this.offset += 2;
//         return result;
//     }
//     protected readInt16BE(): int16
//     {
//         if (!this.canRead(2))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readInt16BE(this.offset);
//         this.offset += 2;
//         return result;
//     }
//     protected readInt32LE(): int32
//     {
//         if (!this.canRead(4))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readInt32LE(this.offset);
//         this.offset += 4;
//         return result;
//     }
//     protected readInt32BE(): int32
//     {
//         if (!this.canRead(4))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readInt32BE(this.offset);
//         this.offset += 4;
//         return result;
//     }
//     protected readFloatLE(): float
//     {
//         if (!this.canRead(4))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readFloatLE(this.offset);
//         this.offset += 4;
//         return result;
//     }
//     protected readFloatBE(): float
//     {
//         if (!this.canRead(4))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readFloatBE(this.offset);
//         this.offset += 4;
//         return result;
//     }
//     protected readDoubleLE(): double
//     {
//         if (!this.canRead(8))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readDoubleLE(this.offset);
//         this.offset += 8;
//         return result;
//     }
//     protected readDoubleBE(): double
//     {
//         if (!this.canRead(8))
//             throw new Error(`Buffer out of range (${this.offset}+${length}`);
//         var result = this.data.readDoubleBE(this.offset);
//         this.offset += 8;
//         return result;
//     }
// }

// export function type(t: MessageType)
// {
//     return function (ctor: new (frame: Buffer) => Message)
//     {
//         Message.types[t] = ctor;
//     }
// }

// export class InvalidFrame extends Error
// {
//     constructor(frame: Buffer)
//     {
//         super(frame.buffer.toString());
//     }
// }

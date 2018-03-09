import { StatusMessage, Status } from './status';
import { Message, MessageType, Protocol, uint16, uint8, Cluster } from './common';

Protocol.register<ShortAddressRequest>('type', MessageType.NodeDescriptor, [{ name: 'targetShortAddress', type: 'uint16' }]);
Protocol.register<SimpleDescriptorRequest>('type', MessageType.SimpleDescriptor, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'endpoint', type: 'uint8' }
]);
Protocol.register<ShortAddressRequest>('type', MessageType.PowerDescriptor, [{ name: 'targetShortAddress', type: 'uint16' }]);
Protocol.register<ShortAddressRequest>('type', MessageType.ActiveEndpoint, [{ name: 'targetShortAddress', type: 'uint16' }]);
Protocol.register<MatchDescriptorRequest>('type', MessageType.MatchDescriptor, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'profileId', type: 'uint16' },
    { name: 'inputClusterList', type: 'uint16[]', length: 'uint8' },
    { name: 'outputClusterList', type: 'uint16[]', length: 'uint8' }
]);

Protocol.register<UserDescriptorSet>('type', MessageType.UserDescriptorSet, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'addressOfInterest', type: 'uint16' },
    { name: 'text', type: 'string', length: 'uint8' }
])

Protocol.register<AddressOfInterestRequest>('type', MessageType.UserDescriptor, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'addressOfInterest', type: 'uint16' }
])

Protocol.register<AddressOfInterestRequest>('type', MessageType.ComplexDescriptor, [
    { name: 'targetShortAddress', type: 'uint16' },
    { name: 'addressOfInterest', type: 'uint16' }
])

Protocol.register<ClusterList>('type', MessageType.ObjectClustersList, [
    { name: 'sourceEndpoint', type: 'uint8' },
    { name: 'profileId', type: 'uint16' },
    { name: 'clusterList', type: 'uint16[]' }
])

export interface UserDescriptorSet extends AddressOfInterestRequest
{
    text: string;
}

Protocol.register<NodeDescriptor>('type', MessageType.NodeDescriptor | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'networkAddress', type: 'uint16' },
    { name: 'manufacturerCode', type: 'uint16' },
    { name: 'maxRxSize', type: 'uint16' },
    { name: 'maxTxSize', type: 'uint16' },
    { name: 'serverMask', type: 'uint16' },
    { name: 'descriptorCapability', type: 'uint8' },
    { name: 'macFlags', type: 'uint8' },
    { name: 'maxBufferSize', type: 'uint8' },
    { name: 'information', type: 'uint16' },
])

export interface NodeDescriptor extends StatusMessage
{
    networkAddress: uint16;
    manufacturerCode: uint16;
    maxRxSize: uint16;
    maxTxSize: uint16;
    serverMask: Mask;
    descriptorCapability: DescriptorCapability;
    macFlags: MacCapability;
    maxBufferSize: uint8;
    information: Bitfield;
}

export enum Bitfield
{
    Coordinator = 0x0000,
    Router = 0x0001,
    EndDevice = 0x0002,
    ComplexDescriptorAvailable = 0x0008,
    UserDescriptorAvailable = 0x0010,
    FrequencyBand24Ghz = 0x1800,
}

export enum Mask
{
    PrimaryTrustCenter = 0x0001,
    BackupTrustCenter = 0x0002,
    PrimaryBindingCache = 0x0004,
    BackupBindingCache = 0x0008,
    PrimaryDiscoveryCache = 0x0010,
    BackupDiscoveryCache = 0x0020,
    NetworkManager = 0x0040,
}

export enum MacCapability
{
    AlternatePANCoordinator = 0x01,
    DeviceType = 0x02,
    PowerSource = 0x04,
    ReceiverOnWhenIdle = 0x08,
    SecurityCapability = 0x40,
    AllocateAddress = 0x80,
}

export enum DescriptorCapability
{
    ExtendedActiveEndpointListAvailable = 0x01,
    ExtendedSimpleDescriptorListAvailable = 0x02,
}

export interface SimpleDescriptor extends StatusMessage
{
    sequenceNumber: uint8;
    status: uint8;
    networkAddress: uint16;
    length: uint8;
    endpoint: uint8;
    profile: uint16;
    deviceId: uint16;
    deviceVersion: uint8;
    inputClusterList: Cluster[];
    outputClusterList: Cluster[];
}

Protocol.register<SimpleDescriptor>('type', MessageType.SimpleDescriptor | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'networkAddress', type: 'uint16' },
    { name: 'length', type: 'uint8' },
    { name: 'endpoint', type: 'uint8' },
    { name: 'profile', type: 'uint16' },
    { name: 'deviceId', type: 'uint16' },
    { name: 'deviceVersion', type: 'uint8' },
    { name: 'inputClusterList', type: 'uint16[]', length: 'uint8' },
    { name: 'outputClusterList', type: 'uint16[]', length: 'uint8' },
])

Protocol.register<PowerDescriptor>('type', MessageType.PowerDescriptor | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'information', type: 'uint16' },
])

export interface PowerDescriptor extends StatusMessage
{
    information: Power;
}

export enum Power
{
    CurrentPowerMode1 = 0x0001,
    CurrentPowerMode2 = 0x0002,
    CurrentPowerMode3 = 0x0003,
    CurrentPowerMode4 = 0x0004,
    CurrentPowerMode5 = 0x0005,
    CurrentPowerMode6 = 0x0006,
    CurrentPowerMode7 = 0x0007,
    CurrentPowerMode8 = 0x0008,
    CurrentPowerMode9 = 0x0009,
    CurrentPowerMode10 = 0x000A,
    CurrentPowerMode11 = 0x000B,
    CurrentPowerMode12 = 0x000C,
    CurrentPowerMode13 = 0x000D,
    CurrentPowerMode14 = 0x000E,
    CurrentPowerMode15 = 0x000F,
    AvailablePowerSource1 = 0x0010,
    AvailablePowerSource2 = 0x0020,
    AvailablePowerSource3 = 0x0030,
    AvailablePowerSource4 = 0x0040,
    AvailablePowerSource5 = 0x0050,
    AvailablePowerSource6 = 0x0060,
    AvailablePowerSource7 = 0x0070,
    AvailablePowerSource8 = 0x0080,
    AvailablePowerSource9 = 0x0090,
    AvailablePowerSource10 = 0x00A0,
    AvailablePowerSource11 = 0x00B0,
    AvailablePowerSource12 = 0x00C0,
    AvailablePowerSource13 = 0x00D0,
    AvailablePowerSource14 = 0x00E0,
    AvailablePowerSource15 = 0x00F0,
    CurrentPowerSource1 = 0x0100,
    CurrentPowerSource2 = 0x0200,
    CurrentPowerSource3 = 0x0300,
    CurrentPowerSource4 = 0x0400,
    CurrentPowerSource5 = 0x0500,
    CurrentPowerSource6 = 0x0600,
    CurrentPowerSource7 = 0x0700,
    CurrentPowerSource8 = 0x0800,
    CurrentPowerSource9 = 0x0900,
    CurrentPowerSource10 = 0x0A00,
    CurrentPowerSource11 = 0x0B00,
    CurrentPowerSource12 = 0x0C00,
    CurrentPowerSource13 = 0x0D00,
    CurrentPowerSource14 = 0x0E00,
    CurrentPowerSource15 = 0x0F00,
    CurrentPowerSourceLevel1 = 0x1000,
    CurrentPowerSourceLevel2 = 0x2000,
    CurrentPowerSourceLevel3 = 0x3000,
    CurrentPowerSourceLevel4 = 0x4000,
    CurrentPowerSourceLevel5 = 0x5000,
    CurrentPowerSourceLevel6 = 0x6000,
    CurrentPowerSourceLevel7 = 0x7000,
    CurrentPowerSourceLevel8 = 0x8000,
    CurrentPowerSourceLevel9 = 0x9000,
    CurrentPowerSourceLevel10 = 0xA000,
    CurrentPowerSourceLevel11 = 0xB000,
    CurrentPowerSourceLevel12 = 0xC000,
    CurrentPowerSourceLevel13 = 0xD000,
    CurrentPowerSourceLevel14 = 0xE000,
    CurrentPowerSourceLevel15 = 0xF000,
}

Protocol.register<ActiveEndpointResponse>('type', MessageType.ActiveEndpoint | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'address', type: 'uint16' },
    { name: 'endpoints', type: 'uint8[]', length: 'uint8' },
]);

export interface ActiveEndpointResponse extends StatusMessage
{
    address: uint16;
    endpoints: uint8[];
}

Protocol.register<MatchDescriptorResponse>('type', MessageType.MatchDescriptor | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'networkAddress', type: 'uint16' },
    { name: 'matches', type: 'uint8[]', length: 'uint8' },
]);

export interface MatchDescriptorResponse extends StatusMessage
{
    networkAddress: uint16;
    matches: uint8[];
}

Protocol.register<UserDescriptorResponse>('type', MessageType.UserDescriptor | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'networkAddressOfInterest', type: 'uint16' },
    { name: 'stream', type: 'buffer', length: 'uint8' },
])
Protocol.register<UserDescriptorNotifyMessage>('type', MessageType.UserDescriptorSet | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'networkAddressOfInterest', type: 'uint16' },
]);

export interface UserDescriptorNotifyMessage extends StatusMessage
{
    status: Status;
    networkAddressOfInterest: uint16;
}

export interface UserDescriptorResponse extends UserDescriptorNotifyMessage
{
    stream: Buffer;
}

export interface ShortAddressRequest
{
    targetShortAddress: uint16;
}

export interface AddressOfInterestRequest extends ShortAddressRequest
{
    addressOfInterest: uint16;
}

export interface SimpleDescriptorRequest extends ShortAddressRequest
{
    endpoint: uint8;
}


export interface MatchDescriptorRequest extends ShortAddressRequest
{
    profileId: uint16;
    inputClusterList: Cluster[];
    outputClusterList: Cluster[];
}

export interface ClusterList 
{
    sourceEndpoint: uint8;
    profileId: uint16;
    clusterList: Cluster[];
}

Protocol.register<ComplexDescriptorResponse>('type', MessageType.ComplexDescriptor | MessageType.Response, [
    { name: 'sequenceNumber', type: 'uint8' },
    { name: 'status', type: 'uint8' },
    { name: 'networkAddressOfInterest', type: 'uint16' },
    { name: 'length', type: 'uint8' },
])

export interface ComplexDescriptorResponse extends StatusMessage
{
    networkAddressOfInterest: uint16;
    tag: uint8;
    length: uint8
    values: Buffer;
}
import { StatusMessage, Status } from './status';
import { MessageType, Cluster, messages } from './_common';
import { parsers, uint16, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.NodeDescriptor, parsers.object<ShortAddressRequest>(parsers.property('targetShortAddress', parsers.uint16)));
messages.register(MessageType.SimpleDescriptor, parsers.object<SimpleDescriptorRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('endpoint', parsers.uint8)
));
messages.register(MessageType.PowerDescriptor, parsers.object<ShortAddressRequest>(parsers.property('targetShortAddress', parsers.uint16)));
messages.register(MessageType.ActiveEndpoint, parsers.object<ShortAddressRequest>(parsers.property('targetShortAddress', parsers.uint16)));
messages.register(MessageType.MatchDescriptor, parsers.object<MatchDescriptorRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('profileId', parsers.uint16),
    parsers.property('inputClusterList', parsers.array(parsers.uint8, parsers.uint16)),
    parsers.property('outputClusterList', parsers.array(parsers.uint8, parsers.uint16)),
));

messages.register(MessageType.UserDescriptorSet, parsers.object<UserDescriptorSet>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('addressOfInterest', parsers.uint16),
    parsers.property('text', parsers.string(parsers.uint8))
))

messages.register(MessageType.UserDescriptor, parsers.object<AddressOfInterestRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('addressOfInterest', parsers.uint16)
))

messages.register(MessageType.ComplexDescriptor, parsers.object<AddressOfInterestRequest>(
    parsers.property('targetShortAddress', parsers.uint16),
    parsers.property('addressOfInterest', parsers.uint16)
))

messages.register(MessageType.ObjectClustersList, parsers.object<ClusterList>(
    parsers.property('sourceEndpoint', parsers.uint8),
    parsers.property('profileId', parsers.uint16),
    parsers.property('clusterList', parsers.array(-1, parsers.uint16))
))

export interface UserDescriptorSet extends AddressOfInterestRequest
{
    text: string;
}

messages.register(MessageType.NodeDescriptor | MessageType.Response, parsers.object<NodeDescriptor>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('networkAddress', parsers.uint16),
    parsers.property('manufacturerCode', parsers.uint16),
    parsers.property('maxRxSize', parsers.uint16),
    parsers.property('maxTxSize', parsers.uint16),
    parsers.property('serverMask', parsers.uint16),
    parsers.property('descriptorCapability', parsers.uint8),
    parsers.property('macFlags', parsers.uint8),
    parsers.property('maxBufferSize', parsers.uint8),
    parsers.property('information', parsers.uint16),
))

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

messages.register(MessageType.SimpleDescriptor | MessageType.Response, parsers.object<SimpleDescriptor>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('networkAddress', parsers.uint16),
    parsers.property('length', parsers.uint8),
    parsers.property('endpoint', parsers.uint8),
    parsers.property('profile', parsers.uint16),
    parsers.property('deviceId', parsers.uint16),
    parsers.property('deviceVersion', parsers.uint8),
    parsers.property('inputClusterList', parsers.array(parsers.uint8, parsers.uint16)),
    parsers.property('outputClusterList', parsers.array(parsers.uint8, parsers.uint16)),
))

messages.register(MessageType.PowerDescriptor | MessageType.Response, parsers.object<PowerDescriptor>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('information', parsers.uint16),
))

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

messages.register(MessageType.ActiveEndpoint | MessageType.Response, parsers.object<ActiveEndpointResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('address', parsers.uint16),
    parsers.property('endpoints', parsers.array(parsers.uint8, parsers.uint8)),
));

export interface ActiveEndpointResponse extends StatusMessage
{
    address: uint16;
    endpoints: uint8[];
}

messages.register(MessageType.MatchDescriptor | MessageType.Response, parsers.object<MatchDescriptorResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('networkAddress', parsers.uint16),
    parsers.property('matches', parsers.array(parsers.uint8, parsers.uint8)),
));

export interface MatchDescriptorResponse extends StatusMessage
{
    networkAddress: uint16;
    matches: uint8[];
}

messages.register(MessageType.UserDescriptor | MessageType.Response, parsers.object<UserDescriptorResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('networkAddressOfInterest', parsers.uint16),
    parsers.property('stream', parsers.buffer(parsers.uint8)),
))
messages.register(MessageType.UserDescriptorSet | MessageType.Response, parsers.object<UserDescriptorNotifyMessage>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('networkAddressOfInterest', parsers.uint16),
));

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

messages.register(MessageType.ComplexDescriptor | MessageType.Response, parsers.object<ComplexDescriptorResponse>(
    parsers.property('sequenceNumber', parsers.uint8),
    parsers.property('status', parsers.uint8),
    parsers.property('networkAddressOfInterest', parsers.uint16),
    parsers.property('length', parsers.uint8),
))

export interface ComplexDescriptorResponse extends StatusMessage
{
    networkAddressOfInterest: uint16;
    tag: uint8;
    length: uint8
    values: Buffer;
}
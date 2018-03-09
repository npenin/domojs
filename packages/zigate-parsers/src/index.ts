import * as serialport from 'serialport';
import { Protocol, MessageType, Message } from './messages/common';
import * as fs from 'fs'
import { EventEmitter } from 'events';
import { Duplex } from 'stream';
import { Queue, log as debug } from '@akala/core';

import * as address from './messages/address';
import * as aps from './messages/aps';
import * as attributes from './messages/attributes';
import * as bind from './messages/bind';
import * as dataIndication from './messages/data-indication';
import * as descriptors from './messages/descriptors';
import * as devices from './messages/devices';
import * as door from './messages/door';
import * as enablePermissionsControlJoin from './messages/enablePermissionsControlJoin';
import * as gateway from './messages/gateway';
import * as group from './messages/group';
import * as hue from './messages/hue';
import * as ias from './messages/ias';
import * as identify from './messages/identify';
import * as logs from './messages/log';
import * as managementLeave from './messages/managementLeave';
import * as move from './messages/move';
import * as network from './messages/network';
import * as onoff from './messages/onoff';
import * as outOfBandCommissionningData from './messages/outOfBandCommissionningData';
import * as permitjoin from './messages/permitjoin';
import * as scenes from './messages/scenes';
import * as status from './messages/status';
import * as temperature from './messages/temperature';
import * as touchlink from './messages/touchlink';
import * as trigger from './messages/trigger';
import * as version from './messages/version';

const log = debug('zigate');

export namespace MessageTypes
{
    export type GetVersionRequest = void;
    export type GetVersionResponse = version.VersionResponse;
    export type PermitJoinRequest = void;
    export type PermitJoinResponse = permitjoin.PermitJoinResponse;
    export type GetDevicesListRequest = void;
    export type GetDevicesListResponse = devices.DeviceAnnounce;
    export type SetExtendedPanIdRequest = gateway.SetExtendedPanId;
    export type SetExtendedPanIdResponse = status.StatusMessage;
    export type SetChannelMaskRequest = gateway.SetChannelMask;
    export type SetChannelMaskResponse = status.StatusMessage;
    export type SetSecurityStateAndKeyRequest = gateway.SetSecurityStateAndKey;
    export type SetSecurityStateAndKeyResponse = status.StatusMessage;
    export type SetDeviceTypeRequest = { type: network.DeviceType };
    export type SetDeviceTypeResponse = status.StatusMessage;
    export type StartNetworkRequest = void;
    export type StartNetworkResponse = network.NetworkResponse;
    export type StartNetworkScanRequest = void;
    export type StartNetworkScanResponse = network.NetworkResponse;
    export type RemoveDeviceRequest = devices.RemoveDevice;
    export type RemoveDeviceResponse = managementLeave.LeaveIndicationResponse;
    export type EnablePermissionsControlJoinRequest = enablePermissionsControlJoin.EnablePermissionsControlJoin;
    export type EnablePermissionsControlJoinResponse = status.StatusMessage;
    export type AuthenticateDeviceRequest = devices.AuthenticateDevice;
    export type AuthenticateDeviceResponse = devices.AuthenticateResponse;
    export type OutOfBandCommissionningDataRequest = outOfBandCommissionningData.OutOfBandCommissionningDataRequest;
    export type OutOfBandCommissionningDataResponse = outOfBandCommissionningData.OutOfBandCommissionningDataResponse;
    export type UserDescriptorSetRequest = descriptors.UserDescriptorSet;
    export type UserDescriptorSetResponse = descriptors.UserDescriptorNotifyMessage;
    export type UserDescriptorRequest = descriptors.AddressOfInterestRequest;
    export type UserDescriptorResponse = descriptors.UserDescriptorResponse;
    export type ComplexDescriptorRequest = descriptors.AddressOfInterestRequest;
    export type ComplexDescriptorResponse = descriptors.ComplexDescriptorResponse;
    export type BindRequest = bind.BindRequest;
    export type BindResponse = status.StatusMessage;
    export type UnbindRequest = bind.BindRequest;
    export type UnbindResponse = status.StatusMessage;

    export type SingleNetworkAddressRequest = address.SingleNetworkAddressRequest;
    export type SingleNetworkAddressResponse = address.NetworkAddressResponse;
    export type ExtendedNetworkAddressRequest = address.ExtendedNetworkAddressRequest;
    export type ExtendedNetworkAddressResponse = address.NetworkAddressResponse;
    export type IEEEAddressRequest = address.IEEEAddressRequest;
    export type IEEEAddressResponse = address.NetworkAddressResponse;
    export type NodeDescriptorRequest = descriptors.ShortAddressRequest;
    export type NodeDescriptorResponse = descriptors.NodeDescriptor;
    export type SimpleDescriptorRequest = descriptors.SimpleDescriptorRequest;
    export type SimpleDescriptorResponse = descriptors.SimpleDescriptor;
    export type PowerDescriptorRequest = descriptors.ShortAddressRequest;
    export type PowerDescriptorResponse = descriptors.PowerDescriptor;
    export type ActiveEndpointRequest = descriptors.ShortAddressRequest;
    export type ActiveEndpointResponse = descriptors.ActiveEndpointResponse;
    export type MatchDescriptorRequest = descriptors.MatchDescriptorRequest;
    export type MatchDescriptorResponse = descriptors.MatchDescriptorResponse;
    export type ManagementLeaveRequest = managementLeave.ManagementLeave;
    export type ManagementLeaveResponse = status.StatusMessage;
    export type PermitJoiningRequest = permitjoin.PermitJoiningRequest;
    export type PermitJoiningResponse = status.StatusMessage;
    export type ManagementNetworkUpdateRequest = network.ManagementNetworkUpdateRequest;
    export type ManagementNetworkUpdateResponse = network.ManagementNetworkUpdateResponse;
    export type SystemServerDiscoveryRequest = network.SystemServerDiscoveryRequest;
    export type SystemServerDiscoveryResponse = network.SystemServerDiscoveryResponse;
    export type DeviceAnnounce = devices.DeviceAnnounce;
    export type ManagementLQIRequest = network.ManagementLQIRequest;
    export type ManagementLQIResponse = network.ManagementLQIResponse;

    export type AddGroupRequest = group.AddGroupRequest;
    export type AddGroupResponse = group.AddGroupRequest;
    export type ViewGroupRequest = group.ViewGroupRequest;
    export type ViewGroupResponse = group.ViewGroupResponse;
    export type GetGroupMembershipRequest = group.GetGroupMembershipRequest;
    export type GetGroupMembershipResponse = group.GetGroupMembershipResponse;
    export type RemoveGroupRequest = group.RemoveGroupRequest;
    export type RemoveGroupResponse = group.RemoveGroupResponse
    export type RemoveAllGroupRequest = group.RemoveAllGroupsMessage;
    export type RemoveAllGroupResponse = status.StatusMessage;
    export type AddGroupIfIdentifyRequest = group.AddGroupIfIdentifyMessage;
    export type AddGroupIfIdentifyResponse = status.StatusMessage;

    export type IdentifySendRequest = identify.IdentifySendRequest;
    export type IdentifySendResponse = status.StatusMessage;
    export type IdentifyQueryRequest = move.CommandMessage;
    export type IdentifyQueryResponse = status.StatusMessage;

    export type MoveToLevelRequest = move.MoveToLevel;
    export type MoveToLevelResponse = status.StatusMessage;
    export type MoveToLevelWithWithoutOnOffRequest = move.MoveToLevelWithWithoutOnOff;
    export type MoveToLevelWithWithoutOnOffResponse = status.StatusMessage;
    export type MoveStepRequest = move.MoveStep;
    export type MoveStepResponse = status.StatusMessage;
    export type MoveStopMoveRequest = move.CommandMessage;
    export type MoveStopMoveResponse = status.StatusMessage;
    export type MoveStopWithOnOffRequest = move.CommandMessage;
    export type MoveStopWithOnOffResponse = status.StatusMessage;

    export type OnOffWithNoEffectRequest = onoff.OnOffWithNoEffectsMessage;
    export type OnOffWithNoEffectResponse = status.StatusMessage;
    export type OnOffTimedSendRequest = onoff.OnOffTimedSendMessage;
    export type OnOffTimedSendResponse = status.StatusMessage;
    export type OnOffWithEffectsSendRequest = onoff.OnOffWithEffectsMessage;
    export type OnOffWithEffectsSendResponse = status.StatusMessage;

    export type ViewSceneRequest = scenes.SceneRequest;
    export type ViewSceneResponse = scenes.ViewSceneResponse;
    export type AddSceneRequest = scenes.AddSceneRequest;
    export type AddSceneResponse = status.StatusMessage;
    export type RemoveSceneRequest = scenes.SceneRequest;
    export type RemoveSceneResponse = status.StatusMessage;
    export type RemoveAllSceneRequest = scenes.SceneRequest;
    export type RemoveAllSceneResponse = dataIndication.DataIndication;
    export type StoreSceneRequest = scenes.SceneRequest;
    export type StoreSceneResponse = dataIndication.DataIndication;
    export type RecallSceneRequest = scenes.SceneRequest;
    export type RecallSceneResponse = dataIndication.DataIndication;
    export type SceneMembershipRequest = scenes.SceneRequest;
    export type SceneMembershipResponse = scenes.SceneMembershipResponse;
    export type AddEnhancedSceneRequest = scenes.AddSceneRequest;
    export type AddEnhancedSceneResponse = dataIndication.DataIndication;
    export type ViewEnhancedHost_NodeSceneRequest = scenes.SceneRequest;
    export type ViewEnhancedHost_NodeSceneResponse = dataIndication.DataIndication;
    export type CopySceneRequest = scenes.CopyScene;
    export type CopySceneResponse = dataIndication.DataIndication;

    export type MoveToHueRequest = hue.MoveToHue;
    export type MoveToHueResponse = dataIndication.DataIndication;
    export type MoveHueRequest = hue.MoveHue;
    export type MoveHueResponse = dataIndication.DataIndication;
    export type StepHueRequest = hue.StepHue;
    export type StepHueResponse = dataIndication.DataIndication;
    export type MoveToSaturationRequest = hue.MoveToSaturation;
    export type MoveToSaturationResponse = dataIndication.DataIndication;
    export type MoveSaturationRequest = hue.MoveSaturation;
    export type MoveSaturationResponse = dataIndication.DataIndication;
    export type StepSaturationRequest = hue.StepSaturation;
    export type StepSaturationResponse = dataIndication.DataIndication;
    export type MoveToHueAndSaturationRequest = hue.MoveToHueAndSaturation;
    export type MoveToHueAndSaturationResponse = dataIndication.DataIndication;
    export type MoveToColorRequest = hue.MoveToColor;
    export type MoveToColorResponse = dataIndication.DataIndication;
    export type MoveColorRequest = hue.MoveToColor;
    export type MoveColorResponse = dataIndication.DataIndication;
    export type StepColorRequest = hue.StepColor;
    export type StepColorResponse = dataIndication.DataIndication;
    export type EnhancedMoveToHueRequest = hue.EnhancedMoveToHue;
    export type EnhancedMoveToHueResponse = dataIndication.DataIndication;
    export type EnhancedMoveHueRequest = hue.EnhancedMoveHue;
    export type EnhancedMoveHueResponse = dataIndication.DataIndication;
    export type EnhancedStepHueRequest = hue.EnhancedStepHue;
    export type EnhancedStepHueResponse = dataIndication.DataIndication;
    export type EnhancedMoveToHueAndSaturationRequest = hue.EnhancedMoveToHueAndSaturation;
    export type EnhancedMoveToHueAndSaturationResponse = dataIndication.DataIndication;
    export type ColorLoopSetRequest = hue.ColorLoopSet;
    export type ColorLoopSetResponse = dataIndication.DataIndication;
    export type StopMoveStepRequest = move.CommandMessage;
    export type StopMoveStepResponse = dataIndication.DataIndication;

    export type MoveToColorTemperatureRequest = temperature.MoveToColorTemperature;
    export type MoveToColorTemperatureResponse = dataIndication.DataIndication;
    export type MoveColorTemperatureRequest = temperature.MoveColorTemperature;
    export type MoveColorTemperatureResponse = dataIndication.DataIndication;
    export type StepColorTemperatureRequest = temperature.StepColorTemperature;
    export type StepColorTemperatureResponse = dataIndication.DataIndication;

    export type InitiateTouchlinkRequest = void;
    export type InitiateTouchlinkResponse = touchlink.TouchlinkStatus;
    export type TouchlinkFactoryResetTargetRequest = void;
    export type TouchlinkFactoryResetTargetResponse = touchlink.TouchlinkStatus;

    export type IdentifyTriggerEffectRequest = trigger.IdentifyTriggerEffectMessage;
    export type IdentifyTriggerEffectResponse = dataIndication.DataIndication;

    export type LockUnlockDoorRequest = door.LockUnlockMessage;
    export type LockUnlockDoorResponse = dataIndication.DataIndication;

    export type ReadAttributeRequest = attributes.ReadAttributeMessage;
    export type ReadAttributeResponse = attributes.AttributeResponse;
    export type WriteAttributeRequest = attributes.WriteAttributeMessage;
    export type WriteAttributeResponse = attributes.AttributeResponse;
    export type ConfigureReportingRequest = attributes.ConfigureReportingRequest;
    export type ConfigureReportingResponse = attributes.ConfigureReportingResponse;
    export type AttributeDiscoveryRequest = attributes.AttributeDiscoveryRequest;
    export type AttributeDiscoveryResponse = attributes.AttributeDiscoveryResponse;

    export type IASZoneEnrollResponseRequest = ias.IASZoneMessage;
    export type IASZoneEnrollResponseResponse = status.StatusMessage;

    export type RawAPSDataRequest = aps.APSRequest;
    export type RawAPSDataResponse = status.StatusMessage;

    export type Status = status.StatusMessage;
    export type LogMessage = logs.LogLevel;
    export type DataIndication = dataIndication.DataIndication;
    export type NonFactoryNewRestart = gateway.FactoryNewRestart;
    export type FactoryNewRestart = gateway.FactoryNewRestart;
    export type LeaveIndication = managementLeave.LeaveIndicationResponse;
    export type DefaultResponse = status.DefaultResponse;
    export type ReportIndividualAttribute = attributes.AttributeResponse;

    export type ZoneStatusChangeNotification = network.ZoneStatusChangeNotification;

    export type RouterDiscoveryConfirm = network.RouterDiscoveryConfirm;
    export type APSDataConfirmFail = aps.APSDataConfirmFail;
}

export { MessageType };

export class Zigate extends EventEmitter
{
    private static emptyBuffer = Buffer.allocUnsafe(0);

    private chunk: Buffer;
    private queue: Queue<Buffer> = new Queue((buffer, next) =>
    {
        if (buffer == Zigate.emptyBuffer)
        {
            buffer = this.chunk;

            log('splitting buffer', buffer);

            let offset = 0;
            for (let index = 1; index < buffer.length; index++)
            {

                if (buffer[index] == 0x03)
                {
                    var remaining = buffer.slice(index + 1);
                    this.queue.enqueue(buffer.slice(offset, index + 1));
                    this.chunk = remaining;
                    offset = index + 1;
                    log('frame complete');
                }
            }
            if (buffer[buffer.length - 1] != 0x03)
            {
                log('incomplete frame', buffer);

                this.chunk = buffer;
                next(true);
                return;
            }
        }
        log('decoding buffer', buffer);

        for (let index = 1; index < buffer.length; index++)
        {
            if (buffer[index] == 0x02)
            {
                let newBuffer = Buffer.alloc(buffer.length - 1);
                buffer.copy(newBuffer, 0, 0, index);
                newBuffer[index] = buffer[index + 1] ^ 0x10;
                buffer.copy(newBuffer, index + 1, index + 2);
                buffer = newBuffer;
            }
        }
        log('decoded buffer', buffer);
        this.emit('message', Protocol.receive(Protocol.read(buffer)));
        next(true);
    });
    public constructor(private wire: Duplex)
    {
        super();
        this.wire.on('data', (buffer: Buffer) =>
        {
            if (typeof (this.chunk) != 'undefined')
                this.chunk = Buffer.concat([this.chunk, buffer]);
            else
                this.chunk = buffer;

            this.queue.enqueue(Zigate.emptyBuffer);
        })
        this.on('message', (message: Message) =>
        {
            this.emit(message.type.toString(), message.message);
            this.emit(MessageType[message.type] as keyof MessageType, message.message);
        })
    }

    public on<T>(type: keyof MessageType, handler: (message: T) => void)
    public on<T>(type: MessageType, handler: (message: T) => void)
    public on(eventName: 'message', handler: (message: Message) => void)
    public on(eventName: 'message' | keyof MessageType | MessageType, handler: (message: any) => void)
    {
        super.on(eventName.toString(), handler);
    }

    public once<T>(type: keyof MessageType, handler: (message: T) => void)
    public once<T>(type: MessageType, handler: (message: T) => void)
    public once(eventName: 'message', handler: (message: Message) => void)
    public once(eventName: 'message' | keyof MessageType | MessageType, handler: (message: any) => void)
    {
        super.once(eventName.toString(), handler);
    }

    public send<T>(type: MessageType, message?: T)
    {
        var buffer = Protocol.write({ start: 0x01, end: 0x03, checksum: 1, rssi: 0, type: type, length: 0, message: message });
        var checksum = buffer[1]
        if (typeof (message) == 'undefined')
            for (let i = 2; i < 6; i++)
            {
                checksum ^= buffer[i];
            }
        else
            for (let i = 2; i < buffer.length - 1; i++)
            {
                checksum ^= buffer[i];
            }
        buffer[5] = checksum;
        for (let index = 1; index < buffer.length - 1; index++)
        {
            if (buffer[index] < 0x10)
            {
                let newBuffer = Buffer.alloc(buffer.length + 1);
                buffer.copy(newBuffer, 0, 0, index - 1);
                newBuffer[index] = 0x02;
                newBuffer[index + 1] = buffer[index] ^ 0x10;
                buffer.copy(newBuffer, index + 2, index + 1);
                index++;
                buffer = newBuffer;
            }
        }

        this.wire.write(buffer);
    }

    public static getSerial(path?: string)
    {
        return new Promise<Zigate>((resolve, reject) =>
        {
            if (!path)
                Zigate.listEligibleSerials().then(ports =>
                {
                    if (ports.length == 0)
                        return reject('no matching port could be found');
                    if (ports.length > 1)
                        return reject('multiple Prolific adapters found');
                    resolve(new Zigate(new serialport(ports[0].comName, { baudRate: 115200, dataBits: 8 })));
                });
        })
    }

    public static listEligibleSerials()
    {
        return serialport.list().then((ports: { manufacturer: string, comName: string }[]) =>
        {
            return ports.filter(port => port.manufacturer && port.manufacturer.startsWith('Prolific'));
        })
    }
}

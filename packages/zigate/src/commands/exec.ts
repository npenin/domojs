import { MessageType, MessageTypes } from "zigate";
import { State } from "../state";
import * as akala from '@akala/core';
import { TCSignificance } from "zigate/dist/messages/permitjoin";
import { Status } from "zigate/dist/messages/status";
const log = akala.log('domojs:zigate');

export default function (this: State, deviceName: string, command: keyof typeof MessageType, value: any)
{
    log(arguments);
    switch (this.devices[deviceName].type)
    {
        case 'gateway':
            switch (command)
            {
                case 'PermitJoining':
                    return new Promise<void>((resolve, reject) =>
                    {
                        this.devices[deviceName].gateway.send<MessageTypes.PermitJoiningRequest>(MessageType.PermitJoining, { interval: 0xFE, TCSignificance: TCSignificance.NoChangeInAuthentication, targetShortAddress: 0xFFFC });
                        this.devices[deviceName].gateway.once<MessageTypes.PermitJoiningResponse>(MessageType.Status, (message) =>
                        {
                            if (message.status != Status.Success)
                                reject(message.message);
                            else
                                resolve();
                        });
                    });
                case 'PermitJoin':
                case 'GetVersion':
                case 'Reset':
                case 'ErasePersistentData':
                case 'ZLO_ZLL_FactoryNew_Reset':
                case 'PermitJoin':
                case 'GetDevicesList':
                case 'SetSecurityStateAndKey':
                case 'StartNetworkScan':
                case 'RemoveDevice':
                case 'EnablePermissionsControlJoin':
                case 'AuthenticateDevice':
                case 'Bind':
                case 'Unbind':
                case 'ManagementLeave':
                    return new Promise<void>((resolve, reject) =>
                    {
                        this.devices[deviceName].gateway.send<MessageTypes.GetVersionRequest>(MessageType[command]);
                        this.devices[deviceName].gateway.once<MessageTypes.Status>(MessageType.Status, (message) =>
                        {
                            if (message.status != Status.Success)
                                reject(message.message);
                        });
                        this.devices[deviceName].gateway.once<MessageTypes.GetVersionResponse>(MessageType.GetVersion | MessageType.Response, (message) =>
                        {
                            resolve();
                        });
                    });
                case 'GetDevicesList':
                    break;
                case 'SetExtendedPanId':
                    break;
                case 'SetChannelMask':
                    break;
                case 'SetSecurityStateAndKey':
                    break;
                case 'SetDeviceType':
                    break;
                case 'RemoveDevice':
                    break;
                case 'EnablePermissionsControlJoin':
                    break;
                case 'AuthenticateDevice':
                    break;
                case 'OutOfBandCommissionningData':
                    break;
                case 'UserDescriptorSet':
                    break;
                case 'UserDescriptor':
                    break;
                case 'ComplexDescriptor':
                    break;
                case 'Bind':
                    break;
                case 'Unbind':
                    break;
                case 'NetworkAddress':
                    break;
                case 'IEEEAddress':
                    break;
                case 'NodeDescriptor':
                    break;
                case 'SimpleDescriptor':
                    break;
                case 'PowerDescriptor':
                    break;
                case 'ActiveEndpoint':
                    break;
                case 'MatchDescriptor':
                    break;
                case 'ManagementLeave':
                    break;
                case 'PermitJoining':
                    break;
                case 'ManagementNetworkUpdate':
                    break;
                case 'SystemServerDiscovery':
                    break;
                case 'DeviceAnnounce':
                    break;
                case 'ManagementLQI':
                    break;
                case 'AddGroup':
                    break;
                case 'ViewGroup':
                    break;
                case 'GetGroupMembership':
                    break;
                case 'RemoveGroup':
                    break;
                case 'RemoveAllGroup':
                    break;
                case 'AddGroupIfIdentify':
                    break;
                case 'IdentifySend':
                    break;
                case 'IdentifyQuery':
                    break;
                case 'MoveToLevel':
                    break;
                case 'MoveToLevelWithWithoutOnOff':
                    break;
                case 'MoveStep':
                    break;
                case 'MoveStopMove':
                    break;
                case 'MoveStopWithOnOff':
                    break;
                case 'OnOffWithNoEffect':
                    break;
                case 'OnOffTimedSend':
                    break;
                case 'OnOffWithEffectsSend':
                    break;
                case 'ViewScene':
                    break;
                case 'AddScene':
                    break;
                case 'RemoveScene':
                    break;
                case 'RemoveAllScene':
                    break;
                case 'StoreScene':
                    break;
                case 'RecallScene':
                    break;
                case 'SceneMembership':
                    break;
                case 'AddEnhancedScene':
                    break;
                case 'ViewEnhancedHost_NodeScene':
                    break;
                case 'CopyScene':
                    break;
                case 'MoveToHue':
                    break;
                case 'MoveHue':
                    break;
                case 'StepHue':
                    break;
                case 'MoveToSaturation':
                    break;
                case 'MoveSaturation':
                    break;
                case 'StepSaturation':
                    break;
                case 'MoveToHueAndSaturation':
                    break;
                case 'MoveToColor':
                    break;
                case 'MoveColor':
                    break;
                case 'StepColor':
                    break;
                case 'EnhancedMoveToHue':
                    break;
                case 'EnhancedMoveHue':
                    break;
                case 'EnhancedStepHue':
                    break;
                case 'EnhancedMoveToHueAndSaturation':
                    break;
                case 'ColorLoopSet':
                    break;
                case 'StopMoveStep':
                    break;
                case 'MoveToColorTemperature':
                    break;
                case 'MoveColorTemperature':
                    break;
                case 'StepColorTemperature':
                    break;
                case 'InitiateTouchlink':
                    break;
                case 'TouchlinkFactoryResetTarget':
                    break;
                case 'IdentifyTriggerEffect':
                    break;
                case 'LockUnlockDoor':
                    break;
                case 'ReadAttribute':
                    break;
                case 'WriteAttribute':
                    break;
                case 'ConfigureReporting':
                    break;
                case 'AttributeDiscovery':
                    break;
                case 'IASZoneEnrollResponse':
                    break;
                case 'RawAPSData':
                    break;

                case 'StartNetwork':
                case 'Response':
                case 'Status':
                case 'LogMessage':
                case 'DataIndication':
                case 'ObjectClustersList':
                case 'ObjectAttributesList':
                case 'ObjectCommandsList':
                case 'NonFactoryNewRestart':
                case 'FactoryNewRestart':
                case 'LeaveIndication':
                case 'DefaultResponse':
                case 'ReportIndividualAttribute':
                case 'ZoneStatusChangeNotification':
                case 'RouterDiscoveryConfirm':
                case 'APSDataConfirmFail':
                    break;
                default:
                    var x: never = command;
                    break;
            }
            break;
        case 'device':
            break;
    }
}
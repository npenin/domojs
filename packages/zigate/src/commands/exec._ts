import { MessageType, MessageTypes, status, permitjoin } from "@domojs/zigate-parsers";
import { State } from "../state.js";
import * as akala from '@akala/core';
const log = akala.logger('domojs:zigate');

export default async function (this: State, deviceName: string, command: keyof typeof MessageType, value: any)
{
    log.debug(arguments);
    if (!this.devices[deviceName])
        throw new akala.ErrorWithStatus(404, 'There is no such device named ' + deviceName);

    const zigate = await this.devices[deviceName].gateway;

    switch (this.devices[deviceName]?.type)
    {
        case 'gateway':
            switch (command)
            {
                case 'PermitJoining':
                    return new Promise<void>((resolve, reject) =>
                    {
                        zigate.send(MessageType.PermitJoining, { interval: 0xFE, TCSignificance: permitjoin.TCSignificance.NoChangeInAuthentication, targetShortAddress: 0xFFFC });
                        zigate.once(MessageType.Status, (message: MessageTypes.PermitJoiningResponse) =>
                        {
                            if (message.status != status.Status.Success)
                                reject(message.message);
                            else
                                resolve();
                        });
                    });

                case 'GetVersion':
                    return new Promise<MessageTypes.GetVersionResponse>((resolve, reject) =>
                    {
                        zigate.send(MessageType.GetVersion);
                        zigate.once(MessageType.GetVersion, (message: MessageTypes.GetVersionResponse) =>
                        {
                            resolve(message);
                        });
                    });
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
                        zigate.send<MessageTypes.GetVersionRequest>(MessageType[command]);
                        zigate.once(MessageType.Status, (message: MessageTypes.Status) =>
                        {
                            if (message.status != status.Status.Success)
                                reject(message.message);
                        });
                        zigate.once(MessageType.GetVersion, () =>
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
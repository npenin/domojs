// This file is generated from icd-management-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:32.830Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ClientTypeEnum {
	Permanent= 0,
	Ephemeral= 1,
}

export enum OperatingModeEnum {
	SIT= 0,
	LIT= 1,
}

export enum UserActiveModeTriggerBitmap {
	PowerCycle= 0x1,
	SettingsMenu= 0x2,
	CustomInstruction= 0x4,
	DeviceManual= 0x8,
	ActuateSensor= 0x10,
	ActuateSensorSeconds= 0x20,
	ActuateSensorTimes= 0x40,
	ActuateSensorLightsBlink= 0x80,
	ResetButton= 0x100,
	ResetButtonLightsBlink= 0x200,
	ResetButtonSeconds= 0x400,
	ResetButtonTimes= 0x800,
	SetupButton= 0x1000,
	SetupButtonSeconds= 0x2000,
	SetupButtonLightsBlink= 0x4000,
	SetupButtonTimes= 0x8000,
	AppDefinedButton= 0x10000,
}

export interface MonitoringRegistrationStruct {
	CheckInNodeID:string,
	MonitoredSubject:bigint,
	ClientType:ClientTypeEnum,
}

/**
 * Allows servers to ensure that listed clients are notified when a server is available for communication.
 */

export interface ICDManagement {
id: 70;
	attributes: {
		readonly IdleModeDuration:number
		readonly ActiveModeDuration:number
		readonly ActiveModeThreshold:number
		readonly RegisteredClients?:readonly MonitoringRegistrationStruct[]
		readonly ICDCounter?:number
		readonly ClientsSupportedPerFabric?:number
		readonly UserActiveModeTriggerHint?:UserActiveModeTriggerBitmap
		readonly UserActiveModeTriggerInstruction?:string
		readonly OperatingMode?:OperatingModeEnum
		readonly MaximumCheckInBackOff?:number
		/** Device supports attributes and commands for the Check-In Protocol support. */
		readonly SupportsCheckInProtocolSupport: boolean
		/** Device supports the user active mode trigger feature. */
		readonly SupportsUserActiveModeTrigger: boolean
		/** Device supports operating as a Long Idle Time ICD. */
		readonly SupportsLongIdleTimeSupport: boolean
		/** Device supports dynamic switching from SIT to LIT operating modes. */
		readonly SupportsDynamicSitLitSupport: boolean
}
	commands: {
		/** Register a client to the end device */
		RegisterClient?: {
			inputparams: readonly [
				CheckInNodeID: string, 
				MonitoredSubject: bigint, 
				Key: import ("@akala/core").IsomorphicBuffer, 
				VerificationKey: import ("@akala/core").IsomorphicBuffer, 
				ClientType: ClientTypeEnum, 
			],
			 outputparams: readonly [
				ICDCounter: number, ]
            }
		/** Unregister a client from an end device */
		UnregisterClient?: {
			inputparams: readonly [
				CheckInNodeID: string, 
				VerificationKey: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** Request the end device to stay in Active Mode for an additional ActiveModeThreshold */
		StayActiveRequest?: {
			inputparams: readonly [
				StayActiveDuration: number, 
			],
			 outputparams: readonly [
				PromisedActiveDuration: number, ]
            }
}
	events: {
	}
}

export const iCDManagement: ClusterDefinition<ICDManagement> = {
id: 70,
	attributes: [
		"IdleModeDuration",
		"ActiveModeDuration",
		"ActiveModeThreshold",
		"RegisteredClients",
		"ICDCounter",
		"ClientsSupportedPerFabric",
		"UserActiveModeTriggerHint",
		"UserActiveModeTriggerInstruction",
		"OperatingMode",
		"MaximumCheckInBackOff",
		"SupportsCheckInProtocolSupport",
		"SupportsUserActiveModeTrigger",
		"SupportsLongIdleTimeSupport",
		"SupportsDynamicSitLitSupport",
	] as const,
	commands: [
		"RegisterClient",
		"UnregisterClient",
		"StayActiveRequest",
	] as const,
	events: [
	] as const
}

export default iCDManagement;
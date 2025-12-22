// This file is generated from ICDManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:26:03.621Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ClientTypeEnum {
	Permanent = 0,
	Ephemeral = 1,
}

export enum OperatingModeEnum {
	SIT = 0,
	LIT = 1,
}

export enum UserActiveModeTriggerBitmap {
	__NotSet = 0,
		/** Power Cycle to transition the device to ActiveMode */
	PowerCycle= 1<<0,
		/** Settings menu on the device informs how to transition the device to ActiveMode */
	SettingsMenu= 1<<1,
		/** Custom Instruction on how to transition the device to ActiveMode */
	CustomInstruction= 1<<2,
		/** Device Manual informs how to transition the device to ActiveMode */
	DeviceManual= 1<<3,
		/** Actuate Sensor to transition the device to ActiveMode */
	ActuateSensor= 1<<4,
		/** Actuate Sensor for N seconds to transition the device to ActiveMode */
	ActuateSensorSeconds= 1<<5,
		/** Actuate Sensor N times to transition the device to ActiveMode */
	ActuateSensorTimes= 1<<6,
		/** Actuate Sensor until light blinks to transition the device to ActiveMode */
	ActuateSensorLightsBlink= 1<<7,
		/** Press Reset Button to transition the device to ActiveMode */
	ResetButton= 1<<8,
		/** Press Reset Button until light blinks to transition the device to ActiveMode */
	ResetButtonLightsBlink= 1<<9,
		/** Press Reset Button for N seconds to transition the device to ActiveMode */
	ResetButtonSeconds= 1<<10,
		/** Press Reset Button N times to transition the device to ActiveMode */
	ResetButtonTimes= 1<<11,
		/** Press Setup Button to transition the device to ActiveMode */
	SetupButton= 1<<12,
		/** Press Setup Button for N seconds to transition the device to ActiveMode */
	SetupButtonSeconds= 1<<13,
		/** Press Setup Button until light blinks to transition the device to ActiveMode */
	SetupButtonLightsBlink= 1<<14,
		/** Press Setup Button N times to transition the device to ActiveMode */
	SetupButtonTimes= 1<<15,
		/** Press the N Button to transition the device to ActiveMode */
	AppDefinedButton= 1<<16,
}

export interface MonitoringRegistrationStruct {
	CheckInNodeID:string,
	MonitoredSubject:string,
	ClientType:ClientTypeEnum,
}

export type ICDManagement = ICDManagementCluster & { id: 0x0046};

export interface ICDManagementCluster {
id: 0x0046;
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
		readonly MaximumCheckInBackoff?:number
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
		RegisterClient?: {
			inputparams: readonly [
				CheckInNodeID: string, 
				MonitoredSubject: string, 
				Key: import ("@akala/core").IsomorphicBuffer, 
				VerificationKey: import ("@akala/core").IsomorphicBuffer, 
				ClientType: ClientTypeEnum, 
			],
			 outputparams: readonly [
				ICDCounter: number, ]
            }
		UnregisterClient?: {
			inputparams: readonly [
				CheckInNodeID: string, 
				VerificationKey: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
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
id: 0x0046,
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
		"MaximumCheckInBackoff",
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
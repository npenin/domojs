// This file is generated from SmokeCOAlarm.xml - do not edit it directly
// Generated on 2025-12-22T10:19:42.153Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmStateEnum {
	Normal = 0,
	Warning = 1,
	Critical = 2,
}

export enum ContaminationStateEnum {
	Normal = 0,
	Low = 1,
	Warning = 2,
	Critical = 3,
}

export enum EndOfServiceEnum {
	Normal = 0,
	Expired = 1,
}

export enum ExpressedStateEnum {
	Normal = 0,
	SmokeAlarm = 1,
	COAlarm = 2,
	BatteryAlert = 3,
	Testing = 4,
	HardwareFault = 5,
	EndOfService = 6,
	InterconnectSmoke = 7,
	InterconnectCO = 8,
}

export enum MuteStateEnum {
	NotMuted = 0,
	Muted = 1,
}

export enum SensitivityEnum {
	High = 0,
	Standard = 1,
	Low = 2,
}

export type SmokeCOAlarm = SmokeCOAlarmCluster & { id: 0x005C};

export interface SmokeCOAlarmCluster {
id: 0x005C;
	attributes: {
		readonly ExpressedState:ExpressedStateEnum
		readonly SmokeState?:AlarmStateEnum
		readonly COState?:AlarmStateEnum
		readonly BatteryAlert:AlarmStateEnum
		readonly DeviceMuted?:MuteStateEnum
		readonly TestInProgress:boolean
		readonly HardwareFaultAlert:boolean
		readonly EndOfServiceAlert:EndOfServiceEnum
		readonly InterconnectSmokeAlarm?:AlarmStateEnum
		readonly InterconnectCOAlarm?:AlarmStateEnum
		readonly ContaminationState?:ContaminationStateEnum
		readonly SmokeSensitivityLevel?:SensitivityEnum
		readonly ExpiryDate?:number
		/** Supports Smoke alarm */
		readonly SupportsSmokeAlarm: boolean
		/** Supports CO alarm */
		readonly SupportsCOAlarm: boolean
}
	commands: {
		SelfTestRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		SmokeAlarm: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		COAlarm: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		LowBattery: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		HardwareFault: [
			];
		EndOfService: [
			];
		SelfTestComplete: [
			];
		AlarmMuted: [
			];
		MuteEnded: [
			];
		InterconnectSmokeAlarm: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		InterconnectCOAlarm: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		AllClear: [
			];
	}
}

export const smokeCOAlarm: ClusterDefinition<SmokeCOAlarm> = {
id: 0x005C,
	attributes: [
		"ExpressedState",
		"SmokeState",
		"COState",
		"BatteryAlert",
		"DeviceMuted",
		"TestInProgress",
		"HardwareFaultAlert",
		"EndOfServiceAlert",
		"InterconnectSmokeAlarm",
		"InterconnectCOAlarm",
		"ContaminationState",
		"SmokeSensitivityLevel",
		"ExpiryDate",
		"SupportsSmokeAlarm",
		"SupportsCOAlarm",
	] as const,
	commands: [
		"SelfTestRequest",
	] as const,
	events: [
	] as const
}

export default smokeCOAlarm;
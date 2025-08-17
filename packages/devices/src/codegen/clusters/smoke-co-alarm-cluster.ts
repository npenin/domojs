// This file is generated from smoke-co-alarm-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.602Z

import { Cluster } from '../../server/clients/shared.js';


export enum AlarmStateEnum {
	Normal= 0,
	Warning= 1,
	Critical= 2,
}

export enum SensitivityEnum {
	High= 0,
	Standard= 1,
	Low= 2,
}

export enum ExpressedStateEnum {
	Normal= 0,
	SmokeAlarm= 1,
	COAlarm= 2,
	BatteryAlert= 3,
	Testing= 4,
	HardwareFault= 5,
	EndOfService= 6,
	InterconnectSmoke= 7,
	InterconnectCO= 8,
}

export enum MuteStateEnum {
	NotMuted= 0,
	Muted= 1,
}

export enum EndOfServiceEnum {
	Normal= 0,
	Expired= 1,
}

export enum ContaminationStateEnum {
	Normal= 0,
	Low= 1,
	Warning= 2,
	Critical= 3,
}

/**
 * This cluster provides an interface for observing and managing the state of smoke and CO alarms.
 */

export interface SmokeCOAlarm {
id: 92;
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
		SmokeSensitivityLevel?:SensitivityEnum
		readonly ExpiryDate?:number
		/** Supports Smoke alarm */
		readonly SupportsSmokeAlarm: boolean
		/** Supports CO alarm */
		readonly SupportsCOAlarm: boolean
}
	commands: {
		/** This command SHALL initiate a device self-test. */
		SelfTestRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		SmokeAlarm?: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		COAlarm?: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		LowBattery: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		HardwareFault: [
			];
		EndOfService: [
			];
		SelfTestComplete: [
			];
		AlarmMuted?: [
			];
		MuteEnded?: [
			];
		InterconnectSmokeAlarm?: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		InterconnectCOAlarm?: [
			
			AlarmSeverityLevel: AlarmStateEnum, ];
		AllClear: [
			];
	}
}

export const smokeCOAlarm: Cluster<SmokeCOAlarm['attributes'], SmokeCOAlarm['commands'], SmokeCOAlarm['events']> = {
id: 92,
	attributes: {
		ExpressedState:null,
		SmokeState:null,
		COState:null,
		BatteryAlert:null,
		DeviceMuted:null,
		TestInProgress:null,
		HardwareFaultAlert:null,
		EndOfServiceAlert:null,
		InterconnectSmokeAlarm:null,
		InterconnectCOAlarm:null,
		ContaminationState:null,
		SmokeSensitivityLevel:null,
		ExpiryDate:0,
		/** Supports Smoke alarm */
	SupportsSmokeAlarm: false,
		/** Supports CO alarm */
	SupportsCOAlarm: false,
},
	commands: {
		/** This command SHALL initiate a device self-test. */
		SelfTestRequest: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		SmokeAlarm: [
			
			null, ],
		COAlarm: [
			
			null, ],
		LowBattery: [
			
			null, ],
		HardwareFault: [
			],
		EndOfService: [
			],
		SelfTestComplete: [
			],
		AlarmMuted: [
			],
		MuteEnded: [
			],
		InterconnectSmokeAlarm: [
			
			null, ],
		InterconnectCOAlarm: [
			
			null, ],
		AllClear: [
			],
	}
}

export default smokeCOAlarm;
// This file is generated from FanControl.xml - do not edit it directly
// Generated on 2025-12-22T10:26:02.570Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AirflowDirectionEnum {
	Forward = 0,
	Reverse = 1,
}

export enum FanModeEnum {
	Off = 0,
	Low = 1,
	Medium = 2,
	High = 3,
	On = 4,
	Auto = 5,
	Smart = 6,
}

export enum FanModeSequenceEnum {
	OffLowMedHigh = 0,
	OffLowHigh = 1,
	OffLowMedHighAuto = 2,
	OffLowHighAuto = 3,
	OffHighAuto = 4,
	OffHigh = 5,
}

export enum StepDirectionEnum {
	Increase = 0,
	Decrease = 1,
}

export enum RockBitmap {
	__NotSet = 0,
		/** Indicate rock left to right */
	RockLeftRight= 1<<0,
		/** Indicate rock up and down */
	RockUpDown= 1<<1,
		/** Indicate rock around */
	RockRound= 1<<2,
}

export enum WindBitmap {
	__NotSet = 0,
		/** Indicate sleep wind */
	SleepWind= 1<<0,
		/** Indicate natural wind */
	NaturalWind= 1<<1,
}

export type FanControl = FanControlCluster & { id: 0x0202};

export interface FanControlCluster {
id: 0x0202;
	attributes: {
		readonly FanMode:FanModeEnum
		readonly FanModeSequence:FanModeSequenceEnum
		readonly PercentSetting:number
		readonly PercentCurrent:number
		readonly SpeedMax?:number
		readonly SpeedSetting?:number
		readonly SpeedCurrent?:number
		readonly RockSupport?:RockBitmap
		readonly RockSetting?:RockBitmap
		readonly WindSupport?:WindBitmap
		readonly WindSetting?:WindBitmap
		readonly AirflowDirection?:AirflowDirectionEnum
		/** 0-SpeedMax Fan Speeds */
		readonly SupportsMultiSpeed: boolean
		/** Automatic mode supported for fan speed */
		readonly SupportsAuto: boolean
		/** Rocking movement supported */
		readonly SupportsRocking: boolean
		/** Wind emulation supported */
		readonly SupportsWind: boolean
		/** Step command supported */
		readonly SupportsStep: boolean
		/** Airflow Direction attribute is supported */
		readonly SupportsAirflowDirection: boolean
}
	commands: {
		Step?: {
			inputparams: readonly [
				Direction: StepDirectionEnum, 
				Wrap: boolean, 
				LowestOff: boolean, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const fanControl: ClusterDefinition<FanControl> = {
id: 0x0202,
	attributes: [
		"FanMode",
		"FanModeSequence",
		"PercentSetting",
		"PercentCurrent",
		"SpeedMax",
		"SpeedSetting",
		"SpeedCurrent",
		"RockSupport",
		"RockSetting",
		"WindSupport",
		"WindSetting",
		"AirflowDirection",
		"SupportsMultiSpeed",
		"SupportsAuto",
		"SupportsRocking",
		"SupportsWind",
		"SupportsStep",
		"SupportsAirflowDirection",
	] as const,
	commands: [
		"Step",
	] as const,
	events: [
	] as const
}

export default fanControl;
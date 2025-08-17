// This file is generated from fan-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.101Z

import { Cluster } from '../../server/clients/shared.js';


export enum FanModeEnum {
	Off= 0,
	Low= 1,
	Medium= 2,
	High= 3,
	On= 4,
	Auto= 5,
	Smart= 6,
}

export enum FanModeSequenceEnum {
	OffLowMedHigh= 0,
	OffLowHigh= 1,
	OffLowMedHighAuto= 2,
	OffLowHighAuto= 3,
	OffHighAuto= 4,
	OffHigh= 5,
}

export enum StepDirectionEnum {
	Increase= 0,
	Decrease= 1,
}

export enum AirflowDirectionEnum {
	Forward= 0,
	Reverse= 1,
}

export enum RockBitmap {
	RockLeftRight= 0x01,
	RockUpDown= 0x02,
	RockRound= 0x04,
}

export enum WindBitmap {
	SleepWind= 0x01,
	NaturalWind= 0x02,
}

/**
 * An interface for controlling a fan in a heating/cooling system.
 */

export interface FanControl {
id: 514;
	attributes: {
		FanMode:FanModeEnum
		readonly FanModeSequence:FanModeSequenceEnum
		PercentSetting?:number
		readonly PercentCurrent:number
		readonly SPEED_MAX?:number
		SPEED_SETTING?:number
		readonly SPEED_CURRENT?:number
		readonly ROCK_SUPPORT?:RockBitmap
		ROCK_SETTING?:RockBitmap
		readonly WIND_SUPPORT?:WindBitmap
		WIND_SETTING?:WindBitmap
		AIRFLOW_DIRECTION?:AirflowDirectionEnum
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
		/** This command speeds up or slows down the fan, in steps, without a client having to know the fan speed. */
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

export const fanControl: Cluster<FanControl['attributes'], FanControl['commands'], FanControl['events']> = {
id: 514,
	attributes: {
		FanMode:null,
		FanModeSequence:null,
		PercentSetting:0,
		PercentCurrent:0,
		SPEED_MAX:0,
		SPEED_SETTING:0,
		SPEED_CURRENT:0,
		ROCK_SUPPORT:null,
		ROCK_SETTING:null,
		WIND_SUPPORT:null,
		WIND_SETTING:null,
		AIRFLOW_DIRECTION:null,
		/** 0-SpeedMax Fan Speeds */
	SupportsMultiSpeed: false,
		/** Automatic mode supported for fan speed */
	SupportsAuto: false,
		/** Rocking movement supported */
	SupportsRocking: false,
		/** Wind emulation supported */
	SupportsWind: false,
		/** Step command supported */
	SupportsStep: false,
		/** Airflow Direction attribute is supported */
	SupportsAirflowDirection: false,
},
	commands: {
		/** This command speeds up or slows down the fan, in steps, without a client having to know the fan speed. */
		Step: {
			inputparams: [
				null, 
				null, 
				null, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default fanControl;
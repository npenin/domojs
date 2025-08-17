// This file is generated from valve-configuration-and-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.019Z

import { Cluster } from '../../server/clients/shared.js';


export enum ValveStateEnum {
	Closed= 0,
	Open= 1,
	Transitioning= 2,
}

export enum StatusCodeEnum {
	FailureDueToFault= 2,
}

export enum ValveFaultBitmap {
	GeneralFault= 0x01,
	Blocked= 0x02,
	Leaking= 0x04,
	NotConnected= 0x08,
	ShortCircuit= 0x10,
	CurrentExceeded= 0x20,
}

/**
 * This cluster is used to configure a valve.
 */

export interface ValveConfigurationAndControl {
id: 129;
	attributes: {
		readonly OpenDuration?:number
		DefaultOpenDuration?:number
		readonly AutoCloseTime?:number
		readonly RemainingDuration?:number
		readonly CurrentState?:ValveStateEnum
		readonly TargetState?:ValveStateEnum
		readonly CurrentLevel?:number
		readonly TargetLevel?:number
		DefaultOpenLevel:number
		readonly ValveFault:ValveFaultBitmap
		readonly LevelStep:number
		/** UTC time is used for time indications */
		readonly SupportsTimeSync: boolean
		/** Device supports setting the specific position of the valve */
		readonly SupportsLevel: boolean
}
	commands: {
		/** This command is used to set the valve to its open position. */
		Open: {
			inputparams: readonly [
				OpenDuration: number, 
				TargetLevel: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to set the valve to its closed position. */
		Close: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		ValveStateChanged: [
			
			ValveState: ValveStateEnum, 
			ValveLevel: number, ];
		ValveFault: [
			
			ValveFault: ValveFaultBitmap, ];
	}
}

export const valveConfigurationAndControl: Cluster<ValveConfigurationAndControl['attributes'], ValveConfigurationAndControl['commands'], ValveConfigurationAndControl['events']> = {
id: 129,
	attributes: {
		OpenDuration:0,
		DefaultOpenDuration:0,
		AutoCloseTime:0,
		RemainingDuration:0,
		CurrentState:null,
		TargetState:null,
		CurrentLevel:0,
		TargetLevel:0,
		DefaultOpenLevel:0,
		ValveFault:null,
		LevelStep:0,
		/** UTC time is used for time indications */
	SupportsTimeSync: false,
		/** Device supports setting the specific position of the valve */
	SupportsLevel: false,
},
	commands: {
		/** This command is used to set the valve to its open position. */
		Open: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: []
            },
		/** This command is used to set the valve to its closed position. */
		Close: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		ValveStateChanged: [
			
			null, 
			0, ],
		ValveFault: [
			
			null, ],
	}
}

export default valveConfigurationAndControl;
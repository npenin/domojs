// This file is generated from ValveConfigurationControl.xml - do not edit it directly
// Generated on 2025-12-18T03:05:15.244Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCodeEnum {
	FailureDueToFault = 2,
}

export enum ValveStateEnum {
	Closed = 0,
	Open = 1,
	Transitioning = 2,
}

export enum ValveFaultBitmap {
	__NotSet = 0,
		/** Unspecified fault detected */
	GeneralFault= 1<<0,
		/** Valve is blocked */
	Blocked= 1<<1,
		/** Valve has detected a leak */
	Leaking= 1<<2,
		/** No valve is connected to controller */
	NotConnected= 1<<3,
		/** Short circuit is detected */
	ShortCircuit= 1<<4,
		/** The available current has been exceeded */
	CurrentExceeded= 1<<5,
}

export type ValveConfigurationAndControl = ValveConfigurationAndControlCluster & { id: 0x0081};

export interface ValveConfigurationAndControlCluster {
id: 0x0081;
	attributes: {
		readonly OpenDuration:number
		readonly DefaultOpenDuration:number
		readonly AutoCloseTime?:number
		readonly RemainingDuration:number
		readonly CurrentState:ValveStateEnum
		readonly TargetState:ValveStateEnum
		readonly CurrentLevel?:number
		readonly TargetLevel?:number
		readonly DefaultOpenLevel?:number
		readonly ValveFault?:ValveFaultBitmap
		readonly LevelStep?:number
		/** UTC time is used for time indications */
		readonly SupportsTimeSync: boolean
		/** Device supports setting the specific position of the valve */
		readonly SupportsLevel: boolean
}
	commands: {
		Open: {
			inputparams: readonly [
				OpenDuration: number, 
				TargetLevel: number, 
			],
			 outputparams: readonly []
            }
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

export const valveConfigurationAndControl: ClusterDefinition<ValveConfigurationAndControl> = {
id: 0x0081,
	attributes: [
		"OpenDuration",
		"DefaultOpenDuration",
		"AutoCloseTime",
		"RemainingDuration",
		"CurrentState",
		"TargetState",
		"CurrentLevel",
		"TargetLevel",
		"DefaultOpenLevel",
		"ValveFault",
		"LevelStep",
		"SupportsTimeSync",
		"SupportsLevel",
	] as const,
	commands: [
		"Open",
		"Close",
	] as const,
	events: [
	] as const
}

export default valveConfigurationAndControl;
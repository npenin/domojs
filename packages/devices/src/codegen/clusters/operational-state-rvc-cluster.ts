// This file is generated from operational-state-rvc-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.216Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum OperationalStateEnum {
	Stopped= 0,
	Running= 1,
	Paused= 2,
	Error= 3,
	SeekingCharger= 64,
	Charging= 65,
	Docked= 66,
	EmptyingDustBin= 67,
	CleaningMop= 68,
	FillingWaterTank= 69,
	UpdatingMaps= 70,
}

export enum ErrorStateEnum {
	NoError= 0,
	UnableToStartOrResume= 1,
	UnableToCompleteOperation= 2,
	CommandInvalidInState= 3,
	FailedToFindChargingDock= 64,
	Stuck= 65,
	DustBinMissing= 66,
	DustBinFull= 67,
	WaterTankEmpty= 68,
	WaterTankMissing= 69,
	WaterTankLidOpen= 70,
	MopCleaningPadMissing= 71,
	LowBattery= 72,
	CannotReachTargetArea= 73,
	DirtyWaterTankFull= 74,
	DirtyWaterTankMissing= 75,
	WheelsJammed= 76,
	BrushJammed= 77,
	NavigationSensorObscured= 78,
}

/**
 * This cluster supports remotely monitoring and, where supported, changing the operational state of a Robotic Vacuum.
 */

export interface RVCOperationalState {
id: 97;
	attributes: {
		readonly PhaseList?:readonly string[]
		readonly CurrentPhase?:number
		readonly CountdownTime?:number
		readonly OperationalStateList:readonly import("./operational-state-cluster.js").OperationalStateStruct[]
		readonly OperationalState:number
		readonly OperationalError:import("./operational-state-cluster.js").ErrorStateStruct
}
	commands: {
		/** Upon receipt, the device SHALL pause its operation if it is possible based on the current function of the server. */
		Pause?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: import("./operational-state-cluster.js").ErrorStateStruct, ]
            }
		/** Upon receipt, the device SHALL resume its operation from the point it was at when it received the Pause command, or from the point when it was paused by means outside of this cluster (for example by manual button press). */
		Resume?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: import("./operational-state-cluster.js").ErrorStateStruct, ]
            }
		/** On receipt of this command, the device SHALL start seeking the charging dock, if possible in the current state of the device. */
		GoHome?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				CommandResponseState: import("./operational-state-cluster.js").ErrorStateStruct, ]
            }
}
	events: {
		OperationalError: [
			
			ErrorState: import("./operational-state-cluster.js").ErrorStateStruct, ];
		OperationCompletion?: [
			
			CompletionErrorCode: number, 
			TotalOperationalTime: number, 
			PausedTime: number, ];
	}
}

export const rVCOperationalState: ClusterDefinition<RVCOperationalState> = {
id: 97,
	attributes: [
		"PhaseList",
		"CurrentPhase",
		"CountdownTime",
		"OperationalStateList",
		"OperationalState",
		"OperationalError",
	] as const,
	commands: [
		"Pause",
		"Resume",
		"GoHome",
	] as const,
	events: [
		"OperationalError",
		"OperationCompletion",
	] as const
}

export default rVCOperationalState;
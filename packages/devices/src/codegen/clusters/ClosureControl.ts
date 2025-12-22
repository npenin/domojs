// This file is generated from ClosureControl.xml - do not edit it directly
// Generated on 2025-12-22T10:25:58.005Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ClosureErrorEnum {
	PhysicallyBlocked = 0,
	BlockedBySensor = 1,
	TemperatureLimited = 2,
	MaintenanceRequired = 3,
	InternalInterference = 4,
}

export enum CurrentPositionEnum {
	FullyClosed = 0,
	FullyOpened = 1,
	PartiallyOpened = 2,
	OpenedForPedestrian = 3,
	OpenedForVentilation = 4,
	OpenedAtSignature = 5,
}

export enum MainStateEnum {
	Stopped = 0,
	Moving = 1,
	WaitingForMotion = 2,
	Error = 3,
	Calibrating = 4,
	Protected = 5,
	Disengaged = 6,
	SetupRequired = 7,
}

export enum TargetPositionEnum {
	MoveToFullyClosed = 0,
	MoveToFullyOpen = 1,
	MoveToPedestrianPosition = 2,
	MoveToVentilationPosition = 3,
	MoveToSignaturePosition = 4,
}

export enum LatchControlModesBitmap {
	__NotSet = 0,
		/** Remote latching capability */
	RemoteLatching= 1<<0,
		/** Remote unlatching capability */
	RemoteUnlatching= 1<<1,
}

export interface OverallCurrentStateStruct {
	Position?:CurrentPositionEnum,
	Latch?:boolean,
	Speed?:import("./global-Enums.js").ThreeLevelAutoEnum,
	SecureState:boolean,
}

export interface OverallTargetStateStruct {
	Position?:TargetPositionEnum,
	Latch?:boolean,
	Speed?:import("./global-Enums.js").ThreeLevelAutoEnum,
}

export type ClosureControl = ClosureControlCluster & { id: 0x0104};

export interface ClosureControlCluster {
id: 0x0104;
	attributes: {
		readonly CountdownTime?:number
		readonly MainState:MainStateEnum
		readonly CurrentErrorList:readonly ClosureErrorEnum[]
		readonly OverallCurrentState:OverallCurrentStateStruct
		readonly OverallTargetState:OverallTargetStateStruct
		readonly LatchControlModes?:LatchControlModesBitmap
		/** Supports Positioning with at least Fully Opened (0%) and Fully Closed (100%) discrete positions */
		readonly SupportsPositioning: boolean
		/** Supports a latch (securing a position, or a state) */
		readonly SupportsMotionLatching: boolean
		/** Supports the Instantaneous feature */
		readonly SupportsInstantaneous: boolean
		/** Supports Speed motion throttling */
		readonly SupportsSpeed: boolean
		/** Supports Ventilation discrete state */
		readonly SupportsVentilation: boolean
		/** Supports Pedestrian discrete state */
		readonly SupportsPedestrian: boolean
		/** Supports the Calibration feature */
		readonly SupportsCalibration: boolean
		/** Supports the Protection feature */
		readonly SupportsProtection: boolean
		/** Supports the manual operation feature */
		readonly SupportsManuallyOperable: boolean
}
	commands: {
		Stop?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		MoveTo: {
			inputparams: readonly [
				Position: TargetPositionEnum, 
				Latch: boolean, 
				Speed: import("./global-Enums.js").ThreeLevelAutoEnum, 
			],
			 outputparams: readonly []
            }
		Calibrate?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		OperationalError: [
			
			ErrorState: readonly ClosureErrorEnum[], ];
		MovementCompleted: [
			];
		EngageStateChanged: [
			
			EngageValue: boolean, ];
		SecureStateChanged: [
			
			SecureValue: boolean, ];
	}
}

export const closureControl: ClusterDefinition<ClosureControl> = {
id: 0x0104,
	attributes: [
		"CountdownTime",
		"MainState",
		"CurrentErrorList",
		"OverallCurrentState",
		"OverallTargetState",
		"LatchControlModes",
		"SupportsPositioning",
		"SupportsMotionLatching",
		"SupportsInstantaneous",
		"SupportsSpeed",
		"SupportsVentilation",
		"SupportsPedestrian",
		"SupportsCalibration",
		"SupportsProtection",
		"SupportsManuallyOperable",
	] as const,
	commands: [
		"Stop",
		"MoveTo",
		"Calibrate",
	] as const,
	events: [
	] as const
}

export default closureControl;
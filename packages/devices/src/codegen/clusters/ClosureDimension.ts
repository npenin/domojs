// This file is generated from ClosureDimension.xml - do not edit it directly
// Generated on 2025-12-22T10:19:26.939Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ClosureUnitEnum {
	Millimeter = 0,
	Degree = 1,
}

export enum ModulationTypeEnum {
	SlatsOrientation = 0,
	SlatsOpenwork = 1,
	StripesAlignment = 2,
	Opacity = 3,
	Ventilation = 4,
}

export enum OverflowEnum {
	NoOverflow = 0,
	Inside = 1,
	Outside = 2,
	TopInside = 3,
	TopOutside = 4,
	BottomInside = 5,
	BottomOutside = 6,
	LeftInside = 7,
	LeftOutside = 8,
	RightInside = 9,
	RightOutside = 10,
}

export enum RotationAxisEnum {
	Left = 0,
	CenteredVertical = 1,
	LeftAndRight = 2,
	Right = 3,
	Top = 4,
	CenteredHorizontal = 5,
	TopAndBottom = 6,
	Bottom = 7,
	LeftBarrier = 8,
	LeftAndRightBarriers = 9,
	RightBarrier = 10,
}

export enum StepDirectionEnum {
	Decrease = 0,
	Increase = 1,
}

export enum TranslationDirectionEnum {
	Downward = 0,
	Upward = 1,
	VerticalMask = 2,
	VerticalSymmetry = 3,
	Leftward = 4,
	Rightward = 5,
	HorizontalMask = 6,
	HorizontalSymmetry = 7,
	Forward = 8,
	Backward = 9,
	DepthMask = 10,
	DepthSymmetry = 11,
}

export enum LatchControlModesBitmap {
	__NotSet = 0,
		/** Remote latching capability */
	RemoteLatching= 1<<0,
		/** Remote unlatching capability */
	RemoteUnlatching= 1<<1,
}

export interface DimensionStateStruct {
	Position?:number,
	Latch?:boolean,
	Speed?:import("./global-Enums.js").ThreeLevelAutoEnum,
}

export interface RangePercent100thsStruct {
	Min:number,
	Max:number,
}

export interface UnitRangeStruct {
	Min:number,
	Max:number,
}

export type ClosureDimension = ClosureDimensionCluster & { id: 0x0105};

export interface ClosureDimensionCluster {
id: 0x0105;
	attributes: {
		readonly CurrentState:DimensionStateStruct
		readonly TargetState:DimensionStateStruct
		readonly Resolution?:number
		readonly StepValue?:number
		readonly Unit?:ClosureUnitEnum
		readonly UnitRange?:UnitRangeStruct
		readonly LimitRange?:RangePercent100thsStruct
		readonly TranslationDirection?:TranslationDirectionEnum
		readonly RotationAxis?:RotationAxisEnum
		readonly Overflow?:OverflowEnum
		readonly ModulationType?:ModulationTypeEnum
		readonly LatchControlModes?:LatchControlModesBitmap
		/** Supports Positioning in the range from 0.00% to 100.00% */
		readonly SupportsPositioning: boolean
		/** Supports a latch to secure the closure to a position or state */
		readonly SupportsMotionLatching: boolean
		/** Specifies the relevant unit and range for this dimension (mm, degrees etc.) */
		readonly SupportsUnit: boolean
		/** Supports limitation of the operating range */
		readonly SupportsLimitation: boolean
		/** Supports speed motion throttling. */
		readonly SupportsSpeed: boolean
		/** Drives a translation motion */
		readonly SupportsTranslation: boolean
		/** Drives a rotation motion */
		readonly SupportsRotation: boolean
		/** Modulates a particular flow level (light, air, privacy ...) */
		readonly SupportsModulation: boolean
}
	commands: {
		SetTarget: {
			inputparams: readonly [
				Position: number, 
				Latch: boolean, 
				Speed: import("./global-Enums.js").ThreeLevelAutoEnum, 
			],
			 outputparams: readonly []
            }
		Step?: {
			inputparams: readonly [
				Direction: StepDirectionEnum, 
				NumberOfSteps: number, 
				Speed: import("./global-Enums.js").ThreeLevelAutoEnum, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const closureDimension: ClusterDefinition<ClosureDimension> = {
id: 0x0105,
	attributes: [
		"CurrentState",
		"TargetState",
		"Resolution",
		"StepValue",
		"Unit",
		"UnitRange",
		"LimitRange",
		"TranslationDirection",
		"RotationAxis",
		"Overflow",
		"ModulationType",
		"LatchControlModes",
		"SupportsPositioning",
		"SupportsMotionLatching",
		"SupportsUnit",
		"SupportsLimitation",
		"SupportsSpeed",
		"SupportsTranslation",
		"SupportsRotation",
		"SupportsModulation",
	] as const,
	commands: [
		"SetTarget",
		"Step",
	] as const,
	events: [
	] as const
}

export default closureDimension;
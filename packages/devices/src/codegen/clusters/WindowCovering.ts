// This file is generated from WindowCovering.xml - do not edit it directly
// Generated on 2025-12-22T10:19:45.993Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum EndProductTypeEnum {
	RollerShade = 0,
	RomanShade = 1,
	BalloonShade = 2,
	WovenWood = 3,
	PleatedShade = 4,
	CellularShade = 5,
	LayeredShade = 6,
	LayeredShade2D = 7,
	SheerShade = 8,
	TiltOnlyInteriorBlind = 9,
	InteriorBlind = 10,
	VerticalBlindStripCurtain = 11,
	InteriorVenetianBlind = 12,
	ExteriorVenetianBlind = 13,
	LateralLeftCurtain = 14,
	LateralRightCurtain = 15,
	CentralCurtain = 16,
	RollerShutter = 17,
	ExteriorVerticalScreen = 18,
	AwningTerracePatio = 19,
	AwningVerticalScreen = 20,
	TiltOnlyPergola = 21,
	SwingingShutter = 22,
	SlidingShutter = 23,
	Unknown = 255,
}

export enum TypeEnum {
	RollerShade = 0,
	RollerShade2Motor = 1,
	RollerShadeExterior = 2,
	RollerShadeExterior2Motor = 3,
	Drapery = 4,
	Awning = 5,
	Shutter = 6,
	TiltBlindTiltOnly = 7,
	TiltBlindLiftAndTilt = 8,
	ProjectorScreen = 9,
	Unknown = 255,
}

export enum ConfigStatusBitmap {
	__NotSet = 0,
		/** Device is operational. */
	Operational= 1<<0,
	OnlineReserved= 1<<1,
		/** The lift movement is reversed. */
	LiftMovementReversed= 1<<2,
		/** Supports the PositionAwareLift feature (PA_LF). */
	LiftPositionAware= 1<<3,
		/** Supports the PositionAwareTilt feature (PA_TL). */
	TiltPositionAware= 1<<4,
		/** Uses an encoder for lift. */
	LiftEncoderControlled= 1<<5,
		/** Uses an encoder for tilt. */
	TiltEncoderControlled= 1<<6,
}

export enum ModeBitmap {
	__NotSet = 0,
		/** Reverse the lift direction. */
	MotorDirectionReversed= 1<<0,
		/** Perform a calibration. */
	CalibrationMode= 1<<1,
		/** Freeze all motions for maintenance. */
	MaintenanceMode= 1<<2,
		/** Control the LEDs feedback. */
	LedFeedback= 1<<3,
}

export enum OperationalStatusBitmap {
	__NotSet = 0,
		/** Global operational state. */
	Global= 0x3,
		/** Lift operational state. */
	Lift= 0xc,
		/** Tilt operational state. */
	Tilt= 0x30,
}

export enum SafetyStatusBitmap {
	__NotSet = 0,
		/** Movement commands are ignored (locked out). e.g. not granted authorization, outside some time/date range. */
	RemoteLockout= 1<<0,
		/** Tampering detected on sensors or any other safety equipment. Ex: a device has been forcedly moved without its actuator(s). */
	TamperDetection= 1<<1,
		/** Communication failure to sensors or other safety equipment. */
	FailedCommunication= 1<<2,
		/** Device has failed to reach the desired position. e.g. with position aware device, time expired before TargetPosition is reached. */
	PositionFailure= 1<<3,
		/** Motor(s) and/or electric circuit thermal protection activated. */
	ThermalProtection= 1<<4,
		/** An obstacle is preventing actuator movement. */
	ObstacleDetected= 1<<5,
		/** Device has power related issue or limitation e.g. device is running w/ the help of a backup battery or power might not be fully available at the moment. */
	Power= 1<<6,
		/** Local safety sensor (not a direct obstacle) is preventing movements (e.g. Safety EU Standard EN60335). */
	StopInput= 1<<7,
		/** Mechanical problem related to the motor(s) detected. */
	MotorJammed= 1<<8,
		/** PCB, fuse and other electrics problems. */
	HardwareFailure= 1<<9,
		/** Actuator is manually operated and is preventing actuator movement (e.g. actuator is disengaged/decoupled). */
	ManualOperation= 1<<10,
		/** Protection is activated. */
	Protection= 1<<11,
}

export type WindowCovering = WindowCoveringCluster & { id: 0x0102};

export interface WindowCoveringCluster {
id: 0x0102;
	attributes: {
		readonly Type:TypeEnum
		readonly NumberOfActuationsLift?:number
		readonly NumberOfActuationsTilt?:number
		readonly ConfigStatus:ConfigStatusBitmap
		readonly CurrentPositionLiftPercentage?:number
		readonly CurrentPositionTiltPercentage?:number
		readonly OperationalStatus:OperationalStatusBitmap
		readonly TargetPositionLiftPercent100ths?:number
		readonly TargetPositionTiltPercent100ths?:number
		readonly EndProductType:EndProductTypeEnum
		readonly CurrentPositionLiftPercent100ths?:number
		readonly CurrentPositionTiltPercent100ths?:number
		readonly Mode:ModeBitmap
		readonly SafetyStatus?:SafetyStatusBitmap
		/** Lift control and behavior for lifting/sliding window coverings */
		readonly SupportsLift: boolean
		/** Tilt control and behavior for tilting window coverings */
		readonly SupportsTilt: boolean
		/** Position aware lift control is supported. */
		readonly SupportsPositionAwareLift: boolean
		/** Position aware tilt control is supported. */
		readonly SupportsPositionAwareTilt: boolean
}
	commands: {
		UpOrOpen: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		DownOrClose: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		StopMotion: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		GoToLiftPercentage?: {
			inputparams: readonly [
				LiftPercent100thsValue: number, 
			],
			 outputparams: readonly []
            }
		GoToTiltPercentage?: {
			inputparams: readonly [
				TiltPercent100thsValue: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const windowCovering: ClusterDefinition<WindowCovering> = {
id: 0x0102,
	attributes: [
		"Type",
		"NumberOfActuationsLift",
		"NumberOfActuationsTilt",
		"ConfigStatus",
		"CurrentPositionLiftPercentage",
		"CurrentPositionTiltPercentage",
		"OperationalStatus",
		"TargetPositionLiftPercent100ths",
		"TargetPositionTiltPercent100ths",
		"EndProductType",
		"CurrentPositionLiftPercent100ths",
		"CurrentPositionTiltPercent100ths",
		"Mode",
		"SafetyStatus",
		"SupportsLift",
		"SupportsTilt",
		"SupportsPositionAwareLift",
		"SupportsPositionAwareTilt",
	] as const,
	commands: [
		"UpOrOpen",
		"DownOrClose",
		"StopMotion",
		"GoToLiftPercentage",
		"GoToTiltPercentage",
	] as const,
	events: [
	] as const
}

export default windowCovering;
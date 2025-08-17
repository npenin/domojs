// This file is generated from window-covering.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.194Z

import { Cluster } from '../../server/clients/shared.js';


export enum Type {
	RollerShade= 0,
	RollerShade2Motor= 1,
	RollerShadeExterior= 2,
	RollerShadeExterior2Motor= 3,
	Drapery= 4,
	Awning= 5,
	Shutter= 6,
	TiltBlindTiltOnly= 7,
	TiltBlindLiftAndTilt= 8,
	ProjectorScreen= 9,
	Unknown= 255,
}

export enum EndProductType {
	RollerShade= 0,
	RomanShade= 1,
	BalloonShade= 2,
	WovenWood= 3,
	PleatedShade= 4,
	CellularShade= 5,
	LayeredShade= 6,
	LayeredShade2D= 7,
	SheerShade= 8,
	TiltOnlyInteriorBlind= 9,
	InteriorBlind= 10,
	VerticalBlindStripCurtain= 11,
	InteriorVenetianBlind= 12,
	ExteriorVenetianBlind= 13,
	LateralLeftCurtain= 14,
	LateralRightCurtain= 15,
	CentralCurtain= 16,
	RollerShutter= 17,
	ExteriorVerticalScreen= 18,
	AwningTerracePatio= 19,
	AwningVerticalScreen= 20,
	TiltOnlyPergola= 21,
	SwingingShutter= 22,
	SlidingShutter= 23,
	Unknown= 255,
}

export enum Mode {
	MotorDirectionReversed= 0x01,
	CalibrationMode= 0x02,
	MaintenanceMode= 0x04,
	LedFeedback= 0x08,
}

export enum OperationalStatus {
	Global= 0x03,
	Lift= 0x0C,
	Tilt= 0x30,
}

export enum ConfigStatus {
	Operational= 0x01,
	OnlineReserved= 0x02,
	LiftMovementReversed= 0x04,
	LiftPositionAware= 0x08,
	TiltPositionAware= 0x10,
	LiftEncoderControlled= 0x20,
	TiltEncoderControlled= 0x40,
}

export enum SafetyStatus {
	RemoteLockout= 0x0001,
	TamperDetection= 0x0002,
	FailedCommunication= 0x0004,
	PositionFailure= 0x0008,
	ThermalProtection= 0x0010,
	ObstacleDetected= 0x0020,
	Power= 0x0040,
	StopInput= 0x0080,
	MotorJammed= 0x0100,
	HardwareFailure= 0x0200,
	ManualOperation= 0x0400,
	Protection= 0x0800,
}

/**
 * Provides an interface for controlling and adjusting automatic window coverings.
 */

export interface WindowCovering {
id: 258;
	attributes: {
		readonly Type:Type
		readonly PhysicalClosedLimitLift?:number
		readonly PhysicalClosedLimitTilt?:number
		readonly CurrentPositionLift?:number
		readonly CurrentPositionTilt?:number
		readonly NumberOfActuationsLift?:number
		readonly NumberOfActuationsTilt?:number
		readonly ConfigStatus:ConfigStatus
		readonly CurrentPositionLiftPercentage?:number
		readonly CurrentPositionTiltPercentage?:number
		readonly OperationalStatus:OperationalStatus
		readonly TargetPositionLiftPercent100ths?:number
		readonly TargetPositionTiltPercent100ths?:number
		readonly EndProductType:EndProductType
		readonly CurrentPositionLiftPercent100ths?:number
		readonly CurrentPositionTiltPercent100ths?:number
		readonly InstalledOpenLimitLift?:number
		readonly InstalledClosedLimitLift?:number
		readonly InstalledOpenLimitTilt?:number
		readonly InstalledClosedLimitTilt?:number
		Mode?:Mode
		readonly SafetyStatus?:SafetyStatus
		/** Lift control and behavior for lifting/sliding window coverings */
		readonly SupportsLift: boolean
		/** Tilt control and behavior for tilting window coverings */
		readonly SupportsTilt: boolean
		/** Position aware lift control is supported. */
		readonly SupportsPositionAwareLift: boolean
		/** Absolute positioning is supported. */
		readonly SupportsAbsolutePosition: boolean
		/** Position aware tilt control is supported. */
		readonly SupportsPositionAwareTilt: boolean
}
	commands: {
		/** Moves window covering to InstalledOpenLimitLift and InstalledOpenLimitTilt */
		UpOrOpen: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Moves window covering to InstalledClosedLimitLift and InstalledCloseLimitTilt */
		DownOrClose: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Stop any adjusting of window covering */
		StopMotion: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Go to lift value specified */
		GoToLiftValue?: {
			inputparams: readonly [
				LiftValue: number, 
			],
			 outputparams: readonly []
            }
		/** Go to lift percentage specified */
		GoToLiftPercentage?: {
			inputparams: readonly [
				LiftPercent100thsValue: number, 
			],
			 outputparams: readonly []
            }
		/** Go to tilt value specified */
		GoToTiltValue?: {
			inputparams: readonly [
				TiltValue: number, 
			],
			 outputparams: readonly []
            }
		/** Go to tilt percentage specified */
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

export const windowCovering: Cluster<WindowCovering['attributes'], WindowCovering['commands'], WindowCovering['events']> = {
id: 258,
	attributes: {
		Type:null,
		PhysicalClosedLimitLift:0,
		PhysicalClosedLimitTilt:0,
		CurrentPositionLift:0,
		CurrentPositionTilt:0,
		NumberOfActuationsLift:0,
		NumberOfActuationsTilt:0,
		ConfigStatus:null,
		CurrentPositionLiftPercentage:0,
		CurrentPositionTiltPercentage:0,
		OperationalStatus:null,
		TargetPositionLiftPercent100ths:0,
		TargetPositionTiltPercent100ths:0,
		EndProductType:null,
		CurrentPositionLiftPercent100ths:0,
		CurrentPositionTiltPercent100ths:0,
		InstalledOpenLimitLift:0,
		InstalledClosedLimitLift:0,
		InstalledOpenLimitTilt:0,
		InstalledClosedLimitTilt:0,
		Mode:null,
		SafetyStatus:null,
		/** Lift control and behavior for lifting/sliding window coverings */
	SupportsLift: false,
		/** Tilt control and behavior for tilting window coverings */
	SupportsTilt: false,
		/** Position aware lift control is supported. */
	SupportsPositionAwareLift: false,
		/** Absolute positioning is supported. */
	SupportsAbsolutePosition: false,
		/** Position aware tilt control is supported. */
	SupportsPositionAwareTilt: false,
},
	commands: {
		/** Moves window covering to InstalledOpenLimitLift and InstalledOpenLimitTilt */
		UpOrOpen: {
			inputparams: [
			],
			 outputparams: []
            },
		/** Moves window covering to InstalledClosedLimitLift and InstalledCloseLimitTilt */
		DownOrClose: {
			inputparams: [
			],
			 outputparams: []
            },
		/** Stop any adjusting of window covering */
		StopMotion: {
			inputparams: [
			],
			 outputparams: []
            },
		/** Go to lift value specified */
		GoToLiftValue: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** Go to lift percentage specified */
		GoToLiftPercentage: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** Go to tilt value specified */
		GoToTiltValue: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** Go to tilt percentage specified */
		GoToTiltPercentage: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default windowCovering;
// This file is generated from ColorControl.xml - do not edit it directly
// Generated on 2025-12-22T10:19:27.122Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ColorLoopActionEnum {
	Deactivate = 0,
	ActivateFromColorLoopStartEnhancedHue = 1,
	ActivateFromEnhancedCurrentHue = 2,
}

export enum ColorLoopDirectionEnum {
	Decrement = 0,
	Increment = 1,
}

export enum ColorModeEnum {
	CurrentHueAndCurrentSaturation = 0,
	CurrentXAndCurrentY = 1,
	ColorTemperatureMireds = 2,
}

export enum DirectionEnum {
	Shortest = 0,
	Longest = 1,
	Up = 2,
	Down = 3,
}

export enum DriftCompensationEnum {
	None = 0,
	OtherOrUnknown = 1,
	TemperatureMonitoring = 2,
	OpticalLuminanceMonitoringAndFeedback = 3,
	OpticalColorMonitoringAndFeedback = 4,
}

export enum EnhancedColorModeEnum {
	CurrentHueAndCurrentSaturation = 0,
	CurrentXAndCurrentY = 1,
	ColorTemperatureMireds = 2,
	EnhancedCurrentHueAndCurrentSaturation = 3,
}

export enum MoveModeEnum {
	Stop = 0,
	Up = 1,
	Down = 3,
}

export enum StepModeEnum {
	Up = 1,
	Down = 3,
}

export enum ColorCapabilitiesBitmap {
	__NotSet = 0,
		/** Supports color specification via hue/saturation. */
	HueSaturation= 1<<0,
		/** Enhanced hue is supported. */
	EnhancedHue= 1<<1,
		/** Color loop is supported. */
	ColorLoop= 1<<2,
		/** Supports color specification via XY. */
	XY= 1<<3,
		/** Supports color specification via color temperature. */
	ColorTemperature= 1<<4,
}

export enum OptionsBitmap {
	__NotSet = 0,
		/** Dependency on On/Off cluster */
	ExecuteIfOff= 1<<0,
}

export enum UpdateFlagsBitmap {
	__NotSet = 0,
		/** Device adheres to the associated action field. */
	UpdateAction= 1<<0,
		/** Device updates the associated direction attribute. */
	UpdateDirection= 1<<1,
		/** Device updates the associated time attribute. */
	UpdateTime= 1<<2,
		/** Device updates the associated start hue attribute. */
	UpdateStartHue= 1<<3,
}

export type ColorControl = ColorControlCluster & { id: 0x0300};

export interface ColorControlCluster {
id: 0x0300;
	attributes: {
		readonly CurrentHue?:number
		readonly CurrentSaturation?:number
		readonly RemainingTime?:number
		readonly CurrentX?:number
		readonly CurrentY?:number
		readonly DriftCompensation?:DriftCompensationEnum
		readonly CompensationText?:string
		readonly ColorTemperatureMireds?:number
		readonly ColorMode:ColorModeEnum
		readonly Options:OptionsBitmap
		readonly NumberOfPrimaries:number
		readonly Primary1X?:number
		readonly Primary1Y?:number
		readonly Primary1Intensity?:number
		readonly Primary2X?:number
		readonly Primary2Y?:number
		readonly Primary2Intensity?:number
		readonly Primary3X?:number
		readonly Primary3Y?:number
		readonly Primary3Intensity?:number
		readonly Primary4X?:number
		readonly Primary4Y?:number
		readonly Primary4Intensity?:number
		readonly Primary5X?:number
		readonly Primary5Y?:number
		readonly Primary5Intensity?:number
		readonly Primary6X?:number
		readonly Primary6Y?:number
		readonly Primary6Intensity?:number
		readonly WhitePointX?:number
		readonly WhitePointY?:number
		readonly ColorPointRX?:number
		readonly ColorPointRY?:number
		readonly ColorPointRIntensity?:number
		readonly ColorPointGX?:number
		readonly ColorPointGY?:number
		readonly ColorPointGIntensity?:number
		readonly ColorPointBX?:number
		readonly ColorPointBY?:number
		readonly ColorPointBIntensity?:number
		readonly EnhancedCurrentHue?:number
		readonly EnhancedColorMode:EnhancedColorModeEnum
		readonly ColorLoopActive?:number
		readonly ColorLoopDirection?:ColorLoopDirectionEnum
		readonly ColorLoopTime?:number
		readonly ColorLoopStartEnhancedHue?:number
		readonly ColorLoopStoredEnhancedHue?:number
		readonly ColorCapabilities:ColorCapabilitiesBitmap
		readonly ColorTempPhysicalMinMireds?:number
		readonly ColorTempPhysicalMaxMireds?:number
		readonly CoupleColorTempToLevelMinMireds?:number
		readonly StartUpColorTemperatureMireds?:number
		/** Supports color specification via hue/saturation. */
		readonly SupportsHueSaturation: boolean
		/** Enhanced hue is supported. */
		readonly SupportsEnhancedHue: boolean
		/** Color loop is supported. */
		readonly SupportsColorLoop: boolean
		/** Supports color specification via XY. */
		readonly SupportsXY: boolean
		/** Supports specification of color temperature. */
		readonly SupportsColorTemperature: boolean
}
	commands: {
		MoveToHue?: {
			inputparams: readonly [
				Hue: number, 
				Direction: DirectionEnum, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveHue?: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		StepHue?: {
			inputparams: readonly [
				StepMode: StepModeEnum, 
				StepSize: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveToSaturation?: {
			inputparams: readonly [
				Saturation: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveSaturation?: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		StepSaturation?: {
			inputparams: readonly [
				StepMode: StepModeEnum, 
				StepSize: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveToHueAndSaturation?: {
			inputparams: readonly [
				Hue: number, 
				Saturation: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveToColor?: {
			inputparams: readonly [
				ColorX: number, 
				ColorY: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveColor?: {
			inputparams: readonly [
				RateX: number, 
				RateY: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		StepColor?: {
			inputparams: readonly [
				StepX: number, 
				StepY: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveToColorTemperature?: {
			inputparams: readonly [
				ColorTemperatureMireds: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		EnhancedMoveToHue?: {
			inputparams: readonly [
				EnhancedHue: number, 
				Direction: DirectionEnum, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		EnhancedMoveHue?: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		EnhancedStepHue?: {
			inputparams: readonly [
				StepMode: StepModeEnum, 
				StepSize: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		EnhancedMoveToHueAndSaturation?: {
			inputparams: readonly [
				EnhancedHue: number, 
				Saturation: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		ColorLoopSet?: {
			inputparams: readonly [
				UpdateFlags: UpdateFlagsBitmap, 
				Action: ColorLoopActionEnum, 
				Direction: ColorLoopDirectionEnum, 
				Time: number, 
				StartHue: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		StopMoveStep?: {
			inputparams: readonly [
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveColorTemperature?: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				ColorTemperatureMinimumMireds: number, 
				ColorTemperatureMaximumMireds: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		StepColorTemperature?: {
			inputparams: readonly [
				StepMode: StepModeEnum, 
				StepSize: number, 
				TransitionTime: number, 
				ColorTemperatureMinimumMireds: number, 
				ColorTemperatureMaximumMireds: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const colorControl: ClusterDefinition<ColorControl> = {
id: 0x0300,
	attributes: [
		"CurrentHue",
		"CurrentSaturation",
		"RemainingTime",
		"CurrentX",
		"CurrentY",
		"DriftCompensation",
		"CompensationText",
		"ColorTemperatureMireds",
		"ColorMode",
		"Options",
		"NumberOfPrimaries",
		"Primary1X",
		"Primary1Y",
		"Primary1Intensity",
		"Primary2X",
		"Primary2Y",
		"Primary2Intensity",
		"Primary3X",
		"Primary3Y",
		"Primary3Intensity",
		"Primary4X",
		"Primary4Y",
		"Primary4Intensity",
		"Primary5X",
		"Primary5Y",
		"Primary5Intensity",
		"Primary6X",
		"Primary6Y",
		"Primary6Intensity",
		"WhitePointX",
		"WhitePointY",
		"ColorPointRX",
		"ColorPointRY",
		"ColorPointRIntensity",
		"ColorPointGX",
		"ColorPointGY",
		"ColorPointGIntensity",
		"ColorPointBX",
		"ColorPointBY",
		"ColorPointBIntensity",
		"EnhancedCurrentHue",
		"EnhancedColorMode",
		"ColorLoopActive",
		"ColorLoopDirection",
		"ColorLoopTime",
		"ColorLoopStartEnhancedHue",
		"ColorLoopStoredEnhancedHue",
		"ColorCapabilities",
		"ColorTempPhysicalMinMireds",
		"ColorTempPhysicalMaxMireds",
		"CoupleColorTempToLevelMinMireds",
		"StartUpColorTemperatureMireds",
		"SupportsHueSaturation",
		"SupportsEnhancedHue",
		"SupportsColorLoop",
		"SupportsXY",
		"SupportsColorTemperature",
	] as const,
	commands: [
		"MoveToHue",
		"MoveHue",
		"StepHue",
		"MoveToSaturation",
		"MoveSaturation",
		"StepSaturation",
		"MoveToHueAndSaturation",
		"MoveToColor",
		"MoveColor",
		"StepColor",
		"MoveToColorTemperature",
		"EnhancedMoveToHue",
		"EnhancedMoveHue",
		"EnhancedStepHue",
		"EnhancedMoveToHueAndSaturation",
		"ColorLoopSet",
		"StopMoveStep",
		"MoveColorTemperature",
		"StepColorTemperature",
	] as const,
	events: [
	] as const
}

export default colorControl;
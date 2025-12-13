// This file is generated from color-control-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.383Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum DirectionEnum {
	Shortest= 0,
	Longest= 1,
	Up= 2,
	Down= 3,
}

export enum MoveModeEnum {
	Stop= 0,
	Up= 1,
	Down= 3,
}

export enum StepModeEnum {
	Up= 1,
	Down= 3,
}

export enum ColorModeEnum {
	CurrentHueAndCurrentSaturation= 0,
	CurrentXAndCurrentY= 1,
	ColorTemperatureMireds= 2,
}

export enum ColorLoopActionEnum {
	Deactivate= 0,
	ActivateFromColorLoopStartEnhancedHue= 1,
	ActivateFromEnhancedCurrentHue= 2,
}

export enum EnhancedColorModeEnum {
	CurrentHueAndCurrentSaturation= 0,
	CurrentXAndCurrentY= 1,
	ColorTemperatureMireds= 2,
	EnhancedCurrentHueAndCurrentSaturation= 3,
}

export enum DriftCompensationEnum {
	None= 0,
	OtherOrUnknown= 1,
	TemperatureMonitoring= 2,
	OpticalLuminanceMonitoringAndFeedback= 3,
	OpticalColorMonitoringAndFeedback= 4,
}

export enum ColorLoopDirectionEnum {
	Decrement= 0,
	Increment= 1,
}

export enum ColorCapabilitiesBitmap {
	HueSaturation= 0x0001,
	EnhancedHue= 0x0002,
	ColorLoop= 0x0004,
	XY= 0x0008,
	ColorTemperature= 0x0010,
}

export enum UpdateFlagsBitmap {
	UpdateAction= 0x01,
	UpdateDirection= 0x02,
	UpdateTime= 0x04,
	UpdateStartHue= 0x08,
}

export enum OptionsBitmap {
	ExecuteIfOff= 0x1,
}

/**
 * Attributes and commands for controlling the color properties of a color-capable light.
 */

export interface ColorControl {
id: 768;
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
		Options:OptionsBitmap
		readonly NumberOfPrimaries?:number
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
		readonly CoupleColorTempToLevelMinMireds?:number
		StartUpColorTemperatureMireds?:number
		/** Supports color specification via hue/saturation. */
		readonly SupportsHueAndSaturation: boolean
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
		/** Move to specified hue. */
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
		/** Move hue up or down at specified rate. */
		MoveHue?: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Step hue up or down by specified size at specified rate. */
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
		/** Move to specified saturation. */
		MoveToSaturation?: {
			inputparams: readonly [
				Saturation: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Move saturation up or down at specified rate. */
		MoveSaturation?: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Step saturation up or down by specified size at specified rate. */
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
		/** Move to hue and saturation. */
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
		/** Move to specified color. */
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
		/** Moves the color. */
		MoveColor?: {
			inputparams: readonly [
				RateX: number, 
				RateY: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Steps the lighting to a specific color. */
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
		/** Move to a specific color temperature. */
		MoveToColorTemperature?: {
			inputparams: readonly [
				ColorTemperatureMireds: number, 
				TransitionTime: number, 
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
id: 768,
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
		"CoupleColorTempToLevelMinMireds",
		"StartUpColorTemperatureMireds",
		"SupportsHueAndSaturation",
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
	] as const,
	events: [
	] as const
}

export default colorControl;
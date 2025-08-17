// This file is generated from color-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.295Z

import { Cluster } from '../../server/clients/shared.js';


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

export const colorControl: Cluster<ColorControl['attributes'], ColorControl['commands'], ColorControl['events']> = {
id: 768,
	attributes: {
		CurrentHue:0,
		CurrentSaturation:0,
		RemainingTime:0,
		CurrentX:0,
		CurrentY:0,
		DriftCompensation:null,
		CompensationText:null,
		ColorTemperatureMireds:0,
		ColorMode:null,
		Options:null,
		NumberOfPrimaries:0,
		Primary1X:0,
		Primary1Y:0,
		Primary1Intensity:0,
		Primary2X:0,
		Primary2Y:0,
		Primary2Intensity:0,
		Primary3X:0,
		Primary3Y:0,
		Primary3Intensity:0,
		Primary4X:0,
		Primary4Y:0,
		Primary4Intensity:0,
		Primary5X:0,
		Primary5Y:0,
		Primary5Intensity:0,
		Primary6X:0,
		Primary6Y:0,
		Primary6Intensity:0,
		WhitePointX:0,
		WhitePointY:0,
		ColorPointRX:0,
		ColorPointRY:0,
		ColorPointRIntensity:0,
		ColorPointGX:0,
		ColorPointGY:0,
		ColorPointGIntensity:0,
		ColorPointBX:0,
		ColorPointBY:0,
		ColorPointBIntensity:0,
		CoupleColorTempToLevelMinMireds:0,
		StartUpColorTemperatureMireds:0,
		/** Supports color specification via hue/saturation. */
	SupportsHueAndSaturation: false,
		/** Enhanced hue is supported. */
	SupportsEnhancedHue: false,
		/** Color loop is supported. */
	SupportsColorLoop: false,
		/** Supports color specification via XY. */
	SupportsXY: false,
		/** Supports specification of color temperature. */
	SupportsColorTemperature: false,
},
	commands: {
		/** Move to specified hue. */
		MoveToHue: {
			inputparams: [
				0, 
				null, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Move hue up or down at specified rate. */
		MoveHue: {
			inputparams: [
				null, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Step hue up or down by specified size at specified rate. */
		StepHue: {
			inputparams: [
				null, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Move to specified saturation. */
		MoveToSaturation: {
			inputparams: [
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Move saturation up or down at specified rate. */
		MoveSaturation: {
			inputparams: [
				null, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Step saturation up or down by specified size at specified rate. */
		StepSaturation: {
			inputparams: [
				null, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Move to hue and saturation. */
		MoveToHueAndSaturation: {
			inputparams: [
				0, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Move to specified color. */
		MoveToColor: {
			inputparams: [
				0, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Moves the color. */
		MoveColor: {
			inputparams: [
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Steps the lighting to a specific color. */
		StepColor: {
			inputparams: [
				0, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Move to a specific color temperature. */
		MoveToColorTemperature: {
			inputparams: [
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default colorControl;
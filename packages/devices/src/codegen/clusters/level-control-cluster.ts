// This file is generated from level-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.586Z

import { Cluster } from '../../server/clients/shared.js';


export enum MoveModeEnum {
	Up= 0,
	Down= 1,
}

export enum StepModeEnum {
	Up= 0,
	Down= 1,
}

export enum OptionsBitmap {
	ExecuteIfOff= 0x1,
	CoupleColorTempToLevel= 0x02,
}

/**
 * Attributes and commands for controlling devices that can be set to a level between fully 'On' and fully 'Off.'
 */

export interface LevelControl {
id: 8;
	attributes: {
		readonly CurrentLevel?:number
		readonly RemainingTime?:number
		readonly MinLevel?:number
		readonly MaxLevel?:number
		readonly CurrentFrequency?:number
		readonly MinFrequency?:number
		readonly MaxFrequency?:number
		OnOffTransitionTime?:number
		OnLevel?:number
		OnTransitionTime?:number
		OffTransitionTime?:number
		DefaultMoveRate?:number
		Options:OptionsBitmap
		StartUpCurrentLevel?:number
		/** Dependency with the On/Off cluster */
		readonly SupportsOnOff: boolean
		/** Behavior that supports lighting applications */
		readonly SupportsLighting: boolean
		/** Supports frequency attributes and behavior.
                                        The Pulse Width Modulation cluster was created
                                        for frequency control. */
		readonly SupportsFrequency: boolean
}
	commands: {
		/** Command description for MoveToLevel */
		MoveToLevel: {
			inputparams: readonly [
				Level: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for Move */
		Move: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for Step */
		Step: {
			inputparams: readonly [
				StepMode: StepModeEnum, 
				StepSize: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for Stop */
		Stop: {
			inputparams: readonly [
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for MoveToLevelWithOnOff */
		MoveToLevelWithOnOff: {
			inputparams: readonly [
				Level: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for MoveWithOnOff */
		MoveWithOnOff: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for StepWithOnOff */
		StepWithOnOff: {
			inputparams: readonly [
				StepMode: StepModeEnum, 
				StepSize: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Command description for StopWithOnOff */
		StopWithOnOff: {
			inputparams: readonly [
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** Change the currrent frequency to the provided one, or a close
        approximation if the exact provided one is not possible. */
		MoveToClosestFrequency?: {
			inputparams: readonly [
				Frequency: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const levelControl: Cluster<LevelControl['attributes'], LevelControl['commands'], LevelControl['events']> = {
id: 8,
	attributes: {
		CurrentLevel:0,
		RemainingTime:0,
		MinLevel:0,
		MaxLevel:0,
		CurrentFrequency:0,
		MinFrequency:0,
		MaxFrequency:0,
		OnOffTransitionTime:0,
		OnLevel:0,
		OnTransitionTime:0,
		OffTransitionTime:0,
		DefaultMoveRate:0,
		Options:null,
		StartUpCurrentLevel:0,
		/** Dependency with the On/Off cluster */
	SupportsOnOff: false,
		/** Behavior that supports lighting applications */
	SupportsLighting: false,
		/** Supports frequency attributes and behavior.
                                        The Pulse Width Modulation cluster was created
                                        for frequency control. */
	SupportsFrequency: false,
},
	commands: {
		/** Command description for MoveToLevel */
		MoveToLevel: {
			inputparams: [
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for Move */
		Move: {
			inputparams: [
				null, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for Step */
		Step: {
			inputparams: [
				null, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for Stop */
		Stop: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for MoveToLevelWithOnOff */
		MoveToLevelWithOnOff: {
			inputparams: [
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for MoveWithOnOff */
		MoveWithOnOff: {
			inputparams: [
				null, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for StepWithOnOff */
		StepWithOnOff: {
			inputparams: [
				null, 
				0, 
				0, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Command description for StopWithOnOff */
		StopWithOnOff: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Change the currrent frequency to the provided one, or a close
        approximation if the exact provided one is not possible. */
		MoveToClosestFrequency: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default levelControl;
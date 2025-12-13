// This file is generated from level-control-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.441Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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
		/** Supports frequency attributes and behavior. */
		readonly SupportsFrequency: boolean
}
	commands: {
		/** This command will move the device to the specified level. */
		MoveToLevel: {
			inputparams: readonly [
				Level: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** This command will move the device using the specified values. */
		Move: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		/** This command will do a relative step change of the device using the specified values. */
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
		/** This command will stop the actions of various other commands that are still in progress. */
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
		/** This command will cause the device to change the current frequency to the requested value. */
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

export const levelControl: ClusterDefinition<LevelControl> = {
id: 8,
	attributes: [
		"CurrentLevel",
		"RemainingTime",
		"MinLevel",
		"MaxLevel",
		"CurrentFrequency",
		"MinFrequency",
		"MaxFrequency",
		"OnOffTransitionTime",
		"OnLevel",
		"OnTransitionTime",
		"OffTransitionTime",
		"DefaultMoveRate",
		"Options",
		"StartUpCurrentLevel",
		"SupportsOnOff",
		"SupportsLighting",
		"SupportsFrequency",
	] as const,
	commands: [
		"MoveToLevel",
		"Move",
		"Step",
		"Stop",
		"MoveToLevelWithOnOff",
		"MoveWithOnOff",
		"StepWithOnOff",
		"StopWithOnOff",
		"MoveToClosestFrequency",
	] as const,
	events: [
	] as const
}

export default levelControl;
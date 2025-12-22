// This file is generated from LevelControl.xml - do not edit it directly
// Generated on 2025-12-22T10:26:05.036Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum MoveModeEnum {
	Up = 0,
	Down = 1,
}

export enum StepModeEnum {
	Up = 0,
	Down = 1,
}

export enum OptionsBitmap {
	__NotSet = 0,
		/** Dependency on On/Off cluster */
	ExecuteIfOff= 1<<0,
		/** Dependency on Color Control cluster */
	CoupleColorTempToLevel= 1<<1,
}

export type LevelControl = LevelControlCluster & { id: 0x0008};

export interface LevelControlCluster {
id: 0x0008;
	attributes: {
		readonly CurrentLevel:number
		readonly RemainingTime?:number
		readonly MinLevel?:number
		readonly MaxLevel?:number
		readonly CurrentFrequency?:number
		readonly MinFrequency?:number
		readonly MaxFrequency?:number
		readonly Options:OptionsBitmap
		readonly OnOffTransitionTime?:number
		readonly OnLevel:number
		readonly OnTransitionTime?:number
		readonly OffTransitionTime?:number
		readonly DefaultMoveRate?:number
		readonly StartUpCurrentLevel?:number
		/** Dependency with the On/Off cluster */
		readonly SupportsOnOff: boolean
		/** Behavior that supports lighting applications */
		readonly SupportsLighting: boolean
		/** Supports frequency attributes and behavior. */
		readonly SupportsFrequency: boolean
}
	commands: {
		MoveToLevel: {
			inputparams: readonly [
				Level: number, 
				TransitionTime: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		Move: {
			inputparams: readonly [
				MoveMode: MoveModeEnum, 
				Rate: number, 
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
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
		Stop: {
			inputparams: readonly [
				OptionsMask: OptionsBitmap, 
				OptionsOverride: OptionsBitmap, 
			],
			 outputparams: readonly []
            }
		MoveToLevelWithOnOff: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		MoveWithOnOff: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		StepWithOnOff: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		StopWithOnOff: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
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
id: 0x0008,
	attributes: [
		"CurrentLevel",
		"RemainingTime",
		"MinLevel",
		"MinLevel",
		"MaxLevel",
		"CurrentFrequency",
		"MinFrequency",
		"MaxFrequency",
		"Options",
		"OnOffTransitionTime",
		"OnLevel",
		"OnTransitionTime",
		"OffTransitionTime",
		"DefaultMoveRate",
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
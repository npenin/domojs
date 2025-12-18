// This file is generated from OnOff.xml - do not edit it directly
// Generated on 2025-12-18T03:05:10.186Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum DelayedAllOffEffectVariantEnum {
	DelayedOffFastFade = 0,
	NoFade = 1,
	DelayedOffSlowFade = 2,
}

export enum DyingLightEffectVariantEnum {
	DyingLightFadeOff = 0,
}

export enum EffectIdentifierEnum {
	DelayedAllOff = 0,
	DyingLight = 1,
}

export enum StartUpOnOffEnum {
	Off = 0,
	On = 1,
	Toggle = 2,
}

export enum OnOffControlBitmap {
	__NotSet = 0,
		/** Indicates a command is only accepted when in On state. */
	AcceptOnlyWhenOn= 1<<0,
}

export type OnOff = OnOffCluster & { id: 0x0006};

export interface OnOffCluster {
id: 0x0006;
	attributes: {
		readonly OnOff:boolean
		readonly GlobalSceneControl?:boolean
		readonly OnTime?:number
		readonly OffWaitTime?:number
		readonly StartUpOnOff?:StartUpOnOffEnum
		/** Behavior that supports lighting applications. */
		readonly SupportsLighting: boolean
		/** Device has Dead Front behavior */
		readonly SupportsDeadFrontBehavior: boolean
		/** Device supports the OffOnly Feature feature */
		readonly SupportsOffOnly: boolean
}
	commands: {
		Off: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		On?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		Toggle?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		OffWithEffect?: {
			inputparams: readonly [
				EffectIdentifier: EffectIdentifierEnum, 
				EffectVariant: number, 
			],
			 outputparams: readonly []
            }
		OnWithRecallGlobalScene?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		OnWithTimedOff?: {
			inputparams: readonly [
				OnOffControl: OnOffControlBitmap, 
				OnTime: number, 
				OffWaitTime: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const onOff: ClusterDefinition<OnOff> = {
id: 0x0006,
	attributes: [
		"OnOff",
		"GlobalSceneControl",
		"OnTime",
		"OffWaitTime",
		"StartUpOnOff",
		"SupportsLighting",
		"SupportsDeadFrontBehavior",
		"SupportsOffOnly",
	] as const,
	commands: [
		"Off",
		"On",
		"Toggle",
		"OffWithEffect",
		"OnWithRecallGlobalScene",
		"OnWithTimedOff",
	] as const,
	events: [
	] as const
}

export default onOff;
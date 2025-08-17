// This file is generated from onoff-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.069Z

import { Cluster } from '../../server/clients/shared.js';


export enum StartUpOnOffEnum {
	Off= 0,
	On= 1,
	Toggle= 2,
}

export enum EffectIdentifierEnum {
	DelayedAllOff= 0,
	DyingLight= 1,
}

export enum DelayedAllOffEffectVariantEnum {
	DelayedOffFastFade= 0,
	NoFade= 1,
	DelayedOffSlowFade= 2,
}

export enum DyingLightEffectVariantEnum {
	DyingLightFadeOff= 0,
}

export enum OnOffControlBitmap {
	AcceptOnlyWhenOn= 0x01,
}

/**
 * Attributes and commands for switching devices between 'On' and 'Off' states.
 */

export interface OnOff {
id: 6;
	attributes: {
		readonly OnOff:boolean
		readonly GlobalSceneControl?:boolean
		OnTime?:number
		OffWaitTime?:number
		StartUpOnOff?:StartUpOnOffEnum
		/** Behavior that supports lighting applications. */
		readonly SupportsLighting: boolean
		/** Device has DeadFrontBehavior Feature */
		readonly SupportsDeadFrontBehavior: boolean
		/** Device supports the OffOnly Feature feature */
		readonly SupportsOffOnly: boolean
}
	commands: {
		/** On receipt of this command, a device SHALL enter its ‘Off’ state. This state is device dependent, but it is recommended that it is used for power off or similar functions. On receipt of the Off command, the OnTime attribute SHALL be set to 0. */
		Off: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** On receipt of this command, a device SHALL enter its ‘On’ state. This state is device dependent, but it is recommended that it is used for power on or similar functions. On receipt of the On command, if the value of the OnTime attribute is equal to 0, the device SHALL set the OffWaitTime attribute to 0. */
		On: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** On receipt of this command, if a device is in its ‘Off’ state it SHALL enter its ‘On’ state. Otherwise, if it is in its ‘On’ state it SHALL enter its ‘Off’ state. On receipt of the Toggle command, if the value of the OnOff attribute is equal to FALSE and if the value of the OnTime attribute is equal to 0, the device SHALL set the OffWaitTime attribute to 0. If the value of the OnOff attribute is equal to TRUE, the OnTime attribute SHALL be set to 0. */
		Toggle: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The OffWithEffect command allows devices to be turned off using enhanced ways of fading. */
		OffWithEffect?: {
			inputparams: readonly [
				EffectIdentifier: EffectIdentifierEnum, 
				EffectVariant: number, 
			],
			 outputparams: readonly []
            }
		/** The OnWithRecallGlobalScene command allows the recall of the settings when the device was turned off. */
		OnWithRecallGlobalScene?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The OnWithTimedOff command allows devices to be turned on for a specific duration with a guarded off duration so that SHOULD the device be subsequently switched off, further OnWithTimedOff commands, received during this time, are prevented from turning the devices back on. */
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

export const onOff: Cluster<OnOff['attributes'], OnOff['commands'], OnOff['events']> = {
id: 6,
	attributes: {
		OnOff:null,
		GlobalSceneControl:null,
		OnTime:0,
		OffWaitTime:0,
		StartUpOnOff:null,
		/** Behavior that supports lighting applications. */
	SupportsLighting: false,
		/** Device has DeadFrontBehavior Feature */
	SupportsDeadFrontBehavior: false,
		/** Device supports the OffOnly Feature feature */
	SupportsOffOnly: false,
},
	commands: {
		/** On receipt of this command, a device SHALL enter its ‘Off’ state. This state is device dependent, but it is recommended that it is used for power off or similar functions. On receipt of the Off command, the OnTime attribute SHALL be set to 0. */
		Off: {
			inputparams: [
			],
			 outputparams: []
            },
		/** On receipt of this command, a device SHALL enter its ‘On’ state. This state is device dependent, but it is recommended that it is used for power on or similar functions. On receipt of the On command, if the value of the OnTime attribute is equal to 0, the device SHALL set the OffWaitTime attribute to 0. */
		On: {
			inputparams: [
			],
			 outputparams: []
            },
		/** On receipt of this command, if a device is in its ‘Off’ state it SHALL enter its ‘On’ state. Otherwise, if it is in its ‘On’ state it SHALL enter its ‘Off’ state. On receipt of the Toggle command, if the value of the OnOff attribute is equal to FALSE and if the value of the OnTime attribute is equal to 0, the device SHALL set the OffWaitTime attribute to 0. If the value of the OnOff attribute is equal to TRUE, the OnTime attribute SHALL be set to 0. */
		Toggle: {
			inputparams: [
			],
			 outputparams: []
            },
		/** The OffWithEffect command allows devices to be turned off using enhanced ways of fading. */
		OffWithEffect: {
			inputparams: [
				null, 
				0, 
			],
			 outputparams: []
            },
		/** The OnWithRecallGlobalScene command allows the recall of the settings when the device was turned off. */
		OnWithRecallGlobalScene: {
			inputparams: [
			],
			 outputparams: []
            },
		/** The OnWithTimedOff command allows devices to be turned on for a specific duration with a guarded off duration so that SHOULD the device be subsequently switched off, further OnWithTimedOff commands, received during this time, are prevented from turning the devices back on. */
		OnWithTimedOff: {
			inputparams: [
				null, 
				0, 
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default onOff;
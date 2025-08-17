// This file is generated from identify-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.430Z

import { Cluster } from '../../server/clients/shared.js';


export enum IdentifyTypeEnum {
	None= 0,
	LightOutput= 1,
	VisibleIndicator= 2,
	AudibleBeep= 3,
	Display= 4,
	Actuator= 5,
}

export enum EffectIdentifierEnum {
	Blink= 0,
	Breathe= 1,
	Okay= 2,
	ChannelChange= 11,
	FinishEffect= 254,
	StopEffect= 255,
}

export enum EffectVariantEnum {
	Default= 0,
}

/**
 * Attributes and commands for putting a device into Identification mode (e.g. flashing a light).
 */

export interface Identify {
id: 3;
	attributes: {
		IdentifyTime:number
		readonly IdentifyType:IdentifyTypeEnum
}
	commands: {
		/** This command starts or stops the receiving device identifying itself. */
		Identify: {
			inputparams: readonly [
				IdentifyTime: number, 
			],
			 outputparams: readonly []
            }
		/** This command allows the support of feedback to the user, such as a certain light effect. */
		TriggerEffect: {
			inputparams: readonly [
				EffectIdentifier: EffectIdentifierEnum, 
				EffectVariant: EffectVariantEnum, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const identify: Cluster<Identify['attributes'], Identify['commands'], Identify['events']> = {
id: 3,
	attributes: {
		IdentifyTime:0,
		IdentifyType:null,
},
	commands: {
		/** This command starts or stops the receiving device identifying itself. */
		Identify: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** This command allows the support of feedback to the user, such as a certain light effect. */
		TriggerEffect: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default identify;
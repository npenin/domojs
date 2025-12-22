// This file is generated from Identify.xml - do not edit it directly
// Generated on 2025-12-22T10:26:03.768Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum EffectIdentifierEnum {
	Blink = 0,
	Breathe = 1,
	Okay = 2,
	ChannelChange = 11,
	FinishEffect = 254,
	StopEffect = 255,
}

export enum EffectVariantEnum {
	Default = 0,
}

export enum IdentifyTypeEnum {
	None = 0,
	LightOutput = 1,
	VisibleIndicator = 2,
	AudibleBeep = 3,
	Display = 4,
	Actuator = 5,
}

export type Identify = IdentifyCluster & { id: 0x0003};

export interface IdentifyCluster {
id: 0x0003;
	attributes: {
		readonly IdentifyTime:number
		readonly IdentifyType:IdentifyTypeEnum
}
	commands: {
		Identify: {
			inputparams: readonly [
				IdentifyTime: number, 
			],
			 outputparams: readonly []
            }
		TriggerEffect?: {
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

export const identify: ClusterDefinition<Identify> = {
id: 0x0003,
	attributes: [
		"IdentifyTime",
		"IdentifyType",
	] as const,
	commands: [
		"Identify",
		"TriggerEffect",
	] as const,
	events: [
	] as const
}

export default identify;
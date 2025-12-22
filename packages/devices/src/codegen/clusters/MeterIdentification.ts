// This file is generated from MeterIdentification.xml - do not edit it directly
// Generated on 2025-12-22T10:26:06.222Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum MeterTypeEnum {
	Utility = 0,
	Private = 1,
	Generic = 2,
}

export type MeterIdentification = MeterIdentificationCluster & { id: 0x0B06};

export interface MeterIdentificationCluster {
id: 0x0B06;
	attributes: {
		readonly MeterType:MeterTypeEnum
		readonly PointOfDelivery:string
		readonly MeterSerialNumber:string
		readonly ProtocolVersion?:string
		readonly PowerThreshold?:import("./global-Structs.js").PowerThresholdStruct
		/** Supports information about power threshold */
		readonly SupportsPowerThreshold: boolean
}
	commands: {
}
	events: {
	}
}

export const meterIdentification: ClusterDefinition<MeterIdentification> = {
id: 0x0B06,
	attributes: [
		"MeterType",
		"PointOfDelivery",
		"MeterSerialNumber",
		"ProtocolVersion",
		"PowerThreshold",
		"SupportsPowerThreshold",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default meterIdentification;
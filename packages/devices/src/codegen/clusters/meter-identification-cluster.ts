// This file is generated from meter-identification-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:35.709Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum MeterTypeEnum {
	Utility= 0,
	Private= 1,
	Generic= 2,
}

/**
 * This Meter Identification Cluster provides attributes for determining advanced information about utility metering device.
 */

export interface MeterIdentification {
id: 2822;
	attributes: {
		readonly MeterType?:MeterTypeEnum
		readonly PointOfDelivery?:string
		readonly MeterSerialNumber?:string
		readonly ProtocolVersion?:string
		readonly PowerThreshold?:import("./global-structs.js").PowerThresholdStruct
		/** Supports information about power threshold */
		readonly SupportsPowerThreshold: boolean
}
	commands: {
}
	events: {
	}
}

export const meterIdentification: ClusterDefinition<MeterIdentification> = {
id: 2822,
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
// This file is generated from meter-identification-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.788Z

import { Cluster } from '../../server/clients/shared.js';


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

export const meterIdentification: Cluster<MeterIdentification['attributes'], MeterIdentification['commands'], MeterIdentification['events']> = {
id: 2822,
	attributes: {
		MeterType:null,
		PointOfDelivery:null,
		MeterSerialNumber:null,
		ProtocolVersion:null,
		PowerThreshold:null,
		/** Supports information about power threshold */
	SupportsPowerThreshold: false,
},
	commands: {
},
	events: {
	}
}

export default meterIdentification;
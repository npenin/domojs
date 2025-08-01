

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
		readonly PointOfDelivery?: string
		readonly MeterSerialNumber?: string
		readonly ProtocolVersion?: string
		readonly PowerThreshold?:import("./global-structs.js").PowerThresholdStruct
		/** Supports information about power threshold */
		readonly SupportsPowerThreshold: boolean
}
	commands: {
}
	events: {
	}
}
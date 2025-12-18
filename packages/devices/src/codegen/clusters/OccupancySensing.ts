// This file is generated from OccupancySensing.xml - do not edit it directly
// Generated on 2025-12-18T03:05:09.982Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum OccupancySensorTypeEnum {
	PIR = 0,
	Ultrasonic = 1,
	PIRAndUltrasonic = 2,
	PhysicalContact = 3,
}

export enum OccupancyBitmap {
	__NotSet = 0,
		/** Indicates the sensed occupancy state */
	Occupied= 1<<0,
}

export enum OccupancySensorTypeBitmap {
	__NotSet = 0,
		/** Indicates a passive infrared sensor. */
	PIR= 1<<0,
		/** Indicates a ultrasonic sensor. */
	Ultrasonic= 1<<1,
		/** Indicates a physical contact sensor. */
	PhysicalContact= 1<<2,
}

export interface HoldTimeLimitsStruct {
	HoldTimeMin:number,
	HoldTimeMax:number,
	HoldTimeDefault:number,
}

export type OccupancySensing = OccupancySensingCluster & { id: 0x0406};

export interface OccupancySensingCluster {
id: 0x0406;
	attributes: {
		readonly Occupancy:OccupancyBitmap
		readonly OccupancySensorType?:OccupancySensorTypeEnum
		readonly OccupancySensorTypeBitmap?:OccupancySensorTypeBitmap
		readonly HoldTime?:number
		readonly HoldTimeLimits?:HoldTimeLimitsStruct
		readonly PIROccupiedToUnoccupiedDelay?:number
		readonly PIRUnoccupiedToOccupiedDelay?:number
		readonly PIRUnoccupiedToOccupiedThreshold?:number
		readonly UltrasonicOccupiedToUnoccupiedDelay?:number
		readonly UltrasonicUnoccupiedToOccupiedDelay?:number
		readonly UltrasonicUnoccupiedToOccupiedThreshold?:number
		readonly PhysicalContactOccupiedToUnoccupiedDelay?:number
		readonly PhysicalContactUnoccupiedToOccupiedDelay?:number
		readonly PhysicalContactUnoccupiedToOccupiedThreshold?:number
		/** Supports sensing using a modality not listed in the other bits */
		readonly SupportsOther: boolean
		/** Supports sensing using PIR (Passive InfraRed) */
		readonly SupportsPassiveInfrared: boolean
		/** Supports sensing using UltraSound */
		readonly SupportsUltrasonic: boolean
		/** Supports sensing using a physical contact */
		readonly SupportsPhysicalContact: boolean
		/** Supports sensing using Active InfraRed measurement (e.g. time-of-flight or transflective/reflective IR sensing) */
		readonly SupportsActiveInfrared: boolean
		/** Supports sensing using radar waves (microwave) */
		readonly SupportsRadar: boolean
		/** Supports sensing using analysis of radio signals, e.g.: RSSI, CSI and/or any other metric from the signal */
		readonly SupportsRFSensing: boolean
		/** Supports sensing based on analyzing images */
		readonly SupportsVision: boolean
}
	commands: {
}
	events: {
		OccupancyChanged: [
			
			Occupancy: OccupancyBitmap, ];
	}
}

export const occupancySensing: ClusterDefinition<OccupancySensing> = {
id: 0x0406,
	attributes: [
		"Occupancy",
		"OccupancySensorType",
		"OccupancySensorTypeBitmap",
		"HoldTime",
		"HoldTimeLimits",
		"PIROccupiedToUnoccupiedDelay",
		"PIRUnoccupiedToOccupiedDelay",
		"PIRUnoccupiedToOccupiedThreshold",
		"UltrasonicOccupiedToUnoccupiedDelay",
		"UltrasonicUnoccupiedToOccupiedDelay",
		"UltrasonicUnoccupiedToOccupiedThreshold",
		"PhysicalContactOccupiedToUnoccupiedDelay",
		"PhysicalContactUnoccupiedToOccupiedDelay",
		"PhysicalContactUnoccupiedToOccupiedThreshold",
		"SupportsOther",
		"SupportsPassiveInfrared",
		"SupportsUltrasonic",
		"SupportsPhysicalContact",
		"SupportsActiveInfrared",
		"SupportsRadar",
		"SupportsRFSensing",
		"SupportsVision",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default occupancySensing;
// This file is generated from occupancy-sensing-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.049Z

import { Cluster } from '../../server/clients/shared.js';


export enum OccupancySensorTypeEnum {
	PIR= 0,
	Ultrasonic= 1,
	PIRAndUltrasonic= 2,
	PhysicalContact= 3,
}

export enum OccupancyBitmap {
	Occupied= 0x1,
}

export enum OccupancySensorTypeBitmap {
	PIR= 0x01,
	Ultrasonic= 0x02,
	PhysicalContact= 0x04,
}

export interface HoldTimeLimitsStruct {
	HoldTimeMin:number,
	HoldTimeMax:number,
	HoldTimeDefault:number,
}

/**
 * The server cluster provides an interface to occupancy sensing functionality based on one or more sensing modalities, including configuration and provision of notifications of occupancy status.
 */

export interface OccupancySensing {
id: 1030;
	attributes: {
		readonly Occupancy:OccupancyBitmap
		readonly OccupancySensorType:OccupancySensorTypeEnum
		readonly OccupancySensorTypeBitmap:OccupancySensorTypeBitmap
		HoldTime?:number
		readonly HoldTimeLimits?:HoldTimeLimitsStruct
		PIROccupiedToUnoccupiedDelay?:number
		PIRUnoccupiedToOccupiedDelay?:number
		PIRUnoccupiedToOccupiedThreshold?:number
		UltrasonicOccupiedToUnoccupiedDelay?:number
		UltrasonicUnoccupiedToOccupiedDelay?:number
		UltrasonicUnoccupiedToOccupiedThreshold?:number
		PhysicalContactOccupiedToUnoccupiedDelay?:number
		PhysicalContactUnoccupiedToOccupiedDelay?:number
		PhysicalContactUnoccupiedToOccupiedThreshold?:number
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
		/** Supports sensing based on RF signal analysis */
		readonly SupportsRFSensing: boolean
		/** Supports sensing based on analyzing images */
		readonly SupportsVision: boolean
}
	commands: {
}
	events: {
		OccupancyChanged?: [
			
			Occupancy: OccupancyBitmap, ];
	}
}

export const occupancySensing: Cluster<OccupancySensing['attributes'], OccupancySensing['commands'], OccupancySensing['events']> = {
id: 1030,
	attributes: {
		Occupancy:null,
		OccupancySensorType:null,
		OccupancySensorTypeBitmap:null,
		HoldTime:0,
		HoldTimeLimits:null,
		PIROccupiedToUnoccupiedDelay:0,
		PIRUnoccupiedToOccupiedDelay:0,
		PIRUnoccupiedToOccupiedThreshold:0,
		UltrasonicOccupiedToUnoccupiedDelay:0,
		UltrasonicUnoccupiedToOccupiedDelay:0,
		UltrasonicUnoccupiedToOccupiedThreshold:0,
		PhysicalContactOccupiedToUnoccupiedDelay:0,
		PhysicalContactUnoccupiedToOccupiedDelay:0,
		PhysicalContactUnoccupiedToOccupiedThreshold:0,
		/** Supports sensing using a modality not listed in the other bits */
	SupportsOther: false,
		/** Supports sensing using PIR (Passive InfraRed) */
	SupportsPassiveInfrared: false,
		/** Supports sensing using UltraSound */
	SupportsUltrasonic: false,
		/** Supports sensing using a physical contact */
	SupportsPhysicalContact: false,
		/** Supports sensing using Active InfraRed measurement (e.g. time-of-flight or transflective/reflective IR sensing) */
	SupportsActiveInfrared: false,
		/** Supports sensing using radar waves (microwave) */
	SupportsRadar: false,
		/** Supports sensing based on RF signal analysis */
	SupportsRFSensing: false,
		/** Supports sensing based on analyzing images */
	SupportsVision: false,
},
	commands: {
},
	events: {
		OccupancyChanged: [
			
			null, ],
	}
}

export default occupancySensing;
// This file is generated from ballast-configuration-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:45.850Z

import { Cluster } from '../../server/clients/shared.js';


export enum BallastStatusBitmap {
	BallastNonOperational= 0x01,
	LampFailure= 0x02,
}

export enum LampAlarmModeBitmap {
	LampBurnHours= 0x01,
}

/**
 * Attributes and commands for configuring a lighting ballast.
 */

export interface BallastConfiguration {
id: 769;
	attributes: {
		readonly PhysicalMinLevel:number
		readonly PhysicalMaxLevel:number
		readonly BallastStatus?:BallastStatusBitmap
		MinLevel:number
		MaxLevel:number
		IntrinsicBallastFactor?:number
		BallastFactorAdjustment?:number
		readonly LampQuantity:number
		LampType?:string
		LampManufacturer?:string
		LampRatedHours?:number
		LampBurnHours?:number
		LampAlarmMode?:LampAlarmModeBitmap
		LampBurnHoursTripPoint?:number
}
	commands: {
}
	events: {
	}
}

export const ballastConfiguration: Cluster<BallastConfiguration['attributes'], BallastConfiguration['commands'], BallastConfiguration['events']> = {
id: 769,
	attributes: {
		PhysicalMinLevel:0,
		PhysicalMaxLevel:0,
		BallastStatus:null,
		MinLevel:0,
		MaxLevel:0,
		IntrinsicBallastFactor:0,
		BallastFactorAdjustment:0,
		LampQuantity:0,
		LampType:null,
		LampManufacturer:null,
		LampRatedHours:0,
		LampBurnHours:0,
		LampAlarmMode:null,
		LampBurnHoursTripPoint:0,
},
	commands: {
},
	events: {
	}
}

export default ballastConfiguration;
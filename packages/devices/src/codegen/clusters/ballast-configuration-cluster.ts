// This file is generated from ballast-configuration-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:44.683Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


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

export const ballastConfiguration: ClusterDefinition<BallastConfiguration> = {
id: 769,
	attributes: [
		"PhysicalMinLevel",
		"PhysicalMaxLevel",
		"BallastStatus",
		"MinLevel",
		"MaxLevel",
		"IntrinsicBallastFactor",
		"BallastFactorAdjustment",
		"LampQuantity",
		"LampType",
		"LampManufacturer",
		"LampRatedHours",
		"LampBurnHours",
		"LampAlarmMode",
		"LampBurnHoursTripPoint",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default ballastConfiguration;
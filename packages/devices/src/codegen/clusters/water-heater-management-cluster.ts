// This file is generated from water-heater-management-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.079Z

import { Cluster } from '../../server/clients/shared.js';


export enum BoostStateEnum {
	Inactive= 0,
	Active= 1,
}

export enum WaterHeaterHeatSourceBitmap {
	ImmersionElement1= 0x01,
	ImmersionElement2= 0x02,
	HeatPump= 0x04,
	Boiler= 0x08,
	Other= 0x10,
}

export interface WaterHeaterBoostInfoStruct {
	Duration:number,
	OneShot?:boolean,
	EmergencyBoost?:boolean,
	TemporarySetpoint?:number,
	TargetPercentage?:number,
	TargetReheat?:number,
}

/**
 * This cluster is used to allow clients to control the operation of a hot water heating appliance so that it can be used with energy management.
 */

export interface WaterHeaterManagement {
id: 148;
	attributes: {
		readonly HeaterTypes:WaterHeaterHeatSourceBitmap
		readonly HeatDemand:WaterHeaterHeatSourceBitmap
		readonly TankVolume?:number
		readonly EstimatedHeatRequired?:number
		readonly TankPercentage?:number
		readonly BoostState:BoostStateEnum
		/** Allows energy management control of the tank */
		readonly SupportsEnergyManagement: boolean
		/** Supports monitoring the percentage of hot water in the tank */
		readonly SupportsTankPercent: boolean
}
	commands: {
		/** Allows a client to request that the water heater is put into a Boost state. */
		Boost: {
			inputparams: readonly [
				BoostInfo: WaterHeaterBoostInfoStruct, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to cancel an ongoing Boost operation. */
		CancelBoost: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		BoostStarted: [
			
			BoostInfo: WaterHeaterBoostInfoStruct, ];
		BoostEnded: [
			];
	}
}

export const waterHeaterManagement: Cluster<WaterHeaterManagement['attributes'], WaterHeaterManagement['commands'], WaterHeaterManagement['events']> = {
id: 148,
	attributes: {
		HeaterTypes:null,
		HeatDemand:null,
		TankVolume:0,
		EstimatedHeatRequired:0,
		TankPercentage:0,
		BoostState:null,
		/** Allows energy management control of the tank */
	SupportsEnergyManagement: false,
		/** Supports monitoring the percentage of hot water in the tank */
	SupportsTankPercent: false,
},
	commands: {
		/** Allows a client to request that the water heater is put into a Boost state. */
		Boost: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** Allows a client to cancel an ongoing Boost operation. */
		CancelBoost: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		BoostStarted: [
			
			null, ],
		BoostEnded: [
			],
	}
}

export default waterHeaterManagement;
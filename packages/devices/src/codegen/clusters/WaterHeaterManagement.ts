// This file is generated from WaterHeaterManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:26:13.774Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum BoostStateEnum {
	Inactive = 0,
	Active = 1,
}

export enum WaterHeaterHeatSourceBitmap {
	__NotSet = 0,
		/** Immersion Heating Element 1 */
	ImmersionElement1= 1<<0,
		/** Immersion Heating Element 2 */
	ImmersionElement2= 1<<1,
		/** Heat pump Heating */
	HeatPump= 1<<2,
		/** Boiler Heating (e.g. Gas or Oil) */
	Boiler= 1<<3,
		/** Other Heating */
	Other= 1<<4,
}

export interface WaterHeaterBoostInfoStruct {
	Duration:number,
	OneShot?:boolean,
	EmergencyBoost?:boolean,
	TemporarySetpoint?:number,
	TargetPercentage?:number,
	TargetReheat?:number,
}

export type WaterHeaterManagement = WaterHeaterManagementCluster & { id: 0x0094};

export interface WaterHeaterManagementCluster {
id: 0x0094;
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
		Boost: {
			inputparams: readonly [
				BoostInfo: WaterHeaterBoostInfoStruct, 
			],
			 outputparams: readonly []
            }
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

export const waterHeaterManagement: ClusterDefinition<WaterHeaterManagement> = {
id: 0x0094,
	attributes: [
		"HeaterTypes",
		"HeatDemand",
		"TankVolume",
		"EstimatedHeatRequired",
		"TankPercentage",
		"BoostState",
		"SupportsEnergyManagement",
		"SupportsTankPercent",
	] as const,
	commands: [
		"Boost",
		"CancelBoost",
	] as const,
	events: [
	] as const
}

export default waterHeaterManagement;
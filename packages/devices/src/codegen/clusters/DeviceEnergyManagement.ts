// This file is generated from DeviceEnergyManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:28.928Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AdjustmentCauseEnum {
	LocalOptimization = 0,
	GridOptimization = 1,
}

export enum CauseEnum {
	NormalCompletion = 0,
	Offline = 1,
	Fault = 2,
	UserOptOut = 3,
	Cancelled = 4,
}

export enum CostTypeEnum {
	Financial = 0,
	GHGEmissions = 1,
	Comfort = 2,
	Temperature = 3,
}

export enum ESAStateEnum {
	Offline = 0,
	Online = 1,
	Fault = 2,
	PowerAdjustActive = 3,
	Paused = 4,
}

export enum ESATypeEnum {
	EVSE = 0,
	SpaceHeating = 1,
	WaterHeating = 2,
	SpaceCooling = 3,
	SpaceHeatingCooling = 4,
	BatteryStorage = 5,
	SolarPV = 6,
	FridgeFreezer = 7,
	WashingMachine = 8,
	Dishwasher = 9,
	Cooking = 10,
	HomeWaterPump = 11,
	IrrigationWaterPump = 12,
	PoolPump = 13,
	Other = 255,
}

export enum ForecastUpdateReasonEnum {
	InternalOptimization = 0,
	LocalOptimization = 1,
	GridOptimization = 2,
}

export enum OptOutStateEnum {
	NoOptOut = 0,
	LocalOptOut = 1,
	GridOptOut = 2,
	OptOut = 3,
}

export enum PowerAdjustReasonEnum {
	NoAdjustment = 0,
	LocalOptimizationAdjustment = 1,
	GridOptimizationAdjustment = 2,
}

export interface ConstraintsStruct {
	StartTime:number,
	Duration:number,
	NominalPower?:number,
	MaximumEnergy?:number,
	LoadControl?:number,
}

export interface CostStruct {
	CostType:CostTypeEnum,
	Value:number,
	DecimalPoints:number,
	Currency?:number,
}

export interface ForecastStruct {
	ForecastID:number,
	ActiveSlotNumber:number,
	StartTime:number,
	EndTime:number,
	EarliestStartTime?:number,
	LatestEndTime?:number,
	IsPausable:boolean,
	Slots:readonly SlotStruct[],
	ForecastUpdateReason:ForecastUpdateReasonEnum,
}

export interface PowerAdjustCapabilityStruct {
	PowerAdjustCapability:readonly PowerAdjustStruct[],
	Cause:PowerAdjustReasonEnum,
}

export interface PowerAdjustStruct {
	MinPower:number,
	MaxPower:number,
	MinDuration:number,
	MaxDuration:number,
}

export interface SlotAdjustmentStruct {
	SlotIndex:number,
	NominalPower?:number,
	Duration:number,
}

export interface SlotStruct {
	MinDuration:number,
	MaxDuration:number,
	DefaultDuration:number,
	ElapsedSlotTime:number,
	RemainingSlotTime:number,
	SlotIsPausable?:boolean,
	MinPauseDuration?:number,
	MaxPauseDuration?:number,
	ManufacturerESAState?:number,
	NominalPower?:number,
	MinPower?:number,
	MaxPower?:number,
	NominalEnergy?:number,
	Costs?:readonly CostStruct[],
	MinPowerAdjustment?:number,
	MaxPowerAdjustment?:number,
	MinDurationAdjustment?:number,
	MaxDurationAdjustment?:number,
}

export type DeviceEnergyManagement = DeviceEnergyManagementCluster & { id: 0x0098};

export interface DeviceEnergyManagementCluster {
id: 0x0098;
	attributes: {
		readonly ESAType:ESATypeEnum
		readonly ESACanGenerate:boolean
		readonly ESAState:ESAStateEnum
		readonly AbsMinPower:number
		readonly AbsMaxPower:number
		readonly PowerAdjustmentCapability?:PowerAdjustCapabilityStruct
		readonly Forecast?:ForecastStruct
		readonly OptOutState?:OptOutStateEnum
		/** Allows an EMS to make a temporary power adjustment (within the limits offered by the ESA). */
		readonly SupportsPowerAdjustment: boolean
		/** Allows an ESA to advertise its indicative future power consumption vs time. */
		readonly SupportsPowerForecastReporting: boolean
		/** Allows an ESA to advertise its indicative future state vs time. */
		readonly SupportsStateForecastReporting: boolean
		/** Allows an EMS to delay an ESA's planned operation. */
		readonly SupportsStartTimeAdjustment: boolean
		/** Allows an EMS to pause an ESA's planned operation. */
		readonly SupportsPausable: boolean
		/** Allows an EMS to adjust an ESA's planned operation. */
		readonly SupportsForecastAdjustment: boolean
		/** Allows an EMS to request constraints to an ESA's planned operation. */
		readonly SupportsConstraintBasedAdjustment: boolean
}
	commands: {
		PowerAdjustRequest?: {
			inputparams: readonly [
				Power: number, 
				Duration: number, 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		CancelPowerAdjustRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		StartTimeAdjustRequest?: {
			inputparams: readonly [
				RequestedStartTime: number, 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		PauseRequest?: {
			inputparams: readonly [
				Duration: number, 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		ResumeRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		ModifyForecastRequest?: {
			inputparams: readonly [
				ForecastID: number, 
				SlotAdjustments: readonly SlotAdjustmentStruct[], 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		RequestConstraintBasedForecast?: {
			inputparams: readonly [
				Constraints: readonly ConstraintsStruct[], 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		CancelRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		PowerAdjustStart: [
			];
		PowerAdjustEnd: [
			
			Cause: CauseEnum, 
			Duration: number, 
			EnergyUse: number, ];
		Paused: [
			];
		Resumed: [
			
			Cause: CauseEnum, ];
	}
}

export const deviceEnergyManagement: ClusterDefinition<DeviceEnergyManagement> = {
id: 0x0098,
	attributes: [
		"ESAType",
		"ESACanGenerate",
		"ESAState",
		"AbsMinPower",
		"AbsMaxPower",
		"PowerAdjustmentCapability",
		"Forecast",
		"OptOutState",
		"SupportsPowerAdjustment",
		"SupportsPowerForecastReporting",
		"SupportsStateForecastReporting",
		"SupportsStartTimeAdjustment",
		"SupportsPausable",
		"SupportsForecastAdjustment",
		"SupportsConstraintBasedAdjustment",
	] as const,
	commands: [
		"PowerAdjustRequest",
		"CancelPowerAdjustRequest",
		"StartTimeAdjustRequest",
		"PauseRequest",
		"ResumeRequest",
		"ModifyForecastRequest",
		"RequestConstraintBasedForecast",
		"CancelRequest",
	] as const,
	events: [
	] as const
}

export default deviceEnergyManagement;
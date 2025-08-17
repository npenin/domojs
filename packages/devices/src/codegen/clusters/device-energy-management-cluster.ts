// This file is generated from device-energy-management-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.699Z

import { Cluster } from '../../server/clients/shared.js';


export enum CostTypeEnum {
	Financial= 0,
	GHGEmissions= 1,
	Comfort= 2,
	Temperature= 3,
}

export enum ESATypeEnum {
	EVSE= 0,
	SpaceHeating= 1,
	WaterHeating= 2,
	SpaceCooling= 3,
	SpaceHeatingCooling= 4,
	BatteryStorage= 5,
	SolarPV= 6,
	FridgeFreezer= 7,
	WashingMachine= 8,
	Dishwasher= 9,
	Cooking= 10,
	HomeWaterPump= 11,
	IrrigationWaterPump= 12,
	PoolPump= 13,
	Other= 255,
}

export enum ESAStateEnum {
	Offline= 0,
	Online= 1,
	Fault= 2,
	PowerAdjustActive= 3,
	Paused= 4,
}

export enum CauseEnum {
	NormalCompletion= 0,
	Offline= 1,
	Fault= 2,
	UserOptOut= 3,
	Cancelled= 4,
}

export enum AdjustmentCauseEnum {
	LocalOptimization= 0,
	GridOptimization= 1,
}

export enum ForecastUpdateReasonEnum {
	InternalOptimization= 0,
	LocalOptimization= 1,
	GridOptimization= 2,
}

export enum OptOutStateEnum {
	NoOptOut= 0,
	LocalOptOut= 1,
	GridOptOut= 2,
	OptOut= 3,
}

export enum PowerAdjustReasonEnum {
	NoAdjustment= 0,
	LocalOptimizationAdjustment= 1,
	GridOptimizationAdjustment= 2,
}

export interface CostStruct {
	CostType:CostTypeEnum,
	Value:number,
	DecimalPoints:number,
	Currency?:number,
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

export interface SlotAdjustmentStruct {
	SlotIndex:number,
	NominalPower?:number,
	Duration:number,
}

export interface ConstraintsStruct {
	StartTime:number,
	Duration:number,
	NominalPower?:number,
	MaximumEnergy?:number,
	LoadControl?:number,
}

/**
 * This cluster allows a client to manage the power draw of a device. An example of such a client could be an Energy Management System (EMS) which controls an Energy Smart Appliance (ESA).
 */

export interface DeviceEnergyManagement {
id: 152;
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
		/** Allows a client to request an adjustment in the power consumption of an ESA for a specified duration. */
		PowerAdjustRequest?: {
			inputparams: readonly [
				Power: number, 
				Duration: number, 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to cancel an ongoing PowerAdjustmentRequest operation. */
		CancelPowerAdjustRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Allows a client to adjust the start time of a Forecast sequence that has not yet started operation (i.e. where the current Forecast StartTime is in the future). */
		StartTimeAdjustRequest?: {
			inputparams: readonly [
				RequestedStartTime: number, 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to temporarily pause an operation and reduce the ESAs energy demand. */
		PauseRequest?: {
			inputparams: readonly [
				Duration: number, 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to cancel the PauseRequest command and enable earlier resumption of operation. */
		ResumeRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Allows a client to modify a Forecast within the limits allowed by the ESA. */
		ModifyForecastRequest?: {
			inputparams: readonly [
				ForecastID: number, 
				SlotAdjustments: readonly SlotAdjustmentStruct[][], 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to ask the ESA to recompute its Forecast based on power and time constraints. */
		RequestConstraintBasedForecast?: {
			inputparams: readonly [
				Constraints: readonly ConstraintsStruct[][], 
				Cause: AdjustmentCauseEnum, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to request cancellation of a previous adjustment request in a StartTimeAdjustRequest, ModifyForecastRequest or RequestConstraintBasedForecast command. */
		CancelRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		PowerAdjustStart?: [
			];
		PowerAdjustEnd?: [
			
			Cause: CauseEnum, 
			Duration: number, 
			EnergyUse: number, ];
		Paused?: [
			];
		Resumed?: [
			
			Cause: CauseEnum, ];
	}
}

export const deviceEnergyManagement: Cluster<DeviceEnergyManagement['attributes'], DeviceEnergyManagement['commands'], DeviceEnergyManagement['events']> = {
id: 152,
	attributes: {
		ESAType:null,
		ESACanGenerate:null,
		ESAState:null,
		AbsMinPower:0,
		AbsMaxPower:0,
		PowerAdjustmentCapability:null,
		Forecast:null,
		OptOutState:null,
		/** Allows an EMS to make a temporary power adjustment (within the limits offered by the ESA). */
	SupportsPowerAdjustment: false,
		/** Allows an ESA to advertise its indicative future power consumption vs time. */
	SupportsPowerForecastReporting: false,
		/** Allows an ESA to advertise its indicative future state vs time. */
	SupportsStateForecastReporting: false,
		/** Allows an EMS to delay an ESA's planned operation. */
	SupportsStartTimeAdjustment: false,
		/** Allows an EMS to pause an ESA's planned operation. */
	SupportsPausable: false,
		/** Allows an EMS to adjust an ESA's planned operation. */
	SupportsForecastAdjustment: false,
		/** Allows an EMS to request constraints to an ESA's planned operation. */
	SupportsConstraintBasedAdjustment: false,
},
	commands: {
		/** Allows a client to request an adjustment in the power consumption of an ESA for a specified duration. */
		PowerAdjustRequest: {
			inputparams: [
				0, 
				0, 
				null, 
			],
			 outputparams: []
            },
		/** Allows a client to cancel an ongoing PowerAdjustmentRequest operation. */
		CancelPowerAdjustRequest: {
			inputparams: [
			],
			 outputparams: []
            },
		/** Allows a client to adjust the start time of a Forecast sequence that has not yet started operation (i.e. where the current Forecast StartTime is in the future). */
		StartTimeAdjustRequest: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** Allows a client to temporarily pause an operation and reduce the ESAs energy demand. */
		PauseRequest: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** Allows a client to cancel the PauseRequest command and enable earlier resumption of operation. */
		ResumeRequest: {
			inputparams: [
			],
			 outputparams: []
            },
		/** Allows a client to modify a Forecast within the limits allowed by the ESA. */
		ModifyForecastRequest: {
			inputparams: [
				0, 
				[], 
				null, 
			],
			 outputparams: []
            },
		/** Allows a client to ask the ESA to recompute its Forecast based on power and time constraints. */
		RequestConstraintBasedForecast: {
			inputparams: [
				[], 
				null, 
			],
			 outputparams: []
            },
		/** Allows a client to request cancellation of a previous adjustment request in a StartTimeAdjustRequest, ModifyForecastRequest or RequestConstraintBasedForecast command. */
		CancelRequest: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		PowerAdjustStart: [
			],
		PowerAdjustEnd: [
			
			null, 
			0, 
			0, ],
		Paused: [
			],
		Resumed: [
			
			null, ],
	}
}

export default deviceEnergyManagement;
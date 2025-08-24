// This file is generated from thermostat-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:43.044Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum SystemModeEnum {
	Off= 0,
	Auto= 1,
	Cool= 3,
	Heat= 4,
	EmergencyHeat= 5,
	Precooling= 6,
	FanOnly= 7,
	Dry= 8,
	Sleep= 9,
}

export enum ThermostatRunningModeEnum {
	Off= 0,
	Cool= 3,
	Heat= 4,
}

export enum StartOfWeekEnum {
	Sunday= 0,
	Monday= 1,
	Tuesday= 2,
	Wednesday= 3,
	Thursday= 4,
	Friday= 5,
	Saturday= 6,
}

export enum ControlSequenceOfOperationEnum {
	CoolingOnly= 0,
	CoolingWithReheat= 1,
	HeatingOnly= 2,
	HeatingWithReheat= 3,
	CoolingAndHeating= 4,
	CoolingAndHeatingWithReheat= 5,
}

export enum TemperatureSetpointHoldEnum {
	SetpointHoldOff= 0,
	SetpointHoldOn= 1,
}

export enum SetpointRaiseLowerModeEnum {
	Heat= 0,
	Cool= 1,
	Both= 2,
}

export enum ACCapacityFormatEnum {
	BTUh= 0,
}

export enum ACCompressorTypeEnum {
	Unknown= 0,
	T1= 1,
	T2= 2,
	T3= 3,
}

export enum ACLouverPositionEnum {
	Closed= 1,
	Open= 2,
	Quarter= 3,
	Half= 4,
	ThreeQuarters= 5,
}

export enum ACRefrigerantTypeEnum {
	Unknown= 0,
	R22= 1,
	R410a= 2,
	R407c= 3,
}

export enum ACTypeEnum {
	Unknown= 0,
	CoolingFixed= 1,
	HeatPumpFixed= 2,
	CoolingInverter= 3,
	HeatPumpInverter= 4,
}

export enum SetpointChangeSourceEnum {
	Manual= 0,
	Schedule= 1,
	External= 2,
}

export enum PresetScenarioEnum {
	Occupied= 1,
	Unoccupied= 2,
	Sleep= 3,
	Wake= 4,
	Vacation= 5,
	GoingToSleep= 6,
	UserDefined= 254,
}

export enum ACErrorCodeBitmap {
	CompressorFail= 0x01,
	RoomSensorFail= 0x02,
	OutdoorSensorFail= 0x04,
	CoilSensorFail= 0x08,
	FanFail= 0x10,
}

export enum HVACSystemTypeBitmap {
	CoolingStage= 0x03,
	HeatingStage= 0x0C,
	HeatingIsHeatPump= 0x10,
	HeatingUsesFuel= 0x20,
}

export enum OccupancyBitmap {
	Occupied= 0x01,
}

export enum ProgrammingOperationModeBitmap {
	ScheduleActive= 0x01,
	AutoRecovery= 0x02,
	Economy= 0x04,
}

export enum ScheduleTypeFeaturesBitmap {
	SupportsPresets= 0x01,
	SupportsSetpoints= 0x02,
	SupportsNames= 0x04,
	SupportsOff= 0x08,
}

export enum RelayStateBitmap {
	Heat= 0x01,
	Cool= 0x02,
	Fan= 0x04,
	HeatStage2= 0x08,
	CoolStage2= 0x10,
	FanStage2= 0x20,
	FanStage3= 0x40,
}

export enum RemoteSensingBitmap {
	LocalTemperature= 0x01,
	OutdoorTemperature= 0x02,
	Occupancy= 0x04,
}

export enum ScheduleDayOfWeekBitmap {
	Sunday= 0x01,
	Monday= 0x02,
	Tuesday= 0x04,
	Wednesday= 0x08,
	Thursday= 0x10,
	Friday= 0x20,
	Saturday= 0x40,
	Away= 0x80,
}

export enum ScheduleModeBitmap {
	HeatSetpointPresent= 0x01,
	CoolSetpointPresent= 0x02,
}

export enum PresetTypeFeaturesBitmap {
	Automatic= 0x01,
	SupportsNames= 0x02,
}

export interface WeeklyScheduleTransitionStruct {
	TransitionTime:number,
	HeatSetpoint:number,
	CoolSetpoint:number,
}

export interface ScheduleTypeStruct {
	SystemMode:SystemModeEnum,
	NumberOfSchedules:number,
	ScheduleTypeFeatures:ScheduleTypeFeaturesBitmap,
}

export interface PresetStruct {
	PresetHandle:import ("@akala/core").IsomorphicBuffer,
	PresetScenario:PresetScenarioEnum,
	Name?:string,
	CoolingSetpoint?:number,
	HeatingSetpoint?:number,
	BuiltIn:boolean,
}

export interface PresetTypeStruct {
	PresetScenario:PresetScenarioEnum,
	NumberOfPresets:number,
	PresetTypeFeatures:PresetTypeFeaturesBitmap,
}

export interface ScheduleStruct {
	ScheduleHandle:import ("@akala/core").IsomorphicBuffer,
	SystemMode:SystemModeEnum,
	Name?:string,
	PresetHandle?:import ("@akala/core").IsomorphicBuffer,
	Transitions:readonly ScheduleTransitionStruct[],
	BuiltIn:boolean,
}

export interface ScheduleTransitionStruct {
	DayOfWeek:ScheduleDayOfWeekBitmap,
	TransitionTime:number,
	PresetHandle?:import ("@akala/core").IsomorphicBuffer,
	SystemMode?:SystemModeEnum,
	CoolingSetpoint?:number,
	HeatingSetpoint?:number,
}

/**
 * An interface for configuring and controlling the functionality of a thermostat.
 */

export interface Thermostat {
id: 513;
	attributes: {
		readonly LocalTemperature?:number
		readonly OutdoorTemperature?:number
		readonly Occupancy?:OccupancyBitmap
		readonly AbsMinHeatSetpointLimit?:number
		readonly AbsMaxHeatSetpointLimit?:number
		readonly AbsMinCoolSetpointLimit?:number
		readonly AbsMaxCoolSetpointLimit?:number
		readonly PICoolingDemand?:number
		readonly PIHeatingDemand?:number
		HVACSystemTypeConfiguration?:HVACSystemTypeBitmap
		LocalTemperatureCalibration?:number
		OccupiedCoolingSetpoint?:number
		OccupiedHeatingSetpoint?:number
		UnoccupiedCoolingSetpoint?:number
		UnoccupiedHeatingSetpoint?:number
		MinHeatSetpointLimit?:number
		MaxHeatSetpointLimit?:number
		MinCoolSetpointLimit?:number
		MaxCoolSetpointLimit?:number
		MinSetpointDeadBand?:number
		RemoteSensing?:RemoteSensingBitmap
		ControlSequenceOfOperation:ControlSequenceOfOperationEnum
		SystemMode:SystemModeEnum
		readonly ThermostatRunningMode?:ThermostatRunningModeEnum
		readonly StartOfWeek?:StartOfWeekEnum
		readonly NumberOfWeeklyTransitions?:number
		readonly NumberOfDailyTransitions?:number
		TemperatureSetpointHold?:TemperatureSetpointHoldEnum
		TemperatureSetpointHoldDuration?:number
		ThermostatProgrammingOperationMode?:ProgrammingOperationModeBitmap
		readonly ThermostatRunningState?:RelayStateBitmap
		readonly SetpointChangeSource?:SetpointChangeSourceEnum
		readonly SetpointChangeAmount?:number
		readonly SetpointChangeSourceTimestamp?:number
		OccupiedSetback?:number
		readonly OccupiedSetbackMin?:number
		readonly OccupiedSetbackMax?:number
		UnoccupiedSetback?:number
		readonly UnoccupiedSetbackMin?:number
		readonly UnoccupiedSetbackMax?:number
		EmergencyHeatDelta?:number
		ACType?:ACTypeEnum
		ACCapacity?:number
		ACRefrigerantType?:ACRefrigerantTypeEnum
		ACCompressorType?:ACCompressorTypeEnum
		ACErrorCode?:ACErrorCodeBitmap
		ACLouverPosition?:ACLouverPositionEnum
		readonly ACCoilTemperature?:number
		ACCapacityformat?:ACCapacityFormatEnum
		readonly PresetTypes?:readonly PresetTypeStruct[]
		readonly ScheduleTypes?:readonly ScheduleTypeStruct[]
		readonly NumberOfPresets?:number
		readonly NumberOfSchedules?:number
		readonly NumberOfScheduleTransitions?:number
		readonly NumberOfScheduleTransitionPerDay?:number
		readonly ActivePresetHandle?:import ("@akala/core").IsomorphicBuffer
		readonly ActiveScheduleHandle?:import ("@akala/core").IsomorphicBuffer
		Presets?:readonly PresetStruct[]
		Schedules?:readonly ScheduleStruct[]
		readonly SetpointHoldExpiryTimestamp?:number
		/** Thermostat is capable of managing a heating device */
		readonly SupportsHeating: boolean
		/** Thermostat is capable of managing a cooling device */
		readonly SupportsCooling: boolean
		/** Supports Occupied and Unoccupied setpoints */
		readonly SupportsOccupancy: boolean
		/** Supports remote configuration of a weekly schedule of setpoint transitions */
		readonly SupportsScheduleConfiguration: boolean
		/** Supports configurable setback (or span) */
		readonly SupportsSetback: boolean
		/** Supports a System Mode of Auto */
		readonly SupportsAutoMode: boolean
		/** Thermostat does not expose the LocalTemperature Value in the LocalTemperature attribute */
		readonly SupportsLocalTemperatureNotExposed: boolean
		/** Supports enhanced schedules */
		readonly SupportsMatterScheduleConfiguration: boolean
		/** Thermostat supports setpoint presets */
		readonly SupportsPresets: boolean
}
	commands: {
		/** Upon receipt, the attributes for the indicated setpoint(s) SHALL have the amount specified in the Amount field added to them. */
		SetpointRaiseLower: {
			inputparams: readonly [
				Mode: SetpointRaiseLowerModeEnum, 
				Amount: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to update the thermostat weekly setpoint schedule from a management system. */
		SetWeeklySchedule?: {
			inputparams: readonly [
				NumberOfTransitionsForSequence: number, 
				DayOfWeekForSequence: ScheduleDayOfWeekBitmap, 
				ModeForSequence: ScheduleModeBitmap, 
				Transitions: readonly WeeklyScheduleTransitionStruct[], 
			],
			 outputparams: readonly []
            }
		/** The Current Weekly Schedule Command is sent from the server in response to the Get Weekly Schedule Command. */
		GetWeeklySchedule?: {
			inputparams: readonly [
				DaysToReturn: ScheduleDayOfWeekBitmap, 
				ModeToReturn: ScheduleModeBitmap, 
			],
			 outputparams: readonly [
				NumberOfTransitionsForSequence: number, 
				DayOfWeekForSequence: ScheduleDayOfWeekBitmap, 
				ModeForSequence: ScheduleModeBitmap, 
				Transitions: readonly WeeklyScheduleTransitionStruct[], ]
            }
		/** This command is used to clear the weekly schedule. */
		ClearWeeklySchedule?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Upon receipt, if the Schedules attribute contains a ScheduleStruct whose ScheduleHandle field matches the value of the ScheduleHandle field, the server SHALL set the thermostat's ActiveScheduleHandle attribute to the value of the ScheduleHandle field. */
		SetActiveScheduleRequest?: {
			inputparams: readonly [
				ScheduleHandle: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** ID */
		SetActivePresetRequest?: {
			inputparams: readonly [
				PresetHandle: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** Begins, Commits or Cancels an atomic write */
		AtomicRequest?: {
			inputparams: readonly [
				RequestType: import("./global-enums.js").AtomicRequestTypeEnum, 
				AttributeRequests: readonly number[], 
				Timeout: number, 
			],
			 outputparams: readonly [
				StatusCode: number, 
				AttributeStatus: readonly import("./global-structs.js").AtomicAttributeStatusStruct[], 
				Timeout: number, ]
            }
}
	events: {
	}
}

export const thermostat: ClusterDefinition<Thermostat> = {
id: 513,
	attributes: [
		"LocalTemperature",
		"OutdoorTemperature",
		"Occupancy",
		"AbsMinHeatSetpointLimit",
		"AbsMaxHeatSetpointLimit",
		"AbsMinCoolSetpointLimit",
		"AbsMaxCoolSetpointLimit",
		"PICoolingDemand",
		"PIHeatingDemand",
		"HVACSystemTypeConfiguration",
		"LocalTemperatureCalibration",
		"OccupiedCoolingSetpoint",
		"OccupiedHeatingSetpoint",
		"UnoccupiedCoolingSetpoint",
		"UnoccupiedHeatingSetpoint",
		"MinHeatSetpointLimit",
		"MaxHeatSetpointLimit",
		"MinCoolSetpointLimit",
		"MaxCoolSetpointLimit",
		"MinSetpointDeadBand",
		"RemoteSensing",
		"ControlSequenceOfOperation",
		"SystemMode",
		"ThermostatRunningMode",
		"StartOfWeek",
		"NumberOfWeeklyTransitions",
		"NumberOfDailyTransitions",
		"TemperatureSetpointHold",
		"TemperatureSetpointHoldDuration",
		"ThermostatProgrammingOperationMode",
		"ThermostatRunningState",
		"SetpointChangeSource",
		"SetpointChangeAmount",
		"SetpointChangeSourceTimestamp",
		"OccupiedSetback",
		"OccupiedSetbackMin",
		"OccupiedSetbackMax",
		"UnoccupiedSetback",
		"UnoccupiedSetbackMin",
		"UnoccupiedSetbackMax",
		"EmergencyHeatDelta",
		"ACType",
		"ACCapacity",
		"ACRefrigerantType",
		"ACCompressorType",
		"ACErrorCode",
		"ACLouverPosition",
		"ACCoilTemperature",
		"ACCapacityformat",
		"PresetTypes",
		"ScheduleTypes",
		"NumberOfPresets",
		"NumberOfSchedules",
		"NumberOfScheduleTransitions",
		"NumberOfScheduleTransitionPerDay",
		"ActivePresetHandle",
		"ActiveScheduleHandle",
		"Presets",
		"Schedules",
		"SetpointHoldExpiryTimestamp",
		"SupportsHeating",
		"SupportsCooling",
		"SupportsOccupancy",
		"SupportsScheduleConfiguration",
		"SupportsSetback",
		"SupportsAutoMode",
		"SupportsLocalTemperatureNotExposed",
		"SupportsMatterScheduleConfiguration",
		"SupportsPresets",
	] as const,
	commands: [
		"SetpointRaiseLower",
		"SetWeeklySchedule",
		"GetWeeklySchedule",
		"ClearWeeklySchedule",
		"SetActiveScheduleRequest",
		"SetActivePresetRequest",
		"AtomicRequest",
	] as const,
	events: [
	] as const
}

export default thermostat;
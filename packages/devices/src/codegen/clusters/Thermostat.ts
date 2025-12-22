// This file is generated from Thermostat.xml - do not edit it directly
// Generated on 2025-12-22T10:26:12.427Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type SignedTemperature = number;


export type TemperatureDifference = number;


export type UnsignedTemperature = number;


export enum ACCapacityFormatEnum {
	BTUh = 0,
}

export enum ACCompressorTypeEnum {
	Unknown = 0,
	T1 = 1,
	T2 = 2,
	T3 = 3,
}

export enum ACLouverPositionEnum {
	Closed = 1,
	Open = 2,
	Quarter = 3,
	Half = 4,
	ThreeQuarters = 5,
}

export enum ACRefrigerantTypeEnum {
	Unknown = 0,
	R22 = 1,
	R410a = 2,
	R407c = 3,
}

export enum ACTypeEnum {
	Unknown = 0,
	CoolingFixed = 1,
	HeatPumpFixed = 2,
	CoolingInverter = 3,
	HeatPumpInverter = 4,
}

export enum ControlSequenceOfOperationEnum {
	CoolingOnly = 0,
	CoolingWithReheat = 1,
	HeatingOnly = 2,
	HeatingWithReheat = 3,
	CoolingAndHeating = 4,
	CoolingAndHeatingWithReheat = 5,
}

export enum PresetScenarioEnum {
	Occupied = 1,
	Unoccupied = 2,
	Sleep = 3,
	Wake = 4,
	Vacation = 5,
	GoingToSleep = 6,
	UserDefined = 254,
}

export enum SetpointChangeSourceEnum {
	Manual = 0,
	Schedule = 1,
	External = 2,
}

export enum SetpointRaiseLowerModeEnum {
	Heat = 0,
	Cool = 1,
	Both = 2,
}

export enum StartOfWeekEnum {
	Sunday = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
}

export enum SystemModeEnum {
	Off = 0,
	Auto = 1,
	Cool = 3,
	Heat = 4,
	EmergencyHeat = 5,
	Precooling = 6,
	FanOnly = 7,
	Dry = 8,
	Sleep = 9,
}

export enum TemperatureSetpointHoldEnum {
	SetpointHoldOff = 0,
	SetpointHoldOn = 1,
}

export enum ThermostatRunningModeEnum {
	Off = 0,
	Cool = 3,
	Heat = 4,
}

export enum ACErrorCodeBitmap {
	__NotSet = 0,
		/** Compressor Failure or Refrigerant Leakage */
	CompressorFail= 1<<0,
		/** Room Temperature Sensor Failure */
	RoomSensorFail= 1<<1,
		/** Outdoor Temperature Sensor Failure */
	OutdoorSensorFail= 1<<2,
		/** Indoor Coil Temperature Sensor Failure */
	CoilSensorFail= 1<<3,
		/** Fan Failure */
	FanFail= 1<<4,
}

export enum HVACSystemTypeBitmap {
	__NotSet = 0,
		/** Stage of cooling the HVAC system is using. */
	CoolingStage= 0x3,
		/** Stage of heating the HVAC system is using. */
	HeatingStage= 0xc,
		/** Is the heating type Heat Pump. */
	HeatingIsHeatPump= 1<<4,
		/** Does the HVAC system use fuel. */
	HeatingUsesFuel= 1<<5,
}

export enum OccupancyBitmap {
	__NotSet = 0,
		/** Indicates the occupancy state */
	Occupied= 1<<0,
}

export enum PresetTypeFeaturesBitmap {
	__NotSet = 0,
		/** Preset may be automatically activated by the thermostat */
	Automatic= 1<<0,
		/** Preset supports user-provided names */
	SupportsNames= 1<<1,
}

export enum ProgrammingOperationModeBitmap {
	__NotSet = 0,
		/** Schedule programming mode. This enables any programmed weekly schedule configurations. */
	ScheduleActive= 1<<0,
		/** Auto/recovery mode */
	AutoRecovery= 1<<1,
		/** Economy/EnergyStar mode */
	Economy= 1<<2,
}

export enum RelayStateBitmap {
	__NotSet = 0,
		/** Heat Stage On */
	Heat= 1<<0,
		/** Cool Stage On */
	Cool= 1<<1,
		/** Fan Stage On */
	Fan= 1<<2,
		/** Heat 2nd Stage On */
	HeatStage2= 1<<3,
		/** Cool 2nd Stage On */
	CoolStage2= 1<<4,
		/** Fan 2nd Stage On */
	FanStage2= 1<<5,
		/** Fan 3rd Stage On */
	FanStage3= 1<<6,
}

export enum RemoteSensingBitmap {
	__NotSet = 0,
		/** Calculated Local Temperature is derived from a remote node */
	LocalTemperature= 1<<0,
		/** OutdoorTemperature is derived from a remote node */
	OutdoorTemperature= 1<<1,
		/** Occupancy is derived from a remote node */
	Occupancy= 1<<2,
}

export enum ScheduleDayOfWeekBitmap {
	__NotSet = 0,
		/** Sunday */
	Sunday= 1<<0,
		/** Monday */
	Monday= 1<<1,
		/** Tuesday */
	Tuesday= 1<<2,
		/** Wednesday */
	Wednesday= 1<<3,
		/** Thursday */
	Thursday= 1<<4,
		/** Friday */
	Friday= 1<<5,
		/** Saturday */
	Saturday= 1<<6,
		/** Away or Vacation */
	Away= 1<<7,
}

export enum ScheduleModeBitmap {
	__NotSet = 0,
		/** Adjust Heat Setpoint */
	HeatSetpointPresent= 1<<0,
		/** Adjust Cool Setpoint */
	CoolSetpointPresent= 1<<1,
}

export enum ScheduleTypeFeaturesBitmap {
	__NotSet = 0,
		/** Supports presets */
	SupportsPresets= 1<<0,
		/** Supports setpoints */
	SupportsSetpoints= 1<<1,
		/** Supports user-provided names */
	SupportsNames= 1<<2,
		/** Supports transitioning to SystemModeOff */
	SupportsOff= 1<<3,
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

export interface ScheduleTypeStruct {
	SystemMode:SystemModeEnum,
	NumberOfSchedules:number,
	ScheduleTypeFeatures:ScheduleTypeFeaturesBitmap,
}

export interface WeeklyScheduleTransitionStruct {
	TransitionTime:number,
	HeatSetpoint:number,
	CoolSetpoint:number,
}

export type Thermostat = ThermostatCluster & { id: 0x0201};

export interface ThermostatCluster {
id: 0x0201;
	attributes: {
		readonly LocalTemperature:number
		readonly OutdoorTemperature?:number
		readonly Occupancy?:OccupancyBitmap
		readonly AbsMinHeatSetpointLimit?:number
		readonly AbsMaxHeatSetpointLimit?:number
		readonly AbsMinCoolSetpointLimit?:number
		readonly AbsMaxCoolSetpointLimit?:number
		readonly PICoolingDemand?:number
		readonly PIHeatingDemand?:number
		readonly HVACSystemTypeConfiguration?:HVACSystemTypeBitmap
		readonly LocalTemperatureCalibration?:SignedTemperature
		readonly OccupiedCoolingSetpoint?:number
		readonly OccupiedHeatingSetpoint?:number
		readonly UnoccupiedCoolingSetpoint?:number
		readonly UnoccupiedHeatingSetpoint?:number
		readonly MinHeatSetpointLimit?:number
		readonly MaxHeatSetpointLimit?:number
		readonly MinCoolSetpointLimit?:number
		readonly MaxCoolSetpointLimit?:number
		readonly MinSetpointDeadBand?:SignedTemperature
		readonly RemoteSensing?:RemoteSensingBitmap
		readonly ControlSequenceOfOperation:ControlSequenceOfOperationEnum
		readonly SystemMode:SystemModeEnum
		readonly ThermostatRunningMode?:ThermostatRunningModeEnum
		readonly StartOfWeek?:StartOfWeekEnum
		readonly NumberOfWeeklyTransitions?:number
		readonly NumberOfDailyTransitions?:number
		readonly TemperatureSetpointHold?:TemperatureSetpointHoldEnum
		readonly TemperatureSetpointHoldDuration?:number
		readonly ThermostatProgrammingOperationMode?:ProgrammingOperationModeBitmap
		readonly ThermostatRunningState?:RelayStateBitmap
		readonly SetpointChangeSource?:SetpointChangeSourceEnum
		readonly SetpointChangeAmount?:number
		readonly SetpointChangeSourceTimestamp?:number
		readonly OccupiedSetback?:UnsignedTemperature
		readonly OccupiedSetbackMin?:UnsignedTemperature
		readonly OccupiedSetbackMax?:UnsignedTemperature
		readonly UnoccupiedSetback?:UnsignedTemperature
		readonly UnoccupiedSetbackMin?:UnsignedTemperature
		readonly UnoccupiedSetbackMax?:UnsignedTemperature
		readonly EmergencyHeatDelta?:UnsignedTemperature
		readonly ACType?:ACTypeEnum
		readonly ACCapacity?:number
		readonly ACRefrigerantType?:ACRefrigerantTypeEnum
		readonly ACCompressorType?:ACCompressorTypeEnum
		readonly ACErrorCode?:ACErrorCodeBitmap
		readonly ACLouverPosition?:ACLouverPositionEnum
		readonly ACCoilTemperature?:number
		readonly ACCapacityFormat?:ACCapacityFormatEnum
		readonly PresetTypes?:readonly PresetTypeStruct[]
		readonly ScheduleTypes?:readonly ScheduleTypeStruct[]
		readonly NumberOfPresets?:number
		readonly NumberOfSchedules?:number
		readonly NumberOfScheduleTransitions?:number
		readonly NumberOfScheduleTransitionPerDay?:number
		readonly ActivePresetHandle?:import ("@akala/core").IsomorphicBuffer
		readonly ActiveScheduleHandle?:import ("@akala/core").IsomorphicBuffer
		readonly Presets?:readonly PresetStruct[]
		readonly Schedules?:readonly ScheduleStruct[]
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
		SetpointRaiseLower: {
			inputparams: readonly [
				Mode: SetpointRaiseLowerModeEnum, 
				Amount: number, 
			],
			 outputparams: readonly []
            }
		SetWeeklySchedule?: {
			inputparams: readonly [
				NumberOfTransitionsForSequence: number, 
				DayOfWeekForSequence: ScheduleDayOfWeekBitmap, 
				ModeForSequence: ScheduleModeBitmap, 
				Transitions: readonly WeeklyScheduleTransitionStruct[], 
			],
			 outputparams: readonly []
            }
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
		ClearWeeklySchedule?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		SetActiveScheduleRequest?: {
			inputparams: readonly [
				ScheduleHandle: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		SetActivePresetRequest?: {
			inputparams: readonly [
				PresetHandle: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const thermostat: ClusterDefinition<Thermostat> = {
id: 0x0201,
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
		"ACCapacityFormat",
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
	] as const,
	events: [
	] as const
}

export default thermostat;
// This file is generated from pump-configuration-and-control-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.039Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum OperationModeEnum {
	Normal= 0,
	Minimum= 1,
	Maximum= 2,
	Local= 3,
}

export enum ControlModeEnum {
	ConstantSpeed= 0,
	ConstantPressure= 1,
	ProportionalPressure= 2,
	ConstantFlow= 3,
	ConstantTemperature= 5,
	Automatic= 7,
}

export enum PumpStatusBitmap {
	DeviceFault= 0x1,
	SupplyFault= 0x2,
	SpeedLow= 0x4,
	SpeedHigh= 0x8,
	LocalOverride= 0x10,
	Running= 0x20,
	RemotePressure= 0x40,
	RemoteFlow= 0x80,
	RemoteTemperature= 0x100,
}

/**
 * An interface for configuring and controlling pumps.
 */

export interface PumpConfigurationAndControl {
id: 512;
	attributes: {
		readonly MaxPressure?:number
		readonly MaxSpeed?:number
		readonly MaxFlow?:number
		readonly MinConstPressure?:number
		readonly MaxConstPressure?:number
		readonly MinCompPressure?:number
		readonly MaxCompPressure?:number
		readonly MinConstSpeed?:number
		readonly MaxConstSpeed?:number
		readonly MinConstFlow?:number
		readonly MaxConstFlow?:number
		readonly MinConstTemp?:number
		readonly MaxConstTemp?:number
		readonly PumpStatus?:PumpStatusBitmap
		readonly EffectiveOperationMode:OperationModeEnum
		readonly EffectiveControlMode:ControlModeEnum
		readonly Capacity?:number
		readonly Speed?:number
		LifetimeRunningHours?:number
		readonly Power?:number
		LifetimeEnergyConsumed?:number
		OperationMode:OperationModeEnum
		ControlMode?:ControlModeEnum
		/** Supports operating in constant pressure mode */
		readonly SupportsConstantPressure: boolean
		/** Supports operating in compensated pressure mode */
		readonly SupportsCompensatedPressure: boolean
		/** Supports operating in constant flow mode */
		readonly SupportsConstantFlow: boolean
		/** Supports operating in constant speed mode */
		readonly SupportsConstantSpeed: boolean
		/** Supports operating in constant temperature mode */
		readonly SupportsConstantTemperature: boolean
		/** Supports operating in automatic mode */
		readonly SupportsAutomatic: boolean
		/** Supports operating using local settings */
		readonly SupportsLocalOperation: boolean
}
	commands: {
}
	events: {
		SupplyVoltageLow?: [
			];
		SupplyVoltageHigh?: [
			];
		PowerMissingPhase?: [
			];
		SystemPressureLow?: [
			];
		SystemPressureHigh?: [
			];
		DryRunning?: [
			];
		MotorTemperatureHigh?: [
			];
		PumpMotorFatalFailure?: [
			];
		ElectronicTemperatureHigh?: [
			];
		PumpBlocked?: [
			];
		SensorFailure?: [
			];
		ElectronicNonFatalFailure?: [
			];
		ElectronicFatalFailure?: [
			];
		GeneralFault?: [
			];
		Leakage?: [
			];
		AirDetection?: [
			];
		TurbineOperation?: [
			];
	}
}

export const pumpConfigurationAndControl: ClusterDefinition<PumpConfigurationAndControl> = {
id: 512,
	attributes: [
		"MaxPressure",
		"MaxSpeed",
		"MaxFlow",
		"MinConstPressure",
		"MaxConstPressure",
		"MinCompPressure",
		"MaxCompPressure",
		"MinConstSpeed",
		"MaxConstSpeed",
		"MinConstFlow",
		"MaxConstFlow",
		"MinConstTemp",
		"MaxConstTemp",
		"PumpStatus",
		"EffectiveOperationMode",
		"EffectiveControlMode",
		"Capacity",
		"Speed",
		"LifetimeRunningHours",
		"Power",
		"LifetimeEnergyConsumed",
		"OperationMode",
		"ControlMode",
		"SupportsConstantPressure",
		"SupportsCompensatedPressure",
		"SupportsConstantFlow",
		"SupportsConstantSpeed",
		"SupportsConstantTemperature",
		"SupportsAutomatic",
		"SupportsLocalOperation",
	] as const,
	commands: [
	] as const,
	events: [
		"SupplyVoltageLow",
		"SupplyVoltageHigh",
		"PowerMissingPhase",
		"SystemPressureLow",
		"SystemPressureHigh",
		"DryRunning",
		"MotorTemperatureHigh",
		"PumpMotorFatalFailure",
		"ElectronicTemperatureHigh",
		"PumpBlocked",
		"SensorFailure",
		"ElectronicNonFatalFailure",
		"ElectronicFatalFailure",
		"GeneralFault",
		"Leakage",
		"AirDetection",
		"TurbineOperation",
	] as const
}

export default pumpConfigurationAndControl;
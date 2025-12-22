// This file is generated from PumpConfigurationControl.xml - do not edit it directly
// Generated on 2025-12-22T10:26:10.246Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ControlModeEnum {
	ConstantSpeed = 0,
	ConstantPressure = 1,
	ProportionalPressure = 2,
	ConstantFlow = 3,
	ConstantTemperature = 5,
	Automatic = 7,
}

export enum OperationModeEnum {
	Normal = 0,
	Minimum = 1,
	Maximum = 2,
	Local = 3,
}

export enum PumpStatusBitmap {
	__NotSet = 0,
		/** A fault related to the system or pump device is detected. */
	DeviceFault= 1<<0,
		/** A fault related to the supply to the pump is detected. */
	SupplyFault= 1<<1,
		/** Setpoint is too low to achieve. */
	SpeedLow= 1<<2,
		/** Setpoint is too high to achieve. */
	SpeedHigh= 1<<3,
		/** Device control is overridden by hardware, such as an external STOP button or via a local HMI. */
	LocalOverride= 1<<4,
		/** Pump is currently running */
	Running= 1<<5,
		/** A remote pressure sensor is used as the sensor for the regulation of the pump. */
	RemotePressure= 1<<6,
		/** A remote flow sensor is used as the sensor for the regulation of the pump. */
	RemoteFlow= 1<<7,
		/** A remote temperature sensor is used as the sensor for the regulation of the pump. */
	RemoteTemperature= 1<<8,
}

export type PumpConfigurationAndControl = PumpConfigurationAndControlCluster & { id: 0x0200};

export interface PumpConfigurationAndControlCluster {
id: 0x0200;
	attributes: {
		readonly MaxPressure:number
		readonly MaxSpeed:number
		readonly MaxFlow:number
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
		readonly Capacity:number
		readonly Speed?:number
		readonly LifetimeRunningHours?:number
		readonly Power?:number
		readonly LifetimeEnergyConsumed?:number
		readonly OperationMode:OperationModeEnum
		readonly ControlMode?:ControlModeEnum
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
		SupplyVoltageLow: [
			];
		SupplyVoltageHigh: [
			];
		PowerMissingPhase: [
			];
		SystemPressureLow: [
			];
		SystemPressureHigh: [
			];
		DryRunning: [
			];
		MotorTemperatureHigh: [
			];
		PumpMotorFatalFailure: [
			];
		ElectronicTemperatureHigh: [
			];
		PumpBlocked: [
			];
		SensorFailure: [
			];
		ElectronicNonFatalFailure: [
			];
		ElectronicFatalFailure: [
			];
		GeneralFault: [
			];
		Leakage: [
			];
		AirDetection: [
			];
		TurbineOperation: [
			];
	}
}

export const pumpConfigurationAndControl: ClusterDefinition<PumpConfigurationAndControl> = {
id: 0x0200,
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
	] as const
}

export default pumpConfigurationAndControl;
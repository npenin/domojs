// This file is generated from pump-configuration-and-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.341Z

import { Cluster } from '../../server/clients/shared.js';


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

export const pumpConfigurationAndControl: Cluster<PumpConfigurationAndControl['attributes'], PumpConfigurationAndControl['commands'], PumpConfigurationAndControl['events']> = {
id: 512,
	attributes: {
		MaxPressure:0,
		MaxSpeed:0,
		MaxFlow:0,
		MinConstPressure:0,
		MaxConstPressure:0,
		MinCompPressure:0,
		MaxCompPressure:0,
		MinConstSpeed:0,
		MaxConstSpeed:0,
		MinConstFlow:0,
		MaxConstFlow:0,
		MinConstTemp:0,
		MaxConstTemp:0,
		PumpStatus:null,
		EffectiveOperationMode:null,
		EffectiveControlMode:null,
		Capacity:0,
		Speed:0,
		LifetimeRunningHours:0,
		Power:0,
		LifetimeEnergyConsumed:0,
		OperationMode:null,
		ControlMode:null,
		/** Supports operating in constant pressure mode */
	SupportsConstantPressure: false,
		/** Supports operating in compensated pressure mode */
	SupportsCompensatedPressure: false,
		/** Supports operating in constant flow mode */
	SupportsConstantFlow: false,
		/** Supports operating in constant speed mode */
	SupportsConstantSpeed: false,
		/** Supports operating in constant temperature mode */
	SupportsConstantTemperature: false,
		/** Supports operating in automatic mode */
	SupportsAutomatic: false,
		/** Supports operating using local settings */
	SupportsLocalOperation: false,
},
	commands: {
},
	events: {
		SupplyVoltageLow: [
			],
		SupplyVoltageHigh: [
			],
		PowerMissingPhase: [
			],
		SystemPressureLow: [
			],
		SystemPressureHigh: [
			],
		DryRunning: [
			],
		MotorTemperatureHigh: [
			],
		PumpMotorFatalFailure: [
			],
		ElectronicTemperatureHigh: [
			],
		PumpBlocked: [
			],
		SensorFailure: [
			],
		ElectronicNonFatalFailure: [
			],
		ElectronicFatalFailure: [
			],
		GeneralFault: [
			],
		Leakage: [
			],
		AirDetection: [
			],
		TurbineOperation: [
			],
	}
}

export default pumpConfigurationAndControl;
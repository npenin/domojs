// This file is generated from energy-evse-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.782Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StateEnum {
	NotPluggedIn= 0,
	PluggedInNoDemand= 1,
	PluggedInDemand= 2,
	PluggedInCharging= 3,
	PluggedInDischarging= 4,
	SessionEnding= 5,
	Fault= 6,
}

export enum SupplyStateEnum {
	Disabled= 0,
	ChargingEnabled= 1,
	DischargingEnabled= 2,
	DisabledError= 3,
	DisabledDiagnostics= 4,
	Enabled= 5,
}

export enum FaultStateEnum {
	NoError= 0,
	MeterFailure= 1,
	OverVoltage= 2,
	UnderVoltage= 3,
	OverCurrent= 4,
	ContactWetFailure= 5,
	ContactDryFailure= 6,
	GroundFault= 7,
	PowerLoss= 8,
	PowerQuality= 9,
	PilotShortCircuit= 10,
	EmergencyStop= 11,
	EVDisconnected= 12,
	WrongPowerSupply= 13,
	LiveNeutralSwap= 14,
	OverTemperature= 15,
	Other= 255,
}

export enum EnergyTransferStoppedReasonEnum {
	EVStopped= 0,
	EVSEStopped= 1,
	Other= 2,
}

export enum TargetDayOfWeekBitmap {
	Sunday= 0x01,
	Monday= 0x02,
	Tuesday= 0x04,
	Wednesday= 0x08,
	Thursday= 0x10,
	Friday= 0x20,
	Saturday= 0x40,
}

export interface ChargingTargetStruct {
	TargetTimeMinutesPastMidnight:number,
	TargetSoC?:number,
	AddedEnergy?:number,
}

export interface ChargingTargetScheduleStruct {
	DayOfWeekForSequence:TargetDayOfWeekBitmap,
	ChargingTargets:readonly ChargingTargetStruct[],
}

/**
 * Electric Vehicle Supply Equipment (EVSE) is equipment used to charge an Electric Vehicle (EV) or Plug-In Hybrid Electric Vehicle. This cluster provides an interface to the functionality of Electric Vehicle Supply Equipment (EVSE) management.
 */

export interface EnergyEVSE {
id: 153;
	attributes: {
		readonly State?:StateEnum
		readonly SupplyState:SupplyStateEnum
		readonly FaultState:FaultStateEnum
		readonly ChargingEnabledUntil?:number
		readonly DischargingEnabledUntil?:number
		readonly CircuitCapacity:number
		readonly MinimumChargeCurrent:number
		readonly MaximumChargeCurrent:number
		readonly MaximumDischargeCurrent?:number
		USER_MAXIMUM_CHARGE_CURRENT?:number
		RANDOMIZATION_DELAY_WINDOW?:number
		readonly NextChargeStartTime?:number
		readonly NextChargeTargetTime?:number
		readonly NextChargeRequiredEnergy?:number
		readonly NextChargeTargetSoC?:number
		APPROXIMATE_EV_EFFICIENCY?:number
		readonly StateOfCharge?:number
		readonly BatteryCapacity?:number
		readonly VehicleID?:string
		readonly SessionID?:number
		readonly SessionDuration?:number
		readonly SessionEnergyCharged?:number
		readonly SessionEnergyDischarged?:number
		/** EVSE supports storing user charging preferences */
		readonly SupportsChargingPreferences: boolean
		/** EVSE supports reporting of vehicle State of Charge (SoC) */
		readonly SupportsSoCReporting: boolean
		/** EVSE supports PLC to support Plug and Charge */
		readonly SupportsPlugAndCharge: boolean
		/** EVSE is fitted with an RFID reader */
		readonly SupportsRFID: boolean
		/** EVSE supports bi-directional charging / discharging */
		readonly SupportsV2X: boolean
}
	commands: {
		/** Allows a client to disable the EVSE from charging and discharging. */
		Disable: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** This command allows a client to enable the EVSE to charge an EV, and to provide or update the maximum and minimum charge current. */
		EnableCharging: {
			inputparams: readonly [
				ChargingEnabledUntil: number, 
				MinimumChargeCurrent: number, 
				MaximumChargeCurrent: number, 
			],
			 outputparams: readonly []
            }
		/** Upon receipt, this SHALL allow a client to enable the discharge of an EV, and to provide or update the maximum discharge current. */
		EnableDischarging?: {
			inputparams: readonly [
				DischargingEnabledUntil: number, 
				MaximumDischargeCurrent: number, 
			],
			 outputparams: readonly []
            }
		/** Allows a client to put the EVSE into a self-diagnostics mode. */
		StartDiagnostics?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Allows a client to set the user specified charging targets. */
		SetTargets?: {
			inputparams: readonly [
				ChargingTargetSchedules: readonly ChargingTargetScheduleStruct[], 
			],
			 outputparams: readonly []
            }
		/** Allows a client to retrieve the current set of charging targets. */
		GetTargets?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				ChargingTargetSchedules: readonly ChargingTargetScheduleStruct[], ]
            }
		/** Allows a client to clear all stored charging targets. */
		ClearTargets?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		EVConnected: [
			
			SessionID: number, ];
		EVNotDetected: [
			
			SessionID: number, 
			State: StateEnum, 
			SessionDuration: number, 
			SessionEnergyCharged: number, 
			SessionEnergyDischarged: number, ];
		EnergyTransferStarted: [
			
			SessionID: number, 
			State: StateEnum, 
			MaximumCurrent: number, 
			MaximumDischargeCurrent: number, ];
		EnergyTransferStopped: [
			
			SessionID: number, 
			State: StateEnum, 
			Reason: EnergyTransferStoppedReasonEnum, 
			EnergyTransferred: number, 
			EnergyDischarged: number, ];
		Fault: [
			
			SessionID: number, 
			State: StateEnum, 
			FaultStatePreviousState: FaultStateEnum, 
			FaultStateCurrentState: FaultStateEnum, ];
		RFID?: [
			
			UID: import ("@akala/core").IsomorphicBuffer, ];
	}
}

export const energyEVSE: ClusterDefinition<EnergyEVSE> = {
id: 153,
	attributes: [
		"State",
		"SupplyState",
		"FaultState",
		"ChargingEnabledUntil",
		"DischargingEnabledUntil",
		"CircuitCapacity",
		"MinimumChargeCurrent",
		"MaximumChargeCurrent",
		"MaximumDischargeCurrent",
		"USER_MAXIMUM_CHARGE_CURRENT",
		"RANDOMIZATION_DELAY_WINDOW",
		"NextChargeStartTime",
		"NextChargeTargetTime",
		"NextChargeRequiredEnergy",
		"NextChargeTargetSoC",
		"APPROXIMATE_EV_EFFICIENCY",
		"StateOfCharge",
		"BatteryCapacity",
		"VehicleID",
		"SessionID",
		"SessionDuration",
		"SessionEnergyCharged",
		"SessionEnergyDischarged",
		"SupportsChargingPreferences",
		"SupportsSoCReporting",
		"SupportsPlugAndCharge",
		"SupportsRFID",
		"SupportsV2X",
	] as const,
	commands: [
		"Disable",
		"EnableCharging",
		"EnableDischarging",
		"StartDiagnostics",
		"SetTargets",
		"GetTargets",
		"ClearTargets",
	] as const,
	events: [
		"EVConnected",
		"EVNotDetected",
		"EnergyTransferStarted",
		"EnergyTransferStopped",
		"Fault",
		"RFID",
	] as const
}

export default energyEVSE;
// This file is generated from EnergyEVSE.xml - do not edit it directly
// Generated on 2025-12-22T10:26:02.181Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum EnergyTransferStoppedReasonEnum {
	EVStopped = 0,
	EVSEStopped = 1,
	Other = 2,
}

export enum FaultStateEnum {
	NoError = 0,
	MeterFailure = 1,
	OverVoltage = 2,
	UnderVoltage = 3,
	OverCurrent = 4,
	ContactWetFailure = 5,
	ContactDryFailure = 6,
	GroundFault = 7,
	PowerLoss = 8,
	PowerQuality = 9,
	PilotShortCircuit = 10,
	EmergencyStop = 11,
	EVDisconnected = 12,
	WrongPowerSupply = 13,
	LiveNeutralSwap = 14,
	OverTemperature = 15,
	Other = 255,
}

export enum StateEnum {
	NotPluggedIn = 0,
	PluggedInNoDemand = 1,
	PluggedInDemand = 2,
	PluggedInCharging = 3,
	PluggedInDischarging = 4,
	SessionEnding = 5,
	Fault = 6,
}

export enum SupplyStateEnum {
	Disabled = 0,
	ChargingEnabled = 1,
	DischargingEnabled = 2,
	DisabledError = 3,
	DisabledDiagnostics = 4,
	Enabled = 5,
}

export enum TargetDayOfWeekBitmap {
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
}

export interface ChargingTargetScheduleStruct {
	DayOfWeekForSequence:TargetDayOfWeekBitmap,
	ChargingTargets:readonly ChargingTargetStruct[],
}

export interface ChargingTargetStruct {
	TargetTimeMinutesPastMidnight:number,
	TargetSoC?:number,
	AddedEnergy?:number,
}

export type EnergyEVSE = EnergyEVSECluster & { id: 0x0099};

export interface EnergyEVSECluster {
id: 0x0099;
	attributes: {
		readonly State:StateEnum
		readonly SupplyState:SupplyStateEnum
		readonly FaultState:FaultStateEnum
		readonly ChargingEnabledUntil:number
		readonly DischargingEnabledUntil?:number
		readonly CircuitCapacity:number
		readonly MinimumChargeCurrent:number
		readonly MaximumChargeCurrent:number
		readonly MaximumDischargeCurrent?:number
		readonly UserMaximumChargeCurrent?:number
		readonly RandomizationDelayWindow?:number
		readonly NextChargeStartTime?:number
		readonly NextChargeTargetTime?:number
		readonly NextChargeRequiredEnergy?:number
		readonly NextChargeTargetSoC?:number
		readonly ApproximateEVEfficiency?:number
		readonly StateOfCharge?:number
		readonly BatteryCapacity?:number
		readonly VehicleID?:string
		readonly SessionID:number
		readonly SessionDuration:number
		readonly SessionEnergyCharged:number
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
		Disable: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		EnableCharging: {
			inputparams: readonly [
				ChargingEnabledUntil: number, 
				MinimumChargeCurrent: number, 
				MaximumChargeCurrent: number, 
			],
			 outputparams: readonly []
            }
		EnableDischarging?: {
			inputparams: readonly [
				DischargingEnabledUntil: number, 
				MaximumDischargeCurrent: number, 
			],
			 outputparams: readonly []
            }
		StartDiagnostics?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		SetTargets?: {
			inputparams: readonly [
				ChargingTargetSchedules: readonly ChargingTargetScheduleStruct[], 
			],
			 outputparams: readonly []
            }
		GetTargets?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				ChargingTargetSchedules: readonly ChargingTargetScheduleStruct[], ]
            }
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
		RFID: [
			
			UID: import ("@akala/core").IsomorphicBuffer, ];
	}
}

export const energyEVSE: ClusterDefinition<EnergyEVSE> = {
id: 0x0099,
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
		"UserMaximumChargeCurrent",
		"RandomizationDelayWindow",
		"NextChargeStartTime",
		"NextChargeTargetTime",
		"NextChargeRequiredEnergy",
		"NextChargeTargetSoC",
		"ApproximateEVEfficiency",
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
	] as const
}

export default energyEVSE;
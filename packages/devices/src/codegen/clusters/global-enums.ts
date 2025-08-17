// This file is generated from global-enums.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.309Z

import { Cluster } from '../../server/clients/shared.js';


export enum AtomicRequestTypeEnum {
	BeginWrite= 0,
	CommitWrite= 1,
	RollbackWrite= 2,
}

export enum MeasurementTypeEnum {
	Unspecified= 0,
	Voltage= 1,
	ActiveCurrent= 2,
	ReactiveCurrent= 3,
	ApparentCurrent= 4,
	ActivePower= 5,
	ReactivePower= 6,
	ApparentPower= 7,
	RMSVoltage= 8,
	RMSCurrent= 9,
	RMSPower= 10,
	Frequency= 11,
	PowerFactor= 12,
	NeutralCurrent= 13,
	ElectricalEnergy= 14,
	ReactiveEnergy= 15,
	ApparentEnergy= 16,
	SoilMoisture= 17,
}

export enum PowerThresholdSourceEnum {
	Contract= 0,
	Regulator= 1,
	Equipment= 2,
}

export enum TariffPriceTypeEnum {
	Standard= 0,
	Critical= 1,
	Virtual= 2,
	Incentive= 3,
	IncentiveSignal= 4,
}

export enum TariffUnitEnum {
	KWh= 0,
	KVAh= 1,
}

export enum StreamUsageEnum {
	Internal= 0,
	Recording= 1,
	Analysis= 2,
	LiveView= 3,
}

export enum ThreeLevelAutoEnum {
	Auto= 0,
	Low= 1,
	Medium= 2,
	High= 3,
}

export enum TestGlobalEnum {
	SomeValue= 0,
	SomeOtherValue= 1,
	FinalValue= 2,
}

export enum WebRTCEndReasonEnum {
	IceFailed= 0,
	IceTimeout= 1,
	UserHangup= 2,
	UserBusy= 3,
	Replaced= 4,
	NoUserMedia= 5,
	InviteTimeout= 6,
	AnsweredElsewhere= 7,
	OutOfResources= 8,
	MediaTimeout= 9,
	LowPower= 10,
	UnknownReason= 11,
}
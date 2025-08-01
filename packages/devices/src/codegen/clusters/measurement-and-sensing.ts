

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
}

export interface MeasurementAccuracyRangeStruct {
	RangeMin: bigint,
	RangeMax: bigint,
	PercentMax?: number,
	PercentMin?: number,
	PercentTypical?: number,
	FixedMax?: bigint,
	FixedMin?: bigint,
	FixedTypical?: bigint,
}

export interface MeasurementAccuracyStruct {
	MeasurementType:MeasurementTypeEnum,
	Measured:boolean,
	MinMeasuredValue: bigint,
	MaxMeasuredValue: bigint,
	AccuracyRanges:MeasurementAccuracyRangeStruct,
}
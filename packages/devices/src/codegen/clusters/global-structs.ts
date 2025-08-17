// This file is generated from global-structs.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.336Z

import { Cluster } from '../../server/clients/shared.js';


export interface AtomicAttributeStatusStruct {
	AttributeID:number,
	StatusCode:number,
}

export interface CurrencyStruct {
	Currency:number,
	DecimalPoints:number,
}

export interface LocationDescriptorStruct {
	LocationName:string,
	FloorNumber:number,
	AreaType:import("./semantic-tag-namespace-enums.js").AreaTypeTag,
}

export interface MeasurementAccuracyRangeStruct {
	RangeMin:bigint,
	RangeMax:bigint,
	PercentMax?:number,
	PercentMin?:number,
	PercentTypical?:number,
	FixedMax?:bigint,
	FixedMin?:bigint,
	FixedTypical?:bigint,
}

export interface MeasurementAccuracyStruct {
	MeasurementType:import("./global-enums.js").MeasurementTypeEnum,
	Measured:boolean,
	MinMeasuredValue:bigint,
	MaxMeasuredValue:bigint,
	AccuracyRanges:readonly MeasurementAccuracyRangeStruct[],
}

export interface PowerThresholdStruct {
	PowerThreshold?:number,
	ApparentPowerThreshold?:number,
	PowerThresholdSource:import("./global-enums.js").PowerThresholdSourceEnum,
}

export interface PriceStruct {
	Amount:number,
	Currency:CurrencyStruct,
}

export interface TestGlobalStruct {
	Name:string,
	MyBitmap:import("./global-bitmaps.js").TestGlobalBitmap,
	MyEnum?:import("./global-enums.js").TestGlobalEnum,
}

export interface ViewportStruct {
	X1:number,
	Y1:number,
	X2:number,
	Y2:number,
}

export interface ICECandidateStruct {
	Candidate:string,
	SDPMid:string,
	SDPMLineIndex:number,
}

export interface ICEServerStruct {
	URLs:readonly string[],
	Username?:string,
	Credential?:string,
	CAID?:number,
}

export interface WebRTCSessionStruct {
	ID:number,
	PeerNodeID:string,
	PeerEndpointID:number,
	StreamUsage:import("./global-enums.js").StreamUsageEnum,
	VideoStreamID:number,
	AudioStreamID:number,
	MetadataEnabled:boolean,
}
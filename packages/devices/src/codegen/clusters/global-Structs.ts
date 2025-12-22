// This file is generated from global-Structs.xml - do not edit it directly
// Generated on 2025-12-22T10:25:54.341Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface AtomicAttributeStatusStruct {
	AttributeID:number,
	StatusCode:number,
}

export interface CurrencyStruct {
	Currency:number,
	DecimalPoints:number,
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
	CAID?:import("./TLSCertificateManagement.js").TLSCAID,
}

export interface LocationDescriptorStruct {
	LocationName:string,
	FloorNumber:number,
	AreaType:number,
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
	MeasurementType:import("./global-Enums.js").MeasurementTypeEnum,
	Measured:boolean,
	MinMeasuredValue:bigint,
	MaxMeasuredValue:bigint,
	AccuracyRanges:readonly MeasurementAccuracyRangeStruct[],
}

export interface PowerThresholdStruct {
	PowerThreshold?:number,
	ApparentPowerThreshold?:number,
	PowerThresholdSource:import("./global-Enums.js").PowerThresholdSourceEnum,
}

export interface PriceStruct {
	Amount:number,
	Currency:CurrencyStruct,
}

export interface SemanticTagStruct {
	MfgCode:number,
	NamespaceID:number,
	Tag:number,
	Label?:string,
}

export interface ViewportStruct {
	X1:number,
	Y1:number,
	X2:number,
	Y2:number,
}

export interface WebRTCSessionStruct {
	ID:import("./global-TypeDefs.js").WebRTCSessionID,
	PeerNodeID:string,
	PeerEndpointID:number,
	StreamUsage:import("./global-Enums.js").StreamUsageEnum,
	VideoStreamID:import("./CameraAVStreamManagement.js").VideoStreamID,
	AudioStreamID:import("./CameraAVStreamManagement.js").AudioStreamID,
	MetadataEnabled:boolean,
}
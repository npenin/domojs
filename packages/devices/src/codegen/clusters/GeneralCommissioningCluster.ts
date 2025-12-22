// This file is generated from GeneralCommissioningCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:26:03.102Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CommissioningErrorEnum {
	OK = 0,
	ValueOutsideRange = 1,
	InvalidAuthentication = 2,
	NoFailSafe = 3,
	BusyWithOtherAdmin = 4,
	RequiredTCNotAccepted = 5,
	TCAcknowledgementsNotReceived = 6,
	TCMinVersionNotMet = 7,
}

export enum NetworkRecoveryReasonEnum {
	Unspecified = 0,
	Auth = 1,
	Visibility = 2,
}

export enum RegulatoryLocationTypeEnum {
	Indoor = 0,
	Outdoor = 1,
	IndoorOutdoor = 2,
}

export interface BasicCommissioningInfo {
	FailSafeExpiryLengthSeconds:number,
	MaxCumulativeFailsafeSeconds:number,
}

export type GeneralCommissioning = GeneralCommissioningCluster & { id: 0x0030};

export interface GeneralCommissioningCluster {
id: 0x0030;
	attributes: {
		readonly Breadcrumb:bigint
		readonly BasicCommissioningInfo:BasicCommissioningInfo
		readonly RegulatoryConfig:RegulatoryLocationTypeEnum
		readonly LocationCapability:RegulatoryLocationTypeEnum
		readonly SupportsConcurrentConnection:boolean
		readonly TCAcceptedVersion?:number
		readonly TCMinRequiredVersion?:number
		readonly TCAcknowledgements?:number[]
		readonly TCAcknowledgementsRequired?:boolean
		readonly TCUpdateDeadline?:number
		readonly RecoveryIdentifier?:import ("@akala/core").IsomorphicBuffer
		readonly NetworkRecoveryReason?:NetworkRecoveryReasonEnum
		readonly IsCommissioningWithoutPower?:boolean
		/** Supports Terms & Conditions acknowledgement */
		readonly SupportsTermsAndConditions: boolean
		/** Supports Network Recovery */
		readonly SupportsNetworkRecovery: boolean
}
	commands: {
		ArmFailSafe: {
			inputparams: readonly [
				ExpiryLengthSeconds: number, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, 
				DebugText: string, ]
            }
		SetRegulatoryConfig: {
			inputparams: readonly [
				NewRegulatoryConfig: RegulatoryLocationTypeEnum, 
				CountryCode: string, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, 
				DebugText: string, ]
            }
		CommissioningComplete: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, 
				DebugText: string, ]
            }
		SetTCAcknowledgements?: {
			inputparams: readonly [
				TCVersion: number, 
				TCUserResponse: number[], 
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, ]
            }
}
	events: {
	}
}

export const generalCommissioning: ClusterDefinition<GeneralCommissioning> = {
id: 0x0030,
	attributes: [
		"Breadcrumb",
		"BasicCommissioningInfo",
		"RegulatoryConfig",
		"LocationCapability",
		"SupportsConcurrentConnection",
		"TCAcceptedVersion",
		"TCMinRequiredVersion",
		"TCAcknowledgements",
		"TCAcknowledgementsRequired",
		"TCUpdateDeadline",
		"RecoveryIdentifier",
		"NetworkRecoveryReason",
		"IsCommissioningWithoutPower",
		"SupportsTermsAndConditions",
		"SupportsNetworkRecovery",
	] as const,
	commands: [
		"ArmFailSafe",
		"SetRegulatoryConfig",
		"CommissioningComplete",
		"SetTCAcknowledgements",
	] as const,
	events: [
	] as const
}

export default generalCommissioning;
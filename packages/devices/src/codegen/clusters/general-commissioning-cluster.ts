// This file is generated from general-commissioning-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.210Z

import { Cluster } from '../../server/clients/shared.js';


export enum CommissioningErrorEnum {
	OK= 0,
	ValueOutsideRange= 1,
	InvalidAuthentication= 2,
	NoFailSafe= 3,
	BusyWithOtherAdmin= 4,
	RequiredTCNotAccepted= 5,
	TCAcknowledgementsNotReceived= 6,
	TCMinVersionNotMet= 7,
}

export enum NetworkRecoveryReasonEnum {
	Unspecified= 0,
	Auth= 1,
	Visibility= 2,
}

export enum RegulatoryLocationTypeEnum {
	Indoor= 0,
	Outdoor= 1,
	IndoorOutdoor= 2,
}

export interface BasicCommissioningInfo {
	FailSafeExpiryLengthSeconds:number,
	MaxCumulativeFailsafeSeconds:number,
}

/**
 * This cluster is used to manage global aspects of the Commissioning flow.
 */

export interface GeneralCommissioning {
id: 48;
	attributes: {
		Breadcrumb:bigint
		readonly BasicCommissioningInfo:BasicCommissioningInfo
		readonly RegulatoryConfig:RegulatoryLocationTypeEnum
		readonly LocationCapability:RegulatoryLocationTypeEnum
		readonly SupportsConcurrentConnection:boolean
		readonly TCAcceptedVersion:number
		readonly TCMinRequiredVersion:number
		readonly TCAcknowledgements:bigint
		readonly TCAcknowledgementsRequired:boolean
		readonly TCUpdateDeadline?:number
		readonly RecoveryIdentifier:import ("@akala/core").IsomorphicBuffer
		readonly NetworkRecoveryReason?:NetworkRecoveryReasonEnum
		readonly IsCommissioningWithoutPower:boolean
		/** Supports Terms & Conditions acknowledgement */
		readonly SupportsTermsAndConditions: boolean
		/** Supports Network Recovery */
		readonly SupportsNetworkRecovery: boolean
}
	commands: {
		/** This command is used to arm or disarm the fail-safe timer. */
		ArmFailSafe: {
			inputparams: readonly [
				ExpiryLengthSeconds: number, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, 
				DebugText: string, ]
            }
		/** This command is used to set the regulatory configuration for the device. */
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
		/** This command is used to indicate that the commissioning process is complete. */
		CommissioningComplete: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, 
				DebugText: string, ]
            }
		/** This command is used to set the user acknowledgements received in the Enhanced Setup Flow Terms & Conditions into the node. */
		SetTCAcknowledgements: {
			inputparams: readonly [
				TCVersion: number, 
				TCUserResponse: bigint, 
			],
			 outputparams: readonly [
				ErrorCode: CommissioningErrorEnum, ]
            }
}
	events: {
	}
}

export const generalCommissioning: Cluster<GeneralCommissioning['attributes'], GeneralCommissioning['commands'], GeneralCommissioning['events']> = {
id: 48,
	attributes: {
		Breadcrumb:null,
		BasicCommissioningInfo:null,
		RegulatoryConfig:null,
		LocationCapability:null,
		SupportsConcurrentConnection:null,
		TCAcceptedVersion:0,
		TCMinRequiredVersion:0,
		TCAcknowledgements:null,
		TCAcknowledgementsRequired:null,
		TCUpdateDeadline:0,
		RecoveryIdentifier:null,
		NetworkRecoveryReason:null,
		IsCommissioningWithoutPower:null,
		/** Supports Terms & Conditions acknowledgement */
	SupportsTermsAndConditions: false,
		/** Supports Network Recovery */
	SupportsNetworkRecovery: false,
},
	commands: {
		/** This command is used to arm or disarm the fail-safe timer. */
		ArmFailSafe: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: [
				null, 
				null, ]
            },
		/** This command is used to set the regulatory configuration for the device. */
		SetRegulatoryConfig: {
			inputparams: [
				null, 
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, ]
            },
		/** This command is used to indicate that the commissioning process is complete. */
		CommissioningComplete: {
			inputparams: [
			],
			 outputparams: [
				null, 
				null, ]
            },
		/** This command is used to set the user acknowledgements received in the Enhanced Setup Flow Terms & Conditions into the node. */
		SetTCAcknowledgements: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: [
				null, ]
            },
},
	events: {
	}
}

export default generalCommissioning;
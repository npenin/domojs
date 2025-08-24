// This file is generated from timer-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:44.436Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum TimerStatusEnum {
	Running= 0,
	Paused= 1,
	Expired= 2,
	Ready= 3,
}

/**
 * This cluster supports creating a simple timer functionality.
 */

export interface Timer {
id: 71;
	attributes: {
		readonly SetTime?:number
		readonly TimeRemaining?:number
		readonly TimerState?:TimerStatusEnum
		/** Supports the ability to reset timer */
		readonly SupportsReset: boolean
}
	commands: {
		/** This command is used to set the timer. */
		SetTimer: {
			inputparams: readonly [
				NewTime: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to reset the timer to the original value. */
		ResetTimer?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** This command is used to add time to the existing timer. */
		AddTime: {
			inputparams: readonly [
				AdditionalTime: number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to reduce time on the existing timer. */
		ReduceTime?: {
			inputparams: readonly [
				TimeReduction: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const timer: ClusterDefinition<Timer> = {
id: 71,
	attributes: [
		"SetTime",
		"TimeRemaining",
		"TimerState",
		"SupportsReset",
	] as const,
	commands: [
		"SetTimer",
		"ResetTimer",
		"AddTime",
		"ReduceTime",
	] as const,
	events: [
	] as const
}

export default timer;
// This file is generated from fault-injection-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.468Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum FaultType {
	Unspecified= 0,
	SystemFault= 1,
	InetFault= 2,
	ChipFault= 3,
	CertFault= 4,
}

/**
 * The Fault Injection Cluster provide a means for a test harness to configure faults(for example triggering a fault in the system).
 */

export interface FaultInjection {
id: 4294048774;
	attributes: {
}
	commands: {
		/** Configure a fault to be triggered deterministically */
		FailAtFault: {
			inputparams: readonly [
				Type: FaultType, 
				Id: number, 
				NumCallsToSkip: number, 
				NumCallsToFail: number, 
				TakeMutex: boolean, 
			],
			 outputparams: readonly []
            }
		/** Configure a fault to be triggered randomly, with a given probability defined as a percentage */
		FailRandomlyAtFault: {
			inputparams: readonly [
				Type: FaultType, 
				Id: number, 
				Percentage: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const faultInjection: ClusterDefinition<FaultInjection> = {
id: 4294048774,
	attributes: [
	] as const,
	commands: [
		"FailAtFault",
		"FailRandomlyAtFault",
	] as const,
	events: [
	] as const
}

export default faultInjection;
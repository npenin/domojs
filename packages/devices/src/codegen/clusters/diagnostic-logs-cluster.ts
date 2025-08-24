// This file is generated from diagnostic-logs-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:28.611Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum IntentEnum {
	EndUserSupport= 0,
	NetworkDiag= 1,
	CrashLogs= 2,
}

export enum StatusEnum {
	Success= 0,
	Exhausted= 1,
	NoLogs= 2,
	Busy= 3,
	Denied= 4,
}

export enum TransferProtocolEnum {
	ResponsePayload= 0,
	BDX= 1,
}

/**
 * The cluster provides commands for retrieving unstructured diagnostic logs from a Node that may be used to aid in diagnostics.
 */

export interface DiagnosticLogs {
id: 50;
	attributes: {
}
	commands: {
		/** Reception of this command starts the process of retrieving diagnostic logs from a Node. */
		RetrieveLogsRequest: {
			inputparams: readonly [
				Intent: IntentEnum, 
				RequestedProtocol: TransferProtocolEnum, 
				TransferFileDesignator: string, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				LogContent: import ("@akala/core").IsomorphicBuffer, 
				UTCTimeStamp: number, 
				TimeSinceBoot: number, ]
            }
}
	events: {
	}
}

export const diagnosticLogs: ClusterDefinition<DiagnosticLogs> = {
id: 50,
	attributes: [
	] as const,
	commands: [
		"RetrieveLogsRequest",
	] as const,
	events: [
	] as const
}

export default diagnosticLogs;
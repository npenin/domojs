// This file is generated from DiagnosticLogsCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:26:00.321Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum IntentEnum {
	EndUserSupport = 0,
	NetworkDiag = 1,
	CrashLogs = 2,
}

export enum StatusEnum {
	Success = 0,
	Exhausted = 1,
	NoLogs = 2,
	Busy = 3,
	Denied = 4,
}

export enum TransferProtocolEnum {
	ResponsePayload = 0,
	BDX = 1,
}

export type DiagnosticLogs = DiagnosticLogsCluster & { id: 0x0032};

export interface DiagnosticLogsCluster {
id: 0x0032;
	attributes: {
}
	commands: {
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
id: 0x0032,
	attributes: [
	] as const,
	commands: [
		"RetrieveLogsRequest",
	] as const,
	events: [
	] as const
}

export default diagnosticLogs;
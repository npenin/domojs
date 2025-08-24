// This file is generated from ethernet-network-diagnostics-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:30.538Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum PHYRateEnum {
	Rate10M= 0,
	Rate100M= 1,
	Rate1G= 2,
	Rate2_5G= 3,
	Rate5G= 4,
	Rate10G= 5,
	Rate40G= 6,
	Rate100G= 7,
	Rate200G= 8,
	Rate400G= 9,
}

/**
 * The Ethernet Network Diagnostics Cluster provides a means to acquire standardized diagnostics metrics that MAY be used by a Node to assist a user or Administrative Node in diagnosing potential problems.
 */

export interface EthernetNetworkDiagnostics {
id: 55;
	attributes: {
		readonly PHYRate?:PHYRateEnum
		readonly FullDuplex?:boolean
		readonly PacketRxCount?:bigint
		readonly PacketTxCount?:bigint
		readonly TxErrCount?:bigint
		readonly CollisionCount?:bigint
		readonly OverrunCount?:bigint
		readonly CarrierDetect?:boolean
		readonly TimeSinceReset?:bigint
		/** Node makes available the counts for the number of received and transmitted packets on the ethernet interface. */
		readonly SupportsPacketCounts: boolean
		/** Node makes available the counts for the number of errors that have occurred during the reception and transmission of packets on the ethernet interface. */
		readonly SupportsErrorCounts: boolean
}
	commands: {
		/** This command is used to reset the count attributes. */
		ResetCounts?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const ethernetNetworkDiagnostics: ClusterDefinition<EthernetNetworkDiagnostics> = {
id: 55,
	attributes: [
		"PHYRate",
		"FullDuplex",
		"PacketRxCount",
		"PacketTxCount",
		"TxErrCount",
		"CollisionCount",
		"OverrunCount",
		"CarrierDetect",
		"TimeSinceReset",
		"SupportsPacketCounts",
		"SupportsErrorCounts",
	] as const,
	commands: [
		"ResetCounts",
	] as const,
	events: [
	] as const
}

export default ethernetNetworkDiagnostics;
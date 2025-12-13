// This file is generated from thread-network-diagnostics-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.550Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum NetworkFaultEnum {
	Unspecified= 0,
	LinkDown= 1,
	HardwareFailure= 2,
	NetworkJammed= 3,
}

export enum RoutingRoleEnum {
	Unspecified= 0,
	Unassigned= 1,
	SleepyEndDevice= 2,
	EndDevice= 3,
	REED= 4,
	Router= 5,
	Leader= 6,
}

export enum ConnectionStatusEnum {
	Connected= 0,
	NotConnected= 1,
}

export interface NeighborTableStruct {
	ExtAddress:bigint,
	Age:number,
	Rloc16:number,
	LinkFrameCounter:number,
	MleFrameCounter:number,
	LQI:number,
	AverageRssi:number,
	LastRssi:number,
	FrameErrorRate:number,
	MessageErrorRate:number,
	RxOnWhenIdle:boolean,
	FullThreadDevice:boolean,
	FullNetworkData:boolean,
	IsChild:boolean,
}

export interface RouteTableStruct {
	ExtAddress:bigint,
	Rloc16:number,
	RouterId:number,
	NextHop:number,
	PathCost:number,
	LQIIn:number,
	LQIOut:number,
	Age:number,
	Allocated:boolean,
	LinkEstablished:boolean,
}

export interface SecurityPolicy {
	RotationTime:number,
	Flags:number,
}

export interface OperationalDatasetComponents {
	ActiveTimestampPresent:boolean,
	PendingTimestampPresent:boolean,
	MasterKeyPresent:boolean,
	NetworkNamePresent:boolean,
	ExtendedPanIdPresent:boolean,
	MeshLocalPrefixPresent:boolean,
	DelayPresent:boolean,
	PanIdPresent:boolean,
	ChannelPresent:boolean,
	PskcPresent:boolean,
	SecurityPolicyPresent:boolean,
	ChannelMaskPresent:boolean,
}

/**
 * The Thread Network Diagnostics Cluster provides a means to acquire standardized diagnostics metrics that MAY be used by a Node to assist a user or Administrative Node in diagnosing potential problems
 */

export interface ThreadNetworkDiagnostics {
id: 53;
	attributes: {
		readonly Channel?:number
		readonly RoutingRole?:RoutingRoleEnum
		readonly NetworkName?:string
		readonly PanId?:number
		readonly ExtendedPanId?:bigint
		readonly MeshLocalPrefix?:import ("@akala/core").IsomorphicBuffer
		readonly OverrunCount?:bigint
		readonly NeighborTable:readonly NeighborTableStruct[]
		readonly RouteTable:readonly RouteTableStruct[]
		readonly PartitionId?:number
		readonly Weighting?:number
		readonly DataVersion?:number
		readonly StableDataVersion?:number
		readonly LeaderRouterId?:number
		readonly DetachedRoleCount?:number
		readonly ChildRoleCount?:number
		readonly RouterRoleCount?:number
		readonly LeaderRoleCount?:number
		readonly AttachAttemptCount?:number
		readonly PartitionIdChangeCount?:number
		readonly BetterPartitionAttachAttemptCount?:number
		readonly ParentChangeCount?:number
		readonly TxTotalCount?:number
		readonly TxUnicastCount?:number
		readonly TxBroadcastCount?:number
		readonly TxAckRequestedCount?:number
		readonly TxAckedCount?:number
		readonly TxNoAckRequestedCount?:number
		readonly TxDataCount?:number
		readonly TxDataPollCount?:number
		readonly TxBeaconCount?:number
		readonly TxBeaconRequestCount?:number
		readonly TxOtherCount?:number
		readonly TxRetryCount?:number
		readonly TxDirectMaxRetryExpiryCount?:number
		readonly TxIndirectMaxRetryExpiryCount?:number
		readonly TxErrCcaCount?:number
		readonly TxErrAbortCount?:number
		readonly TxErrBusyChannelCount?:number
		readonly RxTotalCount?:number
		readonly RxUnicastCount?:number
		readonly RxBroadcastCount?:number
		readonly RxDataCount?:number
		readonly RxDataPollCount?:number
		readonly RxBeaconCount?:number
		readonly RxBeaconRequestCount?:number
		readonly RxOtherCount?:number
		readonly RxAddressFilteredCount?:number
		readonly RxDestAddrFilteredCount?:number
		readonly RxDuplicatedCount?:number
		readonly RxErrNoFrameCount?:number
		readonly RxErrUnknownNeighborCount?:number
		readonly RxErrInvalidSrcAddrCount?:number
		readonly RxErrSecCount?:number
		readonly RxErrFcsCount?:number
		readonly RxErrOtherCount?:number
		readonly ActiveTimestamp?:bigint
		readonly PendingTimestamp?:bigint
		readonly Delay?:number
		readonly SecurityPolicy?:SecurityPolicy
		readonly ChannelPage0Mask?:import ("@akala/core").IsomorphicBuffer
		readonly OperationalDatasetComponents?:OperationalDatasetComponents
		readonly ActiveNetworkFaultsList:readonly NetworkFaultEnum[]
		readonly ExtAddress?:bigint
		readonly Rloc16?:number
		/** Server supports the counts for the number of received and transmitted packets on the Thread interface. */
		readonly SupportsPacketCounts: boolean
		/** Server supports the counts for the number of errors that have occurred during the reception and transmission of packets on the Thread interface. */
		readonly SupportsErrorCounts: boolean
		/** Server supports the counts for various MLE layer happenings. */
		readonly SupportsMLECounts: boolean
		/** Server supports the counts for various MAC layer happenings. */
		readonly SupportsMACCounts: boolean
}
	commands: {
		/** Reception of this command SHALL reset the following attributes to 0: */
		ResetCounts?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		ConnectionStatus?: [
			
			ConnectionStatus: ConnectionStatusEnum, ];
		NetworkFaultChange?: [
			
			Current: readonly NetworkFaultEnum[], 
			Previous: readonly NetworkFaultEnum[], ];
	}
}

export const threadNetworkDiagnostics: ClusterDefinition<ThreadNetworkDiagnostics> = {
id: 53,
	attributes: [
		"Channel",
		"RoutingRole",
		"NetworkName",
		"PanId",
		"ExtendedPanId",
		"MeshLocalPrefix",
		"OverrunCount",
		"NeighborTable",
		"RouteTable",
		"PartitionId",
		"Weighting",
		"DataVersion",
		"StableDataVersion",
		"LeaderRouterId",
		"DetachedRoleCount",
		"ChildRoleCount",
		"RouterRoleCount",
		"LeaderRoleCount",
		"AttachAttemptCount",
		"PartitionIdChangeCount",
		"BetterPartitionAttachAttemptCount",
		"ParentChangeCount",
		"TxTotalCount",
		"TxUnicastCount",
		"TxBroadcastCount",
		"TxAckRequestedCount",
		"TxAckedCount",
		"TxNoAckRequestedCount",
		"TxDataCount",
		"TxDataPollCount",
		"TxBeaconCount",
		"TxBeaconRequestCount",
		"TxOtherCount",
		"TxRetryCount",
		"TxDirectMaxRetryExpiryCount",
		"TxIndirectMaxRetryExpiryCount",
		"TxErrCcaCount",
		"TxErrAbortCount",
		"TxErrBusyChannelCount",
		"RxTotalCount",
		"RxUnicastCount",
		"RxBroadcastCount",
		"RxDataCount",
		"RxDataPollCount",
		"RxBeaconCount",
		"RxBeaconRequestCount",
		"RxOtherCount",
		"RxAddressFilteredCount",
		"RxDestAddrFilteredCount",
		"RxDuplicatedCount",
		"RxErrNoFrameCount",
		"RxErrUnknownNeighborCount",
		"RxErrInvalidSrcAddrCount",
		"RxErrSecCount",
		"RxErrFcsCount",
		"RxErrOtherCount",
		"ActiveTimestamp",
		"PendingTimestamp",
		"Delay",
		"SecurityPolicy",
		"ChannelPage0Mask",
		"OperationalDatasetComponents",
		"ActiveNetworkFaultsList",
		"ExtAddress",
		"Rloc16",
		"SupportsPacketCounts",
		"SupportsErrorCounts",
		"SupportsMLECounts",
		"SupportsMACCounts",
	] as const,
	commands: [
		"ResetCounts",
	] as const,
	events: [
		"ConnectionStatus",
		"NetworkFaultChange",
	] as const
}

export default threadNetworkDiagnostics;
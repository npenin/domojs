// This file is generated from thread-network-diagnostics-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.835Z

import { Cluster } from '../../server/clients/shared.js';


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

export const threadNetworkDiagnostics: Cluster<ThreadNetworkDiagnostics['attributes'], ThreadNetworkDiagnostics['commands'], ThreadNetworkDiagnostics['events']> = {
id: 53,
	attributes: {
		Channel:0,
		RoutingRole:null,
		NetworkName:null,
		PanId:0,
		ExtendedPanId:null,
		MeshLocalPrefix:null,
		OverrunCount:null,
		NeighborTable:[],
		RouteTable:[],
		PartitionId:0,
		Weighting:0,
		DataVersion:0,
		StableDataVersion:0,
		LeaderRouterId:0,
		DetachedRoleCount:0,
		ChildRoleCount:0,
		RouterRoleCount:0,
		LeaderRoleCount:0,
		AttachAttemptCount:0,
		PartitionIdChangeCount:0,
		BetterPartitionAttachAttemptCount:0,
		ParentChangeCount:0,
		TxTotalCount:0,
		TxUnicastCount:0,
		TxBroadcastCount:0,
		TxAckRequestedCount:0,
		TxAckedCount:0,
		TxNoAckRequestedCount:0,
		TxDataCount:0,
		TxDataPollCount:0,
		TxBeaconCount:0,
		TxBeaconRequestCount:0,
		TxOtherCount:0,
		TxRetryCount:0,
		TxDirectMaxRetryExpiryCount:0,
		TxIndirectMaxRetryExpiryCount:0,
		TxErrCcaCount:0,
		TxErrAbortCount:0,
		TxErrBusyChannelCount:0,
		RxTotalCount:0,
		RxUnicastCount:0,
		RxBroadcastCount:0,
		RxDataCount:0,
		RxDataPollCount:0,
		RxBeaconCount:0,
		RxBeaconRequestCount:0,
		RxOtherCount:0,
		RxAddressFilteredCount:0,
		RxDestAddrFilteredCount:0,
		RxDuplicatedCount:0,
		RxErrNoFrameCount:0,
		RxErrUnknownNeighborCount:0,
		RxErrInvalidSrcAddrCount:0,
		RxErrSecCount:0,
		RxErrFcsCount:0,
		RxErrOtherCount:0,
		ActiveTimestamp:null,
		PendingTimestamp:null,
		Delay:0,
		SecurityPolicy:null,
		ChannelPage0Mask:null,
		OperationalDatasetComponents:null,
		ActiveNetworkFaultsList:[],
		ExtAddress:null,
		Rloc16:0,
		/** Server supports the counts for the number of received and transmitted packets on the Thread interface. */
	SupportsPacketCounts: false,
		/** Server supports the counts for the number of errors that have occurred during the reception and transmission of packets on the Thread interface. */
	SupportsErrorCounts: false,
		/** Server supports the counts for various MLE layer happenings. */
	SupportsMLECounts: false,
		/** Server supports the counts for various MAC layer happenings. */
	SupportsMACCounts: false,
},
	commands: {
		/** Reception of this command SHALL reset the following attributes to 0: */
		ResetCounts: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		ConnectionStatus: [
			
			null, ],
		NetworkFaultChange: [
			
			[], 
			[], ],
	}
}

export default threadNetworkDiagnostics;
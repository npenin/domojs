// This file is generated from wifi-network-diagnostics-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:49.154Z

import { Cluster } from '../../server/clients/shared.js';


export enum SecurityTypeEnum {
	Unspecified= 0,
	None= 1,
	WEP= 2,
	WPA= 3,
	WPA2= 4,
	WPA3= 5,
}

export enum WiFiVersionEnum {
	A= 0,
	B= 1,
	G= 2,
	N= 3,
	Ac= 4,
	Ax= 5,
	Ah= 6,
}

export enum AssociationFailureCauseEnum {
	Unknown= 0,
	AssociationFailed= 1,
	AuthenticationFailed= 2,
	SsidNotFound= 3,
}

export enum ConnectionStatusEnum {
	Connected= 0,
	NotConnected= 1,
}

/**
 * The Wi-Fi Network Diagnostics Cluster provides a means to acquire standardized diagnostics metrics that MAY be used by a Node to assist a user or Administrative Node in diagnosing potential problems.
 */

export interface WiFiNetworkDiagnostics {
id: 54;
	attributes: {
		readonly BSSID?:import ("@akala/core").IsomorphicBuffer
		readonly SecurityType?:SecurityTypeEnum
		readonly WiFiVersion?:WiFiVersionEnum
		readonly ChannelNumber?:number
		readonly RSSI?:number
		readonly BeaconLostCount?:number
		readonly BeaconRxCount?:number
		readonly PacketMulticastRxCount?:number
		readonly PacketMulticastTxCount?:number
		readonly PacketUnicastRxCount?:number
		readonly PacketUnicastTxCount?:number
		readonly CurrentMaxRate?:bigint
		readonly OverrunCount?:bigint
		/** Node makes available the counts for the number of received and transmitted packets on the Wi-Fi interface. */
		readonly SupportsPacketCounts: boolean
		/** Node makes available the counts for the number of errors that have occurred during the reception and transmission of packets on the Wi-Fi interface. */
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
		Disconnection?: [
			
			ReasonCode: number, ];
		AssociationFailure?: [
			
			AssociationFailureCause: AssociationFailureCauseEnum, 
			Status: number, ];
		ConnectionStatus?: [
			
			ConnectionStatus: ConnectionStatusEnum, ];
	}
}

export const wiFiNetworkDiagnostics: Cluster<WiFiNetworkDiagnostics['attributes'], WiFiNetworkDiagnostics['commands'], WiFiNetworkDiagnostics['events']> = {
id: 54,
	attributes: {
		BSSID:null,
		SecurityType:null,
		WiFiVersion:null,
		ChannelNumber:0,
		RSSI:0,
		BeaconLostCount:0,
		BeaconRxCount:0,
		PacketMulticastRxCount:0,
		PacketMulticastTxCount:0,
		PacketUnicastRxCount:0,
		PacketUnicastTxCount:0,
		CurrentMaxRate:null,
		OverrunCount:null,
		/** Node makes available the counts for the number of received and transmitted packets on the Wi-Fi interface. */
	SupportsPacketCounts: false,
		/** Node makes available the counts for the number of errors that have occurred during the reception and transmission of packets on the Wi-Fi interface. */
	SupportsErrorCounts: false,
},
	commands: {
		/** This command is used to reset the count attributes. */
		ResetCounts: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		Disconnection: [
			
			0, ],
		AssociationFailure: [
			
			null, 
			0, ],
		ConnectionStatus: [
			
			null, ],
	}
}

export default wiFiNetworkDiagnostics;
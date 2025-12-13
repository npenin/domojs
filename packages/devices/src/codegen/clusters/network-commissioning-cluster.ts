// This file is generated from network-commissioning-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.732Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum NetworkCommissioningStatusEnum {
	Success= 0,
	OutOfRange= 1,
	BoundsExceeded= 2,
	NetworkIDNotFound= 3,
	DuplicateNetworkID= 4,
	NetworkNotFound= 5,
	RegulatoryError= 6,
	AuthFailure= 7,
	UnsupportedSecurity= 8,
	OtherConnectionFailure= 9,
	IPV6Failed= 10,
	IPBindFailed= 11,
	UnknownError= 12,
}

export enum WiFiBandEnum {
	__2G4= 0,
	__3G65= 1,
	__5G= 2,
	__6G= 3,
	__60G= 4,
	__1G= 5,
}

export enum WiFiSecurityBitmap {
	Unencrypted= 0x1,
	WEP= 0x2,
	WPA_PERSONAL= 0x4,
	WPA2_PERSONAL= 0x8,
	WPA3_PERSONAL= 0x10,
	WPA3_Matter_PDC= 0x20,
}

export enum ThreadCapabilitiesBitmap {
	IsBorderRouterCapable= 0x1,
	IsRouterCapable= 0x2,
	IsSleepyEndDeviceCapable= 0x4,
	IsFullThreadDevice= 0x8,
	IsSynchronizedSleepyEndDeviceCapable= 0x10,
}

export interface WiFiInterfaceScanResultStruct {
	Security:WiFiSecurityBitmap,
	SSID:import ("@akala/core").IsomorphicBuffer,
	BSSID:import ("@akala/core").IsomorphicBuffer,
	Channel:number,
	WiFiBand:WiFiBandEnum,
	RSSI:number,
}

export interface ThreadInterfaceScanResultStruct {
	PanId:number,
	ExtendedPanId:bigint,
	NetworkName:string,
	Channel:number,
	Version:number,
	ExtendedAddress:import ("@akala/core").IsomorphicBuffer,
	RSSI:number,
	LQI:number,
}

export interface NetworkInfoStruct {
	NetworkID:import ("@akala/core").IsomorphicBuffer,
	Connected:boolean,
	NetworkIdentifier?:import ("@akala/core").IsomorphicBuffer,
	ClientIdentifier?:import ("@akala/core").IsomorphicBuffer,
}

/**
 * Functionality to configure, enable, disable network credentials and access on a Matter device.
 */

export interface NetworkCommissioning {
id: 49;
	attributes: {
		readonly MaxNetworks:number
		readonly Networks:readonly NetworkInfoStruct[]
		readonly ScanMaxTimeSeconds?:number
		readonly ConnectMaxTimeSeconds?:number
		InterfaceEnabled:boolean
		readonly LastNetworkingStatus?:NetworkCommissioningStatusEnum
		readonly LastNetworkID?:import ("@akala/core").IsomorphicBuffer
		readonly LastConnectErrorValue?:number
		readonly SupportedWiFiBands?:readonly WiFiBandEnum[]
		readonly SupportedThreadFeatures?:ThreadCapabilitiesBitmap
		readonly ThreadVersion?:number
		/** Wi-Fi related features */
		readonly SupportsWiFiNetworkInterface: boolean
		/** Thread related features */
		readonly SupportsThreadNetworkInterface: boolean
		/** Ethernet related features */
		readonly SupportsEthernetNetworkInterface: boolean
		/** Wi-Fi Per-Device Credentials */
		readonly SupportsPerDeviceCredentials: boolean
}
	commands: {
		/** This command is used to scan for available networks on the network interface associated with the cluster instance. */
		ScanNetworks?: {
			inputparams: readonly [
				SSID: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				WiFiScanResults: readonly WiFiInterfaceScanResultStruct[], 
				ThreadScanResults: readonly ThreadInterfaceScanResultStruct[], ]
            }
		/** This command is used to add or update a Wi-Fi network configuration. */
		AddOrUpdateWiFiNetwork?: {
			inputparams: readonly [
				SSID: import ("@akala/core").IsomorphicBuffer, 
				Credentials: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
				NetworkIdentity: import ("@akala/core").IsomorphicBuffer, 
				ClientIdentifier: import ("@akala/core").IsomorphicBuffer, 
				PossessionNonce: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, 
				ClientIdentity: import ("@akala/core").IsomorphicBuffer, 
				PossessionSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command is used to add or update a Thread network configuration. */
		AddOrUpdateThreadNetwork?: {
			inputparams: readonly [
				OperationalDataset: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, 
				ClientIdentity: import ("@akala/core").IsomorphicBuffer, 
				PossessionSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command is used to remove a network configuration on the network interface associated with the cluster instance. */
		RemoveNetwork?: {
			inputparams: readonly [
				NetworkID: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, 
				ClientIdentity: import ("@akala/core").IsomorphicBuffer, 
				PossessionSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command is used to connect to a network on the network interface associated with the cluster instance. */
		ConnectNetwork?: {
			inputparams: readonly [
				NetworkID: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				ErrorValue: number, ]
            }
		/** This command is used to re-order the network configuration list. */
		ReorderNetwork?: {
			inputparams: readonly [
				NetworkID: import ("@akala/core").IsomorphicBuffer, 
				NetworkIndex: number, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, 
				ClientIdentity: import ("@akala/core").IsomorphicBuffer, 
				PossessionSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** This command is used to query the identity of a network configuration. */
		QueryIdentity?: {
			inputparams: readonly [
				KeyIdentifier: import ("@akala/core").IsomorphicBuffer, 
				PossessionNonce: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Identity: import ("@akala/core").IsomorphicBuffer, 
				PossessionSignature: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
	}
}

export const networkCommissioning: ClusterDefinition<NetworkCommissioning> = {
id: 49,
	attributes: [
		"MaxNetworks",
		"Networks",
		"ScanMaxTimeSeconds",
		"ConnectMaxTimeSeconds",
		"InterfaceEnabled",
		"LastNetworkingStatus",
		"LastNetworkID",
		"LastConnectErrorValue",
		"SupportedWiFiBands",
		"SupportedThreadFeatures",
		"ThreadVersion",
		"SupportsWiFiNetworkInterface",
		"SupportsThreadNetworkInterface",
		"SupportsEthernetNetworkInterface",
		"SupportsPerDeviceCredentials",
	] as const,
	commands: [
		"ScanNetworks",
		"AddOrUpdateWiFiNetwork",
		"AddOrUpdateThreadNetwork",
		"RemoveNetwork",
		"ConnectNetwork",
		"ReorderNetwork",
		"QueryIdentity",
	] as const,
	events: [
	] as const
}

export default networkCommissioning;
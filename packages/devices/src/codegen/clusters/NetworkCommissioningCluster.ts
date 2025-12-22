// This file is generated from NetworkCommissioningCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:38.432Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum NetworkCommissioningStatusEnum {
	Success = 0,
	OutOfRange = 1,
	BoundsExceeded = 2,
	NetworkIDNotFound = 3,
	DuplicateNetworkID = 4,
	NetworkNotFound = 5,
	RegulatoryError = 6,
	AuthFailure = 7,
	UnsupportedSecurity = 8,
	OtherConnectionFailure = 9,
	IPV6Failed = 10,
	IPBindFailed = 11,
	UnknownError = 12,
}

export enum WiFiBandEnum {
	__2G4 = 0,
	__3G65 = 1,
	__5G = 2,
	__6G = 3,
	__60G = 4,
	__1G = 5,
}

export enum ThreadCapabilitiesBitmap {
	__NotSet = 0,
		/** Thread Border Router functionality is present */
	IsBorderRouterCapable= 1<<0,
		/** Router mode is supported (interface could be in router or REED mode) */
	IsRouterCapable= 1<<1,
		/** Sleepy end-device mode is supported */
	IsSleepyEndDeviceCapable= 1<<2,
		/** Device is a full Thread device (opposite of Minimal Thread Device) */
	IsFullThreadDevice= 1<<3,
		/** Synchronized sleepy end-device mode is supported */
	IsSynchronizedSleepyEndDeviceCapable= 1<<4,
}

export enum WiFiSecurityBitmap {
	__NotSet = 0,
		/** Supports unencrypted Wi-Fi */
	Unencrypted= 1<<0,
		/** Supports Wi-Fi using WEP security */
	WEP= 1<<1,
		/** Supports Wi-Fi using WPA-Personal security */
	WPA_PERSONAL= 1<<2,
		/** Supports Wi-Fi using WPA2-Personal security */
	WPA2_PERSONAL= 1<<3,
		/** Supports Wi-Fi using WPA3-Personal security */
	WPA3_PERSONAL= 1<<4,
}

export interface NetworkInfoStruct {
	NetworkID:import ("@akala/core").IsomorphicBuffer,
	Connected:boolean,
}

export interface ThreadInterfaceScanResultStruct {
	PanId?:number,
	ExtendedPanId?:bigint,
	NetworkName?:string,
	Channel?:number,
	Version?:number,
	ExtendedAddress?:bigint,
	RSSI?:number,
	LQI?:number,
}

export interface WiFiInterfaceScanResultStruct {
	Security?:WiFiSecurityBitmap,
	SSID?:import ("@akala/core").IsomorphicBuffer,
	BSSID?:import ("@akala/core").IsomorphicBuffer,
	Channel?:number,
	WiFiBand?:WiFiBandEnum,
	RSSI?:number,
}

export type NetworkCommissioning = NetworkCommissioningCluster & { id: 0x0031};

export interface NetworkCommissioningCluster {
id: 0x0031;
	attributes: {
		readonly MaxNetworks:number
		readonly Networks:readonly NetworkInfoStruct[]
		readonly ScanMaxTimeSeconds?:number
		readonly ConnectMaxTimeSeconds?:number
		readonly InterfaceEnabled:boolean
		readonly LastNetworkingStatus:NetworkCommissioningStatusEnum
		readonly LastNetworkID:import ("@akala/core").IsomorphicBuffer
		readonly LastConnectErrorValue:number
		readonly SupportedWiFiBands?:readonly WiFiBandEnum[]
		readonly SupportedThreadFeatures?:ThreadCapabilitiesBitmap
		readonly ThreadVersion?:number
		/** Wi-Fi related features */
		readonly SupportsWiFiNetworkInterface: boolean
		/** Thread related features */
		readonly SupportsThreadNetworkInterface: boolean
		/** Ethernet related features */
		readonly SupportsEthernetNetworkInterface: boolean
}
	commands: {
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
		AddOrUpdateWiFiNetwork?: {
			inputparams: readonly [
				SSID: import ("@akala/core").IsomorphicBuffer, 
				Credentials: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, ]
            }
		AddOrUpdateThreadNetwork?: {
			inputparams: readonly [
				OperationalDataset: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, ]
            }
		RemoveNetwork?: {
			inputparams: readonly [
				NetworkID: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, ]
            }
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
		ReorderNetwork?: {
			inputparams: readonly [
				NetworkID: import ("@akala/core").IsomorphicBuffer, 
				NetworkIndex: number, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				NetworkIndex: number, ]
            }
}
	events: {
	}
}

export const networkCommissioning: ClusterDefinition<NetworkCommissioning> = {
id: 0x0031,
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
	] as const,
	commands: [
		"ScanNetworks",
		"AddOrUpdateWiFiNetwork",
		"AddOrUpdateThreadNetwork",
		"RemoveNetwork",
		"ConnectNetwork",
		"ReorderNetwork",
	] as const,
	events: [
	] as const
}

export default networkCommissioning;
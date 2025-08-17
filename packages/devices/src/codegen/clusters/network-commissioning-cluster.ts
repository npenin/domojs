// This file is generated from network-commissioning-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.022Z

import { Cluster } from '../../server/clients/shared.js';


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
		/** Detemine the set of networks the device sees as available. */
		ScanNetworks?: {
			inputparams: readonly [
				SSID: import ("@akala/core").IsomorphicBuffer, 
				Breadcrumb: bigint, 
			],
			 outputparams: readonly [
				NetworkingStatus: NetworkCommissioningStatusEnum, 
				DebugText: string, 
				WiFiScanResults: readonly WiFiInterfaceScanResultStruct[][], 
				ThreadScanResults: readonly ThreadInterfaceScanResultStruct[][], ]
            }
		/** Add or update the credentials for a given Wi-Fi network. */
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
		/** Add or update the credentials for a given Thread network. */
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
		/** Remove the definition of a given network (including its credentials). */
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
		/** Connect to the specified network, using previously-defined credentials. */
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
		/** Modify the order in which networks will be presented in the Networks attribute. */
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
		/** Retrieve details about and optionally proof of possession of a network client identity. */
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

export const networkCommissioning: Cluster<NetworkCommissioning['attributes'], NetworkCommissioning['commands'], NetworkCommissioning['events']> = {
id: 49,
	attributes: {
		MaxNetworks:0,
		Networks:[],
		ScanMaxTimeSeconds:0,
		ConnectMaxTimeSeconds:0,
		InterfaceEnabled:null,
		LastNetworkingStatus:null,
		LastNetworkID:null,
		LastConnectErrorValue:0,
		SupportedWiFiBands:[],
		SupportedThreadFeatures:null,
		ThreadVersion:0,
		/** Wi-Fi related features */
	SupportsWiFiNetworkInterface: false,
		/** Thread related features */
	SupportsThreadNetworkInterface: false,
		/** Ethernet related features */
	SupportsEthernetNetworkInterface: false,
		/** Wi-Fi Per-Device Credentials */
	SupportsPerDeviceCredentials: false,
},
	commands: {
		/** Detemine the set of networks the device sees as available. */
		ScanNetworks: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, 
				[], 
				[], ]
            },
		/** Add or update the credentials for a given Wi-Fi network. */
		AddOrUpdateWiFiNetwork: {
			inputparams: [
				null, 
				null, 
				null, 
				null, 
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, 
				0, 
				null, 
				null, ]
            },
		/** Add or update the credentials for a given Thread network. */
		AddOrUpdateThreadNetwork: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, 
				0, 
				null, 
				null, ]
            },
		/** Remove the definition of a given network (including its credentials). */
		RemoveNetwork: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, 
				0, 
				null, 
				null, ]
            },
		/** Connect to the specified network, using previously-defined credentials. */
		ConnectNetwork: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, 
				0, ]
            },
		/** Modify the order in which networks will be presented in the Networks attribute. */
		ReorderNetwork: {
			inputparams: [
				null, 
				0, 
				null, 
			],
			 outputparams: [
				null, 
				null, 
				0, 
				null, 
				null, ]
            },
		/** Retrieve details about and optionally proof of possession of a network client identity. */
		QueryIdentity: {
			inputparams: [
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, ]
            },
},
	events: {
	}
}

export default networkCommissioning;
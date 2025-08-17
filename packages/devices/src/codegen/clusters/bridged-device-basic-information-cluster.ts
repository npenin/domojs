// This file is generated from bridged-device-basic-information-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.068Z

import { Cluster } from '../../server/clients/shared.js';


export enum ProductFinishEnum {
	Other= 0,
	Matte= 1,
	Satin= 2,
	Polished= 3,
	Rugged= 4,
	Fabric= 5,
}

export enum ColorEnum {
	Black= 0,
	Navy= 1,
	Green= 2,
	Teal= 3,
	Maroon= 4,
	Purple= 5,
	Olive= 6,
	Gray= 7,
	Blue= 8,
	Lime= 9,
	Aqua= 10,
	Red= 11,
	Fuchsia= 12,
	Yellow= 13,
	White= 14,
	Nickel= 15,
	Chrome= 16,
	Brass= 17,
	Copper= 18,
	Silver= 19,
	Gold= 20,
}

export interface ProductAppearanceStruct {
	Finish:ProductFinishEnum,
	PrimaryColor:ColorEnum,
}

/**
 * This Cluster serves two purposes towards a Node communicating with a Bridge: indicate that the functionality on
          the Endpoint where it is placed (and its Parts) is bridged from a non-CHIP technology; and provide a centralized
          collection of attributes that the Node MAY collect to aid in conveying information regarding the Bridged Device to a user,
          such as the vendor name, the model name, or user-assigned name.
 */

export interface BridgedDeviceBasicInformation {
id: 57;
	attributes: {
		readonly VendorName?:string
		readonly VendorID?:number
		readonly ProductName?:string
		readonly ProductID?:number
		NodeLabel?:string
		readonly HardwareVersion?:number
		readonly HardwareVersionString?:string
		readonly SoftwareVersion?:number
		readonly SoftwareVersionString?:string
		readonly ManufacturingDate?:string
		readonly PartNumber?:string
		readonly ProductURL?:string
		readonly ProductLabel?:string
		readonly SerialNumber?:string
		readonly Reachable:boolean
		readonly UniqueID:string
		readonly ProductAppearance?:ProductAppearanceStruct
		readonly ConfigurationVersion?:number
		/** Support bridged ICDs. */
		readonly SupportsBridgedICDSupport: boolean
}
	commands: {
		/** Upon receipt, the server SHALL attempt to keep the bridged device active for the duration specified by the command, when the device is next active. */
		KeepActive?: {
			inputparams: readonly [
				StayActiveDuration: number, 
				TimeoutMs: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
		StartUp?: [
			
			SoftwareVersion: number, ];
		ShutDown?: [
			];
		Leave?: [
			];
		ReachableChanged: [
			
			ReachableNewValue: boolean, ];
		ActiveChanged?: [
			
			PromisedActiveDuration: number, ];
	}
}

export const bridgedDeviceBasicInformation: Cluster<BridgedDeviceBasicInformation['attributes'], BridgedDeviceBasicInformation['commands'], BridgedDeviceBasicInformation['events']> = {
id: 57,
	attributes: {
		VendorName:null,
		VendorID:0,
		ProductName:null,
		ProductID:0,
		NodeLabel:null,
		HardwareVersion:0,
		HardwareVersionString:null,
		SoftwareVersion:0,
		SoftwareVersionString:null,
		ManufacturingDate:null,
		PartNumber:null,
		ProductURL:null,
		ProductLabel:null,
		SerialNumber:null,
		Reachable:null,
		UniqueID:null,
		ProductAppearance:null,
		ConfigurationVersion:0,
		/** Support bridged ICDs. */
	SupportsBridgedICDSupport: false,
},
	commands: {
		/** Upon receipt, the server SHALL attempt to keep the bridged device active for the duration specified by the command, when the device is next active. */
		KeepActive: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: []
            },
},
	events: {
		StartUp: [
			
			0, ],
		ShutDown: [
			],
		Leave: [
			],
		ReachableChanged: [
			
			null, ],
		ActiveChanged: [
			
			0, ],
	}
}

export default bridgedDeviceBasicInformation;
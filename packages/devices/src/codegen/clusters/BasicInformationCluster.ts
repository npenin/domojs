// This file is generated from BasicInformationCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:25.047Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ColorEnum {
	Black = 0,
	Navy = 1,
	Green = 2,
	Teal = 3,
	Maroon = 4,
	Purple = 5,
	Olive = 6,
	Gray = 7,
	Blue = 8,
	Lime = 9,
	Aqua = 10,
	Red = 11,
	Fuchsia = 12,
	Yellow = 13,
	White = 14,
	Nickel = 15,
	Chrome = 16,
	Brass = 17,
	Copper = 18,
	Silver = 19,
	Gold = 20,
}

export enum ProductFinishEnum {
	Other = 0,
	Matte = 1,
	Satin = 2,
	Polished = 3,
	Rugged = 4,
	Fabric = 5,
}

export interface CapabilityMinimaStruct {
	CaseSessionsPerFabric:number,
	SubscriptionsPerFabric:number,
}

export interface ProductAppearanceStruct {
	Finish:ProductFinishEnum,
	PrimaryColor:ColorEnum,
}

export type BasicInformation = BasicInformationCluster & { id: 0x0028};

export interface BasicInformationCluster {
id: 0x0028;
	attributes: {
		readonly DataModelRevision:number
		readonly VendorName:string
		readonly VendorID:number
		readonly ProductName:string
		readonly ProductID:number
		readonly NodeLabel:string
		readonly Location:string
		readonly HardwareVersion:number
		readonly HardwareVersionString:string
		readonly SoftwareVersion:number
		readonly SoftwareVersionString:string
		readonly ManufacturingDate?:string
		readonly PartNumber?:string
		readonly ProductURL?:string
		readonly ProductLabel?:string
		readonly SerialNumber?:string
		readonly LocalConfigDisabled?:boolean
		readonly Reachable?:boolean
		readonly UniqueID:string
		readonly CapabilityMinima:CapabilityMinimaStruct
		readonly ProductAppearance?:ProductAppearanceStruct
		readonly SpecificationVersion:number
		readonly MaxPathsPerInvoke:number
		readonly ConfigurationVersion?:number
}
	commands: {
}
	events: {
		StartUp: [
			
			SoftwareVersion: number, ];
		ShutDown: [
			];
		Leave: [
			
			FabricIndex: number, ];
		ReachableChanged: [
			
			ReachableNewValue: boolean, ];
	}
}

export const basicInformation: ClusterDefinition<BasicInformation> = {
id: 0x0028,
	attributes: [
		"DataModelRevision",
		"VendorName",
		"VendorID",
		"ProductName",
		"ProductID",
		"NodeLabel",
		"Location",
		"HardwareVersion",
		"HardwareVersionString",
		"SoftwareVersion",
		"SoftwareVersionString",
		"ManufacturingDate",
		"PartNumber",
		"ProductURL",
		"ProductLabel",
		"SerialNumber",
		"LocalConfigDisabled",
		"Reachable",
		"UniqueID",
		"CapabilityMinima",
		"ProductAppearance",
		"SpecificationVersion",
		"MaxPathsPerInvoke",
		"ConfigurationVersion",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default basicInformation;
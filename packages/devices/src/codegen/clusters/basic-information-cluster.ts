

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

export interface CapabilityMinimaStruct {
	CaseSessionsPerFabric: number,
	SubscriptionsPerFabric: number,
}

export interface ProductAppearanceStruct {
	Finish:ProductFinishEnum,
	PrimaryColor:ColorEnum,
}

/**
 * This cluster provides attributes and events for determining basic information about Nodes, which supports both
      Commissioning and operational determination of Node characteristics, such as Vendor ID, Product ID and serial number,
      which apply to the whole Node. Also allows setting user device information such as location.
 */

export interface BasicInformation {
id: 40;
	attributes: {
		readonly DataModelRevision: number
		readonly VendorName: string
		readonly VendorID: number
		readonly ProductName: string
		readonly ProductID: number
		NodeLabel: string
		Location: string
		readonly HardwareVersion: number
		readonly HardwareVersionString: string
		readonly SoftwareVersion: number
		readonly SoftwareVersionString: string
		readonly ManufacturingDate?: string
		readonly PartNumber?: string
		readonly ProductURL?: string
		readonly ProductLabel?: string
		readonly SerialNumber?: string
		LocalConfigDisabled?:boolean
		readonly Reachable?:boolean
		readonly UniqueID: string
		readonly CapabilityMinima:CapabilityMinimaStruct
		readonly ProductAppearance?:ProductAppearanceStruct
		readonly SpecificationVersion: number
		readonly MaxPathsPerInvoke: number
		readonly ConfigurationVersion: number
}
	commands: {
}
	events: {
		StartUp: [
			
			SoftwareVersion:  number, ];
		ShutDown?: [
			];
		Leave?: [
			
			FabricIndex:  number, ];
		ReachableChanged?: [
			
			ReachableNewValue: boolean, ];
	}
}
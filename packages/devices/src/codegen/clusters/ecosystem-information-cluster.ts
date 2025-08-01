

export interface DeviceTypeStruct {
	DeviceType: number,
	Revision: number,
}

export interface EcosystemDeviceStruct {
	DeviceName?: string,
	DeviceNameLastEdit?: number,
	BridgedEndpoint: number,
	OriginalEndpoint: number,
	DeviceTypes:DeviceTypeStruct,
	UniqueLocationIDs: string,
	UniqueLocationIDsLastEdit: number,
}

export interface EcosystemLocationStruct {
	UniqueLocationID: string,
	LocationDescriptor:import("./global-structs.js").LocationDescriptorStruct,
	LocationDescriptorLastEdit: number,
}

/**
 * Provides extended device information for all the logical devices represented by a Bridged Node.
 */

export interface EcosystemInformation {
id: 1872;
	attributes: {
		readonly DeviceDirectory:readonly EcosystemDeviceStruct[]
		readonly LocationDirectory:readonly EcosystemLocationStruct[]
}
	commands: {
}
	events: {
	}
}
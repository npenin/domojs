// This file is generated from ecosystem-information-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.296Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface DeviceTypeStruct {
	DeviceType:number,
	Revision:number,
}

export interface EcosystemDeviceStruct {
	DeviceName?:string,
	DeviceNameLastEdit?:number,
	BridgedEndpoint:number,
	OriginalEndpoint:number,
	DeviceTypes:readonly DeviceTypeStruct[],
	UniqueLocationIDs:readonly string[],
	UniqueLocationIDsLastEdit:number,
}

export interface EcosystemLocationStruct {
	UniqueLocationID:string,
	LocationDescriptor:import("./global-structs.js").LocationDescriptorStruct,
	LocationDescriptorLastEdit:number,
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

export const ecosystemInformation: ClusterDefinition<EcosystemInformation> = {
id: 1872,
	attributes: [
		"DeviceDirectory",
		"LocationDirectory",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default ecosystemInformation;
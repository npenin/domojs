// This file is generated from EcosystemInformationCluster.xml - do not edit it directly
// Generated on 2025-12-22T10:19:30.548Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface DeviceTypeStruct {
	DeviceType:number,
	Revision:number,
}

export interface EcosystemDeviceStruct {
	DeviceName?:string,
	DeviceNameLastEdit?:number,
	BridgedEndpoint?:number,
	OriginalEndpoint?:number,
	DeviceTypes:readonly DeviceTypeStruct[],
	UniqueLocationIDs:readonly string[],
	UniqueLocationIDsLastEdit:number,
}

export interface EcosystemLocationStruct {
	UniqueLocationID:string,
	LocationDescriptor:import("./global-Structs.js").LocationDescriptorStruct,
	LocationDescriptorLastEdit:number,
}

export type EcosystemInformation = EcosystemInformationCluster & { id: 0x0750};

export interface EcosystemInformationCluster {
id: 0x0750;
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
id: 0x0750,
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
// This file is generated from ApplicationBasic.xml - do not edit it directly
// Generated on 2025-12-18T03:04:55.754Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ApplicationStatusEnum {
	Stopped = 0,
	ActiveVisibleFocus = 1,
	ActiveHidden = 2,
	ActiveVisibleNotFocus = 3,
}

export interface ApplicationStruct {
	CatalogVendorID:number,
	ApplicationID:string,
}

export type ApplicationBasic = ApplicationBasicCluster & { id: 0x050D};

export interface ApplicationBasicCluster {
id: 0x050D;
	attributes: {
		readonly VendorName?:string
		readonly VendorID?:number
		readonly ApplicationName:string
		readonly ProductID?:number
		readonly Application:ApplicationStruct
		readonly Status:ApplicationStatusEnum
		readonly ApplicationVersion:string
		readonly AllowedVendorList:readonly number[]
}
	commands: {
}
	events: {
	}
}

export const applicationBasic: ClusterDefinition<ApplicationBasic> = {
id: 0x050D,
	attributes: [
		"VendorName",
		"VendorID",
		"ApplicationName",
		"ProductID",
		"Application",
		"Status",
		"ApplicationVersion",
		"AllowedVendorList",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default applicationBasic;
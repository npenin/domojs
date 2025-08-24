// This file is generated from application-basic-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:22.767Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ApplicationStatusEnum {
	Stopped= 0,
	ActiveVisibleFocus= 1,
	ActiveHidden= 2,
	ActiveVisibleNotFocus= 3,
}

/**
 * This cluster provides information about an application running on a TV or media player device which is represented as an endpoint.
 */

export interface ApplicationBasic {
id: 1293;
	attributes: {
		readonly VendorName?:string
		readonly VendorID?:number
		readonly ApplicationName:string
		readonly ProductID?:number
		readonly Application:import("./application-launcher-cluster.js").ApplicationStruct
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
id: 1293,
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
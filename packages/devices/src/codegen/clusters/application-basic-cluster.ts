// This file is generated from application-basic-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:45.784Z

import { Cluster } from '../../server/clients/shared.js';


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

export const applicationBasic: Cluster<ApplicationBasic['attributes'], ApplicationBasic['commands'], ApplicationBasic['events']> = {
id: 1293,
	attributes: {
		VendorName:null,
		VendorID:0,
		ApplicationName:null,
		ProductID:0,
		Application:null,
		Status:null,
		ApplicationVersion:null,
		AllowedVendorList:[],
},
	commands: {
},
	events: {
	}
}

export default applicationBasic;
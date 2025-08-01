

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
		readonly VendorName?: string
		readonly VendorID?: number
		readonly ApplicationName: string
		readonly ProductID?: number
		readonly Application:import("./application-launcher-cluster.js").ApplicationStruct
		readonly Status:ApplicationStatusEnum
		readonly ApplicationVersion: string
		readonly AllowedVendorList:readonly  number[]
}
	commands: {
}
	events: {
	}
}
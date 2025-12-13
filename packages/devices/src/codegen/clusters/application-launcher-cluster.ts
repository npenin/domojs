// This file is generated from application-launcher-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.038Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	Success= 0,
	AppNotAvailable= 1,
	SystemBusy= 2,
	PendingUserApproval= 3,
	Downloading= 4,
	Installing= 5,
}

export interface ApplicationEPStruct {
	Application:import("./application-launcher-cluster.js").ApplicationStruct,
	Endpoint?:number,
}

export interface ApplicationStruct {
	CatalogVendorID:number,
	ApplicationID:string,
}

/**
 * This cluster provides an interface for launching content on a media player device such as a TV or Speaker.
 */

export interface ApplicationLauncher {
id: 1292;
	attributes: {
		readonly CatalogList?:readonly number[]
		readonly CurrentApp?:ApplicationEPStruct
		/** Support for attributes and commands required for endpoint to support launching any application within the supported application catalogs */
		readonly SupportsApplicationPlatform: boolean
}
	commands: {
		/** Upon receipt of this command, the server SHALL launch the application with optional data. */
		LaunchApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Upon receipt of this command, the server SHALL stop the application if it is running. */
		StopApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Upon receipt of this command, the server SHALL hide the application. */
		HideApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
	}
}

export const applicationLauncher: ClusterDefinition<ApplicationLauncher> = {
id: 1292,
	attributes: [
		"CatalogList",
		"CurrentApp",
		"SupportsApplicationPlatform",
	] as const,
	commands: [
		"LaunchApp",
		"StopApp",
		"HideApp",
	] as const,
	events: [
	] as const
}

export default applicationLauncher;
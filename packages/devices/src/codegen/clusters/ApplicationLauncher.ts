// This file is generated from ApplicationLauncher.xml - do not edit it directly
// Generated on 2025-12-22T10:19:24.682Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	Success = 0,
	AppNotAvailable = 1,
	SystemBusy = 2,
	PendingUserApproval = 3,
	Downloading = 4,
	Installing = 5,
}

export interface ApplicationEPStruct {
	Application:import("./ApplicationBasic.js").ApplicationStruct,
	Endpoint?:number,
}

export interface ApplicationStruct {
	CatalogVendorID:number,
	ApplicationID:string,
}

export type ApplicationLauncher = ApplicationLauncherCluster & { id: 0x050C};

export interface ApplicationLauncherCluster {
id: 0x050C;
	attributes: {
		readonly CatalogList?:readonly number[]
		readonly CurrentApp?:ApplicationEPStruct
		/** Support for attributes and commands required for endpoint to support launching any application within the supported application catalogs */
		readonly SupportsApplicationPlatform: boolean
}
	commands: {
		LaunchApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
		StopApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
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
id: 0x050C,
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
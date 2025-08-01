

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
	Endpoint?: number,
}

export interface ApplicationStruct {
	CatalogVendorID: number,
	ApplicationID: string,
}

/**
 * This cluster provides an interface for launching content on a media player device such as a TV or Speaker.
 */

export interface ApplicationLauncher {
id: 1292;
	attributes: {
		readonly CatalogList?:readonly  number[]
		readonly CurrentApp?:ApplicationEPStruct
		/** Support for attributes and commands required for endpoint to support launching any application within the supported application catalogs */
		readonly SupportsApplicationPlatform: boolean
}
	commands: {
		/** Upon receipt, this SHALL launch the specified app with optional data. The TV Device SHALL launch and bring to foreground the identified application in the command if the application is not already launched and in foreground. The TV Device SHALL update state attribute on the Application Basic cluster of the Endpoint corresponding to the launched application. This command returns a Launch Response. */
		LaunchApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Upon receipt on a Video Player endpoint this SHALL stop the specified application if it is running. */
		StopApp: {
			inputparams: readonly [
				Application: ApplicationStruct, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Upon receipt on a Video Player endpoint this SHALL hide the specified application if it is running and visible. */
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
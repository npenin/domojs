

export enum OperationalStatusEnum {
	Pending= 0,
	Operating= 1,
	Skipped= 2,
	Completed= 3,
}

export enum SelectAreasStatus {
	Success= 0,
	UnsupportedArea= 1,
	InvalidInMode= 2,
	InvalidSet= 3,
}

export enum SkipAreaStatus {
	Success= 0,
	InvalidAreaList= 1,
	InvalidInMode= 2,
	InvalidSkippedArea= 3,
}

export interface LandmarkInfoStruct {
	LandmarkTag:import("./semantic-tag-namespace-enums.js").LandmarkTag,
	RelativePositionTag:import("./semantic-tag-namespace-enums.js").RelativePositionTag,
}

export interface AreaInfoStruct {
	LocationInfo:import("./global-structs.js").LocationDescriptorStruct,
	LandmarkInfo:LandmarkInfoStruct,
}

export interface MapStruct {
	MapID: number,
	Name: string,
}

export interface AreaStruct {
	AreaID: number,
	MapID: number,
	AreaInfo:AreaInfoStruct,
}

export interface ProgressStruct {
	AreaID: number,
	Status:OperationalStatusEnum,
	TotalOperationalTime?: number,
	EstimatedTime?: number,
}

/**
 * The Service Area cluster provides an interface for controlling the areas where a device should operate, and for querying the current area being serviced.
 */

export interface ServiceArea {
id: 336;
	attributes: {
		readonly SupportedAreas:readonly AreaStruct[]
		readonly SupportedMaps:readonly MapStruct[]
		readonly SelectedAreas:readonly  number[]
		readonly CurrentArea?: number
		readonly EstimatedEndTime?: number
		readonly Progress:readonly ProgressStruct[]
		/** The device allows changing the selected areas while running */
		readonly SupportsSelectWhileRunning: boolean
		/** The device implements the progress reporting feature */
		readonly SupportsProgressReporting: boolean
		/** The device has map support */
		readonly SupportsMaps: boolean
}
	commands: {
		/** This command is used to select a set of device areas, where the device is to operate. */
		SelectAreas: {
			inputparams: readonly [
				NewAreas:  number[], 
			],
			 outputparams: readonly [
				Status: SelectAreasStatus, 
				StatusText:  string, ]
            }
		/** This command is used to skip the given area, and to attempt operating at other areas on the SupportedAreas attribute list. */
		SkipArea: {
			inputparams: readonly [
				SkippedArea:  number, 
			],
			 outputparams: readonly [
				Status: SkipAreaStatus, 
				StatusText:  string, ]
            }
}
	events: {
	}
}
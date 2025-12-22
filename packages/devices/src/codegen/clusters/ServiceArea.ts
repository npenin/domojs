// This file is generated from ServiceArea.xml - do not edit it directly
// Generated on 2025-12-22T10:26:10.985Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum OperationalStatusEnum {
	Pending = 0,
	Operating = 1,
	Skipped = 2,
	Completed = 3,
}

export enum SelectAreasStatus {
	Success = 0,
	UnsupportedArea = 1,
	InvalidInMode = 2,
	InvalidSet = 3,
}

export enum SkipAreaStatus {
	Success = 0,
	InvalidAreaList = 1,
	InvalidInMode = 2,
	InvalidSkippedArea = 3,
}

export interface AreaInfoStruct {
	LocationInfo:import("./global-Structs.js").LocationDescriptorStruct,
	LandmarkInfo:LandmarkInfoStruct,
}

export interface AreaStruct {
	AreaID:number,
	MapID:number,
	AreaInfo:AreaInfoStruct,
}

export interface LandmarkInfoStruct {
	LandmarkTag:number,
	RelativePositionTag:number,
}

export interface MapStruct {
	MapID:number,
	Name:string,
}

export interface ProgressStruct {
	AreaID:number,
	Status:OperationalStatusEnum,
	TotalOperationalTime?:number,
	EstimatedTime?:number,
}

export type ServiceArea = ServiceAreaCluster & { id: 0x0150};

export interface ServiceAreaCluster {
id: 0x0150;
	attributes: {
		readonly SupportedAreas:readonly AreaStruct[]
		readonly SupportedMaps?:readonly MapStruct[]
		readonly SelectedAreas:readonly number[]
		readonly CurrentArea?:number
		readonly EstimatedEndTime?:number
		readonly Progress?:readonly ProgressStruct[]
		/** The device allows changing the selected areas while running */
		readonly SupportsSelectWhileRunning: boolean
		/** The device implements the progress reporting feature */
		readonly SupportsProgressReporting: boolean
		/** The device has map support */
		readonly SupportsMaps: boolean
}
	commands: {
		SelectAreas: {
			inputparams: readonly [
				NewAreas: readonly number[], 
			],
			 outputparams: readonly [
				Status: SelectAreasStatus, 
				StatusText: string, ]
            }
		SkipArea?: {
			inputparams: readonly [
				SkippedArea: number, 
			],
			 outputparams: readonly [
				Status: SkipAreaStatus, 
				StatusText: string, ]
            }
}
	events: {
	}
}

export const serviceArea: ClusterDefinition<ServiceArea> = {
id: 0x0150,
	attributes: [
		"SupportedAreas",
		"SupportedMaps",
		"SelectedAreas",
		"CurrentArea",
		"EstimatedEndTime",
		"Progress",
		"SupportsSelectWhileRunning",
		"SupportsProgressReporting",
		"SupportsMaps",
	] as const,
	commands: [
		"SelectAreas",
		"SkipArea",
	] as const,
	events: [
	] as const
}

export default serviceArea;
// This file is generated from CameraAVSettingsUserLevelManagement.xml - do not edit it directly
// Generated on 2025-12-18T03:04:57.137Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum PhysicalMovementEnum {
	Idle = 0,
	Moving = 1,
}

export interface DPTZStruct {
	VideoStreamID:import("./CameraAVStreamManagement.js").VideoStreamID,
	Viewport:import("./global-Structs.js").ViewportStruct,
}

export interface MPTZPresetStruct {
	PresetID:number,
	Name:string,
	Settings:MPTZStruct,
}

export interface MPTZStruct {
	Pan?:number,
	Tilt?:number,
	Zoom?:number,
}

export type CameraAVSettingsUserLevelManagement = CameraAVSettingsUserLevelManagementCluster & { id: 0x0552};

export interface CameraAVSettingsUserLevelManagementCluster {
id: 0x0552;
	attributes: {
		readonly MPTZPosition?:MPTZStruct
		readonly MaxPresets?:number
		readonly MPTZPresets?:readonly MPTZPresetStruct[]
		readonly DPTZStreams?:readonly DPTZStruct[]
		readonly ZoomMax?:number
		readonly TiltMin?:number
		readonly TiltMax?:number
		readonly PanMin?:number
		readonly PanMax?:number
		readonly MovementState?:PhysicalMovementEnum
		/** Digital PTZ support */
		readonly SupportsDigitalPTZ: boolean
		/** Mechanical Pan support */
		readonly SupportsMechanicalPan: boolean
		/** Mechanical Tilt support */
		readonly SupportsMechanicalTilt: boolean
		/** Mechanical Zoom support */
		readonly SupportsMechanicalZoom: boolean
		/** Mechanical saved presets support */
		readonly SupportsMechanicalPresets: boolean
}
	commands: {
		MPTZSetPosition?: {
			inputparams: readonly [
				Pan: number, 
				Tilt: number, 
				Zoom: number, 
			],
			 outputparams: readonly []
            }
		MPTZRelativeMove?: {
			inputparams: readonly [
				PanDelta: number, 
				TiltDelta: number, 
				ZoomDelta: number, 
			],
			 outputparams: readonly []
            }
		MPTZMoveToPreset?: {
			inputparams: readonly [
				PresetID: number, 
			],
			 outputparams: readonly []
            }
		MPTZSavePreset?: {
			inputparams: readonly [
				PresetID: number, 
				Name: string, 
			],
			 outputparams: readonly []
            }
		MPTZRemovePreset?: {
			inputparams: readonly [
				PresetID: number, 
			],
			 outputparams: readonly []
            }
		DPTZSetViewport?: {
			inputparams: readonly [
				VideoStreamID: import("./CameraAVStreamManagement.js").VideoStreamID, 
				Viewport: import("./global-Structs.js").ViewportStruct, 
			],
			 outputparams: readonly []
            }
		DPTZRelativeMove?: {
			inputparams: readonly [
				VideoStreamID: import("./CameraAVStreamManagement.js").VideoStreamID, 
				DeltaX: number, 
				DeltaY: number, 
				ZoomDelta: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const cameraAVSettingsUserLevelManagement: ClusterDefinition<CameraAVSettingsUserLevelManagement> = {
id: 0x0552,
	attributes: [
		"MPTZPosition",
		"MaxPresets",
		"MPTZPresets",
		"DPTZStreams",
		"ZoomMax",
		"TiltMin",
		"TiltMax",
		"PanMin",
		"PanMax",
		"MovementState",
		"SupportsDigitalPTZ",
		"SupportsMechanicalPan",
		"SupportsMechanicalTilt",
		"SupportsMechanicalZoom",
		"SupportsMechanicalPresets",
	] as const,
	commands: [
		"MPTZSetPosition",
		"MPTZRelativeMove",
		"MPTZMoveToPreset",
		"MPTZSavePreset",
		"MPTZRemovePreset",
		"DPTZSetViewport",
		"DPTZRelativeMove",
	] as const,
	events: [
	] as const
}

export default cameraAVSettingsUserLevelManagement;
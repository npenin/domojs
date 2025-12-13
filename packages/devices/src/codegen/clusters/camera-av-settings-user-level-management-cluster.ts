// This file is generated from camera-av-settings-user-level-management-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.195Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum PhysicalMovementEnum {
	Idle= 0,
	Moving= 1,
}

export interface DPTZStruct {
	VideoStreamID:number,
	Viewport:import("./global-structs.js").ViewportStruct,
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

/**
 * This cluster provides an interface into controls associated with the operation of a device that provides pan, tilt, and zoom functions, either mechanically, or against a digital image.
 */

export interface CameraAVSettingsUserLevelManagement {
id: 1362;
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
		/** This command SHALL move the camera to the provided values for pan, tilt, and zoom in the mechanical PTZ. */
		MPTZSetPosition?: {
			inputparams: readonly [
				Pan: number, 
				Tilt: number, 
				Zoom: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL move the camera by the delta values relative to the currently defined position. */
		MPTZRelativeMove?: {
			inputparams: readonly [
				PanDelta: number, 
				TiltDelta: number, 
				ZoomDelta: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL move the camera to the positions specified by the Preset passed. */
		MPTZMoveToPreset?: {
			inputparams: readonly [
				PresetID: number, 
			],
			 outputparams: readonly []
            }
		/** This command allows creating a new preset or updating the values of an existing one. */
		MPTZSavePreset?: {
			inputparams: readonly [
				PresetID: number, 
				Name: string, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL remove a preset entry from the PresetMptzTable. */
		MPTZRemovePreset?: {
			inputparams: readonly [
				PresetID: number, 
			],
			 outputparams: readonly []
            }
		/** This command allows for setting the digital viewport for a specific Video Stream. */
		DPTZSetViewport?: {
			inputparams: readonly [
				VideoStreamID: number, 
				Viewport: import("./global-structs.js").ViewportStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL change the per stream viewport by the amount specified in a relative fashion. */
		DPTZRelativeMove?: {
			inputparams: readonly [
				VideoStreamID: number, 
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
id: 1362,
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
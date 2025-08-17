// This file is generated from camera-av-settings-user-level-management-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.086Z

import { Cluster } from '../../server/clients/shared.js';


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
		readonly MPTZPosition:MPTZStruct
		readonly MaxPresets:number
		readonly MPTZPresets:readonly MPTZPresetStruct[]
		readonly DPTZStreams:readonly DPTZStruct[]
		readonly ZoomMax:number
		readonly TiltMin:number
		readonly TiltMax:number
		readonly PanMin:number
		readonly PanMax:number
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
		/** This command SHALL set the values for the pan, tilt, and zoom in the mechanical PTZ. */
		MPTZSetPosition: {
			inputparams: readonly [
				Pan: number, 
				Tilt: number, 
				Zoom: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL move the camera by the delta values relative to the currently defined position. */
		MPTZRelativeMove: {
			inputparams: readonly [
				PanDelta: number, 
				TiltDelta: number, 
				ZoomDelta: number, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL move the camera to the positions specified by the Preset passed. */
		MPTZMoveToPreset: {
			inputparams: readonly [
				PresetID: number, 
			],
			 outputparams: readonly []
            }
		/** This command allows creating a new preset or updating the values of an existing one. */
		MPTZSavePreset: {
			inputparams: readonly [
				PresetID: number, 
				Name: string, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL remove a preset entry from the PresetMptzTable. */
		MPTZRemovePreset: {
			inputparams: readonly [
				PresetID: number, 
			],
			 outputparams: readonly []
            }
		/** This command allows for setting the digital viewport for a specific Video Stream. */
		DPTZSetViewport: {
			inputparams: readonly [
				VideoStreamID: number, 
				Viewport: import("./global-structs.js").ViewportStruct, 
			],
			 outputparams: readonly []
            }
		/** This command SHALL change the per stream viewport by the amount specified in a relative fashion. */
		DPTZRelativeMove: {
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

export const cameraAVSettingsUserLevelManagement: Cluster<CameraAVSettingsUserLevelManagement['attributes'], CameraAVSettingsUserLevelManagement['commands'], CameraAVSettingsUserLevelManagement['events']> = {
id: 1362,
	attributes: {
		MPTZPosition:null,
		MaxPresets:0,
		MPTZPresets:[],
		DPTZStreams:[],
		ZoomMax:0,
		TiltMin:0,
		TiltMax:0,
		PanMin:0,
		PanMax:0,
		/** Digital PTZ support */
	SupportsDigitalPTZ: false,
		/** Mechanical Pan support */
	SupportsMechanicalPan: false,
		/** Mechanical Tilt support */
	SupportsMechanicalTilt: false,
		/** Mechanical Zoom support */
	SupportsMechanicalZoom: false,
		/** Mechanical saved presets support */
	SupportsMechanicalPresets: false,
},
	commands: {
		/** This command SHALL set the values for the pan, tilt, and zoom in the mechanical PTZ. */
		MPTZSetPosition: {
			inputparams: [
				0, 
				0, 
				0, 
			],
			 outputparams: []
            },
		/** This command SHALL move the camera by the delta values relative to the currently defined position. */
		MPTZRelativeMove: {
			inputparams: [
				0, 
				0, 
				0, 
			],
			 outputparams: []
            },
		/** This command SHALL move the camera to the positions specified by the Preset passed. */
		MPTZMoveToPreset: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** This command allows creating a new preset or updating the values of an existing one. */
		MPTZSavePreset: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command SHALL remove a preset entry from the PresetMptzTable. */
		MPTZRemovePreset: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** This command allows for setting the digital viewport for a specific Video Stream. */
		DPTZSetViewport: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** This command SHALL change the per stream viewport by the amount specified in a relative fashion. */
		DPTZRelativeMove: {
			inputparams: [
				0, 
				0, 
				0, 
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default cameraAVSettingsUserLevelManagement;
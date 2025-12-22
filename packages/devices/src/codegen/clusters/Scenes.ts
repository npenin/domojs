// This file is generated from Scenes.xml - do not edit it directly
// Generated on 2025-12-22T10:26:10.837Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CopyModeBitmap {
	__NotSet = 0,
		/** Copy all scenes in the scene table */
	CopyAllScenes= 1<<0,
}

export interface AttributeValuePairStruct {
	AttributeID:number,
	ValueUnsigned8?:number,
	ValueSigned8?:number,
	ValueUnsigned16?:number,
	ValueSigned16?:number,
	ValueUnsigned32?:number,
	ValueSigned32?:number,
	ValueUnsigned64?:bigint,
	ValueSigned64?:bigint,
}

export interface ExtensionFieldSetStruct {
	ClusterID:import ("./clusters-index.js").ClusterIds,
	AttributeValueList:readonly AttributeValuePairStruct[],
}

export interface SceneInfoStruct {
	SceneCount:number,
	CurrentScene:number,
	CurrentGroup:number,
	SceneValid:boolean,
	RemainingCapacity:number,
}

export type ScenesManagement = ScenesManagementCluster & { id: 0x0062};

export interface ScenesManagementCluster {
id: 0x0062;
	attributes: {
		readonly SceneTableSize:number
		readonly FabricSceneInfo:readonly SceneInfoStruct[]
		/** The ability to store a name for a scene. */
		readonly SupportsSceneNames: boolean
}
	commands: {
		AddScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
				TransitionTime: number, 
				SceneName: string, 
				ExtensionFieldSetStructs: readonly ExtensionFieldSetStruct[], 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				SceneID: number, ]
            }
		ViewScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				SceneID: number, 
				TransitionTime: number, 
				SceneName: string, 
				ExtensionFieldSetStructs: readonly ExtensionFieldSetStruct[], ]
            }
		RemoveScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				SceneID: number, ]
            }
		RemoveAllScenes: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, ]
            }
		StoreScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				SceneID: number, ]
            }
		RecallScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
				TransitionTime: number, 
			],
			 outputparams: readonly []
            }
		GetSceneMembership: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				Capacity: number, 
				GroupID: number, 
				SceneList: readonly number[], ]
            }
		CopyScene?: {
			inputparams: readonly [
				Mode: CopyModeBitmap, 
				GroupIdentifierFrom: number, 
				SceneIdentifierFrom: number, 
				GroupIdentifierTo: number, 
				SceneIdentifierTo: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupIdentifierFrom: number, 
				SceneIdentifierFrom: number, ]
            }
}
	events: {
	}
}

export const scenesManagement: ClusterDefinition<ScenesManagement> = {
id: 0x0062,
	attributes: [
		"SceneTableSize",
		"FabricSceneInfo",
		"SupportsSceneNames",
	] as const,
	commands: [
		"AddScene",
		"ViewScene",
		"RemoveScene",
		"RemoveAllScenes",
		"StoreScene",
		"RecallScene",
		"GetSceneMembership",
		"CopyScene",
	] as const,
	events: [
	] as const
}

export default scenesManagement;
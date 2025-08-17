// This file is generated from scene.xml - do not edit it directly
// Generated on 2025-08-17T14:20:46.592Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CopyModeBitmap {
	CopyAllScenes= 0x01,
}

export interface SceneInfoStruct {
	SceneCount:number,
	CurrentScene:number,
	CurrentGroup:number,
	SceneValid:boolean,
	RemainingCapacity:number,
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

/**
 * Attributes and commands for scene configuration and manipulation.
 */

export interface ScenesManagement {
id: 98;
	attributes: {
		readonly SceneTableSize:number
		readonly FabricSceneInfo:readonly SceneInfoStruct[]
		/** The ability to store a name for a scene. */
		readonly SupportsSceneNames: boolean
}
	commands: {
		/** Add a scene to the scene table. Extension field sets are input as '{"ClusterID": VALUE, "AttributeValueList":[{"AttributeID": VALUE, "Value*": VALUE}]}'. */
		AddScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
				TransitionTime: number, 
				SceneName: string, 
				ExtensionFieldSetStructs: readonly ExtensionFieldSetStruct[][], 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, 
				SceneID: number, ]
            }
		/** Retrieves the requested scene entry from its Scene table. */
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
				ExtensionFieldSetStructs: readonly ExtensionFieldSetStruct[][], ]
            }
		/** Removes the requested scene entry, corresponding to the value of the GroupID field, from its Scene Table */
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
		/** Remove all scenes, corresponding to the value of the GroupID field, from its Scene Table */
		RemoveAllScenes: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				GroupID: number, ]
            }
		/** Adds the scene entry into its Scene Table along with all extension field sets corresponding to the current state of other clusters on the same endpoint */
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
		/** Set the attributes and corresponding state for each other cluster implemented on the endpoint accordingly to the resquested scene entry in the Scene Table */
		RecallScene: {
			inputparams: readonly [
				GroupID: number, 
				SceneID: number, 
				TransitionTime: number, 
			],
			 outputparams: readonly []
            }
		/** This command can be used to get the used scene identifiers within a certain group, for the endpoint that implements this cluster. */
		GetSceneMembership: {
			inputparams: readonly [
				GroupID: number, 
			],
			 outputparams: readonly [
				Status: number, 
				Capacity: number, 
				GroupID: number, 
				SceneList: readonly number[][], ]
            }
		/** This command allows a client to efficiently copy scenes from one group/scene identifier pair to another group/scene identifier pair. */
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
id: 98,
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
// This file is generated from ACL-Cluster.xml - do not edit it directly
// Generated on 2025-12-18T03:04:54.716Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AccessControlEntryAuthModeEnum {
	PASE = 1,
	CASE = 2,
	Group = 3,
}

export enum AccessControlEntryPrivilegeEnum {
	View = 1,
	ProxyView = 2,
	Operate = 3,
	Manage = 4,
	Administer = 5,
}

export enum AccessRestrictionTypeEnum {
	AttributeAccessForbidden = 0,
	AttributeWriteForbidden = 1,
	CommandForbidden = 2,
	EventForbidden = 3,
}

export enum ChangeTypeEnum {
	Changed = 0,
	Added = 1,
	Removed = 2,
}

export interface AccessControlEntryStruct {
	Privilege:AccessControlEntryPrivilegeEnum,
	AuthMode:AccessControlEntryAuthModeEnum,
	Subjects:readonly string[],
	Targets:readonly AccessControlTargetStruct[],
}

export interface AccessControlExtensionStruct {
	Data:import ("@akala/core").IsomorphicBuffer,
}

export interface AccessControlTargetStruct {
	Cluster:import ("./clusters-index.js").ClusterIds,
	Endpoint:number,
	DeviceType:number,
}

export interface AccessRestrictionEntryStruct {
	Endpoint:number,
	Cluster:import ("./clusters-index.js").ClusterIds,
	Restrictions:readonly AccessRestrictionStruct[],
}

export interface AccessRestrictionStruct {
	Type:AccessRestrictionTypeEnum,
	ID:number,
}

export interface CommissioningAccessRestrictionEntryStruct {
	Endpoint:number,
	Cluster:import ("./clusters-index.js").ClusterIds,
	Restrictions:readonly AccessRestrictionStruct[],
}

export type AccessControl = AccessControlCluster & { id: 0x001F};

export interface AccessControlCluster {
id: 0x001F;
	attributes: {
		readonly ACL:readonly AccessControlEntryStruct[]
		readonly Extension?:readonly AccessControlExtensionStruct[]
		readonly SubjectsPerAccessControlEntry:number
		readonly TargetsPerAccessControlEntry:number
		readonly AccessControlEntriesPerFabric:number
		readonly CommissioningARL?:readonly CommissioningAccessRestrictionEntryStruct[]
		readonly ARL?:readonly AccessRestrictionEntryStruct[]
		/** Device provides ACL Extension attribute */
		readonly SupportsExtension: boolean
		/** Device is managed */
		readonly SupportsManagedDevice: boolean
}
	commands: {
		ReviewFabricRestrictions?: {
			inputparams: readonly [
				ARL: readonly CommissioningAccessRestrictionEntryStruct[], 
			],
			 outputparams: readonly [
				Token: bigint, ]
            }
}
	events: {
		AccessControlEntryChanged: [
			
			AdminNodeID: string, 
			AdminPasscodeID: number, 
			ChangeType: ChangeTypeEnum, 
			LatestValue: AccessControlEntryStruct, ];
		AccessControlExtensionChanged: [
			
			AdminNodeID: string, 
			AdminPasscodeID: number, 
			ChangeType: ChangeTypeEnum, 
			LatestValue: AccessControlExtensionStruct, ];
		FabricRestrictionReviewUpdate: [
			
			Token: bigint, 
			Instruction: string, 
			ARLRequestFlowUrl: string, ];
	}
}

export const accessControl: ClusterDefinition<AccessControl> = {
id: 0x001F,
	attributes: [
		"ACL",
		"Extension",
		"SubjectsPerAccessControlEntry",
		"TargetsPerAccessControlEntry",
		"AccessControlEntriesPerFabric",
		"CommissioningARL",
		"ARL",
		"SupportsExtension",
		"SupportsManagedDevice",
	] as const,
	commands: [
		"ReviewFabricRestrictions",
	] as const,
	events: [
	] as const
}

export default accessControl;
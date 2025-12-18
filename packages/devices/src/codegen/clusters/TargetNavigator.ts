// This file is generated from TargetNavigator.xml - do not edit it directly
// Generated on 2025-12-18T03:05:13.680Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	Success = 0,
	TargetNotFound = 1,
	NotAllowed = 2,
}

export interface TargetInfoStruct {
	Identifier:number,
	Name:string,
}

export type TargetNavigator = TargetNavigatorCluster & { id: 0x0505};

export interface TargetNavigatorCluster {
id: 0x0505;
	attributes: {
		readonly TargetList:readonly TargetInfoStruct[]
		readonly CurrentTarget?:number
}
	commands: {
		NavigateTarget: {
			inputparams: readonly [
				Target: number, 
				Data: string, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
}
	events: {
		TargetUpdated: [
			
			TargetList: readonly TargetInfoStruct[], 
			CurrentTarget: number, 
			Data: import ("@akala/core").IsomorphicBuffer, ];
	}
}

export const targetNavigator: ClusterDefinition<TargetNavigator> = {
id: 0x0505,
	attributes: [
		"TargetList",
		"CurrentTarget",
	] as const,
	commands: [
		"NavigateTarget",
	] as const,
	events: [
	] as const
}

export default targetNavigator;
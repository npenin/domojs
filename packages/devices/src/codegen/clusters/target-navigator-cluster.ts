// This file is generated from target-navigator-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.383Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusEnum {
	Success= 0,
	TargetNotFound= 1,
	NotAllowed= 2,
}

export interface TargetInfoStruct {
	Identifier:number,
	Name:string,
}

/**
 * This cluster provides an interface for UX navigation within a set of targets on a device or endpoint.
 */

export interface TargetNavigator {
id: 1285;
	attributes: {
		readonly TargetList:readonly TargetInfoStruct[]
		readonly CurrentTarget?:number
}
	commands: {
		/** Upon receipt, this SHALL navigation the UX to the target identified. */
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
id: 1285,
	attributes: [
		"TargetList",
		"CurrentTarget",
	] as const,
	commands: [
		"NavigateTarget",
	] as const,
	events: [
		"TargetUpdated",
	] as const
}

export default targetNavigator;
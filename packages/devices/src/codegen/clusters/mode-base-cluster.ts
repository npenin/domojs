// This file is generated from mode-base-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.691Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ModeTagStruct {
	MfgCode?:number,
	Value:number,
}

export interface ModeOptionStruct {
	Label:string,
	Mode:number,
	ModeTags:readonly ModeTagStruct[],
}
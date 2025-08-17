// This file is generated from mode-base-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.845Z

import { Cluster } from '../../server/clients/shared.js';


export interface ModeTagStruct {
	MfgCode?:number,
	Value:number,
}

export interface ModeOptionStruct {
	Label:string,
	Mode:number,
	ModeTags:readonly ModeTagStruct[],
}
// This file is generated from Chime.xml - do not edit it directly
// Generated on 2025-12-22T10:19:26.585Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ChimeSoundStruct {
	ChimeID:number,
	Name:string,
}

export type Chime = ChimeCluster & { id: 0x0556};

export interface ChimeCluster {
id: 0x0556;
	attributes: {
		readonly InstalledChimeSounds:readonly ChimeSoundStruct[]
		readonly SelectedChime:number
		readonly Enabled:boolean
}
	commands: {
		PlayChimeSound: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const chime: ClusterDefinition<Chime> = {
id: 0x0556,
	attributes: [
		"InstalledChimeSounds",
		"SelectedChime",
		"Enabled",
	] as const,
	commands: [
		"PlayChimeSound",
	] as const,
	events: [
	] as const
}

export default chime;
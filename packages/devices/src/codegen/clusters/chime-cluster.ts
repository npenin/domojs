// This file is generated from chime-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:44.856Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface ChimeSoundStruct {
	ChimeID:number,
	Name:string,
}

/**
 * This cluster provides facilities to configure and play Chime sounds, such as those used in a doorbell.
 */

export interface Chime {
id: 1366;
	attributes: {
		readonly InstalledChimeSounds:readonly ChimeSoundStruct[]
		SelectedChime:number
		Enabled:boolean
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
id: 1366,
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
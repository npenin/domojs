// This file is generated from chime-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.256Z

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
		/** This command will play the currently selected chime. */
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
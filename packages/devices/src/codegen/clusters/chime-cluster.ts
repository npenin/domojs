// This file is generated from chime-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.154Z

import { Cluster } from '../../server/clients/shared.js';


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

export const chime: Cluster<Chime['attributes'], Chime['commands'], Chime['events']> = {
id: 1366,
	attributes: {
		InstalledChimeSounds:[],
		SelectedChime:0,
		Enabled:null,
},
	commands: {
		PlayChimeSound: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default chime;
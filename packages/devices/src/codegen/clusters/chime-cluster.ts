

export interface ChimeSoundStruct {
	ChimeID: number,
	Name: string,
}

/**
 * This cluster provides facilities to configure and play Chime sounds, such as those used in a doorbell.
 */

export interface Chime {
id: 1366;
	attributes: {
		readonly InstalledChimeSounds:readonly ChimeSoundStruct[]
		SelectedChime: number
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
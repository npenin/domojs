

export interface ModeTagStruct {
	MfgCode?: number,
	Value: number,
}

export interface ModeOptionStruct {
	Label: string,
	Mode: number,
	ModeTags:ModeTagStruct,
}
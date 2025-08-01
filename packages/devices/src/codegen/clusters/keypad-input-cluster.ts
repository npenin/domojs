

export enum StatusEnum {
	Success= 0,
	UnsupportedKey= 1,
	InvalidKeyInCurrentState= 2,
}

export enum CECKeyCodeEnum {
	Select= 0,
	Up= 1,
	Down= 2,
	Left= 3,
	Right= 4,
	RightUp= 5,
	RightDown= 6,
	LeftUp= 7,
	LeftDown= 8,
	RootMenu= 9,
	SetupMenu= 10,
	ContentsMenu= 11,
	FavoriteMenu= 12,
	Exit= 13,
	MediaTopMenu= 16,
	MediaContextSensitiveMenu= 17,
	NumberEntryMode= 29,
	Number11= 30,
	Number12= 31,
	Number0OrNumber10= 32,
	Numbers1= 33,
	Numbers2= 34,
	Numbers3= 35,
	Numbers4= 36,
	Numbers5= 37,
	Numbers6= 38,
	Numbers7= 39,
	Numbers8= 40,
	Numbers9= 41,
	Dot= 42,
	Enter= 43,
	Clear= 44,
	NextFavorite= 47,
	ChannelUp= 48,
	ChannelDown= 49,
	PreviousChannel= 50,
	SoundSelect= 51,
	InputSelect= 52,
	DisplayInformation= 53,
	Help= 54,
	PageUp= 55,
	PageDown= 56,
	Power= 64,
	VolumeUp= 65,
	VolumeDown= 66,
	Mute= 67,
	Play= 68,
	Stop= 69,
	Pause= 70,
	Record= 71,
	Rewind= 72,
	FastForward= 73,
	Eject= 74,
	Forward= 75,
	Backward= 76,
	StopRecord= 77,
	PauseRecord= 78,
	Reserved= 79,
	Angle= 80,
	SubPicture= 81,
	VideoOnDemand= 82,
	ElectronicProgramGuide= 83,
	TimerProgramming= 84,
	InitialConfiguration= 85,
	SelectBroadcastType= 86,
	SelectSoundPresentation= 87,
	PlayFunction= 96,
	PausePlayFunction= 97,
	RecordFunction= 98,
	PauseRecordFunction= 99,
	StopFunction= 100,
	MuteFunction= 101,
	RestoreVolumeFunction= 102,
	TuneFunction= 103,
	SelectMediaFunction= 104,
	SelectAvInputFunction= 105,
	SelectAudioInputFunction= 106,
	PowerToggleFunction= 107,
	PowerOffFunction= 108,
	PowerOnFunction= 109,
	F1Blue= 113,
	F2Red= 114,
	F3Green= 115,
	F4Yellow= 116,
	F5= 117,
	Data= 118,
}

/**
 * This cluster provides an interface for controlling a device like a TV using action commands such as UP, DOWN, and SELECT.
 */

export interface KeypadInput {
id: 1289;
	attributes: {
		/** Supports UP, DOWN, LEFT, RIGHT, SELECT, BACK, EXIT, MENU */
		readonly SupportsNavigationKeyCodes: boolean
		/** Supports CEC keys 0x0A (Settings) and 0x09 (Home) */
		readonly SupportsLocationKeys: boolean
		/** Supports numeric input 0..9 */
		readonly SupportsNumberKeys: boolean
}
	commands: {
		/** Upon receipt, this SHALL process a keycode as input to the media device. */
		SendKey: {
			inputparams: readonly [
				KeyCode: CECKeyCodeEnum, 
			],
			 outputparams: readonly [
				Status: StatusEnum, ]
            }
}
	events: {
	}
}
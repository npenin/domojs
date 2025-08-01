

export enum PlaybackStateEnum {
	Playing= 0,
	Paused= 1,
	NotPlaying= 2,
	Buffering= 3,
}

export enum StatusEnum {
	Success= 0,
	InvalidStateForCommand= 1,
	NotAllowed= 2,
	NotActive= 3,
	SpeedOutOfRange= 4,
	SeekOutOfRange= 5,
}

export enum CharacteristicEnum {
	ForcedSubtitles= 0,
	DescribesVideo= 1,
	EasyToRead= 2,
	FrameBased= 3,
	MainProgram= 4,
	OriginalContent= 5,
	VoiceOverTranslation= 6,
	Caption= 7,
	Subtitle= 8,
	Alternate= 9,
	Supplementary= 10,
	Commentary= 11,
	DubbedTranslation= 12,
	Description= 13,
	Metadata= 14,
	EnhancedAudioIntelligibility= 15,
	Emergency= 16,
	Karaoke= 17,
}

export interface TrackStruct {
	ID: string,
	TrackAttributes:TrackAttributesStruct,
}

export interface TrackAttributesStruct {
	LanguageCode: string,
	DisplayName?: string,
}

export interface PlaybackPositionStruct {
	UpdatedAt: number,
	Position: bigint,
}

/**
 * This cluster provides an interface for controlling Media Playback (PLAY, PAUSE, etc) on a media device such as a TV or Speaker.
 */

export interface MediaPlayback {
id: 1286;
	attributes: {
		readonly CurrentState:PlaybackStateEnum
		readonly StartTime?: number
		readonly Duration?: bigint
		readonly SampledPosition?:PlaybackPositionStruct
		readonly PlaybackSpeed?: number
		readonly SeekRangeEnd?: bigint
		readonly SeekRangeStart?: bigint
		readonly ActiveAudioTrack?:TrackStruct
		readonly AvailableAudioTracks?:readonly TrackStruct[]
		readonly ActiveTextTrack?:TrackStruct
		readonly AvailableTextTracks?:readonly TrackStruct[]
		/** Advanced media seeking */
		readonly SupportsAdvancedSeek: boolean
		/** Variable speed playback */
		readonly SupportsVariableSpeed: boolean
		/** Text Tracks */
		readonly SupportsTextTracks: boolean
		/** Audio Tracks */
		readonly SupportsAudioTracks: boolean
		/** Can play audio during fast and slow playback speeds */
		readonly SupportsAudioAdvance: boolean
}
	commands: {
		/** Upon receipt, this SHALL play media. */
		Play: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL pause media. */
		Pause: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL stop media. User experience is context-specific. This will often navigate the user back to the location where media was originally launched. */
		Stop: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL Start Over with the current media playback item. */
		StartOver?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL cause the handler to be invoked for "Previous". User experience is context-specific. This will often Go back to the previous media playback item. */
		Previous?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL cause the handler to be invoked for "Next". User experience is context-specific. This will often Go forward to the next media playback item. */
		Next?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL Rewind through media. Different Rewind speeds can be used on the TV based upon the number of sequential calls to this function. This is to avoid needing to define every speed now (multiple fast, slow motion, etc). */
		Rewind?: {
			inputparams: readonly [
				AudioAdvanceUnmuted: boolean, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL Advance through media. Different FF speeds can be used on the TV based upon the number of sequential calls to this function. This is to avoid needing to define every speed now (multiple fast, slow motion, etc). */
		FastForward?: {
			inputparams: readonly [
				AudioAdvanceUnmuted: boolean, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL Skip forward in the media by the given number of seconds, using the data as follows: */
		SkipForward?: {
			inputparams: readonly [
				DeltaPositionMilliseconds:  bigint, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL Skip backward in the media by the given number of seconds, using the data as follows: */
		SkipBackward?: {
			inputparams: readonly [
				DeltaPositionMilliseconds:  bigint, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, this SHALL Skip backward in the media by the given number of seconds, using the data as follows: */
		Seek?: {
			inputparams: readonly [
				position:  bigint, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data:  string, ]
            }
		/** Upon receipt, the server SHALL set the active Audio Track to the one identified by the TrackID in the Track catalog for the streaming media. If the TrackID does not exist in the Track catalog, OR does not correspond to the streaming media OR no media is being streamed at the time of receipt of this command, the server will return an error status of INVALID_ARGUMENT. */
		ActivateAudioTrack?: {
			inputparams: readonly [
				TrackID:  string, 
				AudioOutputIndex:  number, 
			],
			 outputparams: readonly []
            }
		/** Upon receipt, the server SHALL set the active Text Track to the one identified by the TrackID in the Track catalog for the streaming media. If the TrackID does not exist in the Track catalog, OR does not correspond to the streaming media OR no media is being streamed at the time of receipt of this command, the server SHALL return an error status of INVALID_ARGUMENT. */
		ActivateTextTrack?: {
			inputparams: readonly [
				TrackID:  string, 
			],
			 outputparams: readonly []
            }
		/** If a Text Track is active (i.e. being displayed), upon receipt of this command, the server SHALL stop displaying it. */
		DeactivateTextTrack?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		StateChanged?: [
			
			CurrentState: PlaybackStateEnum, 
			StartTime:  number, 
			Duration:  bigint, 
			SampledPosition: PlaybackPositionStruct, 
			PlaybackSpeed:  number, 
			SeekRangeEnd:  bigint, 
			SeekRangeStart:  bigint, 
			Data: import ("@akala/core").IsomorphicBuffer, 
			AudioAdvanceUnmuted: boolean, ];
	}
}
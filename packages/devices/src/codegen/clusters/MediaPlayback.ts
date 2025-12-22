// This file is generated from MediaPlayback.xml - do not edit it directly
// Generated on 2025-12-22T10:26:05.920Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CharacteristicEnum {
	ForcedSubtitles = 0,
	DescribesVideo = 1,
	EasyToRead = 2,
	FrameBased = 3,
	MainProgram = 4,
	OriginalContent = 5,
	VoiceOverTranslation = 6,
	Caption = 7,
	Subtitle = 8,
	Alternate = 9,
	Supplementary = 10,
	Commentary = 11,
	DubbedTranslation = 12,
	Description = 13,
	Metadata = 14,
	EnhancedAudioIntelligibility = 15,
	Emergency = 16,
	Karaoke = 17,
}

export enum PlaybackStateEnum {
	Playing = 0,
	Paused = 1,
	NotPlaying = 2,
	Buffering = 3,
}

export enum StatusEnum {
	Success = 0,
	InvalidStateForCommand = 1,
	NotAllowed = 2,
	NotActive = 3,
	SpeedOutOfRange = 4,
	SeekOutOfRange = 5,
}

export interface PlaybackPositionStruct {
	UpdatedAt:number,
	Position:bigint,
}

export interface TrackAttributesStruct {
	LanguageCode:string,
	Characteristics?:readonly CharacteristicEnum[],
	DisplayName?:string,
}

export interface TrackStruct {
	ID:string,
	TrackAttributes:TrackAttributesStruct,
}

export type MediaPlayback = MediaPlaybackCluster & { id: 0x0506};

export interface MediaPlaybackCluster {
id: 0x0506;
	attributes: {
		readonly CurrentState:PlaybackStateEnum
		readonly StartTime?:number
		readonly Duration?:bigint
		readonly SampledPosition?:PlaybackPositionStruct
		readonly PlaybackSpeed?:number
		readonly SeekRangeEnd?:bigint
		readonly SeekRangeStart?:bigint
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
		Play: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		Pause: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		Stop: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		StartOver?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		Previous?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		Next?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		Rewind?: {
			inputparams: readonly [
				AudioAdvanceUnmuted: boolean, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		FastForward?: {
			inputparams: readonly [
				AudioAdvanceUnmuted: boolean, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		SkipForward?: {
			inputparams: readonly [
				DeltaPositionMilliseconds: bigint, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		SkipBackward?: {
			inputparams: readonly [
				DeltaPositionMilliseconds: bigint, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		Seek?: {
			inputparams: readonly [
				Position: bigint, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		ActivateAudioTrack?: {
			inputparams: readonly [
				TrackID: string, 
				AudioOutputIndex: number, 
			],
			 outputparams: readonly []
            }
		ActivateTextTrack?: {
			inputparams: readonly [
				TrackID: string, 
			],
			 outputparams: readonly []
            }
		DeactivateTextTrack?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		StateChanged: [
			
			CurrentState: PlaybackStateEnum, 
			StartTime: number, 
			Duration: bigint, 
			SampledPosition: PlaybackPositionStruct, 
			PlaybackSpeed: number, 
			SeekRangeEnd: bigint, 
			SeekRangeStart: bigint, 
			Data: import ("@akala/core").IsomorphicBuffer, 
			AudioAdvanceUnmuted: boolean, ];
	}
}

export const mediaPlayback: ClusterDefinition<MediaPlayback> = {
id: 0x0506,
	attributes: [
		"CurrentState",
		"StartTime",
		"Duration",
		"SampledPosition",
		"PlaybackSpeed",
		"SeekRangeEnd",
		"SeekRangeStart",
		"ActiveAudioTrack",
		"AvailableAudioTracks",
		"ActiveTextTrack",
		"AvailableTextTracks",
		"SupportsAdvancedSeek",
		"SupportsVariableSpeed",
		"SupportsTextTracks",
		"SupportsAudioTracks",
		"SupportsAudioAdvance",
	] as const,
	commands: [
		"Play",
		"Pause",
		"Stop",
		"StartOver",
		"Previous",
		"Next",
		"Rewind",
		"FastForward",
		"SkipForward",
		"SkipBackward",
		"Seek",
		"ActivateAudioTrack",
		"ActivateTextTrack",
		"DeactivateTextTrack",
	] as const,
	events: [
	] as const
}

export default mediaPlayback;
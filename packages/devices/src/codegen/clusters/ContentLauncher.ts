// This file is generated from ContentLauncher.xml - do not edit it directly
// Generated on 2025-12-22T10:19:28.570Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum MetricTypeEnum {
	Pixels = 0,
	Percentage = 1,
}

export enum ParameterEnum {
	Actor = 0,
	Channel = 1,
	Character = 2,
	Director = 3,
	Event = 4,
	Franchise = 5,
	Genre = 6,
	League = 7,
	Popularity = 8,
	Provider = 9,
	Sport = 10,
	SportsTeam = 11,
	Type = 12,
	Video = 13,
	Season = 14,
	Episode = 15,
	Any = 16,
}

export enum StatusEnum {
	Success = 0,
	URLNotAvailable = 1,
	AuthFailed = 2,
	TextTrackNotAvailable = 3,
	AudioTrackNotAvailable = 4,
}

export enum SupportedProtocolsBitmap {
	__NotSet = 0,
		/** Device supports Dynamic Adaptive Streaming over HTTP (DASH) */
	DASH= 1<<0,
		/** Device supports HTTP Live Streaming (HLS) */
	HLS= 1<<1,
}

export interface AdditionalInfoStruct {
	Name:string,
	Value:string,
}

export interface BrandingInformationStruct {
	ProviderName:string,
	Background?:StyleInformationStruct,
	Logo?:StyleInformationStruct,
	ProgressBar?:StyleInformationStruct,
	Splash?:StyleInformationStruct,
	WaterMark?:StyleInformationStruct,
}

export interface ContentSearchStruct {
	ParameterList:readonly ParameterStruct[],
}

export interface DimensionStruct {
	Width:number,
	Height:number,
	Metric:MetricTypeEnum,
}

export interface ParameterStruct {
	Type:ParameterEnum,
	Value:string,
	ExternalIDList?:readonly AdditionalInfoStruct[],
}

export interface PlaybackPreferencesStruct {
	PlaybackPosition?:bigint,
	TextTrack?:TrackPreferenceStruct,
	AudioTracks?:readonly TrackPreferenceStruct[],
}

export interface StyleInformationStruct {
	ImageURL?:string,
	Color?:string,
	Size?:DimensionStruct,
}

export interface TrackPreferenceStruct {
	LanguageCode:string,
	Characteristics?:readonly import("./MediaPlayback.js").CharacteristicEnum[],
	AudioOutputIndex?:number,
}

export type ContentLauncher = ContentLauncherCluster & { id: 0x050A};

export interface ContentLauncherCluster {
id: 0x050A;
	attributes: {
		readonly AcceptHeader?:readonly string[]
		readonly SupportedStreamingProtocols?:SupportedProtocolsBitmap
		/** Device supports content search (non-app specific) */
		readonly SupportsContentSearch: boolean
		/** Device supports basic URL-based file playback */
		readonly SupportsURLPlayback: boolean
		/** Enables clients to implement more advanced media seeking behavior in their user interface, such as for example a "seek bar". */
		readonly SupportsAdvancedSeek: boolean
		/** Device or app supports Text Tracks. */
		readonly SupportsTextTracks: boolean
		/** Device or app supports Audio Tracks. */
		readonly SupportsAudioTracks: boolean
}
	commands: {
		LaunchContent?: {
			inputparams: readonly [
				Search: ContentSearchStruct, 
				AutoPlay: boolean, 
				Data: string, 
				PlaybackPreferences: PlaybackPreferencesStruct, 
				UseCurrentContext: boolean, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		LaunchURL?: {
			inputparams: readonly [
				ContentURL: string, 
				DisplayString: string, 
				BrandingInformation: BrandingInformationStruct, 
				PlaybackPreferences: PlaybackPreferencesStruct, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
}
	events: {
	}
}

export const contentLauncher: ClusterDefinition<ContentLauncher> = {
id: 0x050A,
	attributes: [
		"AcceptHeader",
		"SupportedStreamingProtocols",
		"SupportsContentSearch",
		"SupportsURLPlayback",
		"SupportsAdvancedSeek",
		"SupportsTextTracks",
		"SupportsAudioTracks",
	] as const,
	commands: [
		"LaunchContent",
		"LaunchURL",
	] as const,
	events: [
	] as const
}

export default contentLauncher;
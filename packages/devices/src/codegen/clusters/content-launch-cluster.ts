// This file is generated from content-launch-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.471Z

import { Cluster } from '../../server/clients/shared.js';


export enum MetricTypeEnum {
	Pixels= 0,
	Percentage= 1,
}

export enum ParameterEnum {
	Actor= 0,
	Channel= 1,
	Character= 2,
	Director= 3,
	Event= 4,
	Franchise= 5,
	Genre= 6,
	League= 7,
	Popularity= 8,
	Provider= 9,
	Sport= 10,
	SportsTeam= 11,
	Type= 12,
	Video= 13,
	Season= 14,
	Episode= 15,
	Any= 16,
}

export enum StatusEnum {
	Success= 0,
	URLNotAvailable= 1,
	AuthFailed= 2,
	TextTrackNotAvailable= 3,
	AudioTrackNotAvailable= 4,
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

export enum SupportedProtocolsBitmap {
	DASH= 0x1,
	HLS= 0x2,
}

export enum Feature {
	ContentSearch= 0x01,
	URLPlayback= 0x02,
	AdvancedSeek= 0x04,
	TextTracks= 0x08,
	AudioTracks= 0x10,
}

export interface ContentSearchStruct {
	ParameterList:readonly ParameterStruct[],
}

export interface AdditionalInfoStruct {
	Name:string,
	Value:string,
}

export interface DimensionStruct {
	Width:number,
	Height:number,
	Metric:MetricTypeEnum,
}

export interface StyleInformationStruct {
	ImageURL?:string,
	Color?:string,
	Size?:DimensionStruct,
}

export interface BrandingInformationStruct {
	ProviderName:string,
	Background?:StyleInformationStruct,
	Logo?:StyleInformationStruct,
	ProgressBar?:StyleInformationStruct,
	Splash?:StyleInformationStruct,
	WaterMark?:StyleInformationStruct,
}

export interface ParameterStruct {
	Type:ParameterEnum,
	Value:string,
	ExternalIDList?:readonly AdditionalInfoStruct[],
}

export interface PlaybackPreferencesStruct {
	PlaybackPosition:bigint,
	TextTrack:TrackPreferenceStruct,
	AudioTracks?:readonly TrackPreferenceStruct[],
}

export interface TrackPreferenceStruct {
	LanguageCode:string,
	Characteristics?:readonly CharacteristicEnum[],
	AudioOutputIndex:number,
}

/**
 * This cluster provides an interface for launching content on a media player device such as a TV or Speaker.
 */

export interface ContentLauncher {
id: 1290;
	attributes: {
		readonly AcceptHeader?:readonly string[]
		readonly SupportedStreamingProtocols?:SupportedProtocolsBitmap
}
	commands: {
		/** Upon receipt, this SHALL launch the specified content with optional search criteria. */
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
		/** Upon receipt, this SHALL launch content from the specified URL. */
		LaunchURL?: {
			inputparams: readonly [
				ContentURL: string, 
				DisplayString: string, 
				BrandingInformation: BrandingInformationStruct, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
}
	events: {
	}
}

export const contentLauncher: Cluster<ContentLauncher['attributes'], ContentLauncher['commands'], ContentLauncher['events']> = {
id: 1290,
	attributes: {
		AcceptHeader:[],
		SupportedStreamingProtocols:null,
},
	commands: {
		/** Upon receipt, this SHALL launch the specified content with optional search criteria. */
		LaunchContent: {
			inputparams: [
				null, 
				null, 
				null, 
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, ]
            },
		/** Upon receipt, this SHALL launch content from the specified URL. */
		LaunchURL: {
			inputparams: [
				null, 
				null, 
				null, 
			],
			 outputparams: [
				null, 
				null, ]
            },
},
	events: {
	}
}

export default contentLauncher;
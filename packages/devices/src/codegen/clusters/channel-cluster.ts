// This file is generated from channel-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:25.158Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum LineupInfoTypeEnum {
	MSO= 0,
}

export enum StatusEnum {
	Success= 0,
	MultipleMatches= 1,
	NoMatches= 2,
}

export enum ChannelTypeEnum {
	Satellite= 0,
	Cable= 1,
	Terrestrial= 2,
	OTT= 3,
}

export enum RecordingFlagBitmap {
	Scheduled= 0x1,
	RecordSeries= 0x2,
	Recorded= 0x4,
}

export interface ChannelInfoStruct {
	MajorNumber:number,
	MinorNumber:number,
	Name?:string,
	CallSign?:string,
	AffiliateCallSign?:string,
	Identifier?:string,
	Type?:ChannelTypeEnum,
}

export interface LineupInfoStruct {
	OperatorName:string,
	LineupName?:string,
	PostalCode?:string,
	LineupInfoType:LineupInfoTypeEnum,
}

export interface ProgramStruct {
	Identifier:string,
	Channel:ChannelInfoStruct,
	StartTime:number,
	EndTime:number,
	Title:string,
	Subtitle?:string,
	Description?:string,
	AudioLanguages?:readonly string[],
	Ratings?:readonly string[],
	ThumbnailUrl?:string,
	PosterArtUrl?:string,
	DvbiUrl?:string,
	ReleaseDate?:string,
	ParentalGuidanceText?:string,
	RecordingFlag?:RecordingFlagBitmap,
	SeriesInfo?:SeriesInfoStruct,
	CategoryList?:readonly ProgramCategoryStruct[],
	CastList?:readonly ProgramCastStruct[],
	ExternalIDList?:readonly ProgramCastStruct[],
}

export interface SeriesInfoStruct {
	Season:string,
	Episode:string,
}

export interface ProgramCategoryStruct {
	Category:string,
	SubCategory?:string,
}

export interface ProgramCastStruct {
	Name:string,
	Role:string,
}

export interface PageTokenStruct {
	Limit?:number,
	After?:string,
	Before?:string,
}

export interface ChannelPagingStruct {
	PreviousToken?:PageTokenStruct,
	NextToken?:PageTokenStruct,
}

export interface AdditionalInfoStruct {
	Name:string,
	Value:string,
}

/**
 * This cluster provides an interface for controlling the current Channel on a device.
 */

export interface Channel {
id: 1284;
	attributes: {
		readonly ChannelList?:readonly ChannelInfoStruct[]
		readonly Lineup?:LineupInfoStruct
		readonly CurrentChannel?:ChannelInfoStruct
		/** Provides list of available channels. */
		readonly SupportsChannelList: boolean
		/** Provides lineup info, which is a reference to an external source of lineup information. */
		readonly SupportsLineupInfo: boolean
		/** Provides electronic program guide information. */
		readonly SupportsElectronicGuide: boolean
		/** Provides ability to record program. */
		readonly SupportsRecordProgram: boolean
}
	commands: {
		/** Change the channel on the media player to the channel case-insensitive exact matching the value passed as an argument. */
		ChangeChannel?: {
			inputparams: readonly [
				Match: string, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		/** Change the channel on the media plaeyer to the channel with the given Number in the ChannelList attribute. */
		ChangeChannelByNumber: {
			inputparams: readonly [
				MajorNumber: number, 
				MinorNumber: number, 
			],
			 outputparams: readonly []
            }
		/** This command provides channel up and channel down functionality, but allows channel index jumps of size Count. When the value of the increase or decrease is larger than the number of channels remaining in the given direction, then the behavior SHALL be to return to the beginning (or end) of the channel list and continue. For example, if the current channel is at index 0 and count value of -1 is given, then the current channel should change to the last channel. */
		SkipChannel: {
			inputparams: readonly [
				Count: number, 
			],
			 outputparams: readonly []
            }
		/** This command retrieves the program guide. It accepts several filter parameters to return specific schedule and program information from a content app. The command shall receive in response a ProgramGuideResponse. */
		GetProgramGuide?: {
			inputparams: readonly [
				StartTime: number, 
				EndTime: number, 
				ChannelList: readonly ChannelInfoStruct[], 
				PageToken: PageTokenStruct, 
				RecordingFlag: RecordingFlagBitmap, 
				ExternalIDList: readonly AdditionalInfoStruct[], 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Paging: ChannelPagingStruct, 
				ProgramList: readonly ProgramStruct[], ]
            }
		/** Record a specific program or series when it goes live. This functionality enables DVR recording features. */
		RecordProgram?: {
			inputparams: readonly [
				ProgramIdentifier: string, 
				ShouldRecordSeries: boolean, 
				ExternalIDList: readonly AdditionalInfoStruct[], 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** Cancel recording for a specific program or series. */
		CancelRecordProgram?: {
			inputparams: readonly [
				ProgramIdentifier: string, 
				ShouldRecordSeries: boolean, 
				ExternalIDList: readonly AdditionalInfoStruct[], 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const channel: ClusterDefinition<Channel> = {
id: 1284,
	attributes: [
		"ChannelList",
		"Lineup",
		"CurrentChannel",
		"SupportsChannelList",
		"SupportsLineupInfo",
		"SupportsElectronicGuide",
		"SupportsRecordProgram",
	] as const,
	commands: [
		"ChangeChannel",
		"ChangeChannelByNumber",
		"SkipChannel",
		"GetProgramGuide",
		"RecordProgram",
		"CancelRecordProgram",
	] as const,
	events: [
	] as const
}

export default channel;
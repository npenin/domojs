// This file is generated from Channel.xml - do not edit it directly
// Generated on 2025-12-18T03:04:57.483Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ChannelTypeEnum {
	Satellite = 0,
	Cable = 1,
	Terrestrial = 2,
	OTT = 3,
}

export enum LineupInfoTypeEnum {
	MSO = 0,
}

export enum StatusEnum {
	Success = 0,
	MultipleMatches = 1,
	NoMatches = 2,
}

export enum RecordingFlagBitmap {
	__NotSet = 0,
		/** The program is scheduled for recording. */
	Scheduled= 1<<0,
		/** The program series is scheduled for recording. */
	RecordSeries= 1<<1,
		/** The program is recorded and available to be played. */
	Recorded= 1<<2,
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

export interface ChannelPagingStruct {
	PreviousToken?:PageTokenStruct,
	NextToken?:PageTokenStruct,
}

export interface LineupInfoStruct {
	OperatorName:string,
	LineupName?:string,
	PostalCode?:string,
	LineupInfoType:LineupInfoTypeEnum,
}

export interface PageTokenStruct {
	Limit?:number,
	After?:string,
	Before?:string,
}

export interface ProgramCastStruct {
	Name:string,
	Role:string,
}

export interface ProgramCategoryStruct {
	Category:string,
	SubCategory?:string,
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
	ExternalIDList?:readonly import("./ContentLauncher.js").AdditionalInfoStruct[],
}

export interface SeriesInfoStruct {
	Season:string,
	Episode:string,
}

export type Channel = ChannelCluster & { id: 0x0504};

export interface ChannelCluster {
id: 0x0504;
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
		ChangeChannel?: {
			inputparams: readonly [
				Match: string, 
			],
			 outputparams: readonly [
				Status: StatusEnum, 
				Data: string, ]
            }
		ChangeChannelByNumber: {
			inputparams: readonly [
				MajorNumber: number, 
				MinorNumber: number, 
			],
			 outputparams: readonly []
            }
		SkipChannel: {
			inputparams: readonly [
				Count: number, 
			],
			 outputparams: readonly []
            }
		GetProgramGuide?: {
			inputparams: readonly [
				StartTime: number, 
				EndTime: number, 
				ChannelList: readonly ChannelInfoStruct[], 
				PageToken: PageTokenStruct, 
				RecordingFlag: RecordingFlagBitmap, 
				ExternalIDList: readonly import("./ContentLauncher.js").AdditionalInfoStruct[], 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				Paging: ChannelPagingStruct, 
				ProgramList: readonly ProgramStruct[], ]
            }
		RecordProgram?: {
			inputparams: readonly [
				ProgramIdentifier: string, 
				ShouldRecordSeries: boolean, 
				ExternalIDList: readonly import("./ContentLauncher.js").AdditionalInfoStruct[], 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		CancelRecordProgram?: {
			inputparams: readonly [
				ProgramIdentifier: string, 
				ShouldRecordSeries: boolean, 
				ExternalIDList: readonly import("./ContentLauncher.js").AdditionalInfoStruct[], 
				Data: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const channel: ClusterDefinition<Channel> = {
id: 0x0504,
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
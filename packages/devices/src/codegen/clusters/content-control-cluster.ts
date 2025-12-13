// This file is generated from content-control-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.518Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCodeEnum {
	InvalidPINCode= 2,
	InvalidRating= 3,
	InvalidChannel= 4,
	ChannelAlreadyExist= 5,
	ChannelNotExist= 6,
	UnidentifiableApplication= 7,
	ApplicationAlreadyExist= 8,
	ApplicationNotExist= 9,
	TimeWindowAlreadyExist= 10,
	TimeWindowNotExist= 11,
}

export enum DayOfWeekBitmap {
	Sunday= 0x01,
	Monday= 0x02,
	Tuesday= 0x04,
	Wednesday= 0x08,
	Thursday= 0x10,
	Friday= 0x20,
	Saturday= 0x40,
}

export interface AppInfoStruct {
	CatalogVendorID:number,
	ApplicationID:string,
}

export interface BlockChannelStruct {
	BlockChannelIndex:number,
	MajorNumber:number,
	MinorNumber:number,
	Identifier?:string,
}

export interface RatingNameStruct {
	RatingName:string,
	RatingNameDesc?:string,
}

export interface TimePeriodStruct {
	StartHour:number,
	StartMinute:number,
	EndHour:number,
	EndMinute:number,
}

export interface TimeWindowStruct {
	TimeWindowIndex:number,
	DayOfWeek:DayOfWeekBitmap,
	TimePeriod:readonly TimePeriodStruct[],
}

/**
 * This cluster is used for managing the content control (including "parental control") settings on a media device such as a TV, or Set-top Box.
 */

export interface ContentControl {
id: 1295;
	attributes: {
		readonly Enabled:boolean
		readonly OnDemandRatings?:readonly RatingNameStruct[]
		readonly OnDemandRatingThreshold?:string
		readonly ScheduledContentRatings?:readonly RatingNameStruct[]
		readonly ScheduledContentRatingThreshold?:string
		readonly ScreenDailyTime?:number
		readonly RemainingScreenTime?:number
		readonly BlockUnrated?:boolean
		readonly BlockChannelList?:readonly BlockChannelStruct[]
		readonly BlockApplicationList?:readonly AppInfoStruct[]
		readonly BlockContentTimeWindow?:readonly TimeWindowStruct[]
		/** Supports managing screen time limits. */
		readonly SupportsScreenTime: boolean
		/** Supports managing a PIN code which is used for restricting access to configuration of this feature. */
		readonly SupportsPINManagement: boolean
		/** Supports managing content controls for unrated content. */
		readonly SupportsBlockUnrated: boolean
		/** Supports managing content controls based upon rating threshold for on demand content. */
		readonly SupportsOnDemandContentRating: boolean
		/** Supports managing content controls based upon rating threshold for scheduled content. */
		readonly SupportsScheduledContentRating: boolean
		/** Supports managing a set of channels that are prohibited. */
		readonly SupportsBlockChannels: boolean
		/** Supports managing a set of applications that are prohibited. */
		readonly SupportsBlockApplications: boolean
		/** Supports managing content controls based upon setting time window in which all contents and applications SHALL be blocked. */
		readonly SupportsBlockContentTimeWindow: boolean
}
	commands: {
		/** The purpose of this command is to update the PIN used for protecting configuration of the content control settings. */
		UpdatePIN?: {
			inputparams: readonly [
				OldPIN: string, 
				NewPIN: string, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to reset the PIN. */
		ResetPIN?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				PINCode: string, ]
            }
		/** The purpose of this command is to turn on the Content Control feature on a media device. */
		Enable: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to turn off the Content Control feature on a media device. */
		Disable: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to add the extra screen time for the user. */
		AddBonusTime?: {
			inputparams: readonly [
				PINCode: string, 
				BonusTime: number, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set the ScreenDailyTime attribute. */
		SetScreenDailyTime?: {
			inputparams: readonly [
				ScreenTime: number, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to specify whether programs with no Content rating must be blocked by this media device. */
		BlockUnratedContent?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to specify whether programs with no Content rating must be blocked by this media device. */
		UnblockUnratedContent?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set the OnDemandRatingThreshold attribute. */
		SetOnDemandRatingThreshold?: {
			inputparams: readonly [
				Rating: string, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set ScheduledContentRatingThreshold attribute. */
		SetScheduledContentRatingThreshold?: {
			inputparams: readonly [
				Rating: string, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set BlockChannelList attribute. */
		AddBlockChannels?: {
			inputparams: readonly [
				Channels: readonly BlockChannelStruct[], 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to remove channels from the BlockChannelList attribute. */
		RemoveBlockChannels?: {
			inputparams: readonly [
				ChannelIndexes: readonly number[], 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set applications to the BlockApplicationList attribute. */
		AddBlockApplications?: {
			inputparams: readonly [
				Applications: readonly AppInfoStruct[], 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to remove applications from the BlockApplicationList attribute. */
		RemoveBlockApplications?: {
			inputparams: readonly [
				Applications: readonly AppInfoStruct[], 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set the BlockContentTimeWindow attribute. */
		SetBlockContentTimeWindow?: {
			inputparams: readonly [
				TimeWindow: TimeWindowStruct, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to remove the selected time windows from the BlockContentTimeWindow attribute. */
		RemoveBlockContentTimeWindow?: {
			inputparams: readonly [
				TimeWindowIndexes: readonly number[], 
			],
			 outputparams: readonly []
            }
}
	events: {
		RemainingScreenTimeExpired?: [
			];
		EnteringBlockContentTimeWindow?: [
			];
	}
}

export const contentControl: ClusterDefinition<ContentControl> = {
id: 1295,
	attributes: [
		"Enabled",
		"OnDemandRatings",
		"OnDemandRatingThreshold",
		"ScheduledContentRatings",
		"ScheduledContentRatingThreshold",
		"ScreenDailyTime",
		"RemainingScreenTime",
		"BlockUnrated",
		"BlockChannelList",
		"BlockApplicationList",
		"BlockContentTimeWindow",
		"SupportsScreenTime",
		"SupportsPINManagement",
		"SupportsBlockUnrated",
		"SupportsOnDemandContentRating",
		"SupportsScheduledContentRating",
		"SupportsBlockChannels",
		"SupportsBlockApplications",
		"SupportsBlockContentTimeWindow",
	] as const,
	commands: [
		"UpdatePIN",
		"ResetPIN",
		"Enable",
		"Disable",
		"AddBonusTime",
		"SetScreenDailyTime",
		"BlockUnratedContent",
		"UnblockUnratedContent",
		"SetOnDemandRatingThreshold",
		"SetScheduledContentRatingThreshold",
		"AddBlockChannels",
		"RemoveBlockChannels",
		"AddBlockApplications",
		"RemoveBlockApplications",
		"SetBlockContentTimeWindow",
		"RemoveBlockContentTimeWindow",
	] as const,
	events: [
		"RemainingScreenTimeExpired",
		"EnteringBlockContentTimeWindow",
	] as const
}

export default contentControl;
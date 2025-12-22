// This file is generated from ContentControl.xml - do not edit it directly
// Generated on 2025-12-22T10:25:59.584Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum StatusCodeEnum {
	InvalidPINCode = 2,
	InvalidRating = 3,
	InvalidChannel = 4,
	ChannelAlreadyExist = 5,
	ChannelNotExist = 6,
	UnidentifiableApplication = 7,
	ApplicationAlreadyExist = 8,
	ApplicationNotExist = 9,
	TimeWindowAlreadyExist = 10,
	TimeWindowNotExist = 11,
}

export enum DayOfWeekBitmap {
	__NotSet = 0,
		/** Sunday */
	Sunday= 1<<0,
		/** Monday */
	Monday= 1<<1,
		/** Tuesday */
	Tuesday= 1<<2,
		/** Wednesday */
	Wednesday= 1<<3,
		/** Thursday */
	Thursday= 1<<4,
		/** Friday */
	Friday= 1<<5,
		/** Saturday */
	Saturday= 1<<6,
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

export type ContentControl = ContentControlCluster & { id: 0x050F};

export interface ContentControlCluster {
id: 0x050F;
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
		UpdatePIN?: {
			inputparams: readonly [
				OldPIN: string, 
				NewPIN: string, 
			],
			 outputparams: readonly []
            }
		ResetPIN?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				PINCode: string, ]
            }
		Enable: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		Disable: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		AddBonusTime?: {
			inputparams: readonly [
				PINCode: string, 
				BonusTime: number, 
			],
			 outputparams: readonly []
            }
		SetScreenDailyTime?: {
			inputparams: readonly [
				ScreenTime: number, 
			],
			 outputparams: readonly []
            }
		BlockUnratedContent?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		UnblockUnratedContent?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		SetOnDemandRatingThreshold?: {
			inputparams: readonly [
				Rating: string, 
			],
			 outputparams: readonly []
            }
		SetScheduledContentRatingThreshold?: {
			inputparams: readonly [
				Rating: string, 
			],
			 outputparams: readonly []
            }
		AddBlockChannels?: {
			inputparams: readonly [
				Channels: readonly BlockChannelStruct[], 
			],
			 outputparams: readonly []
            }
		RemoveBlockChannels?: {
			inputparams: readonly [
				ChannelIndexes: readonly number[], 
			],
			 outputparams: readonly []
            }
		AddBlockApplications?: {
			inputparams: readonly [
				Applications: readonly AppInfoStruct[], 
			],
			 outputparams: readonly []
            }
		RemoveBlockApplications?: {
			inputparams: readonly [
				Applications: readonly AppInfoStruct[], 
			],
			 outputparams: readonly []
            }
		SetBlockContentTimeWindow?: {
			inputparams: readonly [
				TimeWindow: TimeWindowStruct, 
			],
			 outputparams: readonly []
            }
		RemoveBlockContentTimeWindow?: {
			inputparams: readonly [
				TimeWindowIndexes: readonly number[], 
			],
			 outputparams: readonly []
            }
}
	events: {
		RemainingScreenTimeExpired: [
			];
		EnteringBlockContentTimeWindow: [
			];
	}
}

export const contentControl: ClusterDefinition<ContentControl> = {
id: 0x050F,
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
	] as const
}

export default contentControl;
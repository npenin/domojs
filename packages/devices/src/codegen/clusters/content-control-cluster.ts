// This file is generated from content-control-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.116Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface RatingNameStruct {
	RatingName:string,
	RatingNameDesc?:string,
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
}
	commands: {
		/** The purpose of this command is to update the PIN used for protecting configuration of the content control settings. Upon success, the old PIN SHALL no longer work. The PIN is used to ensure that only the Node (or User) with the PIN code can make changes to the Content Control settings, for example, turn off Content Controls or modify the ScreenDailyTime. The PIN is composed of a numeric string of up to 6 human readable characters (displayable) . Upon receipt of this command, the media device SHALL check if the OldPIN field of this command is the same as the current PIN. If the PINs are the same, then the PIN code SHALL be set to NewPIN. Otherwise a response with InvalidPINCode error status SHALL be returned. The media device MAY provide a default PIN to the User via an out of band mechanism. For security reasons, it is recommended that a client encourage the user to update the PIN from its default value when performing configuration of the Content Control settings exposed by this cluster. The ResetPIN command can also be used to obtain the default PIN. */
		UpdatePIN?: {
			inputparams: readonly [
				OldPIN: string, 
				NewPIN: string, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to reset the PIN. If this command is executed successfully, a ResetPINResponse command with a new PIN SHALL be returned. */
		ResetPIN?: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				PINCode: string, ]
            }
		/** The purpose of this command is to turn on the Content Control feature on a media device. On receipt of the Enable command, the media device SHALL set the Enabled attribute to TRUE. */
		Enable?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to turn off the Content Control feature on a media device. On receipt of the Disable command, the media device SHALL set the Enabled attribute to FALSE. */
		Disable?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to add the extra screen time for the user. If a client with Operate privilege invokes this command, the media device SHALL check whether the PINCode passed in the command matches the current PINCode value. If these match, then the RemainingScreenTime attribute SHALL be increased by the specified BonusTime value. If the PINs do not match, then a response with InvalidPINCode error status SHALL be returned, and no changes SHALL be made to RemainingScreenTime. If a client with Manage privilege or greater invokes this command, the media device SHALL ignore the PINCode field and directly increase the RemainingScreenTime attribute by the specified BonusTime value. A server that does not support the PM feature SHALL respond with InvalidPINCode to clients that only have Operate privilege unless: It has been provided with the PIN value to expect via an out of band mechanism, and The client has provided a PINCode that matches the expected PIN value. */
		AddBonusTime?: {
			inputparams: readonly [
				PINCode: string, 
				BonusTime: number, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set the ScreenDailyTime attribute. On receipt of the SetScreenDailyTime command, the media device SHALL set the ScreenDailyTime attribute to the ScreenTime value. */
		SetScreenDailyTime?: {
			inputparams: readonly [
				ScreenTime: number, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to specify whether programs with no Content rating must be blocked by this media device. On receipt of the BlockUnratedContent command, the media device SHALL set the BlockUnrated attribute to TRUE. */
		BlockUnratedContent?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to specify whether programs with no Content rating must be blocked by this media device. On receipt of the UnblockUnratedContent command, the media device SHALL set the BlockUnrated attribute to FALSE. */
		UnblockUnratedContent?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set the OnDemandRatingThreshold attribute. On receipt of the SetOnDemandRatingThreshold command, the media device SHALL check if the Rating field is one of values present in the OnDemandRatings attribute. If not, then a response with InvalidRating error status SHALL be returned. */
		SetOnDemandRatingThreshold?: {
			inputparams: readonly [
				Rating: string, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to set ScheduledContentRatingThreshold attribute. On receipt of the SetScheduledContentRatingThreshold command, the media device SHALL check if the Rating field is one of values present in the ScheduledContentRatings attribute. If not, then a response with InvalidRating error status SHALL be returned. */
		SetScheduledContentRatingThreshold?: {
			inputparams: readonly [
				Rating: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
		RemainingScreenTimeExpired?: [
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
		"SupportsScreenTime",
		"SupportsPINManagement",
		"SupportsBlockUnrated",
		"SupportsOnDemandContentRating",
		"SupportsScheduledContentRating",
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
	] as const,
	events: [
		"RemainingScreenTimeExpired",
	] as const
}

export default contentControl;
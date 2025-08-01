

export enum BallastStatusBitmap {
	BallastNonOperational= 0x01,
	LampFailure= 0x02,
}

export enum LampAlarmModeBitmap {
	LampBurnHours= 0x01,
}

/**
 * Attributes and commands for configuring a lighting ballast.
 */

export interface BallastConfiguration {
id: 769;
	attributes: {
		readonly PhysicalMinLevel: number
		readonly PhysicalMaxLevel: number
		readonly BallastStatus?:BallastStatusBitmap
		MinLevel: number
		MaxLevel: number
		IntrinsicBallastFactor?: number
		BallastFactorAdjustment?: number
		readonly LampQuantity: number
		LampType?: string
		LampManufacturer?: string
		LampRatedHours?: number
		LampBurnHours?: number
		LampAlarmMode?:LampAlarmModeBitmap
		LampBurnHoursTripPoint?: number
}
	commands: {
}
	events: {
	}
}
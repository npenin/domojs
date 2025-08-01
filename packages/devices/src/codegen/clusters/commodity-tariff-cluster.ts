

export enum AuxiliaryLoadSettingEnum {
	Off= 0,
	On= 1,
	None= 2,
}

export enum BlockModeEnum {
	NoBlock= 0,
	Combined= 1,
	Individual= 2,
}

export enum DayEntryRandomizationTypeEnum {
	None= 0,
	Fixed= 1,
	Random= 2,
	RandomPositive= 3,
	RandomNegative= 4,
}

export enum DayTypeEnum {
	Standard= 0,
	Holiday= 1,
	Dynamic= 2,
	Event= 3,
}

export enum PeakPeriodSeverityEnum {
	Unused= 0,
	Low= 1,
	Medium= 2,
	High= 3,
}

export enum DayPatternDayOfWeekBitmap {
	Sunday= 0x01,
	Monday= 0x02,
	Tuesday= 0x04,
	Wednesday= 0x08,
	Thursday= 0x10,
	Friday= 0x20,
	Saturday= 0x40,
}

export interface AuxiliaryLoadSwitchSettingsStruct {
	Number: number,
	RequiredState:AuxiliaryLoadSettingEnum,
}

export interface CalendarPeriodStruct {
	StartDate: number,
	DayPatternIDs: number,
}

export interface DayEntryStruct {
	DayEntryID: number,
	StartTime: number,
	Duration?: number,
	RandomizationOffset?: number,
	RandomizationType?:DayEntryRandomizationTypeEnum,
}

export interface DayPatternStruct {
	DayPatternID: number,
	DaysOfWeek:DayPatternDayOfWeekBitmap,
	DayEntryIDs: number,
}

export interface DayStruct {
	Date: number,
	DayType:DayTypeEnum,
	DayEntryIDs: number,
}

export interface PeakPeriodStruct {
	Severity:PeakPeriodSeverityEnum,
	PeakPeriod: number,
}

export interface TariffComponentStruct {
	TariffComponentID: number,
	Price?:TariffPriceStruct,
	FriendlyCredit?:boolean,
	AuxiliaryLoad?:AuxiliaryLoadSwitchSettingsStruct,
	PeakPeriod?:PeakPeriodStruct,
	PowerThreshold?:import("./global-structs.js").PowerThresholdStruct,
	Threshold: number,
	Label?: string,
	Predicted?:boolean,
}

export interface TariffInformationStruct {
	TariffLabel: string,
	ProviderName: string,
	Currency?:import("./global-structs.js").CurrencyStruct,
	BlockMode:BlockModeEnum,
}

export interface TariffPeriodStruct {
	Label: string,
	DayEntryIDs: number,
	TariffComponentIDs: number,
}

export interface TariffPriceStruct {
	PriceType:import("./global-enums.js").TariffPriceTypeEnum,
	Price?: number,
	PriceLevel?: number,
}

/**
 * The CommodityTariffCluster provides the mechanism for communicating Commodity Tariff information within the premises.
 */

export interface CommodityTariff {
id: 1792;
	attributes: {
		readonly TariffInfo?:TariffInformationStruct
		readonly TariffUnit?:import("./global-enums.js").TariffUnitEnum
		readonly StartDate?: number
		readonly DayEntries?:readonly DayEntryStruct[]
		readonly DayPatterns?:readonly DayPatternStruct[]
		readonly CalendarPeriods?:readonly CalendarPeriodStruct[]
		readonly IndividualDays?:readonly DayStruct[]
		readonly CurrentDay?:DayStruct
		readonly NextDay?:DayStruct
		readonly CurrentDayEntry?:DayEntryStruct
		readonly CurrentDayEntryDate?: number
		readonly NextDayEntry?:DayEntryStruct
		readonly NextDayEntryDate?: number
		readonly TariffComponents?:readonly TariffComponentStruct[]
		readonly TariffPeriods?:readonly TariffPeriodStruct[]
		readonly CurrentTariffComponents?:readonly TariffComponentStruct[]
		readonly NextTariffComponents?:readonly TariffComponentStruct[]
		readonly DefaultRandomizationOffset?: number
		readonly DefaultRandomizationType?:DayEntryRandomizationTypeEnum
		/** Supports information about commodity pricing */
		readonly SupportsPricing: boolean
		/** Supports information about when friendly credit periods begin and end */
		readonly SupportsFriendlyCredit: boolean
		/** Supports information about when auxiliary loads should be enabled or disabled */
		readonly SupportsAuxiliaryLoad: boolean
		/** Supports information about peak periods */
		readonly SupportsPeakPeriod: boolean
		/** Supports information about power threshold */
		readonly SupportsPowerThreshold: boolean
		/** Supports information about randomization of calendar day entries */
		readonly SupportsRandomization: boolean
}
	commands: {
		/** The GetTariffComponent command allows a client to request information for a tariff component identifier that may no longer be available in the TariffPeriods attributes. */
		GetTariffComponent: {
			inputparams: readonly [
				TariffComponentID:  number, 
			],
			 outputparams: readonly [
				Label:  string, 
				DayEntryIDs:  number[], 
				TariffComponent: TariffComponentStruct, ]
            }
		/** The GetDayEntry command allows a client to request information for a calendar day entry identifier that may no longer be available in the CalendarPeriods or IndividualDays attributes. */
		GetDayEntry: {
			inputparams: readonly [
				DayEntryID:  number, 
			],
			 outputparams: readonly [
				DayEntry: DayEntryStruct, ]
            }
}
	events: {
	}
}
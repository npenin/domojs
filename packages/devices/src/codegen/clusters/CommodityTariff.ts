// This file is generated from CommodityTariff.xml - do not edit it directly
// Generated on 2025-12-18T03:04:58.862Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AuxiliaryLoadSettingEnum {
	Off = 0,
	On = 1,
	None = 2,
}

export enum BlockModeEnum {
	NoBlock = 0,
	Combined = 1,
	Individual = 2,
}

export enum DayEntryRandomizationTypeEnum {
	None = 0,
	Fixed = 1,
	Random = 2,
	RandomPositive = 3,
	RandomNegative = 4,
}

export enum DayTypeEnum {
	Standard = 0,
	Holiday = 1,
	Dynamic = 2,
	Event = 3,
}

export enum PeakPeriodSeverityEnum {
	Unused = 0,
	Low = 1,
	Medium = 2,
	High = 3,
}

export enum DayPatternDayOfWeekBitmap {
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

export interface AuxiliaryLoadSwitchSettingsStruct {
	Number:number,
	RequiredState:AuxiliaryLoadSettingEnum,
}

export interface AuxiliaryLoadSwitchesSettingsStruct {
	SwitchStates:readonly AuxiliaryLoadSwitchSettingsStruct[],
}

export interface CalendarPeriodStruct {
	StartDate:number,
	DayPatternIDs:readonly number[],
}

export interface DayEntryStruct {
	DayEntryID:number,
	StartTime:number,
	Duration?:number,
	RandomizationOffset?:number,
	RandomizationType?:DayEntryRandomizationTypeEnum,
}

export interface DayPatternStruct {
	DayPatternID:number,
	DaysOfWeek:DayPatternDayOfWeekBitmap,
	DayEntryIDs:readonly number[],
}

export interface DayStruct {
	Date:number,
	DayType:DayTypeEnum,
	DayEntryIDs:readonly number[],
}

export interface PeakPeriodStruct {
	Severity:PeakPeriodSeverityEnum,
	PeakPeriod:number,
}

export interface TariffComponentStruct {
	TariffComponentID:number,
	Price?:TariffPriceStruct,
	FriendlyCredit?:boolean,
	AuxiliaryLoad?:AuxiliaryLoadSwitchSettingsStruct,
	PeakPeriod?:PeakPeriodStruct,
	PowerThreshold?:import("./global-Structs.js").PowerThresholdStruct,
	Threshold:bigint,
	Label?:string,
	Predicted?:boolean,
}

export interface TariffInformationStruct {
	TariffLabel:string,
	ProviderName:string,
	Currency?:import("./global-Structs.js").CurrencyStruct,
	BlockMode:BlockModeEnum,
}

export interface TariffPeriodStruct {
	Label:string,
	DayEntryIDs:readonly number[],
	TariffComponentIDs:readonly number[],
}

export interface TariffPriceStruct {
	PriceType:import("./global-Enums.js").TariffPriceTypeEnum,
	Price?:number,
	PriceLevel?:number,
}

export type CommodityTariff = CommodityTariffCluster & { id: 0x0700};

export interface CommodityTariffCluster {
id: 0x0700;
	attributes: {
		readonly TariffInfo:TariffInformationStruct
		readonly TariffUnit:import("./global-Enums.js").TariffUnitEnum
		readonly StartDate:number
		readonly DayEntries:readonly DayEntryStruct[]
		readonly DayPatterns:readonly DayPatternStruct[]
		readonly CalendarPeriods:readonly CalendarPeriodStruct[]
		readonly IndividualDays:readonly DayStruct[]
		readonly CurrentDay:DayStruct
		readonly NextDay:DayStruct
		readonly CurrentDayEntry:DayEntryStruct
		readonly CurrentDayEntryDate:number
		readonly NextDayEntry:DayEntryStruct
		readonly NextDayEntryDate:number
		readonly TariffComponents:readonly TariffComponentStruct[]
		readonly TariffPeriods:readonly TariffPeriodStruct[]
		readonly CurrentTariffComponents:readonly TariffComponentStruct[]
		readonly NextTariffComponents:readonly TariffComponentStruct[]
		readonly DefaultRandomizationOffset?:number
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
		GetTariffComponent: {
			inputparams: readonly [
				TariffComponentID: number, 
			],
			 outputparams: readonly [
				Label: string, 
				DayEntryIDs: readonly number[], 
				TariffComponent: TariffComponentStruct, ]
            }
		GetDayEntry: {
			inputparams: readonly [
				DayEntryID: number, 
			],
			 outputparams: readonly [
				DayEntry: DayEntryStruct, ]
            }
}
	events: {
	}
}

export const commodityTariff: ClusterDefinition<CommodityTariff> = {
id: 0x0700,
	attributes: [
		"TariffInfo",
		"TariffUnit",
		"StartDate",
		"DayEntries",
		"DayPatterns",
		"CalendarPeriods",
		"IndividualDays",
		"CurrentDay",
		"NextDay",
		"CurrentDayEntry",
		"CurrentDayEntryDate",
		"NextDayEntry",
		"NextDayEntryDate",
		"TariffComponents",
		"TariffPeriods",
		"CurrentTariffComponents",
		"NextTariffComponents",
		"DefaultRandomizationOffset",
		"DefaultRandomizationType",
		"SupportsPricing",
		"SupportsFriendlyCredit",
		"SupportsAuxiliaryLoad",
		"SupportsPeakPeriod",
		"SupportsPowerThreshold",
		"SupportsRandomization",
	] as const,
	commands: [
		"GetTariffComponent",
		"GetDayEntry",
	] as const,
	events: [
	] as const
}

export default commodityTariff;
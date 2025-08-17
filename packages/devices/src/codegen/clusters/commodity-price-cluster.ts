// This file is generated from commodity-price-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:45.038Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CommodityPriceDetailBitmap {
	Description= 0x0001,
	Components= 0x0002,
}

export interface CommodityPriceComponentStruct {
	Price:number,
	Source:import("./global-enums.js").TariffPriceTypeEnum,
	Description?:string,
	TariffComponentID?:number,
}

export interface CommodityPriceStruct {
	PeriodStart:number,
	PeriodEnd:number,
	Price?:number,
	PriceLevel?:number,
	Description?:string,
	Components?:readonly CommodityPriceComponentStruct[],
}

/**
 * The Commodity Price Cluster provides the mechanism for communicating Gas, Energy, or Water pricing information within the premises.
 */

export interface CommodityPrice {
id: 149;
	attributes: {
		readonly TariffUnit:import("./global-enums.js").TariffUnitEnum
		readonly Currency?:import("./global-structs.js").CurrencyStruct
		readonly CurrentPrice?:CommodityPriceStruct
		readonly PriceForecast?:readonly CommodityPriceStruct[]
		/** Forecasts upcoming pricing */
		readonly SupportsForecasting: boolean
}
	commands: {
		/** Upon receipt, this SHALL generate a GetDetailedPrice Response command. */
		GetDetailedPriceRequest?: {
			inputparams: readonly [
				Details: CommodityPriceDetailBitmap, 
			],
			 outputparams: readonly [
				CurrentPrice: CommodityPriceStruct, ]
            }
		/** Upon receipt, this SHALL generate a GetDetailedForecast Response command. */
		GetDetailedForecastRequest?: {
			inputparams: readonly [
				Details: CommodityPriceDetailBitmap, 
			],
			 outputparams: readonly [
				PriceForecast: readonly CommodityPriceStruct[][], ]
            }
}
	events: {
		PriceChange?: [
			
			CurrentPrice: CommodityPriceStruct, ];
	}
}

export const commodityPrice: ClusterDefinition<CommodityPrice> = {
id: 149,
	attributes: [
		"TariffUnit",
		"Currency",
		"CurrentPrice",
		"PriceForecast",
		"SupportsForecasting",
	] as const,
	commands: [
		"GetDetailedPriceRequest",
		"GetDetailedForecastRequest",
	] as const,
	events: [
		"PriceChange",
	] as const
}

export default commodityPrice;
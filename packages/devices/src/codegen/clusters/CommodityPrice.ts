// This file is generated from CommodityPrice.xml - do not edit it directly
// Generated on 2025-12-22T10:19:27.638Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum CommodityPriceDetailBitmap {
	__NotSet = 0,
		/** A textual description of a price; e.g. the name of a rate plan. */
	Description= 1<<0,
		/** A breakdown of the component parts of a price; e.g. generation, delivery, etc. */
	Components= 1<<1,
}

export interface CommodityPriceComponentStruct {
	Price:number,
	Source:import("./global-Enums.js").TariffPriceTypeEnum,
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

export type CommodityPrice = CommodityPriceCluster & { id: 0x0095};

export interface CommodityPriceCluster {
id: 0x0095;
	attributes: {
		readonly TariffUnit:import("./global-Enums.js").TariffUnitEnum
		readonly Currency:import("./global-Structs.js").CurrencyStruct
		readonly CurrentPrice:CommodityPriceStruct
		readonly PriceForecast?:readonly CommodityPriceStruct[]
		/** Forecasts upcoming pricing */
		readonly SupportsForecasting: boolean
}
	commands: {
		GetDetailedPriceRequest?: {
			inputparams: readonly [
				Details: CommodityPriceDetailBitmap, 
			],
			 outputparams: readonly [
				CurrentPrice: CommodityPriceStruct, ]
            }
		GetDetailedForecastRequest?: {
			inputparams: readonly [
				Details: CommodityPriceDetailBitmap, 
			],
			 outputparams: readonly [
				PriceForecast: readonly CommodityPriceStruct[], ]
            }
}
	events: {
		PriceChange: [
			
			CurrentPrice: CommodityPriceStruct, ];
	}
}

export const commodityPrice: ClusterDefinition<CommodityPrice> = {
id: 0x0095,
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
	] as const
}

export default commodityPrice;
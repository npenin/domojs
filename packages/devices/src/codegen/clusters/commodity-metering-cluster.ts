// This file is generated from commodity-metering-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:10.423Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface MeteredQuantityStruct {
	TariffComponentIDs:readonly number[],
	Quantity:bigint,
}

/**
 * The Commodity Metering Cluster provides the mechanism for communicating commodity consumption information within a premises.
 */

export interface CommodityMetering {
id: 2823;
	attributes: {
		readonly MeteredQuantity?:readonly MeteredQuantityStruct[]
		readonly MeteredQuantityTimestamp?:number
		readonly TariffUnit?:import("./global-enums.js").TariffUnitEnum
		readonly MaximumMeteredQuantities?:number
}
	commands: {
}
	events: {
	}
}

export const commodityMetering: ClusterDefinition<CommodityMetering> = {
id: 2823,
	attributes: [
		"MeteredQuantity",
		"MeteredQuantityTimestamp",
		"TariffUnit",
		"MaximumMeteredQuantities",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default commodityMetering;
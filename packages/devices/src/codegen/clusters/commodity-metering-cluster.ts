// This file is generated from commodity-metering-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:26.740Z

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
		readonly MeasurementType?:import("./global-enums.js").MeasurementTypeEnum
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
		"MeasurementType",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default commodityMetering;
// This file is generated from CommodityMetering.xml - do not edit it directly
// Generated on 2025-12-18T03:04:58.522Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export interface MeteredQuantityStruct {
	TariffComponentIDs:readonly number[],
	Quantity:bigint,
}

export type CommodityMetering = CommodityMeteringCluster & { id: 0x0B07};

export interface CommodityMeteringCluster {
id: 0x0B07;
	attributes: {
		readonly MeteredQuantity:readonly MeteredQuantityStruct[]
		readonly MeteredQuantityTimestamp:number
		readonly TariffUnit:import("./global-Enums.js").TariffUnitEnum
		readonly MaximumMeteredQuantities:number
}
	commands: {
}
	events: {
	}
}

export const commodityMetering: ClusterDefinition<CommodityMetering> = {
id: 0x0B07,
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
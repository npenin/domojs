

export interface MeteredQuantityStruct {
	TariffComponentIDs: number,
	Quantity: bigint,
}

/**
 * The Commodity Metering Cluster provides the mechanism for communicating commodity consumption information within a premises.
 */

export interface CommodityMetering {
id: 2823;
	attributes: {
		readonly MeteredQuantity?:readonly MeteredQuantityStruct[]
		readonly MeteredQuantityTimestamp?: number
		readonly MeasurementType?:import("./global-enums.js").MeasurementTypeEnum
		readonly MaximumMeteredQuantities?: number
}
	commands: {
}
	events: {
	}
}
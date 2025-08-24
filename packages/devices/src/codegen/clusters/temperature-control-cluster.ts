// This file is generated from temperature-control-cluster.xml - do not edit it directly
// Generated on 2025-08-24T09:48:42.491Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Attributes and commands for configuring the temperature control, and reporting temperature.
 */

export interface TemperatureControl {
id: 86;
	attributes: {
		readonly TemperatureSetpoint?:number
		readonly MinTemperature?:number
		readonly MaxTemperature?:number
		readonly Step?:number
		readonly SelectedTemperatureLevel?:number
		readonly SupportedTemperatureLevels?:readonly string[]
		/** Use actual temperature numbers */
		readonly SupportsTemperatureNumber: boolean
		/** Use temperature levels */
		readonly SupportsTemperatureLevel: boolean
		/** Use step control with temperature numbers */
		readonly SupportsTemperatureStep: boolean
}
	commands: {
		/** The SetTemperature command SHALL have the following data fields: */
		SetTemperature: {
			inputparams: readonly [
				TargetTemperature: number, 
				TargetTemperatureLevel: number, 
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const temperatureControl: ClusterDefinition<TemperatureControl> = {
id: 86,
	attributes: [
		"TemperatureSetpoint",
		"MinTemperature",
		"MaxTemperature",
		"Step",
		"SelectedTemperatureLevel",
		"SupportedTemperatureLevels",
		"SupportsTemperatureNumber",
		"SupportsTemperatureLevel",
		"SupportsTemperatureStep",
	] as const,
	commands: [
		"SetTemperature",
	] as const,
	events: [
	] as const
}

export default temperatureControl;
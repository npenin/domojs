// This file is generated from temperature-control-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.698Z

import { Cluster } from '../../server/clients/shared.js';


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

export const temperatureControl: Cluster<TemperatureControl['attributes'], TemperatureControl['commands'], TemperatureControl['events']> = {
id: 86,
	attributes: {
		TemperatureSetpoint:0,
		MinTemperature:0,
		MaxTemperature:0,
		Step:0,
		SelectedTemperatureLevel:0,
		SupportedTemperatureLevels:[],
		/** Use actual temperature numbers */
	SupportsTemperatureNumber: false,
		/** Use temperature levels */
	SupportsTemperatureLevel: false,
		/** Use step control with temperature numbers */
	SupportsTemperatureStep: false,
},
	commands: {
		/** The SetTemperature command SHALL have the following data fields: */
		SetTemperature: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: []
            },
},
	events: {
	}
}

export default temperatureControl;
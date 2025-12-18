// This file is generated from TemperatureControl.xml - do not edit it directly
// Generated on 2025-12-18T03:05:13.854Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type TemperatureControl = TemperatureControlCluster & { id: 0x0056};

export interface TemperatureControlCluster {
id: 0x0056;
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
id: 0x0056,
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
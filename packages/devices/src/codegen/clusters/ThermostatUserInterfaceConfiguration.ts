// This file is generated from ThermostatUserInterfaceConfiguration.xml - do not edit it directly
// Generated on 2025-12-18T03:05:14.398Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum KeypadLockoutEnum {
	NoLockout = 0,
	Lockout1 = 1,
	Lockout2 = 2,
	Lockout3 = 3,
	Lockout4 = 4,
	Lockout5 = 5,
}

export enum ScheduleProgrammingVisibilityEnum {
	ScheduleProgrammingPermitted = 0,
	ScheduleProgrammingDenied = 1,
}

export enum TemperatureDisplayModeEnum {
	Celsius = 0,
	Fahrenheit = 1,
}

export type ThermostatUserInterfaceConfiguration = ThermostatUserInterfaceConfigurationCluster & { id: 0x0204};

export interface ThermostatUserInterfaceConfigurationCluster {
id: 0x0204;
	attributes: {
		readonly TemperatureDisplayMode:TemperatureDisplayModeEnum
		readonly KeypadLockout:KeypadLockoutEnum
		readonly ScheduleProgrammingVisibility?:ScheduleProgrammingVisibilityEnum
}
	commands: {
}
	events: {
	}
}

export const thermostatUserInterfaceConfiguration: ClusterDefinition<ThermostatUserInterfaceConfiguration> = {
id: 0x0204,
	attributes: [
		"TemperatureDisplayMode",
		"KeypadLockout",
		"ScheduleProgrammingVisibility",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default thermostatUserInterfaceConfiguration;
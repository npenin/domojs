// This file is generated from thermostat-user-interface-configuration-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.513Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum KeypadLockoutEnum {
	NoLockout= 0,
	Lockout1= 1,
	Lockout2= 2,
	Lockout3= 3,
	Lockout4= 4,
	Lockout5= 5,
}

export enum ScheduleProgrammingVisibilityEnum {
	ScheduleProgrammingPermitted= 0,
	ScheduleProgrammingDenied= 1,
}

export enum TemperatureDisplayModeEnum {
	Celsius= 0,
	Fahrenheit= 1,
}

/**
 * An interface for configuring the user interface of a thermostat (which may be remote from the thermostat).
 */

export interface ThermostatUserInterfaceConfiguration {
id: 516;
	attributes: {
		TemperatureDisplayMode:TemperatureDisplayModeEnum
		KeypadLockout:KeypadLockoutEnum
		ScheduleProgrammingVisibility:ScheduleProgrammingVisibilityEnum
}
	commands: {
}
	events: {
	}
}

export const thermostatUserInterfaceConfiguration: ClusterDefinition<ThermostatUserInterfaceConfiguration> = {
id: 516,
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
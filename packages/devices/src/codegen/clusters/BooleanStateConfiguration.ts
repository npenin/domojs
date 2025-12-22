// This file is generated from BooleanStateConfiguration.xml - do not edit it directly
// Generated on 2025-12-22T10:19:25.571Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmModeBitmap {
	__NotSet = 0,
		/** Visual alarming */
	Visual= 1<<0,
		/** Audible alarming */
	Audible= 1<<1,
}

export enum SensorFaultBitmap {
	__NotSet = 0,
		/** Unspecified fault detected */
	GeneralFault= 1<<0,
}

export type BooleanStateConfiguration = BooleanStateConfigurationCluster & { id: 0x0080};

export interface BooleanStateConfigurationCluster {
id: 0x0080;
	attributes: {
		readonly CurrentSensitivityLevel?:number
		readonly SupportedSensitivityLevels?:number
		readonly DefaultSensitivityLevel?:number
		readonly AlarmsActive?:AlarmModeBitmap
		readonly AlarmsSuppressed?:AlarmModeBitmap
		readonly AlarmsEnabled?:AlarmModeBitmap
		readonly AlarmsSupported?:AlarmModeBitmap
		readonly SensorFault?:SensorFaultBitmap
		/** Supports visual alarms */
		readonly SupportsVisual: boolean
		/** Supports audible alarms */
		readonly SupportsAudible: boolean
		/** Supports ability to suppress or acknowledge alarms */
		readonly SupportsAlarmSuppress: boolean
		/** Supports ability to set sensor sensitivity */
		readonly SupportsSensitivityLevel: boolean
}
	commands: {
		SuppressAlarm?: {
			inputparams: readonly [
				AlarmsToSuppress: AlarmModeBitmap, 
			],
			 outputparams: readonly []
            }
		EnableDisableAlarm?: {
			inputparams: readonly [
				AlarmsToEnableDisable: AlarmModeBitmap, 
			],
			 outputparams: readonly []
            }
}
	events: {
		AlarmsStateChanged: [
			
			AlarmsActive: AlarmModeBitmap, 
			AlarmsSuppressed: AlarmModeBitmap, ];
		SensorFault: [
			
			SensorFault: SensorFaultBitmap, ];
	}
}

export const booleanStateConfiguration: ClusterDefinition<BooleanStateConfiguration> = {
id: 0x0080,
	attributes: [
		"CurrentSensitivityLevel",
		"SupportedSensitivityLevels",
		"DefaultSensitivityLevel",
		"AlarmsActive",
		"AlarmsSuppressed",
		"AlarmsEnabled",
		"AlarmsSupported",
		"SensorFault",
		"SupportsVisual",
		"SupportsAudible",
		"SupportsAlarmSuppress",
		"SupportsSensitivityLevel",
	] as const,
	commands: [
		"SuppressAlarm",
		"EnableDisableAlarm",
	] as const,
	events: [
	] as const
}

export default booleanStateConfiguration;
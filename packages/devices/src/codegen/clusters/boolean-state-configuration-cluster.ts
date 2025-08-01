

export enum AlarmModeBitmap {
	Visual= 0x1,
	Audible= 0x2,
}

export enum SensorFaultBitmap {
	GeneralFault= 0x1,
}

/**
 * This cluster is used to configure a boolean sensor.
 */

export interface BooleanStateConfiguration {
id: 128;
	attributes: {
		CurrentSensitivityLevel?: number
		readonly SupportedSensitivityLevels?: number
		readonly DefaultSensitivityLevel?: number
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
		/** This command is used to suppress the specified alarm mode. */
		SuppressAlarm?: {
			inputparams: readonly [
				AlarmsToSuppress: AlarmModeBitmap, 
			],
			 outputparams: readonly []
            }
		/** This command is used to enable or disable the specified alarm mode. */
		EnableDisableAlarm?: {
			inputparams: readonly [
				AlarmsToEnableDisable: AlarmModeBitmap, 
			],
			 outputparams: readonly []
            }
}
	events: {
		AlarmsStateChanged?: [
			
			AlarmsActive: AlarmModeBitmap, 
			AlarmsSuppressed: AlarmModeBitmap, ];
		SensorFault?: [
			
			SensorFault: SensorFaultBitmap, ];
	}
}
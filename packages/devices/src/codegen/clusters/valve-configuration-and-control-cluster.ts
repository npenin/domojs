

export enum ValveStateEnum {
	Closed= 0,
	Open= 1,
	Transitioning= 2,
}

export enum StatusCodeEnum {
	FailureDueToFault= 2,
}

export enum ValveFaultBitmap {
	GeneralFault= 0x01,
	Blocked= 0x02,
	Leaking= 0x04,
	NotConnected= 0x08,
	ShortCircuit= 0x10,
	CurrentExceeded= 0x20,
}

/**
 * This cluster is used to configure a valve.
 */

export interface ValveConfigurationAndControl {
id: 129;
	attributes: {
		readonly OpenDuration?: number
		DefaultOpenDuration?: number
		readonly AutoCloseTime?: number
		readonly RemainingDuration?: number
		readonly CurrentState?:ValveStateEnum
		readonly TargetState?:ValveStateEnum
		readonly CurrentLevel?: number
		readonly TargetLevel?: number
		DefaultOpenLevel: number
		readonly ValveFault:ValveFaultBitmap
		readonly LevelStep: number
		/** UTC time is used for time indications */
		readonly SupportsTimeSync: boolean
		/** Device supports setting the specific position of the valve */
		readonly SupportsLevel: boolean
}
	commands: {
		/** This command is used to set the valve to its open position. */
		Open: {
			inputparams: readonly [
				OpenDuration:  number, 
				TargetLevel:  number, 
			],
			 outputparams: readonly []
            }
		/** This command is used to set the valve to its closed position. */
		Close: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		ValveStateChanged: [
			
			ValveState: ValveStateEnum, 
			ValveLevel:  number, ];
		ValveFault: [
			
			ValveFault: ValveFaultBitmap, ];
	}
}
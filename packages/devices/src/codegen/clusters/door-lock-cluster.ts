// This file is generated from door-lock-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:46.850Z

import { Cluster } from '../../server/clients/shared.js';


export enum AlarmCodeEnum {
	LockJammed= 0,
	LockFactoryReset= 1,
	LockRadioPowerCycled= 3,
	WrongCodeEntryLimit= 4,
	FrontEsceutcheonRemoved= 5,
	DoorForcedOpen= 6,
	DoorAjar= 7,
	ForcedUser= 8,
}

export enum CredentialRuleEnum {
	Single= 0,
	Dual= 1,
	Tri= 2,
}

export enum CredentialTypeEnum {
	ProgrammingPIN= 0,
	PIN= 1,
	RFID= 2,
	Fingerprint= 3,
	FingerVein= 4,
	Face= 5,
	AliroCredentialIssuerKey= 6,
	AliroEvictableEndpointKey= 7,
	AliroNonEvictableEndpointKey= 8,
}

export enum DataOperationTypeEnum {
	Add= 0,
	Clear= 1,
	Modify= 2,
}

export enum DoorStateEnum {
	DoorOpen= 0,
	DoorClosed= 1,
	DoorJammed= 2,
	DoorForcedOpen= 3,
	DoorUnspecifiedError= 4,
	DoorAjar= 5,
}

export enum LockDataTypeEnum {
	Unspecified= 0,
	ProgrammingCode= 1,
	UserIndex= 2,
	WeekDaySchedule= 3,
	YearDaySchedule= 4,
	HolidaySchedule= 5,
	PIN= 6,
	RFID= 7,
	Fingerprint= 8,
	FingerVein= 9,
	Face= 10,
	AliroCredentialIssuerKey= 11,
	AliroEvictableEndpointKey= 12,
	AliroNonEvictableEndpointKey= 13,
}

export enum LockOperationTypeEnum {
	Lock= 0,
	Unlock= 1,
	NonAccessUserEvent= 2,
	ForcedUserEvent= 3,
	Unlatch= 4,
}

export enum OperationErrorEnum {
	Unspecified= 0,
	InvalidCredential= 1,
	DisabledUserDenied= 2,
	Restricted= 3,
	InsufficientBattery= 4,
}

export enum OperatingModeEnum {
	Normal= 0,
	Vacation= 1,
	Privacy= 2,
	NoRemoteLockUnlock= 3,
	Passage= 4,
}

export enum OperationSourceEnum {
	Unspecified= 0,
	Manual= 1,
	ProprietaryRemote= 2,
	Keypad= 3,
	Auto= 4,
	Button= 5,
	Schedule= 6,
	Remote= 7,
	RFID= 8,
	Biometric= 9,
	Aliro= 10,
}

export enum UserStatusEnum {
	Available= 0,
	OccupiedEnabled= 1,
	OccupiedDisabled= 3,
}

export enum UserTypeEnum {
	UnrestrictedUser= 0,
	YearDayScheduleUser= 1,
	WeekDayScheduleUser= 2,
	ProgrammingUser= 3,
	NonAccessUser= 4,
	ForcedUser= 5,
	DisposableUser= 6,
	ExpiringUser= 7,
	ScheduleRestrictedUser= 8,
	RemoteOnlyUser= 9,
}

export enum DlLockState {
	NotFullyLocked= 0,
	Locked= 1,
	Unlocked= 2,
	Unlatched= 3,
}

export enum DlLockType {
	DeadBolt= 0,
	Magnetic= 1,
	Other= 2,
	Mortise= 3,
	Rim= 4,
	LatchBolt= 5,
	CylindricalLock= 6,
	TubularLock= 7,
	InterconnectedLock= 8,
	DeadLatch= 9,
	DoorFurniture= 10,
	Eurocylinder= 11,
}

export enum DlStatus {
	Success= 0,
	Failure= 1,
	Duplicate= 2,
	Occupied= 3,
	InvalidField= 133,
	ResourceExhausted= 137,
	NotFound= 139,
}

export enum DoorLockSetPinOrIdStatus {
	Success= 0,
	GeneralFailure= 1,
	MemoryFull= 2,
	DuplicateCodeError= 3,
}

export enum DoorLockOperationEventCode {
	UnknownOrMfgSpecific= 0,
	Lock= 1,
	Unlock= 2,
	LockInvalidPinOrId= 3,
	LockInvalidSchedule= 4,
	UnlockInvalidPinOrId= 5,
	UnlockInvalidSchedule= 6,
	OneTouchLock= 7,
	KeyLock= 8,
	KeyUnlock= 9,
	AutoLock= 10,
	ScheduleLock= 11,
	ScheduleUnlock= 12,
	ManualLock= 13,
	ManualUnlock= 14,
}

export enum DoorLockProgrammingEventCode {
	UnknownOrMfgSpecific= 0,
	MasterCodeChanged= 1,
	PinAdded= 2,
	PinDeleted= 3,
	PinChanged= 4,
	IdAdded= 5,
	IdDeleted= 6,
}

export enum DoorLockUserStatus {
	Available= 0,
	OccupiedEnabled= 1,
	OccupiedDisabled= 3,
	NotSupported= 255,
}

export enum DoorLockUserType {
	Unrestricted= 0,
	YearDayScheduleUser= 1,
	WeekDayScheduleUser= 2,
	MasterUser= 3,
	NonAccessUser= 4,
	NotSupported= 255,
}

export enum DlCredentialRuleMask {
	Single= 0x01,
	Dual= 0x02,
	Tri= 0x04,
}

export enum DaysMaskMap {
	Sunday= 0x01,
	Monday= 0x02,
	Tuesday= 0x04,
	Wednesday= 0x08,
	Thursday= 0x10,
	Friday= 0x20,
	Saturday= 0x40,
}

export enum DlCredentialRulesSupport {
	Single= 0x01,
	Dual= 0x02,
	Tri= 0x04,
}

export enum DlSupportedOperatingModes {
	Normal= 0x01,
	Vacation= 0x02,
	Privacy= 0x04,
	NoRemoteLockUnlock= 0x08,
	Passage= 0x10,
}

export enum DlDefaultConfigurationRegister {
	EnableLocalProgrammingEnabled= 0x01,
	KeypadInterfaceDefaultAccessEnabled= 0x02,
	RemoteInterfaceDefaultAccessIsEnabled= 0x04,
	SoundEnabled= 0x20,
	AutoRelockTimeSet= 0x40,
	LEDSettingsSet= 0x80,
}

export enum DlLocalProgrammingFeatures {
	AddUsersCredentialsSchedulesLocally= 0x01,
	ModifyUsersCredentialsSchedulesLocally= 0x02,
	ClearUsersCredentialsSchedulesLocally= 0x04,
	AdjustLockSettingsLocally= 0x08,
}

export enum DlKeypadOperationEventMask {
	Unknown= 0x01,
	Lock= 0x02,
	Unlock= 0x04,
	LockInvalidPIN= 0x08,
	LockInvalidSchedule= 0x10,
	UnlockInvalidCode= 0x20,
	UnlockInvalidSchedule= 0x40,
	NonAccessUserOpEvent= 0x80,
}

export enum DlRemoteOperationEventMask {
	Unknown= 0x01,
	Lock= 0x02,
	Unlock= 0x04,
	LockInvalidCode= 0x08,
	LockInvalidSchedule= 0x10,
	UnlockInvalidCode= 0x20,
	UnlockInvalidSchedule= 0x40,
}

export enum DlManualOperationEventMask {
	Unknown= 0x001,
	ThumbturnLock= 0x002,
	ThumbturnUnlock= 0x004,
	OneTouchLock= 0x008,
	KeyLock= 0x010,
	KeyUnlock= 0x020,
	AutoLock= 0x040,
	ScheduleLock= 0x080,
	ScheduleUnlock= 0x100,
	ManualLock= 0x200,
	ManualUnlock= 0x400,
}

export enum DlRFIDOperationEventMask {
	Unknown= 0x01,
	Lock= 0x02,
	Unlock= 0x04,
	LockInvalidRFID= 0x08,
	LockInvalidSchedule= 0x10,
	UnlockInvalidRFID= 0x20,
	UnlockInvalidSchedule= 0x40,
}

export enum DlKeypadProgrammingEventMask {
	Unknown= 0x01,
	ProgrammingPINChanged= 0x02,
	PINAdded= 0x04,
	PINCleared= 0x08,
	PINChanged= 0x10,
}

export enum DlRemoteProgrammingEventMask {
	Unknown= 0x01,
	ProgrammingPINChanged= 0x02,
	PINAdded= 0x04,
	PINCleared= 0x08,
	PINChanged= 0x10,
	RFIDCodeAdded= 0x20,
	RFIDCodeCleared= 0x40,
}

export enum DlRFIDProgrammingEventMask {
	Unknown= 0x01,
	RFIDCodeAdded= 0x20,
	RFIDCodeCleared= 0x40,
}

export enum DoorLockDayOfWeek {
	Sunday= 0x01,
	Monday= 0x02,
	Tuesday= 0x04,
	Wednesday= 0x08,
	Thursday= 0x10,
	Friday= 0x20,
	Saturday= 0x40,
}

export interface CredentialStruct {
	CredentialType:CredentialTypeEnum,
	CredentialIndex:number,
}

/**
 * An interface to a generic way to secure a door
 */

export interface DoorLock {
id: 257;
	attributes: {
		readonly LockState?:DlLockState
		readonly LockType:DlLockType
		readonly ActuatorEnabled:boolean
		readonly DoorState?:DoorStateEnum
		DoorOpenEvents?:number
		DoorClosedEvents?:number
		OpenPeriod?:number
		readonly NumberOfTotalUsersSupported?:number
		readonly NumberOfPINUsersSupported?:number
		readonly NumberOfRFIDUsersSupported?:number
		readonly NumberOfWeekDaySchedulesSupportedPerUser?:number
		readonly NumberOfYearDaySchedulesSupportedPerUser?:number
		readonly NumberOfHolidaySchedulesSupported?:number
		readonly MaxPINCodeLength?:number
		readonly MinPINCodeLength?:number
		readonly MaxRFIDCodeLength?:number
		readonly MinRFIDCodeLength?:number
		readonly CredentialRulesSupport?:DlCredentialRuleMask
		readonly NumberOfCredentialsSupportedPerUser?:number
		Language?:string
		LEDSettings?:number
		AutoRelockTime?:number
		SoundVolume?:number
		OperatingMode:OperatingModeEnum
		readonly SupportedOperatingModes:DlSupportedOperatingModes
		readonly DefaultConfigurationRegister?:DlDefaultConfigurationRegister
		EnableLocalProgramming?:boolean
		EnableOneTouchLocking?:boolean
		EnableInsideStatusLED?:boolean
		EnablePrivacyModeButton?:boolean
		LocalProgrammingFeatures?:DlLocalProgrammingFeatures
		WrongCodeEntryLimit?:number
		UserCodeTemporaryDisableTime?:number
		SendPINOverTheAir?:boolean
		RequirePINforRemoteOperation?:boolean
		ExpiringUserTimeout?:number
		readonly AliroReaderVerificationKey?:import ("@akala/core").IsomorphicBuffer
		readonly AliroReaderGroupIdentifier?:import ("@akala/core").IsomorphicBuffer
		readonly AliroReaderGroupSubIdentifier?:import ("@akala/core").IsomorphicBuffer
		readonly AliroExpeditedTransactionSupportedProtocolVersions?:readonly import ("@akala/core").IsomorphicBuffer[]
		readonly AliroGroupResolvingKey?:import ("@akala/core").IsomorphicBuffer
		readonly AliroSupportedBLEUWBProtocolVersions?:readonly import ("@akala/core").IsomorphicBuffer[]
		readonly AliroBLEAdvertisingVersion?:number
		readonly NumberOfAliroCredentialIssuerKeysSupported?:number
		readonly NumberOfAliroEndpointKeysSupported?:number
		/** Lock supports PIN credentials (via keypad, or over-the-air) */
		readonly SupportsPINCredential: boolean
		/** Lock supports RFID credentials */
		readonly SupportsRFIDCredential: boolean
		/** Lock supports finger related credentials (fingerprint, finger vein) */
		readonly SupportsFingerCredentials: boolean
		/** Lock supports local/on-lock logging when Events are not supported */
		readonly SupportsLogging: boolean
		/** Lock supports week day user access schedules */
		readonly SupportsWeekDayAccessSchedules: boolean
		/** Lock supports a door position sensor that indicates door's state */
		readonly SupportsDoorPositionSensor: boolean
		/** Lock supports face related credentials (face, iris, retina) */
		readonly SupportsFaceCredentials: boolean
		/** PIN codes over-the-air supported for lock/unlock operations */
		readonly SupportsCredentialsOverTheAirAccess: boolean
		/** Lock supports the user commands and database */
		readonly SupportsUser: boolean
		/** Operation and Programming Notifications */
		readonly SupportsNotification: boolean
		/** Lock supports year day user access schedules */
		readonly SupportsYearDayAccessSchedules: boolean
		/** Lock supports holiday schedules */
		readonly SupportsHolidaySchedules: boolean
		/** Lock supports unbolting */
		readonly SupportsUnbolt: boolean
		/** AliroProvisioning */
		readonly SupportsAliroProvisioning: boolean
		/** AliroBLEUWB */
		readonly SupportsAliroBLEUWB: boolean
}
	commands: {
		/** This command causes the lock device to lock the door. */
		LockDoor: {
			inputparams: readonly [
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command causes the lock device to unlock the door. */
		UnlockDoor: {
			inputparams: readonly [
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command causes the lock device to unlock the door with a timeout parameter. */
		UnlockWithTimeout?: {
			inputparams: readonly [
				Timeout: number, 
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** Set a weekly repeating schedule for a specified user. */
		SetWeekDaySchedule?: {
			inputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
				DaysMask: DaysMaskMap, 
				StartHour: number, 
				StartMinute: number, 
				EndHour: number, 
				EndMinute: number, 
			],
			 outputparams: readonly []
            }
		/** Retrieve the specific weekly schedule for the specific user. */
		GetWeekDaySchedule?: {
			inputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
				Status: DlStatus, 
				DaysMask: DaysMaskMap, 
				StartHour: number, 
				StartMinute: number, 
				EndHour: number, 
				EndMinute: number, ]
            }
		/** Clear the specific weekly schedule or all weekly schedules for the specific user. */
		ClearWeekDaySchedule?: {
			inputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly []
            }
		/** Set a time-specific schedule ID for a specified user. */
		SetYearDaySchedule?: {
			inputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
				LocalStartTime: number, 
				LocalEndTime: number, 
			],
			 outputparams: readonly []
            }
		/** Returns the year day schedule data for the specified schedule and user indexes. */
		GetYearDaySchedule?: {
			inputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
				Status: DlStatus, 
				LocalStartTime: number, 
				LocalEndTime: number, ]
            }
		/** Clears the specific year day schedule or all year day schedules for the specific user. */
		ClearYearDaySchedule?: {
			inputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly []
            }
		/** Set the holiday Schedule by specifying local start time and local end time with respect to any Lock Operating Mode. */
		SetHolidaySchedule?: {
			inputparams: readonly [
				HolidayIndex: number, 
				LocalStartTime: number, 
				LocalEndTime: number, 
				OperatingMode: OperatingModeEnum, 
			],
			 outputparams: readonly []
            }
		/** Get the holiday schedule for the specified index. */
		GetHolidaySchedule?: {
			inputparams: readonly [
				HolidayIndex: number, 
			],
			 outputparams: readonly [
				HolidayIndex: number, 
				Status: DlStatus, 
				LocalStartTime: number, 
				LocalEndTime: number, 
				OperatingMode: OperatingModeEnum, ]
            }
		/** Clears the holiday schedule or all holiday schedules. */
		ClearHolidaySchedule?: {
			inputparams: readonly [
				HolidayIndex: number, 
			],
			 outputparams: readonly []
            }
		/** Set User into the lock. */
		SetUser?: {
			inputparams: readonly [
				OperationType: DataOperationTypeEnum, 
				UserIndex: number, 
				UserName: string, 
				UserUniqueID: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
				CredentialRule: CredentialRuleEnum, 
			],
			 outputparams: readonly []
            }
		/** Retrieve User. */
		GetUser?: {
			inputparams: readonly [
				UserIndex: number, 
			],
			 outputparams: readonly [
				UserIndex: number, 
				UserName: string, 
				UserUniqueID: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
				CredentialRule: CredentialRuleEnum, 
				Credentials: readonly CredentialStruct[][], 
				CreatorFabricIndex: number, 
				LastModifiedFabricIndex: number, 
				NextUserIndex: number, ]
            }
		/** Clears a User or all Users. */
		ClearUser?: {
			inputparams: readonly [
				UserIndex: number, 
			],
			 outputparams: readonly []
            }
		/** Set a credential (e.g. PIN, RFID, Fingerprint, etc.) into the lock for a new user, existing user, or ProgrammingUser. */
		SetCredential?: {
			inputparams: readonly [
				OperationType: DataOperationTypeEnum, 
				Credential: CredentialStruct, 
				CredentialData: import ("@akala/core").IsomorphicBuffer, 
				UserIndex: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
			],
			 outputparams: readonly [
				Status: DlStatus, 
				UserIndex: number, 
				NextCredentialIndex: number, ]
            }
		/** Retrieve the status of a particular credential (e.g. PIN, RFID, Fingerprint, etc.) by index. */
		GetCredentialStatus?: {
			inputparams: readonly [
				Credential: CredentialStruct, 
			],
			 outputparams: readonly [
				CredentialExists: boolean, 
				UserIndex: number, 
				CreatorFabricIndex: number, 
				LastModifiedFabricIndex: number, 
				NextCredentialIndex: number, 
				CredentialData: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Clear one, one type, or all credentials except ProgrammingPIN credential. */
		ClearCredential?: {
			inputparams: readonly [
				Credential: CredentialStruct, 
			],
			 outputparams: readonly []
            }
		/** This command causes the lock device to unlock the door without pulling the latch. */
		UnboltDoor?: {
			inputparams: readonly [
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command communicates an Aliro Reader configuration to the lock. */
		SetAliroReaderConfig?: {
			inputparams: readonly [
				SigningKey: import ("@akala/core").IsomorphicBuffer, 
				VerificationKey: import ("@akala/core").IsomorphicBuffer, 
				GroupIdentifier: import ("@akala/core").IsomorphicBuffer, 
				GroupResolvingKey: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command clears an existing Aliro Reader configuration for the lock. */
		ClearAliroReaderConfig?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		DoorLockAlarm: [
			
			AlarmCode: AlarmCodeEnum, ];
		DoorStateChange?: [
			
			DoorState: DoorStateEnum, ];
		LockOperation: [
			
			LockOperationType: LockOperationTypeEnum, 
			OperationSource: OperationSourceEnum, 
			UserIndex: number, 
			FabricIndex: number, 
			SourceNode: string, 
			Credentials: readonly CredentialStruct[], ];
		LockOperationError: [
			
			LockOperationType: LockOperationTypeEnum, 
			OperationSource: OperationSourceEnum, 
			OperationError: OperationErrorEnum, 
			UserIndex: number, 
			FabricIndex: number, 
			SourceNode: string, 
			Credentials: readonly CredentialStruct[], ];
		LockUserChange: [
			
			LockDataType: LockDataTypeEnum, 
			DataOperationType: DataOperationTypeEnum, 
			OperationSource: OperationSourceEnum, 
			UserIndex: number, 
			FabricIndex: number, 
			SourceNode: string, 
			DataIndex: number, ];
	}
}

export const doorLock: Cluster<DoorLock['attributes'], DoorLock['commands'], DoorLock['events']> = {
id: 257,
	attributes: {
		LockState:null,
		LockType:null,
		ActuatorEnabled:null,
		DoorState:null,
		DoorOpenEvents:0,
		DoorClosedEvents:0,
		OpenPeriod:0,
		NumberOfTotalUsersSupported:0,
		NumberOfPINUsersSupported:0,
		NumberOfRFIDUsersSupported:0,
		NumberOfWeekDaySchedulesSupportedPerUser:0,
		NumberOfYearDaySchedulesSupportedPerUser:0,
		NumberOfHolidaySchedulesSupported:0,
		MaxPINCodeLength:0,
		MinPINCodeLength:0,
		MaxRFIDCodeLength:0,
		MinRFIDCodeLength:0,
		CredentialRulesSupport:null,
		NumberOfCredentialsSupportedPerUser:0,
		Language:null,
		LEDSettings:0,
		AutoRelockTime:0,
		SoundVolume:0,
		OperatingMode:null,
		SupportedOperatingModes:null,
		DefaultConfigurationRegister:null,
		EnableLocalProgramming:null,
		EnableOneTouchLocking:null,
		EnableInsideStatusLED:null,
		EnablePrivacyModeButton:null,
		LocalProgrammingFeatures:null,
		WrongCodeEntryLimit:0,
		UserCodeTemporaryDisableTime:0,
		SendPINOverTheAir:null,
		RequirePINforRemoteOperation:null,
		ExpiringUserTimeout:0,
		AliroReaderVerificationKey:null,
		AliroReaderGroupIdentifier:null,
		AliroReaderGroupSubIdentifier:null,
		AliroExpeditedTransactionSupportedProtocolVersions:[],
		AliroGroupResolvingKey:null,
		AliroSupportedBLEUWBProtocolVersions:[],
		AliroBLEAdvertisingVersion:0,
		NumberOfAliroCredentialIssuerKeysSupported:0,
		NumberOfAliroEndpointKeysSupported:0,
		/** Lock supports PIN credentials (via keypad, or over-the-air) */
	SupportsPINCredential: false,
		/** Lock supports RFID credentials */
	SupportsRFIDCredential: false,
		/** Lock supports finger related credentials (fingerprint, finger vein) */
	SupportsFingerCredentials: false,
		/** Lock supports local/on-lock logging when Events are not supported */
	SupportsLogging: false,
		/** Lock supports week day user access schedules */
	SupportsWeekDayAccessSchedules: false,
		/** Lock supports a door position sensor that indicates door's state */
	SupportsDoorPositionSensor: false,
		/** Lock supports face related credentials (face, iris, retina) */
	SupportsFaceCredentials: false,
		/** PIN codes over-the-air supported for lock/unlock operations */
	SupportsCredentialsOverTheAirAccess: false,
		/** Lock supports the user commands and database */
	SupportsUser: false,
		/** Operation and Programming Notifications */
	SupportsNotification: false,
		/** Lock supports year day user access schedules */
	SupportsYearDayAccessSchedules: false,
		/** Lock supports holiday schedules */
	SupportsHolidaySchedules: false,
		/** Lock supports unbolting */
	SupportsUnbolt: false,
		/** AliroProvisioning */
	SupportsAliroProvisioning: false,
		/** AliroBLEUWB */
	SupportsAliroBLEUWB: false,
},
	commands: {
		/** This command causes the lock device to lock the door. */
		LockDoor: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** This command causes the lock device to unlock the door. */
		UnlockDoor: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** This command causes the lock device to unlock the door with a timeout parameter. */
		UnlockWithTimeout: {
			inputparams: [
				0, 
				null, 
			],
			 outputparams: []
            },
		/** Set a weekly repeating schedule for a specified user. */
		SetWeekDaySchedule: {
			inputparams: [
				0, 
				0, 
				null, 
				0, 
				0, 
				0, 
				0, 
			],
			 outputparams: []
            },
		/** Retrieve the specific weekly schedule for the specific user. */
		GetWeekDaySchedule: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: [
				0, 
				0, 
				null, 
				null, 
				0, 
				0, 
				0, 
				0, ]
            },
		/** Clear the specific weekly schedule or all weekly schedules for the specific user. */
		ClearWeekDaySchedule: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: []
            },
		/** Set a time-specific schedule ID for a specified user. */
		SetYearDaySchedule: {
			inputparams: [
				0, 
				0, 
				0, 
				0, 
			],
			 outputparams: []
            },
		/** Returns the year day schedule data for the specified schedule and user indexes. */
		GetYearDaySchedule: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: [
				0, 
				0, 
				null, 
				0, 
				0, ]
            },
		/** Clears the specific year day schedule or all year day schedules for the specific user. */
		ClearYearDaySchedule: {
			inputparams: [
				0, 
				0, 
			],
			 outputparams: []
            },
		/** Set the holiday Schedule by specifying local start time and local end time with respect to any Lock Operating Mode. */
		SetHolidaySchedule: {
			inputparams: [
				0, 
				0, 
				0, 
				null, 
			],
			 outputparams: []
            },
		/** Get the holiday schedule for the specified index. */
		GetHolidaySchedule: {
			inputparams: [
				0, 
			],
			 outputparams: [
				0, 
				null, 
				0, 
				0, 
				null, ]
            },
		/** Clears the holiday schedule or all holiday schedules. */
		ClearHolidaySchedule: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** Set User into the lock. */
		SetUser: {
			inputparams: [
				null, 
				0, 
				null, 
				0, 
				null, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** Retrieve User. */
		GetUser: {
			inputparams: [
				0, 
			],
			 outputparams: [
				0, 
				null, 
				0, 
				null, 
				null, 
				null, 
				[], 
				0, 
				0, 
				0, ]
            },
		/** Clears a User or all Users. */
		ClearUser: {
			inputparams: [
				0, 
			],
			 outputparams: []
            },
		/** Set a credential (e.g. PIN, RFID, Fingerprint, etc.) into the lock for a new user, existing user, or ProgrammingUser. */
		SetCredential: {
			inputparams: [
				null, 
				null, 
				null, 
				0, 
				null, 
				null, 
			],
			 outputparams: [
				null, 
				0, 
				0, ]
            },
		/** Retrieve the status of a particular credential (e.g. PIN, RFID, Fingerprint, etc.) by index. */
		GetCredentialStatus: {
			inputparams: [
				null, 
			],
			 outputparams: [
				null, 
				0, 
				0, 
				0, 
				0, 
				null, ]
            },
		/** Clear one, one type, or all credentials except ProgrammingPIN credential. */
		ClearCredential: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** This command causes the lock device to unlock the door without pulling the latch. */
		UnboltDoor: {
			inputparams: [
				null, 
			],
			 outputparams: []
            },
		/** This command communicates an Aliro Reader configuration to the lock. */
		SetAliroReaderConfig: {
			inputparams: [
				null, 
				null, 
				null, 
				null, 
			],
			 outputparams: []
            },
		/** This command clears an existing Aliro Reader configuration for the lock. */
		ClearAliroReaderConfig: {
			inputparams: [
			],
			 outputparams: []
            },
},
	events: {
		DoorLockAlarm: [
			
			null, ],
		DoorStateChange: [
			
			null, ],
		LockOperation: [
			
			null, 
			null, 
			0, 
			0, 
			null, 
			[], ],
		LockOperationError: [
			
			null, 
			null, 
			null, 
			0, 
			0, 
			null, 
			[], ],
		LockUserChange: [
			
			null, 
			null, 
			null, 
			0, 
			0, 
			null, 
			0, ],
	}
}

export default doorLock;
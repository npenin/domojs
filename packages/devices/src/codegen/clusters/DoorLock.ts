// This file is generated from DoorLock.xml - do not edit it directly
// Generated on 2025-12-22T10:19:30.359Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmCodeEnum {
	LockJammed = 0,
	LockFactoryReset = 1,
	LockRadioPowerCycled = 3,
	WrongCodeEntryLimit = 4,
	FrontEsceutcheonRemoved = 5,
	DoorForcedOpen = 6,
	DoorAjar = 7,
	ForcedUser = 8,
}

export enum CredentialRuleEnum {
	Single = 0,
	Dual = 1,
	Tri = 2,
}

export enum CredentialTypeEnum {
	ProgrammingPIN = 0,
	PIN = 1,
	RFID = 2,
	Fingerprint = 3,
	FingerVein = 4,
	Face = 5,
	AliroCredentialIssuerKey = 6,
	AliroEvictableEndpointKey = 7,
	AliroNonEvictableEndpointKey = 8,
}

export enum DataOperationTypeEnum {
	Add = 0,
	Clear = 1,
	Modify = 2,
}

export enum DoorStateEnum {
	DoorOpen = 0,
	DoorClosed = 1,
	DoorJammed = 2,
	DoorForcedOpen = 3,
	DoorUnspecifiedError = 4,
	DoorAjar = 5,
}

export enum EventTypeEnum {
	Operation = 0,
	Programming = 1,
	Alarm = 2,
}

export enum LEDSettingEnum {
	NoLEDSignal = 0,
	NoLEDSignalAccessAllowed = 1,
	LEDSignalAll = 2,
}

export enum LockDataTypeEnum {
	Unspecified = 0,
	ProgrammingCode = 1,
	UserIndex = 2,
	WeekDaySchedule = 3,
	YearDaySchedule = 4,
	HolidaySchedule = 5,
	PIN = 6,
	RFID = 7,
	Fingerprint = 8,
	FingerVein = 9,
	Face = 10,
	AliroCredentialIssuerKey = 11,
	AliroEvictableEndpointKey = 12,
	AliroNonEvictableEndpointKey = 13,
}

export enum LockOperationTypeEnum {
	Lock = 0,
	Unlock = 1,
	NonAccessUserEvent = 2,
	ForcedUserEvent = 3,
	Unlatch = 4,
}

export enum LockStateEnum {
	NotFullyLocked = 0,
	Locked = 1,
	Unlocked = 2,
	Unlatched = 3,
}

export enum LockTypeEnum {
	DeadBolt = 0,
	Magnetic = 1,
	Other = 2,
	Mortise = 3,
	Rim = 4,
	LatchBolt = 5,
	CylindricalLock = 6,
	TubularLock = 7,
	InterconnectedLock = 8,
	DeadLatch = 9,
	DoorFurniture = 10,
	Eurocylinder = 11,
}

export enum OperatingModeEnum {
	Normal = 0,
	Vacation = 1,
	Privacy = 2,
	NoRemoteLockUnlock = 3,
	Passage = 4,
}

export enum OperationErrorEnum {
	Unspecified = 0,
	InvalidCredential = 1,
	DisabledUserDenied = 2,
	Restricted = 3,
	InsufficientBattery = 4,
}

export enum OperationSourceEnum {
	Unspecified = 0,
	Manual = 1,
	ProprietaryRemote = 2,
	Keypad = 3,
	Auto = 4,
	Button = 5,
	Schedule = 6,
	Remote = 7,
	RFID = 8,
	Biometric = 9,
	Aliro = 10,
}

export enum SoundVolumeEnum {
	Silent = 0,
	Low = 1,
	High = 2,
	Medium = 3,
}

export enum StatusCodeEnum {
	DUPLICATE = 2,
	OCCUPIED = 3,
}

export enum UserStatusEnum {
	Available = 0,
	OccupiedEnabled = 1,
	OccupiedDisabled = 3,
}

export enum UserTypeEnum {
	UnrestrictedUser = 0,
	YearDayScheduleUser = 1,
	WeekDayScheduleUser = 2,
	ProgrammingUser = 3,
	NonAccessUser = 4,
	ForcedUser = 5,
	DisposableUser = 6,
	ExpiringUser = 7,
	ScheduleRestrictedUser = 8,
	RemoteOnlyUser = 9,
}

export enum AlarmMaskBitmap {
	__NotSet = 0,
		/** Locking Mechanism Jammed */
	LockJammed= 1<<0,
		/** Lock Reset to Factory Defaults */
	LockFactoryReset= 1<<1,
		/** RF Module Power Cycled */
	LockRadioPowerCycled= 1<<3,
		/** Tamper Alarm - wrong code entry limit */
	WrongCodeEntryLimit= 1<<4,
		/** Tamper Alarm - front escutcheon removed from main */
	FrontEscutcheonRemoved= 1<<5,
		/** Forced Door Open under Door Locked Condition */
	DoorForcedOpen= 1<<6,
}

export enum ConfigurationRegisterBitmap {
	__NotSet = 0,
		/** The state of local programming functionality */
	LocalProgramming= 1<<0,
		/** The state of the keypad interface */
	KeypadInterface= 1<<1,
		/** The state of the remote interface */
	RemoteInterface= 1<<2,
		/** Sound volume is set to Silent value */
	SoundVolume= 1<<5,
		/** Auto relock time it set to 0 */
	AutoRelockTime= 1<<6,
		/** LEDs is disabled */
	LEDSettings= 1<<7,
}

export enum CredentialRulesBitmap {
	__NotSet = 0,
		/** Only one credential is required for lock operation */
	Single= 1<<0,
		/** Any two credentials are required for lock operation */
	Dual= 1<<1,
		/** Any three credentials are required for lock operation */
	Tri= 1<<2,
}

export enum DaysMaskBitmap {
	__NotSet = 0,
		/** Schedule is applied on Sunday */
	Sunday= 1<<0,
		/** Schedule is applied on Monday */
	Monday= 1<<1,
		/** Schedule is applied on Tuesday */
	Tuesday= 1<<2,
		/** Schedule is applied on Wednesday */
	Wednesday= 1<<3,
		/** Schedule is applied on Thursday */
	Thursday= 1<<4,
		/** Schedule is applied on Friday */
	Friday= 1<<5,
		/** Schedule is applied on Saturday */
	Saturday= 1<<6,
}

export enum LocalProgrammingFeaturesBitmap {
	__NotSet = 0,
		/** The state of the ability to add users, credentials or schedules on the device */
	AddUsersCredentialsSchedules= 1<<0,
		/** The state of the ability to modify users, credentials or schedules on the device */
	ModifyUsersCredentialsSchedules= 1<<1,
		/** The state of the ability to clear users, credentials or schedules on the device */
	ClearUsersCredentialsSchedules= 1<<2,
		/** The state of the ability to adjust settings on the device */
	AdjustSettings= 1<<3,
}

export enum OperatingModesBitmap {
	__NotSet = 0,
		/** Normal operation mode */
	Normal= 1<<0,
		/** Vacation operation mode */
	Vacation= 1<<1,
		/** Privacy operation mode */
	Privacy= 1<<2,
		/** No remote lock and unlock operation mode */
	NoRemoteLockUnlock= 1<<3,
		/** Passage operation mode */
	Passage= 1<<4,
}

export interface CredentialStruct {
	CredentialType:CredentialTypeEnum,
	CredentialIndex:number,
}

export type DoorLock = DoorLockCluster & { id: 0x0101};

export interface DoorLockCluster {
id: 0x0101;
	attributes: {
		readonly LockState:LockStateEnum
		readonly LockType:LockTypeEnum
		readonly ActuatorEnabled:boolean
		readonly DoorState?:DoorStateEnum
		readonly DoorOpenEvents?:number
		readonly DoorClosedEvents?:number
		readonly OpenPeriod?:number
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
		readonly CredentialRulesSupport?:CredentialRulesBitmap
		readonly NumberOfCredentialsSupportedPerUser?:number
		readonly Language?:string
		readonly LEDSettings?:LEDSettingEnum
		readonly AutoRelockTime?:number
		readonly SoundVolume?:SoundVolumeEnum
		readonly OperatingMode:OperatingModeEnum
		readonly SupportedOperatingModes:OperatingModesBitmap
		readonly DefaultConfigurationRegister?:ConfigurationRegisterBitmap
		readonly EnableLocalProgramming?:boolean
		readonly EnableOneTouchLocking?:boolean
		readonly EnableInsideStatusLED?:boolean
		readonly EnablePrivacyModeButton?:boolean
		readonly LocalProgrammingFeatures?:LocalProgrammingFeaturesBitmap
		readonly WrongCodeEntryLimit?:number
		readonly UserCodeTemporaryDisableTime?:number
		readonly SendPINOverTheAir?:boolean
		readonly RequirePINforRemoteOperation?:boolean
		readonly ExpiringUserTimeout?:number
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
		/** Lock supports week day user access schedules */
		readonly SupportsWeekDayAccessSchedules: boolean
		/** Lock supports a door position sensor that indicates door's state */
		readonly SupportsDoorPositionSensor: boolean
		/** Lock supports face related credentials (face, iris, retina) */
		readonly SupportsFaceCredentials: boolean
		/** PIN codes over-the-air supported for lock/unlock operations */
		readonly SupportsCredentialOverTheAirAccess: boolean
		/** Lock supports the user commands and database */
		readonly SupportsUser: boolean
		/** Lock supports year day user access schedules */
		readonly SupportsYearDayAccessSchedules: boolean
		/** Lock supports holiday schedules */
		readonly SupportsHolidaySchedules: boolean
		/** Lock supports unbolting */
		readonly SupportsUnbolting: boolean
		/** Lock supports Aliro credential provisioning as defined in Aliro */
		readonly SupportsAliroProvisioning: boolean
		/** Lock supports the Bluetooth LE + UWB Access Control Flow as defined in Aliro */
		readonly SupportsAliroBLEUWB: boolean
}
	commands: {
		LockDoor: {
			inputparams: readonly [
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		UnlockDoor: {
			inputparams: readonly [
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		Toggle?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		UnlockWithTimeout?: {
			inputparams: readonly [
				Timeout: number, 
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		SetPINCode?: {
			inputparams: readonly [
				UserID: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
				PIN: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		GetPINCode?: {
			inputparams: readonly [
				UserID: number, 
			],
			 outputparams: readonly [
				UserID: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
				PINCode: import ("@akala/core").IsomorphicBuffer, ]
            }
		ClearPINCode?: {
			inputparams: readonly [
				PINSlotIndex: number, 
			],
			 outputparams: readonly []
            }
		ClearAllPINCodes?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		SetUserStatus?: {
			inputparams: readonly [
				UserID: number, 
				UserStatus: UserStatusEnum, 
			],
			 outputparams: readonly []
            }
		GetUserStatus?: {
			inputparams: readonly [
				UserID: number, 
			],
			 outputparams: readonly [
				UserID: number, 
				UserStatus: UserStatusEnum, ]
            }
		SetWeekDaySchedule?: {
			inputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
				DaysMask: DaysMaskBitmap, 
				StartHour: number, 
				StartMinute: number, 
				EndHour: number, 
				EndMinute: number, 
			],
			 outputparams: readonly []
            }
		GetWeekDaySchedule?: {
			inputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
				Status: number, 
				DaysMask: DaysMaskBitmap, 
				StartHour: number, 
				StartMinute: number, 
				EndHour: number, 
				EndMinute: number, ]
            }
		ClearWeekDaySchedule?: {
			inputparams: readonly [
				WeekDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly []
            }
		SetYearDaySchedule?: {
			inputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
				LocalStartTime: number, 
				LocalEndTime: number, 
			],
			 outputparams: readonly []
            }
		GetYearDaySchedule?: {
			inputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
				Status: number, 
				LocalStartTime: number, 
				LocalEndTime: number, ]
            }
		ClearYearDaySchedule?: {
			inputparams: readonly [
				YearDayIndex: number, 
				UserIndex: number, 
			],
			 outputparams: readonly []
            }
		SetHolidaySchedule?: {
			inputparams: readonly [
				HolidayIndex: number, 
				LocalStartTime: number, 
				LocalEndTime: number, 
				OperatingMode: OperatingModeEnum, 
			],
			 outputparams: readonly []
            }
		GetHolidaySchedule?: {
			inputparams: readonly [
				HolidayIndex: number, 
			],
			 outputparams: readonly [
				HolidayIndex: number, 
				Status: number, 
				LocalStartTime: number, 
				LocalEndTime: number, 
				OperatingMode: OperatingModeEnum, ]
            }
		ClearHolidaySchedule?: {
			inputparams: readonly [
				HolidayIndex: number, 
			],
			 outputparams: readonly []
            }
		SetUserType?: {
			inputparams: readonly [
				UserID: number, 
				UserType: UserTypeEnum, 
			],
			 outputparams: readonly []
            }
		GetUserType?: {
			inputparams: readonly [
				UserID: number, 
			],
			 outputparams: readonly [
				UserID: number, 
				UserType: UserTypeEnum, ]
            }
		SetRFIDCode?: {
			inputparams: readonly [
				UserID: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
				RFIDCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		GetRFIDCode?: {
			inputparams: readonly [
				UserID: number, 
			],
			 outputparams: readonly [
				UserID: number, 
				UserStatus: UserStatusEnum, 
				UserType: UserTypeEnum, 
				RFIDCode: import ("@akala/core").IsomorphicBuffer, ]
            }
		ClearRFIDCode?: {
			inputparams: readonly [
				RFIDSlotIndex: number, 
			],
			 outputparams: readonly []
            }
		ClearAllRFIDCodes?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
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
				Credentials: readonly CredentialStruct[], 
				CreatorFabricIndex: number, 
				LastModifiedFabricIndex: number, 
				NextUserIndex: number, ]
            }
		ClearUser?: {
			inputparams: readonly [
				UserIndex: number, 
			],
			 outputparams: readonly []
            }
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
				Status: number, 
				UserIndex: number, 
				NextCredentialIndex: number, ]
            }
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
		ClearCredential?: {
			inputparams: readonly [
				Credential: CredentialStruct, 
			],
			 outputparams: readonly []
            }
		UnboltDoor?: {
			inputparams: readonly [
				PINCode: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		SetAliroReaderConfig?: {
			inputparams: readonly [
				SigningKey: import ("@akala/core").IsomorphicBuffer, 
				VerificationKey: import ("@akala/core").IsomorphicBuffer, 
				GroupIdentifier: import ("@akala/core").IsomorphicBuffer, 
				GroupResolvingKey: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		ClearAliroReaderConfig?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
		DoorLockAlarm: [
			
			AlarmCode: AlarmCodeEnum, ];
		DoorStateChange: [
			
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

export const doorLock: ClusterDefinition<DoorLock> = {
id: 0x0101,
	attributes: [
		"LockState",
		"LockType",
		"ActuatorEnabled",
		"DoorState",
		"DoorOpenEvents",
		"DoorClosedEvents",
		"OpenPeriod",
		"NumberOfTotalUsersSupported",
		"NumberOfPINUsersSupported",
		"NumberOfRFIDUsersSupported",
		"NumberOfWeekDaySchedulesSupportedPerUser",
		"NumberOfYearDaySchedulesSupportedPerUser",
		"NumberOfHolidaySchedulesSupported",
		"MaxPINCodeLength",
		"MinPINCodeLength",
		"MaxRFIDCodeLength",
		"MinRFIDCodeLength",
		"CredentialRulesSupport",
		"NumberOfCredentialsSupportedPerUser",
		"Language",
		"LEDSettings",
		"AutoRelockTime",
		"SoundVolume",
		"OperatingMode",
		"SupportedOperatingModes",
		"DefaultConfigurationRegister",
		"EnableLocalProgramming",
		"EnableOneTouchLocking",
		"EnableInsideStatusLED",
		"EnablePrivacyModeButton",
		"LocalProgrammingFeatures",
		"WrongCodeEntryLimit",
		"UserCodeTemporaryDisableTime",
		"SendPINOverTheAir",
		"RequirePINforRemoteOperation",
		"ExpiringUserTimeout",
		"AliroReaderVerificationKey",
		"AliroReaderGroupIdentifier",
		"AliroReaderGroupSubIdentifier",
		"AliroExpeditedTransactionSupportedProtocolVersions",
		"AliroGroupResolvingKey",
		"AliroSupportedBLEUWBProtocolVersions",
		"AliroBLEAdvertisingVersion",
		"NumberOfAliroCredentialIssuerKeysSupported",
		"NumberOfAliroEndpointKeysSupported",
		"SupportsPINCredential",
		"SupportsRFIDCredential",
		"SupportsFingerCredentials",
		"SupportsWeekDayAccessSchedules",
		"SupportsDoorPositionSensor",
		"SupportsFaceCredentials",
		"SupportsCredentialOverTheAirAccess",
		"SupportsUser",
		"SupportsYearDayAccessSchedules",
		"SupportsHolidaySchedules",
		"SupportsUnbolting",
		"SupportsAliroProvisioning",
		"SupportsAliroBLEUWB",
	] as const,
	commands: [
		"LockDoor",
		"UnlockDoor",
		"Toggle",
		"UnlockWithTimeout",
		"SetPINCode",
		"GetPINCode",
		"ClearPINCode",
		"ClearAllPINCodes",
		"SetUserStatus",
		"GetUserStatus",
		"SetWeekDaySchedule",
		"GetWeekDaySchedule",
		"ClearWeekDaySchedule",
		"SetYearDaySchedule",
		"GetYearDaySchedule",
		"ClearYearDaySchedule",
		"SetHolidaySchedule",
		"GetHolidaySchedule",
		"ClearHolidaySchedule",
		"SetUserType",
		"GetUserType",
		"SetRFIDCode",
		"GetRFIDCode",
		"ClearRFIDCode",
		"ClearAllRFIDCodes",
		"SetUser",
		"GetUser",
		"ClearUser",
		"SetCredential",
		"GetCredentialStatus",
		"ClearCredential",
		"UnboltDoor",
		"SetAliroReaderConfig",
		"ClearAliroReaderConfig",
	] as const,
	events: [
	] as const
}

export default doorLock;
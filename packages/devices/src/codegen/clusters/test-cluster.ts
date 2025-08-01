

export enum SimpleEnum {
	Unspecified= 0,
	ValueA= 1,
	ValueB= 2,
	ValueC= 3,
}

export enum SimpleBitmap {
	ValueA= 0x1,
	ValueB= 0x2,
	ValueC= 0x4,
}

export enum Bitmap8MaskMap {
	MaskVal1= 0x01,
	MaskVal2= 0x02,
	MaskVal3= 0x04,
	MaskVal4= 0x40,
}

export enum Bitmap16MaskMap {
	MaskVal1= 0x01,
	MaskVal2= 0x02,
	MaskVal3= 0x04,
	MaskVal4= 0x4000,
}

export enum Bitmap32MaskMap {
	MaskVal1= 0x01,
	MaskVal2= 0x02,
	MaskVal3= 0x04,
	MaskVal4= 0x40000000,
}

export enum Bitmap64MaskMap {
	MaskVal1= 0x01,
	MaskVal2= 0x02,
	MaskVal3= 0x04,
	MaskVal4= 0x4000000000000000,
}

export interface TestListStructOctet {
	member1: bigint,
	member2:import ("@akala/core").IsomorphicBuffer,
}

export interface TestFabricScoped {
	fabricSensitiveInt8u: number,
	optionalFabricSensitiveInt8u?: number,
	nullableFabricSensitiveInt8u: number,
	nullableOptionalFabricSensitiveInt8u?: number,
	fabricSensitiveCharString: string,
	fabricSensitiveStruct:SimpleStruct,
	fabricSensitiveInt8uList: number,
}

export interface SimpleStruct {
	a: number,
	b:boolean,
	c:SimpleEnum,
	d:import ("@akala/core").IsomorphicBuffer,
	e: string,
	f:SimpleBitmap,
	g: number,
	h: number,
	i?:import("./global-enums.js").TestGlobalEnum,
}

export interface NestedStruct {
	a: number,
	b:boolean,
	c:SimpleStruct,
	d?:import("./global-structs.js").TestGlobalStruct,
}

export interface NestedStructList {
	a: number,
	b:boolean,
	c:SimpleStruct,
	d:SimpleStruct,
	e: number,
	f:import ("@akala/core").IsomorphicBuffer,
	g: number,
}

export interface DoubleNestedStructList {
	a:NestedStructList,
}

export interface NullablesAndOptionalsStruct {
	NullableInt: number,
	OptionalInt?: number,
	NullableOptionalInt?: number,
	NullableString: string,
	OptionalString?: string,
	NullableOptionalString?: string,
	NullableStruct:SimpleStruct,
	OptionalStruct?:SimpleStruct,
	NullableOptionalStruct?:SimpleStruct,
	NullableList:SimpleEnum,
	OptionalList?:SimpleEnum,
	NullableOptionalList?:SimpleEnum,
}

/**
 * The Test Cluster is meant to validate the generated code
 */

export interface UnitTesting {
id: 4294048773;
	attributes: {
		boolean?:boolean
		bitmap8?:Bitmap8MaskMap
		bitmap16?:Bitmap16MaskMap
		bitmap32?:Bitmap32MaskMap
		bitmap64?:Bitmap64MaskMap
		int8u?: number
		int16u?: number
		int24u?: number
		int32u?: number
		int40u?: bigint
		int48u?: bigint
		int56u?: bigint
		int64u?: bigint
		int8s?: number
		int16s?: number
		int24s?: number
		int32s?: number
		int40s?: bigint
		int48s?: bigint
		int56s?: bigint
		int64s?: bigint
		enum8?: number
		enum16?: number
		float_single?: number
		float_double?: number
		octet_string?:import ("@akala/core").IsomorphicBuffer
		list_int8u?:readonly  number[]
		list_octet_string?:readonly import ("@akala/core").IsomorphicBuffer[]
		list_struct_octet_string?:readonly TestListStructOctet[]
		long_octet_string?:import ("@akala/core").IsomorphicBuffer
		char_string?: string
		long_char_string?: string
		epoch_us?: number
		epoch_s?: number
		vendor_id?: number
		list_nullables_and_optionals_struct?:readonly NullablesAndOptionalsStruct[]
		enum_attr?:SimpleEnum
		struct_attr?:SimpleStruct
		range_restricted_int8u?: number
		range_restricted_int8s?: number
		range_restricted_int16u?: number
		range_restricted_int16s?: number
		list_long_octet_string?:readonly import ("@akala/core").IsomorphicBuffer[]
		list_fabric_scoped?:readonly TestFabricScoped[]
		timed_write_boolean:boolean
		general_error_boolean?:boolean
		cluster_error_boolean?:boolean
		global_enum:import("./global-enums.js").TestGlobalEnum
		global_struct:import("./global-structs.js").TestGlobalStruct
		readFailureCode?: number
		failureInt32U?: number
		nullable_boolean?:boolean
		nullable_bitmap8?:Bitmap8MaskMap
		nullable_bitmap16?:Bitmap16MaskMap
		nullable_bitmap32?:Bitmap32MaskMap
		nullable_bitmap64?:Bitmap64MaskMap
		nullable_int8u?: number
		nullable_int16u?: number
		nullable_int24u?: number
		nullable_int32u?: number
		nullable_int40u?: bigint
		nullable_int48u?: bigint
		nullable_int56u?: bigint
		nullable_int64u?: bigint
		nullable_int8s?: number
		nullable_int16s?: number
		nullable_int24s?: number
		nullable_int32s?: number
		nullable_int40s?: bigint
		nullable_int48s?: bigint
		nullable_int56s?: bigint
		nullable_int64s?: bigint
		nullable_enum8?: number
		nullable_enum16?: number
		nullable_float_single?: number
		nullable_float_double?: number
		nullable_octet_string?:import ("@akala/core").IsomorphicBuffer
		nullable_char_string?: string
		nullable_enum_attr?:SimpleEnum
		nullable_struct?:SimpleStruct
		nullable_range_restricted_int8u?: number
		nullable_range_restricted_int8s?: number
		nullable_range_restricted_int16u?: number
		nullable_range_restricted_int16s?: number
		write_only_int8u?: number
		nullable_global_enum?:import("./global-enums.js").TestGlobalEnum
		nullable_global_struct?:import("./global-structs.js").TestGlobalStruct
		mei_int8u?: number
		unsupported?:boolean
		UnsupportedAttributeRequiringAdminPrivilege?:boolean
}
	commands: {
		/** Simple command without any parameters and without a specific response.
        To aid in unit testing, this command will re-initialize attribute storage to defaults. */
		Test: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Simple command without any parameters and without a specific response not handled by the server */
		TestNotHandled: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Simple command without any parameters and with a specific response */
		TestSpecific: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				returnValue:  number, ]
            }
		/** Simple command that should not be added to the server. */
		TestUnknownCommand?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Command that takes two arguments and returns their sum. */
		TestAddArguments?: {
			inputparams: readonly [
				arg1:  number, 
				arg2:  number, 
			],
			 outputparams: readonly [
				returnValue:  number, ]
            }
		/** Command that takes an argument which is bool */
		TestSimpleArgumentRequest?: {
			inputparams: readonly [
				arg1: boolean, 
			],
			 outputparams: readonly [
				returnValue: boolean, ]
            }
		/** Command that takes various arguments that are arrays, including an array of structs which have a list member. */
		TestStructArrayArgumentRequest?: {
			inputparams: readonly [
				arg1: NestedStructList[], 
				arg2: SimpleStruct[], 
				arg3: SimpleEnum[], 
				arg4: boolean[], 
				arg5: SimpleEnum, 
				arg6: boolean, 
			],
			 outputparams: readonly [
				arg1: NestedStructList[], 
				arg2: SimpleStruct[], 
				arg3: SimpleEnum[], 
				arg4: boolean[], 
				arg5: SimpleEnum, 
				arg6: boolean, ]
            }
		/** Command that takes an argument which is struct.  The response echoes the
        'b' field of the single arg. */
		TestStructArgumentRequest?: {
			inputparams: readonly [
				arg1: SimpleStruct, 
			],
			 outputparams: readonly [
				value: boolean, ]
            }
		/** Command that takes an argument which is nested struct.  The response
        echoes the 'b' field of ar1.c. */
		TestNestedStructArgumentRequest?: {
			inputparams: readonly [
				arg1: NestedStruct, 
			],
			 outputparams: readonly [
				value: boolean, ]
            }
		/** Command that takes an argument which is a list of structs.  The response
        returns false if there is some struct in the list whose 'b' field is
        false, and true otherwise (including if the list is empty). */
		TestListStructArgumentRequest?: {
			inputparams: readonly [
				arg1: SimpleStruct[], 
			],
			 outputparams: readonly [
				value: boolean, ]
            }
		/** Command that takes an argument which is a list of INT8U.  The response
        returns false if the list contains a 0 in it, true otherwise (including
        if the list is empty). */
		TestListInt8UArgumentRequest?: {
			inputparams: readonly [
				arg1:  number[], 
			],
			 outputparams: readonly [
				value: boolean, ]
            }
		/** Command that takes an argument which is a Nested Struct List.  The
        response returns false if there is some struct in arg1 (either directly
        in arg1.c or in the arg1.d list) whose 'b' field is false, and true
        otherwise. */
		TestNestedStructListArgumentRequest?: {
			inputparams: readonly [
				arg1: NestedStructList, 
			],
			 outputparams: readonly [
				value: boolean, ]
            }
		/** Command that takes an argument which is a list of Nested Struct List.
        The response returns false if there is some struct in arg1 (either
        directly in as the 'c' field of an entry 'd' list of an entry) whose 'b'
        field is false, and true otherwise (including if the list is empty). */
		TestListNestedStructListArgumentRequest?: {
			inputparams: readonly [
				arg1: NestedStructList[], 
			],
			 outputparams: readonly [
				value: boolean, ]
            }
		/** Command that takes an argument which is a list of INT8U and expects a
        response that reverses the list. */
		TestListInt8UReverseRequest?: {
			inputparams: readonly [
				arg1:  number[], 
			],
			 outputparams: readonly [
				arg1:  number[], ]
            }
		/** Command that sends a vendor id and an enum.  The server is expected to
        echo them back. */
		TestEnumsRequest?: {
			inputparams: readonly [
				arg1:  number, 
				arg2: SimpleEnum, 
			],
			 outputparams: readonly [
				arg1:  number, 
				arg2: SimpleEnum, ]
            }
		/** Command that takes an argument which is nullable and optional.  The
        response returns a boolean indicating whether the argument was present,
        if that's true a boolean indicating whether the argument was null, and
        if that' false the argument it received. */
		TestNullableOptionalRequest?: {
			inputparams: readonly [
				arg1:  number, 
			],
			 outputparams: readonly [
				wasPresent: boolean, 
				wasNull: boolean, 
				value:  number, 
				originalValue:  number, ]
            }
		/** Command that takes various arguments which can be nullable and/or optional.  The
        response returns information about which things were received and what
        their state was. */
		TestComplexNullableOptionalRequest?: {
			inputparams: readonly [
				NullableInt:  number, 
				OptionalInt:  number, 
				NullableOptionalInt:  number, 
				NullableString:  string, 
				OptionalString:  string, 
				NullableOptionalString:  string, 
				NullableStruct: SimpleStruct, 
				OptionalStruct: SimpleStruct, 
				NullableOptionalStruct: SimpleStruct, 
				NullableList: SimpleEnum[], 
				OptionalList: SimpleEnum[], 
				NullableOptionalList: SimpleEnum[], 
			],
			 outputparams: readonly [
				NullableIntWasNull: boolean, 
				NullableIntValue:  number, 
				OptionalIntWasPresent: boolean, 
				OptionalIntValue:  number, 
				NullableOptionalIntWasPresent: boolean, 
				NullableOptionalIntWasNull: boolean, 
				NullableOptionalIntValue:  number, 
				NullableStringWasNull: boolean, 
				NullableStringValue:  string, 
				OptionalStringWasPresent: boolean, 
				OptionalStringValue:  string, 
				NullableOptionalStringWasPresent: boolean, 
				NullableOptionalStringWasNull: boolean, 
				NullableOptionalStringValue:  string, 
				NullableStructWasNull: boolean, 
				NullableStructValue: SimpleStruct, 
				OptionalStructWasPresent: boolean, 
				OptionalStructValue: SimpleStruct, 
				NullableOptionalStructWasPresent: boolean, 
				NullableOptionalStructWasNull: boolean, 
				NullableOptionalStructValue: SimpleStruct, 
				NullableListWasNull: boolean, 
				NullableListValue: SimpleEnum[], 
				OptionalListWasPresent: boolean, 
				OptionalListValue: SimpleEnum[], 
				NullableOptionalListWasPresent: boolean, 
				NullableOptionalListWasNull: boolean, 
				NullableOptionalListValue: SimpleEnum[], ]
            }
		/** Command that takes an argument which is a struct.  The response echoes
        the struct back. */
		SimpleStructEchoRequest?: {
			inputparams: readonly [
				arg1: SimpleStruct, 
			],
			 outputparams: readonly [
				arg1: SimpleStruct, ]
            }
		/** Command that just responds with a success status if the timed invoke
        conditions are met. */
		TimedInvokeRequest?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Command that takes an optional argument which is bool. It responds with a success value if the optional is set to any value. */
		TestSimpleOptionalArgumentRequest?: {
			inputparams: readonly [
				arg1: boolean, 
			],
			 outputparams: readonly []
            }
		/** Command that takes identical arguments to the fields of the TestEvent and logs the TestEvent to the buffer.  Command returns an event ID as the response. */
		TestEmitTestEventRequest?: {
			inputparams: readonly [
				arg1:  number, 
				arg2: SimpleEnum, 
				arg3: boolean, 
			],
			 outputparams: readonly [
				value:  bigint, ]
            }
		/** Command that takes identical arguments to the fields of the TestFabricScopedEvent and logs the TestFabricScopedEvent to the buffer.  Command returns an event ID as the response. */
		TestEmitTestFabricScopedEventRequest?: {
			inputparams: readonly [
				arg1:  number, 
			],
			 outputparams: readonly [
				value:  bigint, ]
            }
		/** Command that responds after sleepBeforeResponseTimeMs with an octet_string the size requested with fillCharacter. */
		TestBatchHelperRequest?: {
			inputparams: readonly [
				sleepBeforeResponseTimeMs:  number, 
				sizeOfResponseBuffer:  number, 
				fillCharacter:  number, 
			],
			 outputparams: readonly [
				buffer: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Second command that responds after sleepBeforeResponseTimeMs with an octet_string the size requested with fillCharacter. */
		TestSecondBatchHelperRequest?: {
			inputparams: readonly [
				sleepBeforeResponseTimeMs:  number, 
				sizeOfResponseBuffer:  number, 
				fillCharacter:  number, 
			],
			 outputparams: readonly [
				buffer: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Command that takes an argument which is an octet string.  The response echoes
        the string back. If the string is large then it would require a session that
        supports large payloads. */
		StringEchoRequest?: {
			inputparams: readonly [
				payload: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly [
				payload: import ("@akala/core").IsomorphicBuffer, ]
            }
		/** Command that takes arguments that are global structs/enums and the
        response just echoes them back. */
		GlobalEchoRequest?: {
			inputparams: readonly [
				field1: import("./global-structs.js").TestGlobalStruct, 
				field2: import("./global-enums.js").TestGlobalEnum, 
			],
			 outputparams: readonly [
				field1: import("./global-structs.js").TestGlobalStruct, 
				field2: import("./global-enums.js").TestGlobalEnum, ]
            }
		/** Command that returns Success if the CommandFlags pass all checks at the IM layer.
        Otherwise, return appropriate StatusCode back. */
		TestCheckCommandFlags?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
		/** Command having a different MEI vendor ID than the cluster. Also emits TestDifferentVendorMeiEvent. */
		TestDifferentVendorMeiRequest?: {
			inputparams: readonly [
				arg1:  number, 
			],
			 outputparams: readonly [
				arg1:  number, 
				eventNumber:  bigint, ]
            }
}
	events: {
		TestEvent: [
			
			arg1:  number, 
			arg2: SimpleEnum, 
			arg3: boolean, 
			arg4: SimpleStruct, 
			arg5: SimpleStruct, 
			arg6: SimpleEnum, ];
		TestFabricScopedEvent: [
			];
		TestDifferentVendorMeiEvent: [
			
			arg1:  number, ];
	}
}
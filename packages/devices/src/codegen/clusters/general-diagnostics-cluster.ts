// This file is generated from general-diagnostics-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:11.089Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum HardwareFaultEnum {
	Unspecified= 0,
	Radio= 1,
	Sensor= 2,
	ResettableOverTemp= 3,
	NonResettableOverTemp= 4,
	PowerSource= 5,
	VisualDisplayFault= 6,
	AudioOutputFault= 7,
	UserInterfaceFault= 8,
	NonVolatileMemoryError= 9,
	TamperDetected= 10,
}

export enum RadioFaultEnum {
	Unspecified= 0,
	WiFiFault= 1,
	CellularFault= 2,
	ThreadFault= 3,
	NFCFault= 4,
	BLEFault= 5,
	EthernetFault= 6,
}

export enum NetworkFaultEnum {
	Unspecified= 0,
	HardwareFailure= 1,
	NetworkJammed= 2,
	ConnectionFailed= 3,
}

export enum BootReasonEnum {
	Unspecified= 0,
	PowerOnReboot= 1,
	BrownOutReset= 2,
	SoftwareWatchdogReset= 3,
	HardwareWatchdogReset= 4,
	SoftwareUpdateCompleted= 5,
	SoftwareReset= 6,
}

export enum InterfaceTypeEnum {
	Unspecified= 0,
	WiFi= 1,
	Ethernet= 2,
	Cellular= 3,
	Thread= 4,
}

export interface DeviceLoadStruct {
	CurrentSubscriptions:number,
	CurrentSubscriptionsForFabric:number,
	TotalSubscriptionsEstablished:number,
	TotalInteractionModelMessagesSent:number,
	TotalInteractionModelMessagesReceived:number,
}

export interface NetworkInterface {
	Name:string,
	IsOperational:boolean,
	OffPremiseServicesReachableIPv4:boolean,
	OffPremiseServicesReachableIPv6:boolean,
	HardwareAddress:import ("@akala/core").IsomorphicBuffer,
	IPv4Addresses:readonly import ("@akala/core").IsomorphicBuffer[],
	IPv6Addresses:readonly import ("@akala/core").IsomorphicBuffer[],
	Type:InterfaceTypeEnum,
}

/**
 * The General Diagnostics Cluster, along with other diagnostics clusters, provide a means to acquire standardized diagnostics metrics that MAY be used by a Node to assist a user or Administrative Node in diagnosing potential problems.
 */

export interface GeneralDiagnostics {
id: 51;
	attributes: {
		readonly NetworkInterfaces:readonly NetworkInterface[]
		readonly RebootCount:number
		readonly UpTime?:bigint
		readonly TotalOperationalHours?:number
		readonly BootReason?:BootReasonEnum
		readonly ActiveHardwareFaults?:readonly HardwareFaultEnum[]
		readonly ActiveRadioFaults?:readonly RadioFaultEnum[]
		readonly ActiveNetworkFaults?:readonly NetworkFaultEnum[]
		readonly TestEventTriggersEnabled:boolean
		readonly DeviceLoadStatus?:DeviceLoadStruct
		/** Support specific testing needs for extended Data Model features */
		readonly SupportsDataModelTest: boolean
		/** Support for reporting device load metrics (mandatory in revision 3 and above) */
		readonly SupportsDeviceLoad: boolean
}
	commands: {
		/** This command SHALL be supported to provide a means for certification tests to trigger some test-plan-specific events, necessary to assist in automation of device interactions for some certification test cases. */
		TestEventTrigger: {
			inputparams: readonly [
				EnableKey: import ("@akala/core").IsomorphicBuffer, 
				EventTrigger: bigint, 
			],
			 outputparams: readonly []
            }
		/** This command MAY be used by a client to obtain a correlated view of both System Time, and, if currently synchronized and supported, "wall clock time" of the server. */
		TimeSnapshot: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				SystemTimeMs: number, 
				PosixTimeMs: number, ]
            }
		/** This command provides a means for certification tests or manufacturer's internal tests to validate particular command handling and encoding constraints by generating a response of a given size. */
		PayloadTestRequest?: {
			inputparams: readonly [
				EnableKey: import ("@akala/core").IsomorphicBuffer, 
				Value: number, 
				Count: number, 
			],
			 outputparams: readonly [
				Payload: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
		HardwareFaultChange?: [
			
			Current: readonly HardwareFaultEnum[], 
			Previous: readonly HardwareFaultEnum[], ];
		RadioFaultChange?: [
			
			Current: readonly RadioFaultEnum[], 
			Previous: readonly RadioFaultEnum[], ];
		NetworkFaultChange?: [
			
			Current: readonly NetworkFaultEnum[], 
			Previous: readonly NetworkFaultEnum[], ];
		BootReason: [
			
			BootReason: BootReasonEnum, ];
	}
}

export const generalDiagnostics: ClusterDefinition<GeneralDiagnostics> = {
id: 51,
	attributes: [
		"NetworkInterfaces",
		"RebootCount",
		"UpTime",
		"TotalOperationalHours",
		"BootReason",
		"ActiveHardwareFaults",
		"ActiveRadioFaults",
		"ActiveNetworkFaults",
		"TestEventTriggersEnabled",
		"DeviceLoadStatus",
		"SupportsDataModelTest",
		"SupportsDeviceLoad",
	] as const,
	commands: [
		"TestEventTrigger",
		"TimeSnapshot",
		"PayloadTestRequest",
	] as const,
	events: [
		"HardwareFaultChange",
		"RadioFaultChange",
		"NetworkFaultChange",
		"BootReason",
	] as const
}

export default generalDiagnostics;
// This file is generated from DiagnosticsGeneral.xml - do not edit it directly
// Generated on 2025-12-18T03:05:00.409Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum BootReasonEnum {
	Unspecified = 0,
	PowerOnReboot = 1,
	BrownOutReset = 2,
	SoftwareWatchdogReset = 3,
	HardwareWatchdogReset = 4,
	SoftwareUpdateCompleted = 5,
	SoftwareReset = 6,
}

export enum HardwareFaultEnum {
	Unspecified = 0,
	Radio = 1,
	Sensor = 2,
	ResettableOverTemp = 3,
	NonResettableOverTemp = 4,
	PowerSource = 5,
	VisualDisplayFault = 6,
	AudioOutputFault = 7,
	UserInterfaceFault = 8,
	NonVolatileMemoryError = 9,
	TamperDetected = 10,
}

export enum InterfaceTypeEnum {
	Unspecified = 0,
	WiFi = 1,
	Ethernet = 2,
	Cellular = 3,
	Thread = 4,
}

export enum NetworkFaultEnum {
	Unspecified = 0,
	HardwareFailure = 1,
	NetworkJammed = 2,
	ConnectionFailed = 3,
}

export enum RadioFaultEnum {
	Unspecified = 0,
	WiFiFault = 1,
	CellularFault = 2,
	ThreadFault = 3,
	NFCFault = 4,
	BLEFault = 5,
	EthernetFault = 6,
}

export interface NetworkInterface {
	Name:string,
	IsOperational:boolean,
	OffPremiseServicesReachableIPv4:boolean,
	OffPremiseServicesReachableIPv6:boolean,
	HardwareAddress:bigint,
	IPv4Addresses:readonly number[],
	IPv6Addresses:readonly bigint[],
	Type:InterfaceTypeEnum,
}

export type GeneralDiagnostics = GeneralDiagnosticsCluster & { id: 0x0033};

export interface GeneralDiagnosticsCluster {
id: 0x0033;
	attributes: {
		readonly NetworkInterfaces:readonly NetworkInterface[]
		readonly RebootCount:number
		readonly UpTime:bigint
		readonly TotalOperationalHours?:number
		readonly BootReason?:BootReasonEnum
		readonly ActiveHardwareFaults?:readonly HardwareFaultEnum[]
		readonly ActiveRadioFaults?:readonly RadioFaultEnum[]
		readonly ActiveNetworkFaults?:readonly NetworkFaultEnum[]
		readonly TestEventTriggersEnabled:boolean
		/** Support specific testing needs for extended Data Model features */
		readonly SupportsDataModelTest: boolean
}
	commands: {
		TestEventTrigger: {
			inputparams: readonly [
				EnableKey: import ("@akala/core").IsomorphicBuffer, 
				EventTrigger: bigint, 
			],
			 outputparams: readonly []
            }
		TimeSnapshot: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				SystemTimeMs: number, 
				PosixTimeMs: number, ]
            }
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
		HardwareFaultChange: [
			
			Current: readonly HardwareFaultEnum[], 
			Previous: readonly HardwareFaultEnum[], ];
		RadioFaultChange: [
			
			Current: readonly RadioFaultEnum[], 
			Previous: readonly RadioFaultEnum[], ];
		NetworkFaultChange: [
			
			Current: readonly NetworkFaultEnum[], 
			Previous: readonly NetworkFaultEnum[], ];
		BootReason: [
			
			BootReason: BootReasonEnum, ];
	}
}

export const generalDiagnostics: ClusterDefinition<GeneralDiagnostics> = {
id: 0x0033,
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
		"SupportsDataModelTest",
	] as const,
	commands: [
		"TestEventTrigger",
		"TimeSnapshot",
		"PayloadTestRequest",
	] as const,
	events: [
	] as const
}

export default generalDiagnostics;
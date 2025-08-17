// This file is generated from power-source-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.199Z

import { Cluster } from '../../server/clients/shared.js';


export enum WiredFaultEnum {
	Unspecified= 0,
	OverVoltage= 1,
	UnderVoltage= 2,
}

export enum BatFaultEnum {
	Unspecified= 0,
	OverTemp= 1,
	UnderTemp= 2,
}

export enum BatChargeFaultEnum {
	Unspecified= 0,
	AmbientTooHot= 1,
	AmbientTooCold= 2,
	BatteryTooHot= 3,
	BatteryTooCold= 4,
	BatteryAbsent= 5,
	BatteryOverVoltage= 6,
	BatteryUnderVoltage= 7,
	ChargerOverVoltage= 8,
	ChargerUnderVoltage= 9,
	SafetyTimeout= 10,
}

export enum PowerSourceStatusEnum {
	Unspecified= 0,
	Active= 1,
	Standby= 2,
	Unavailable= 3,
}

export enum WiredCurrentTypeEnum {
	AC= 0,
	DC= 1,
}

export enum BatChargeLevelEnum {
	OK= 0,
	Warning= 1,
	Critical= 2,
}

export enum BatReplaceabilityEnum {
	Unspecified= 0,
	NotReplaceable= 1,
	UserReplaceable= 2,
	FactoryReplaceable= 3,
}

export enum BatChargeStateEnum {
	Unknown= 0,
	IsCharging= 1,
	IsAtFullCharge= 2,
	IsNotCharging= 3,
}

export enum BatCommonDesignationEnum {
	Unspecified= 0,
	AAA= 1,
	AA= 2,
	C= 3,
	D= 4,
	__4v5= 5,
	__6v0= 6,
	__9v0= 7,
	__1_2AA= 8,
	AAAA= 9,
	A= 10,
	B= 11,
	F= 12,
	N= 13,
	No6= 14,
	SubC= 15,
	A23= 16,
	A27= 17,
	BA5800= 18,
	Duplex= 19,
	__4SR44= 20,
	__523= 21,
	__531= 22,
	__15v0= 23,
	__22v5= 24,
	__30v0= 25,
	__45v0= 26,
	__67v5= 27,
	J= 28,
	CR123A= 29,
	CR2= 30,
	__2CR5= 31,
	CRP2= 32,
	CRV3= 33,
	SR41= 34,
	SR43= 35,
	SR44= 36,
	SR45= 37,
	SR48= 38,
	SR54= 39,
	SR55= 40,
	SR57= 41,
	SR58= 42,
	SR59= 43,
	SR60= 44,
	SR63= 45,
	SR64= 46,
	SR65= 47,
	SR66= 48,
	SR67= 49,
	SR68= 50,
	SR69= 51,
	SR516= 52,
	SR731= 53,
	SR712= 54,
	LR932= 55,
	A5= 56,
	A10= 57,
	A13= 58,
	A312= 59,
	A675= 60,
	AC41E= 61,
	__10180= 62,
	__10280= 63,
	__10440= 64,
	__14250= 65,
	__14430= 66,
	__14500= 67,
	__14650= 68,
	__15270= 69,
	__16340= 70,
	RCR123A= 71,
	__17500= 72,
	__17670= 73,
	__18350= 74,
	__18500= 75,
	__18650= 76,
	__19670= 77,
	__25500= 78,
	__26650= 79,
	__32600= 80,
}

export enum BatApprovedChemistryEnum {
	Unspecified= 0,
	Alkaline= 1,
	LithiumCarbonFluoride= 2,
	LithiumChromiumOxide= 3,
	LithiumCopperOxide= 4,
	LithiumIronDisulfide= 5,
	LithiumManganeseDioxide= 6,
	LithiumThionylChloride= 7,
	Magnesium= 8,
	MercuryOxide= 9,
	NickelOxyhydride= 10,
	SilverOxide= 11,
	ZincAir= 12,
	ZincCarbon= 13,
	ZincChloride= 14,
	ZincManganeseDioxide= 15,
	LeadAcid= 16,
	LithiumCobaltOxide= 17,
	LithiumIon= 18,
	LithiumIonPolymer= 19,
	LithiumIronPhosphate= 20,
	LithiumSulfur= 21,
	LithiumTitanate= 22,
	NickelCadmium= 23,
	NickelHydrogen= 24,
	NickelIron= 25,
	NickelMetalHydride= 26,
	NickelZinc= 27,
	SilverZinc= 28,
	SodiumIon= 29,
	SodiumSulfur= 30,
	ZincBromide= 31,
	ZincCerium= 32,
}

export interface WiredFaultChangeType {
	current:readonly WiredFaultEnum[],
	previous:readonly WiredFaultEnum[],
}

export interface BatFaultChangeType {
	current:readonly BatFaultEnum[],
	previous:readonly BatFaultEnum[],
}

export interface BatChargeFaultChangeType {
	current:readonly BatChargeFaultEnum[],
	previous:readonly BatChargeFaultEnum[],
}

/**
 * This cluster is used to describe the configuration and capabilities of a physical power source that provides power to the Node.
 */

export interface PowerSource {
id: 47;
	attributes: {
		readonly Status:PowerSourceStatusEnum
		readonly Order:number
		readonly Description:string
		readonly WiredAssessedInputVoltage?:number
		readonly WiredAssessedInputFrequency?:number
		readonly WiredCurrentType?:WiredCurrentTypeEnum
		readonly WiredAssessedCurrent?:number
		readonly WiredNominalVoltage?:number
		readonly WiredMaximumCurrent?:number
		readonly WiredPresent?:boolean
		readonly ActiveWiredFaults?:readonly WiredFaultEnum[]
		readonly BatVoltage?:number
		readonly BatPercentRemaining?:number
		readonly BatTimeRemaining?:number
		readonly BatChargeLevel?:BatChargeLevelEnum
		readonly BatReplacementNeeded?:boolean
		readonly BatReplaceability?:BatReplaceabilityEnum
		readonly BatPresent?:boolean
		readonly ActiveBatFaults?:readonly BatFaultEnum[]
		readonly BatReplacementDescription?:string
		readonly BatCommonDesignation?:BatCommonDesignationEnum
		readonly BatANSIDesignation?:string
		readonly BatIECDesignation?:string
		readonly BatApprovedChemistry?:BatApprovedChemistryEnum
		readonly BatCapacity?:number
		readonly BatQuantity?:number
		readonly BatChargeState?:BatChargeStateEnum
		readonly BatTimeToFullCharge?:number
		readonly BatFunctionalWhileCharging?:boolean
		readonly BatChargingCurrent?:number
		readonly ActiveBatChargeFaults?:readonly BatChargeFaultEnum[]
		readonly EndpointList:readonly number[]
		/** A wired power source */
		readonly SupportsWired: boolean
		/** A battery power source */
		readonly SupportsBattery: boolean
		/** A rechargeable battery power source */
		readonly SupportsRechargeable: boolean
		/** A replaceable battery power source */
		readonly SupportsReplaceable: boolean
}
	commands: {
}
	events: {
		WiredFaultChange?: [
			
			Current: readonly WiredFaultEnum[], 
			Previous: readonly WiredFaultEnum[], ];
		BatFaultChange?: [
			
			Current: readonly BatFaultEnum[], 
			Previous: readonly BatFaultEnum[], ];
		BatChargeFaultChange?: [
			
			Current: readonly BatChargeFaultEnum[], 
			Previous: readonly BatChargeFaultEnum[], ];
	}
}

export const powerSource: Cluster<PowerSource['attributes'], PowerSource['commands'], PowerSource['events']> = {
id: 47,
	attributes: {
		Status:null,
		Order:0,
		Description:null,
		WiredAssessedInputVoltage:0,
		WiredAssessedInputFrequency:0,
		WiredCurrentType:null,
		WiredAssessedCurrent:0,
		WiredNominalVoltage:0,
		WiredMaximumCurrent:0,
		WiredPresent:null,
		ActiveWiredFaults:[],
		BatVoltage:0,
		BatPercentRemaining:0,
		BatTimeRemaining:0,
		BatChargeLevel:null,
		BatReplacementNeeded:null,
		BatReplaceability:null,
		BatPresent:null,
		ActiveBatFaults:[],
		BatReplacementDescription:null,
		BatCommonDesignation:null,
		BatANSIDesignation:null,
		BatIECDesignation:null,
		BatApprovedChemistry:null,
		BatCapacity:0,
		BatQuantity:0,
		BatChargeState:null,
		BatTimeToFullCharge:0,
		BatFunctionalWhileCharging:null,
		BatChargingCurrent:0,
		ActiveBatChargeFaults:[],
		EndpointList:[],
		/** A wired power source */
	SupportsWired: false,
		/** A battery power source */
	SupportsBattery: false,
		/** A rechargeable battery power source */
	SupportsRechargeable: false,
		/** A replaceable battery power source */
	SupportsReplaceable: false,
},
	commands: {
},
	events: {
		WiredFaultChange: [
			
			[], 
			[], ],
		BatFaultChange: [
			
			[], 
			[], ],
		BatChargeFaultChange: [
			
			[], 
			[], ],
	}
}

export default powerSource;
// This file is generated from OperationalState_RVC.xml - do not edit it directly
// Generated on 2025-12-22T10:26:09.502Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum ErrorStateEnum {
	NoError = 0,
	UnableToStartOrResume = 1,
	UnableToCompleteOperation = 2,
	CommandInvalidInState = 3,
	FailedToFindChargingDock = 64,
	Stuck = 65,
	DustBinMissing = 66,
	DustBinFull = 67,
	WaterTankEmpty = 68,
	WaterTankMissing = 69,
	WaterTankLidOpen = 70,
	MopCleaningPadMissing = 71,
	LowBattery = 72,
	CannotReachTargetArea = 73,
	DirtyWaterTankFull = 74,
	DirtyWaterTankMissing = 75,
	WheelsJammed = 76,
	BrushJammed = 77,
	NavigationSensorObscured = 78,
}

export enum OperationalStateEnum {
	Stopped = 0,
	Running = 1,
	Paused = 2,
	Error = 3,
	SeekingCharger = 64,
	Charging = 65,
	Docked = 66,
	EmptyingDustBin = 67,
	CleaningMop = 68,
	FillingWaterTank = 69,
	UpdatingMaps = 70,
}

export type RVCOperationalState = RVCOperationalStateCluster & { id: 0x0061};

export interface RVCOperationalStateCluster {
id: 0x0061;
	attributes: {
}
	commands: {
		GoHome?: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}

export const rVCOperationalState: ClusterDefinition<RVCOperationalState> = {
id: 0x0061,
	attributes: [
	] as const,
	commands: [
		"GoHome",
	] as const,
	events: [
	] as const
}

export default rVCOperationalState;
// This file is generated from Switch.xml - do not edit it directly
// Generated on 2025-12-22T10:19:42.507Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type Switch = SwitchCluster & { id: 0x003B};

export interface SwitchCluster {
id: 0x003B;
	attributes: {
		readonly NumberOfPositions:number
		readonly CurrentPosition:number
		readonly MultiPressMax?:number
		/** Switch is latching */
		readonly SupportsLatchingSwitch: boolean
		/** Switch is momentary */
		readonly SupportsMomentarySwitch: boolean
		/** Switch supports release events generation */
		readonly SupportsMomentarySwitchRelease: boolean
		/** Switch supports long press detection */
		readonly SupportsMomentarySwitchLongPress: boolean
		/** Switch supports multi-press detection */
		readonly SupportsMomentarySwitchMultiPress: boolean
		/** Switch is momentary, targeted at specific user actions (focus on multi-press and optionally long press) with a reduced event generation scheme */
		readonly SupportsActionSwitch: boolean
}
	commands: {
}
	events: {
		SwitchLatched: [
			
			NewPosition: number, ];
		InitialPress: [
			
			NewPosition: number, ];
		LongPress: [
			
			NewPosition: number, ];
		ShortRelease: [
			
			PreviousPosition: number, ];
		LongRelease: [
			
			PreviousPosition: number, ];
		MultiPressOngoing: [
			
			NewPosition: number, 
			CurrentNumberOfPressesCounted: number, ];
		MultiPressComplete: [
			
			PreviousPosition: number, 
			TotalNumberOfPressesCounted: number, ];
	}
}

export const switch_: ClusterDefinition<Switch> = {
id: 0x003B,
	attributes: [
		"NumberOfPositions",
		"CurrentPosition",
		"MultiPressMax",
		"SupportsLatchingSwitch",
		"SupportsMomentarySwitch",
		"SupportsMomentarySwitchRelease",
		"SupportsMomentarySwitchLongPress",
		"SupportsMomentarySwitchMultiPress",
		"SupportsActionSwitch",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default switch_;
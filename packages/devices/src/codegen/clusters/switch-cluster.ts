// This file is generated from switch-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.362Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * This cluster exposes interactions with a switch device, for the purpose of using those interactions by other devices.
Two types of switch devices are supported: latching switch (e.g. rocker switch) and momentary switch (e.g. push button), distinguished with their feature flags.
Interactions with the switch device are exposed as attributes (for the latching switch) and as events (for both types of switches). An interested party MAY subscribe to these attributes/events and thus be informed of the interactions, and can perform actions based on this, for example by sending commands to perform an action such as controlling a light or a window shade.
 */

export interface Switch {
id: 59;
	attributes: {
		readonly NumberOfPositions:number
		readonly CurrentPosition:number
		readonly MultiPressMax:number
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
id: 59,
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
		"SwitchLatched",
		"InitialPress",
		"LongPress",
		"ShortRelease",
		"LongRelease",
		"MultiPressOngoing",
		"MultiPressComplete",
	] as const
}

export default switch_;
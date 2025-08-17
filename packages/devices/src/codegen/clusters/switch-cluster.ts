// This file is generated from switch-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:48.661Z

import { Cluster } from '../../server/clients/shared.js';


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

export const switch_: Cluster<Switch['attributes'], Switch['commands'], Switch['events']> = {
id: 59,
	attributes: {
		NumberOfPositions:0,
		CurrentPosition:0,
		MultiPressMax:0,
		/** Switch is latching */
	SupportsLatchingSwitch: false,
		/** Switch is momentary */
	SupportsMomentarySwitch: false,
		/** Switch supports release events generation */
	SupportsMomentarySwitchRelease: false,
		/** Switch supports long press detection */
	SupportsMomentarySwitchLongPress: false,
		/** Switch supports multi-press detection */
	SupportsMomentarySwitchMultiPress: false,
		/** Switch is momentary, targeted at specific user actions (focus on multi-press and optionally long press) with a reduced event generation scheme */
	SupportsActionSwitch: false,
},
	commands: {
},
	events: {
		SwitchLatched: [
			
			0, ],
		InitialPress: [
			
			0, ],
		LongPress: [
			
			0, ],
		ShortRelease: [
			
			0, ],
		LongRelease: [
			
			0, ],
		MultiPressOngoing: [
			
			0, 
			0, ],
		MultiPressComplete: [
			
			0, 
			0, ],
	}
}

export default switch_;
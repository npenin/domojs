// This file is generated from RefrigeratorAlarm.xml - do not edit it directly
// Generated on 2025-12-22T10:19:41.433Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmBitmap {
	__NotSet = 0,
		/** The cabinet's door has been open for a vendor defined amount of time. */
	DoorOpen= 1<<0,
}

export type RefrigeratorAlarm = RefrigeratorAlarmCluster & { id: 0x0057};

export interface RefrigeratorAlarmCluster {
id: 0x0057;
	attributes: {
		/** Supports the ability to reset alarms */
		readonly SupportsReset: boolean
}
	commands: {
}
	events: {
	}
}

export const refrigeratorAlarm: ClusterDefinition<RefrigeratorAlarm> = {
id: 0x0057,
	attributes: [
		"SupportsReset",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default refrigeratorAlarm;
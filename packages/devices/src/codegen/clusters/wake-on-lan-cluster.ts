// This file is generated from wake-on-lan-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:12.751Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * This cluster provides an interface for managing low power mode on a device that supports the Wake On LAN protocol.
 */

export interface WakeOnLAN {
id: 1283;
	attributes: {
		readonly MACAddress?:string
		readonly LinkLocalAddress?:import ("@akala/core").IsomorphicBuffer
}
	commands: {
}
	events: {
	}
}

export const wakeOnLAN: ClusterDefinition<WakeOnLAN> = {
id: 1283,
	attributes: [
		"MACAddress",
		"LinkLocalAddress",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default wakeOnLAN;
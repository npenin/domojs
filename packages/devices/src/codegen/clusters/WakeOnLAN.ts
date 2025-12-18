// This file is generated from WakeOnLAN.xml - do not edit it directly
// Generated on 2025-12-18T03:05:15.421Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type WakeOnLAN = WakeOnLANCluster & { id: 0x0503};

export interface WakeOnLANCluster {
id: 0x0503;
	attributes: {
		readonly MACAddress?:string
		readonly LinkLocalAddress?:bigint
}
	commands: {
}
	events: {
	}
}

export const wakeOnLAN: ClusterDefinition<WakeOnLAN> = {
id: 0x0503,
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
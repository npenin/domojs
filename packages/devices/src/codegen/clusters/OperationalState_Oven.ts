// This file is generated from OperationalState_Oven.xml - do not edit it directly
// Generated on 2025-12-22T10:19:39.921Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type OvenCavityOperationalState = OvenCavityOperationalStateCluster & { id: 0x0048};

export interface OvenCavityOperationalStateCluster {
id: 0x0048;
	attributes: {
}
	commands: {
}
	events: {
	}
}

export const ovenCavityOperationalState: ClusterDefinition<OvenCavityOperationalState> = {
id: 0x0048,
	attributes: [
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default ovenCavityOperationalState;
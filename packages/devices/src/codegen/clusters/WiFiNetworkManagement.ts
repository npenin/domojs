// This file is generated from WiFiNetworkManagement.xml - do not edit it directly
// Generated on 2025-12-22T10:19:45.805Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type WiFiNetworkManagement = WiFiNetworkManagementCluster & { id: 0x0451};

export interface WiFiNetworkManagementCluster {
id: 0x0451;
	attributes: {
		readonly SSID:import ("@akala/core").IsomorphicBuffer
		readonly PassphraseSurrogate:bigint
}
	commands: {
		NetworkPassphraseRequest: {
			inputparams: readonly [
			],
			 outputparams: readonly [
				Passphrase: import ("@akala/core").IsomorphicBuffer, ]
            }
}
	events: {
	}
}

export const wiFiNetworkManagement: ClusterDefinition<WiFiNetworkManagement> = {
id: 0x0451,
	attributes: [
		"SSID",
		"PassphraseSurrogate",
	] as const,
	commands: [
		"NetworkPassphraseRequest",
	] as const,
	events: [
	] as const
}

export default wiFiNetworkManagement;
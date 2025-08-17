// This file is generated from wifi-network-management-cluster.xml - do not edit it directly
// Generated on 2025-08-17T14:20:47.248Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * Functionality to retrieve operational information about a managed Wi-Fi network.
 */

export interface WiFiNetworkManagement {
id: 1105;
	attributes: {
		readonly SSID?:import ("@akala/core").IsomorphicBuffer
		readonly PassphraseSurrogate?:bigint
}
	commands: {
		/** This command is used to request the current WPA-Personal passphrase or PSK associated with the Wi-Fi network provided by this device. */
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
id: 1105,
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
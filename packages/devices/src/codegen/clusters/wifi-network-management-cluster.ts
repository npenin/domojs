

/**
 * Functionality to retrieve operational information about a managed Wi-Fi network.
 */

export interface WiFiNetworkManagement {
id: 1105;
	attributes: {
		readonly SSID?:import ("@akala/core").IsomorphicBuffer
		readonly PassphraseSurrogate?: bigint
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
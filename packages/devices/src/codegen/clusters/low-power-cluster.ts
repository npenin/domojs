

/**
 * This cluster provides an interface for managing low power mode on a device.
 */

export interface LowPower {
id: 1288;
	attributes: {
}
	commands: {
		/** This command shall put the device into low power mode. */
		Sleep: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}
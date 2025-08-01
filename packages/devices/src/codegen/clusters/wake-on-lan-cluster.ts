

/**
 * This cluster provides an interface for managing low power mode on a device that supports the Wake On LAN protocol.
 */

export interface WakeOnLAN {
id: 1283;
	attributes: {
		readonly MACAddress?: string
		readonly LinkLocalAddress?:import ("@akala/core").IsomorphicBuffer
}
	commands: {
}
	events: {
	}
}
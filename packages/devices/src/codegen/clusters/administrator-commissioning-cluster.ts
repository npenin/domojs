

export enum StatusCode {
	Busy= 2,
	PAKEParameterError= 3,
	WindowNotOpen= 4,
}

export enum CommissioningWindowStatusEnum {
	WindowNotOpen= 0,
	EnhancedWindowOpen= 1,
	BasicWindowOpen= 2,
}

/**
 * Commands to trigger a Node to allow a new Administrator to commission it.
 */

export interface AdministratorCommissioning {
id: 60;
	attributes: {
		readonly WindowStatus:CommissioningWindowStatusEnum
		readonly AdminFabricIndex?: number
		readonly AdminVendorId?: number
		/** Node supports Basic Commissioning Method. */
		readonly SupportsBasic: boolean
}
	commands: {
		/** This command is used by a current Administrator to instruct a Node to go into commissioning mode using enhanced commissioning method. */
		OpenCommissioningWindow: {
			inputparams: readonly [
				CommissioningTimeout:  number, 
				PAKEPasscodeVerifier: import ("@akala/core").IsomorphicBuffer, 
				Discriminator:  number, 
				Iterations:  number, 
				Salt: import ("@akala/core").IsomorphicBuffer, 
			],
			 outputparams: readonly []
            }
		/** This command is used by a current Administrator to instruct a Node to go into commissioning mode using basic commissioning method, if the node supports it. */
		OpenBasicCommissioningWindow?: {
			inputparams: readonly [
				CommissioningTimeout:  number, 
			],
			 outputparams: readonly []
            }
		/** This command is used by a current Administrator to instruct a Node to revoke any active Open Commissioning Window or Open Basic Commissioning Window command. */
		RevokeCommissioning: {
			inputparams: readonly [
			],
			 outputparams: readonly []
            }
}
	events: {
	}
}
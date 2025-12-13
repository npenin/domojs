// This file is generated from account-login-cluster.xml - do not edit it directly
// Generated on 2025-12-03T20:57:09.935Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


/**
 * This cluster provides commands that facilitate user account login on a Content App or a node. For example, a Content App running on a Video Player device, which is represented as an endpoint (see [TV Architecture]), can use this cluster to help make the user account on the Content App match the user account on the Client.
 */

export interface AccountLogin {
id: 1294;
	attributes: {
}
	commands: {
		/** The purpose of this command is to determine if the active user account of the given Content App matches the active user account of a given Commissionee, and when it does, return a Setup PIN which can be used for password-authenticated session establishment (PASE) with the Commissionee. */
		GetSetupPIN: {
			inputparams: readonly [
				TempAccountIdentifier: string, 
			],
			 outputparams: readonly [
				SetupPIN: string, ]
            }
		/** The purpose of this command is to allow the Content App to assume the user account of a given Commissionee by leveraging the Setup PIN input by the user during the commissioning process. */
		Login: {
			inputparams: readonly [
				TempAccountIdentifier: string, 
				SetupPIN: string, 
				Node: string, 
			],
			 outputparams: readonly []
            }
		/** The purpose of this command is to instruct the Content App to clear the current user account. */
		Logout: {
			inputparams: readonly [
				Node: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
		LoggedOut?: [
			
			Node: string, ];
	}
}

export const accountLogin: ClusterDefinition<AccountLogin> = {
id: 1294,
	attributes: [
	] as const,
	commands: [
		"GetSetupPIN",
		"Login",
		"Logout",
	] as const,
	events: [
		"LoggedOut",
	] as const
}

export default accountLogin;
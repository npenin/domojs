// This file is generated from AccountLogin.xml - do not edit it directly
// Generated on 2025-12-22T10:19:23.620Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type AccountLogin = AccountLoginCluster & { id: 0x050E};

export interface AccountLoginCluster {
id: 0x050E;
	attributes: {
}
	commands: {
		GetSetupPIN: {
			inputparams: readonly [
				TempAccountIdentifier: string, 
			],
			 outputparams: readonly [
				SetupPIN: string, ]
            }
		Login: {
			inputparams: readonly [
				TempAccountIdentifier: string, 
				SetupPIN: string, 
				Node: string, 
			],
			 outputparams: readonly []
            }
		Logout: {
			inputparams: readonly [
				Node: string, 
			],
			 outputparams: readonly []
            }
}
	events: {
		LoggedOut: [
			
			Node: string, ];
	}
}

export const accountLogin: ClusterDefinition<AccountLogin> = {
id: 0x050E,
	attributes: [
	] as const,
	commands: [
		"GetSetupPIN",
		"Login",
		"Logout",
	] as const,
	events: [
	] as const
}

export default accountLogin;
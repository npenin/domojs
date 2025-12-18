// This file is generated from LocalizationConfiguration.xml - do not edit it directly
// Generated on 2025-12-18T03:05:05.744Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export type LocalizationConfiguration = LocalizationConfigurationCluster & { id: 0x002B};

export interface LocalizationConfigurationCluster {
id: 0x002B;
	attributes: {
		readonly ActiveLocale:string
		readonly SupportedLocales:readonly string[]
}
	commands: {
}
	events: {
	}
}

export const localizationConfiguration: ClusterDefinition<LocalizationConfiguration> = {
id: 0x002B,
	attributes: [
		"ActiveLocale",
		"SupportedLocales",
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default localizationConfiguration;
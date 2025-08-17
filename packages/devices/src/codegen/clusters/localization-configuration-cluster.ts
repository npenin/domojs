// This file is generated from localization-configuration-cluster.xml - do not edit it directly
// Generated on 2025-08-15T06:41:47.611Z

import { Cluster } from '../../server/clients/shared.js';


/**
 * Nodes should be expected to be deployed to any and all regions of the world. These global regions
      may have differing common languages, units of measurements, and numerical formatting
      standards. As such, Nodes that visually or audibly convey information need a mechanism by which
      they can be configured to use a user’s preferred language, units, etc
 */

export interface LocalizationConfiguration {
id: 43;
	attributes: {
		ActiveLocale:string
		readonly SupportedLocales:readonly string[]
}
	commands: {
}
	events: {
	}
}

export const localizationConfiguration: Cluster<LocalizationConfiguration['attributes'], LocalizationConfiguration['commands'], LocalizationConfiguration['events']> = {
id: 43,
	attributes: {
		ActiveLocale:null,
		SupportedLocales:[],
},
	commands: {
},
	events: {
	}
}

export default localizationConfiguration;
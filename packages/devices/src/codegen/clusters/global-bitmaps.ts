// This file is generated from global-Bitmaps.xml - do not edit it directly
// Generated on 2025-12-18T03:04:52.991Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum WildcardPathFlagsBitmap {
	__NotSet = 0,
		/** Skip the Root Node endpoint (endpoint 0) during wildcard expansion. */
	WildcardSkipRootNode= 1<<0,
		/** Skip several large global attributes during wildcard expansion. */
	WildcardSkipGlobalAttributes= 1<<1,
		/** Skip the AttributeList global attribute during wildcard expansion. */
	WildcardSkipAttributeList= 1<<2,
	DoNotUse= 1<<3,
		/** Skip the AcceptedCommandList and GeneratedCommandList global attributes during wildcard expansion. */
	WildcardSkipCommandLists= 1<<4,
		/** Skip any manufacturer-specific clusters or attributes during wildcard expansion. */
	WildcardSkipCustomElements= 1<<5,
		/** Skip any Fixed (F) quality attributes during wildcard expansion. */
	WildcardSkipFixedAttributes= 1<<6,
		/** Skip any Changes Omitted ++(C)++ quality attributes during wildcard expansion. */
	WildcardSkipChangesOmittedAttributes= 1<<7,
		/** Skip all clusters with the Diagnostics (K) quality during wildcard expansion. */
	WildcardSkipDiagnosticsClusters= 1<<8,
}
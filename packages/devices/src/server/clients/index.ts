import { ObservableArray } from "@akala/core";

export * from "./Gateway.js";
export * from '../../devices.js'
export * from './shared.js'

// export interface NodeDiscoveryAnnouncement
// {
//     discriminator: number,          // discriminator
//     vendorProductId: `${number}+${number}`;
//     deviceType: DeviceTypes,    // device type
//     deviceName: string,         // device name
//     commissioningMode: boolean,         // commissioning mode
//     pairingHint: PairingHints,         // pairing hint
//     pairingInstruction: string,         // pairing hint
//     manufacturer: string;
//     rotatingId: boolean,
// };

export interface Node
{
    name: string;
    endpoints: ObservableArray<Endpoint | EndpointProxy>;
    offline(): Promise<void>
}

export * from '../../codegen/index.js';
import { Gateway } from "./Gateway.js";
import { Endpoint } from "./Endpoint.js";
import { EndpointProxy } from "./EndpointProxy.js";
import { ClusterIds, ClusterMap, ClusterIdNames } from "../clusters/index.js";
export { AggregatorEndpoint } from './Aggregator.js'

export * from '../clusters/index.js'
export { Gateway, Endpoint, EndpointProxy, ClusterMap, ClusterIds, ClusterIdNames }
export { RootNode } from './RootNode.js'

export { Binding } from '../behaviors/binding.js'

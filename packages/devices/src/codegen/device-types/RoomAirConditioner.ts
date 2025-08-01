import { ReverseClusterIdNames, ClusterMap } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0003] | ReverseClusterIdNames[0x0004] | ReverseClusterIdNames[0x0006] | ReverseClusterIdNames[0x0062] | ReverseClusterIdNames[0x0201] | ReverseClusterIdNames[0x0202] | ReverseClusterIdNames[0x0204] | ReverseClusterIdNames[0x0402] | ReverseClusterIdNames[0x0405]

export default class DeviceType extends Endpoint<ClusterMap, MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys, ClusterMap>)
	{
		super(id, clusters);
	}
}
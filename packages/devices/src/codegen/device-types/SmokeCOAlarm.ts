import { ReverseClusterIdNames, ClusterMap } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0003] | ReverseClusterIdNames[0x0004] | ReverseClusterIdNames[0x005C] | ReverseClusterIdNames[0x0402] | ReverseClusterIdNames[0x0405] | ReverseClusterIdNames[0x040C]

export default class DeviceType extends Endpoint<ClusterMap, MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys, ClusterMap>)
	{
		super(id, clusters);
	}
}
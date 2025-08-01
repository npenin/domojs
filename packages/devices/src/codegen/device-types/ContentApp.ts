import { ReverseClusterIdNames, ClusterMap } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x001E] | ReverseClusterIdNames[0x0504] | ReverseClusterIdNames[0x0505] | ReverseClusterIdNames[0x0506] | ReverseClusterIdNames[0x0509] | ReverseClusterIdNames[0x050A] | ReverseClusterIdNames[0x050C] | ReverseClusterIdNames[0x050D] | ReverseClusterIdNames[0x050E]

export default class DeviceType extends Endpoint<ClusterMap, MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys, ClusterMap>)
	{
		super(id, clusters);
	}
}
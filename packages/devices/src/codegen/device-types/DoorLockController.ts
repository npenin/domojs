import { ReverseClusterIdNames, ClusterMap } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0038]

export default class DeviceType extends Endpoint<ClusterMap, MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys, ClusterMap>)
	{
		super(id, clusters);
	}
}
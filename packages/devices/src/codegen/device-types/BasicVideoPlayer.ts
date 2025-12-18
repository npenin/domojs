import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0006] | ReverseClusterIdNames[0x0097] | ReverseClusterIdNames[0x0503] | ReverseClusterIdNames[0x0504] | ReverseClusterIdNames[0x0505] | ReverseClusterIdNames[0x0506] | ReverseClusterIdNames[0x0507] | ReverseClusterIdNames[0x0508] | ReverseClusterIdNames[0x0509] | ReverseClusterIdNames[0x050B] | ReverseClusterIdNames[0x050F]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(uniqueId: string, id: number, clusters: MixedClusterMap<MandatoryKeys>)
	{
		super(uniqueId, id, clusters);
	}
}
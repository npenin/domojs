import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0003] | ReverseClusterIdNames[0x005B] | ReverseClusterIdNames[0x0402] | ReverseClusterIdNames[0x0405] | ReverseClusterIdNames[0x040C] | ReverseClusterIdNames[0x040D] | ReverseClusterIdNames[0x0413] | ReverseClusterIdNames[0x0415] | ReverseClusterIdNames[0x042A] | ReverseClusterIdNames[0x042B] | ReverseClusterIdNames[0x042C] | ReverseClusterIdNames[0x042D] | ReverseClusterIdNames[0x042E] | ReverseClusterIdNames[0x042F]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(uniqueId: string, id: number, clusters: MixedClusterMap<MandatoryKeys>)
	{
		super(uniqueId, id, clusters);
	}
}
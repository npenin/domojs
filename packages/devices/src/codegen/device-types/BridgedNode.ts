import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x002E] | ReverseClusterIdNames[0x002F] | ReverseClusterIdNames[0x0039] | ReverseClusterIdNames[0x003C] | ReverseClusterIdNames[0x0750]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(uniqueId: string, id: number, clusters: MixedClusterMap<MandatoryKeys>)
	{
		super(uniqueId, id, clusters);
	}
}
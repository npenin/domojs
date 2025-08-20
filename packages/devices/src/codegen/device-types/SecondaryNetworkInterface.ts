import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0031] | ReverseClusterIdNames[0x0035] | ReverseClusterIdNames[0x0036] | ReverseClusterIdNames[0x0037]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys>)
	{
		super(id, clusters);
	}
}
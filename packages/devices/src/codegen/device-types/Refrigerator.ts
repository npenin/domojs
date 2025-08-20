import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0003] | ReverseClusterIdNames[0x0052] | ReverseClusterIdNames[0x0057]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys>)
	{
		super(id, clusters);
	}
}
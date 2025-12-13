import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x0095] | ReverseClusterIdNames[0x00A0] | ReverseClusterIdNames[0x0700]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys>)
	{
		super(id, clusters);
	}
}
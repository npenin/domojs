import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = import ("./BaseDeviceType.js").MandatoryKeys | ReverseClusterIdNames[0x001F] | ReverseClusterIdNames[0x0028] | ReverseClusterIdNames[0x002B] | ReverseClusterIdNames[0x002C] | ReverseClusterIdNames[0x002D] | ReverseClusterIdNames[0x002E] | ReverseClusterIdNames[0x0030] | ReverseClusterIdNames[0x0031] | ReverseClusterIdNames[0x0032] | ReverseClusterIdNames[0x0033] | ReverseClusterIdNames[0x0034] | ReverseClusterIdNames[0x0035] | ReverseClusterIdNames[0x0036] | ReverseClusterIdNames[0x0037] | ReverseClusterIdNames[0x0038] | ReverseClusterIdNames[0x003C] | ReverseClusterIdNames[0x003E] | ReverseClusterIdNames[0x003F] | ReverseClusterIdNames[0x0046] | ReverseClusterIdNames[0x0801] | ReverseClusterIdNames[0x0802]

export default class DeviceType extends Endpoint<MandatoryKeys>
{
   
	constructor(clusters: MixedClusterMap<MandatoryKeys>)
	{
		super('root', 0, clusters);
	}
}
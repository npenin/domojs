import { ReverseClusterIdNames } from "../clusters/clusters-index.js";
import { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";

export type MandatoryKeys = ReverseClusterIdNames[0x001E] | ReverseClusterIdNames[0x0040] | ReverseClusterIdNames[0x0041]

export default class DeviceType extends Endpoint<MandatoryKeys>
{}
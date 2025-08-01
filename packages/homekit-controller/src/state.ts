import { PairedAccessory, PairSetupClientInfo } from "./commands/setup-pair.js";

export default interface State 
{
    pairedAccessories: Record<string, { controllerInfo: PairSetupClientInfo, accessory: PairedAccessory, fqdn: string }>;

}


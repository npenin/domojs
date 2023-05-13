import { PairedAccessory, PairSetupClientInfo } from "./commands/setup-pair.js";
import container from './container.js'

export default interface State extends container.proxy
{
    pairedAccessories: Record<string, { controllerInfo: PairSetupClientInfo, accessory: PairedAccessory, fqdn: string }>;

}


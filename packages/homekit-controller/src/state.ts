import { PairedAccessory, PairSetupClientInfo } from "./commands/setup-pair";
import container from './container'

export default interface State extends container.proxy
{
    pairedAccessories: Record<string, { controllerInfo: PairSetupClientInfo, accessory: PairedAccessory, fqdn: string }>;

}


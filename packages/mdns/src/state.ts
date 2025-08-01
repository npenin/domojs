import mDNS from "multicast-dns";
import { RootNode } from "@domojs/devices";

export interface State
{
    fabric: RootNode<never>;
    browser: mDNS.MulticastDNS;
}
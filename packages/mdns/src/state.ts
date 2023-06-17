import mDNS from "multicast-dns";
import { Service } from './index.js';

export interface State
{
    browser: mDNS.MulticastDNS;
    services: Record<string, Service>;
}
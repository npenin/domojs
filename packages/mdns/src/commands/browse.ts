import mDNS from 'multicast-dns';
import { StringAnswer } from 'dns-packet'
import { decodeTxt, dnsEqual } from './$init';

export default function (type: string, delay: number)
{
    return new Promise(resolve =>
    {
        setTimeout(() => resolve(Object.values(this.services).filter((s: { type: string }) => !type || s.type == type)), (delay || 20) * 1000);
    });
}
import { Http } from '@akala/core';
import { Service } from '@domojs/mdns'
import State from '../state';
import pair from './setup-pair';
import verifyPair from './verify-pair';

export default async function deviceDiscovered(this: State, service: Service, http: Http)
{
    const url = new URL('http://' + service.addresses[0] + ':' + service.port)
    url.pathname = '/'
    if (this.pairedAccessories[service.fqdn])
    {
        this['verify-pair'](service.fqdn);
    }
}
import { Http } from '@akala/core';
import { Service } from '@domojs/mdns'
import State from '../state.js';
import pair from './setup-pair.js';
import verifyPair from './verify-pair.js';

export default async function deviceDiscovered(this: State, service: Service, http: Http)
{
    const url = new URL('http://' + service.addresses[0] + ':' + service.port)
    url.pathname = '/'
    if (this.pairedAccessories[service.fqdn])
    {
        this['verify-pair'](service.fqdn);
    }
}
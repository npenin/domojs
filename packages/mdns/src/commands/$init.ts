import mDNS from 'multicast-dns';
import { StringAnswer } from 'dns-packet'
import app from '@akala/sidecar';
import { CliContext } from '@akala/cli';
import { Configuration } from '@akala/config'
import { logger } from '@akala/core'
import { State } from '../state';
import { Service } from '../index';

export const dnsEqual = (function ()
{

    const r = /[A-Z]/g

    return function (a, b)
    {
        a = a.replace(r, replacer)
        b = b.replace(r, replacer)
        return a === b
    }

    function replacer(m)
    {
        return m.toLowerCase()
    }
})();

export const decodeTxt = (function ()
{
    const equalSign = Buffer.from('=')

    return function (opts)
    {
        const binary = opts ? opts.binary : false

        return function (bufArray)
        {
            const data = {}

            bufArray.forEach(buf =>
            {
                if (buf.length === 0)
                {
                    return // ignore: most likely a single zero byte
                }

                const i = buf.indexOf(equalSign)

                if (i === -1)
                { // equal sign does not exist
                    data[buf.toString().toLowerCase()] = true
                } else if (i > 0)
                { // we ignore zero key-length blocks
                    const key = buf.slice(0, i).toString().toLowerCase()

                    if (key in data)
                    { // ignore: overwriting not allowed
                        return
                    }

                    const valueBuf = buf.slice(i + 1)
                    data[key] = binary ? valueBuf : valueBuf.toString()
                }
            })

            return data
        }
    }
})();

export default async function (this: State, context: CliContext, signal: AbortSignal)
{
    const self = await app(context, Configuration.new('./mdns.json', {}))

    this.services = {};

    const mdns = this.browser = mDNS();

    mdns.on('response', packet =>
    {
        const records = packet.answers.concat(packet.additionals);
        records.filter(rr => rr.type === 'PTR' && rr.ttl == 0).forEach((p: StringAnswer) => self.pubsub?.publish('/zeroconf/' + p.name.split('.').reverse().join('/'), null))
        return records
            .filter(function (rr)
            {
                return rr.type === 'PTR' && rr.ttl > 0
            })
            .map(function (ptr: StringAnswer)
            {
                const service: Partial<Service> = {
                    addresses: []
                }

                records
                    .filter(function (rr)
                    {
                        return (rr.type === 'SRV' || rr.type === 'TXT') && dnsEqual(rr.name, ptr.data)
                    })
                    .forEach(function (rr)
                    {
                        if (rr.type === 'SRV')
                        {
                            const parts = rr.name.split('.')
                            const name = parts[0]
                            service.name = name
                            service.fqdn = rr.name
                            service.host = rr.data.target
                            // service.referer = referer
                            service.port = rr.data.port
                            service.type = parts[parts.length - 3]
                            service.protocol = parts[parts.length - 2]
                            if (parts.length > 4)
                                service.subtypes = parts.slice(0, parts.length - 4);
                        } else if (rr.type === 'TXT')
                        {
                            // rr.data is an Array of Buffer instead of Buffer
                            service.rawTxt = rr.data // array of buffers, each representing a block
                            service.txt = decodeTxt({})(service.rawTxt);
                        }
                    })

                if (!service.name) return undefined

                records
                    .filter(function (rr)
                    {
                        return (rr.type === 'A' || rr.type === 'AAAA') && dnsEqual(rr.name, service.host)
                    })
                    .forEach(function (rr: StringAnswer)
                    {
                        service.addresses.push(rr.data)
                    })

                return service
            })
            .filter(function (rr)
            {
                return !!rr
            }).forEach(c =>
            {
                this.services[c.fqdn] = c as Service;
                const parts = c.fqdn.split('.').reverse();
                for (let i = 0; i < parts.length; i++)
                    self.pubsub?.publish('/zeroconf/' + parts.slice(0, i).join('/'), c);
            })
    });
    mdns.query('_services._dns-sd._udp.local', 'PTR');
}
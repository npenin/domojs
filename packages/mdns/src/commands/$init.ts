import mDNS from 'multicast-dns';
import { StringAnswer } from 'dns-packet'
import app, { pubsub, SidecarConfiguration } from '@akala/sidecar';
import { CliContext, OptionType } from '@akala/cli';
import { ProxyConfiguration } from '@akala/config'
import { State } from '../state.js';
import { Service } from '../index.js';
import { AggregatorEndpoint, BridgeConfiguration, clusterFactory, ClusterIds, ClusterMap, CommissionningCluster, DeviceTypes, Endpoint, EndpointProxy, MatterClusterIds, registerNode, RootNode } from '@domojs/devices';
import { Context, ObservableArray } from '@akala/core';

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

export default async function (this: State, context: Context<ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{

    if (!context.state.has('endpointsMapping'))
        context.state.set('endpointsMapping', {});
    // if (!context.state.has('mdns'))
    //     context.state.set('mdns', {});

    // context.state = config;

    const self = await app(context)

    const mdns = this.browser = mDNS();

    const fabric = await registerNode('mdns', self, context.state);

    this.fabric = fabric;

    await fabric.attach(self.pubsub);

    context.abort.signal.addEventListener('abort', () => mdns.destroy());

    mdns.on('response', packet =>
    {
        const records = packet.answers.concat(packet.additionals);
        records.filter(rr => rr.type === 'PTR' && rr.ttl == 0).forEach((p: StringAnswer) => this.fabric.endpoints.splice(this.fabric.endpoints.findIndex(e => e.clusters.fixedLabel?.getValue('LabelList').reduce((previous, current) =>
        {
            if (!previous)
                return false;
            switch (current.Label)
            {
                case 'FQDN':
                    return current.Value == p.data;
                // case 'Host':
                //     return p.data.startsWith(current.Value.substring(0, current.Value.length - '.local'.length) + '.');
                case 'Type':
                    return current.Value == p.name;
                default:
                    return true;
            }
        }, true)), 1))
        return records
            .filter(function (rr)
            {
                return rr.type === 'PTR' && rr.ttl
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

                if (!service.name)
                    return undefined

                records
                    .filter(function (rr)
                    {
                        return (rr.type === 'A' || rr.type === 'AAAA') && dnsEqual(rr.name, service.host)
                    })
                    .forEach(function (rr: StringAnswer)
                    {
                        service.addresses!.push(rr.data)
                    })

                return service
            })
            .filter(function (rr)
            {
                return !!rr
            }).forEach(async c =>
            {
                let typeEndpoint: AggregatorEndpoint<never>;

                const typeId = await fabric.getEndpointId(c.type);
                const hostId = await fabric.getEndpointId(c.host);
                const fqdnId = await fabric.getEndpointId(c.fqdn);

                let fqdnEndpoint: Endpoint<ClusterMap, 'fixedLabel'>;
                if (!(fqdnEndpoint = fabric.endpoints.find(ep => ep.id == fqdnId) as Endpoint<ClusterMap, 'fixedLabel'>))
                {
                    const ep = fqdnEndpoint = new Endpoint<ClusterMap, 'fixedLabel'>(fqdnId, {
                        fixedLabel: clusterFactory({
                            id: MatterClusterIds.UserLabel,
                            LabelList: [{ Label: 'Type', Value: c.type }, { Label: 'Host', Value: c.host }, { Label: 'FQDN', Value: c.fqdn }].
                                concat(c.txt ? Object.entries(c.txt).map(e => ({ Label: e[0], Value: e[1] })) : [])
                        })
                    });
                    fabric.endpoints.push(ep);
                    const sub = fabric.endpoints.addListener(ev =>
                    {
                        if ('oldItems' in ev && ev.oldItems.find(it => it == ep))
                        {
                            sub();
                            hostEndpoint.endpoints.splice(hostEndpoint.endpoints.findIndex(fqdn => fqdn.id == ep.id), 1);
                            typeEndpoint.endpoints.splice(typeEndpoint.endpoints.findIndex(type => type.id == ep.id), 1);
                        }
                    })
                }

                if (!(typeEndpoint = fabric.endpoints.find(ep => ep.id == typeId) as AggregatorEndpoint<never>))
                {
                    fabric.endpoints.push(typeEndpoint = new AggregatorEndpoint(typeId, {}));
                    fqdnEndpoint.teardown(await Endpoint.attach<ClusterMap, never>(self.pubsub, `domojs/${fabric.name}`, typeEndpoint, c.type));
                }

                let hostEndpoint: AggregatorEndpoint<never>;
                if (!(hostEndpoint = fabric.endpoints.find(e => e.id === hostId) as AggregatorEndpoint<never>))
                {
                    fabric.endpoints.push(hostEndpoint = new AggregatorEndpoint(hostId, {
                    }));
                    fqdnEndpoint.teardown(await Endpoint.attach<ClusterMap, never>(self.pubsub, `domojs/${fabric.name}`, hostEndpoint, c.host));
                }

                if (!hostEndpoint.endpoints.find(ep => ep.id == fqdnId))
                    hostEndpoint.endpoints.push(fqdnEndpoint);
                if (!typeEndpoint.endpoints.find(ep => ep.id == fqdnId))
                    typeEndpoint.endpoints.push(fqdnEndpoint);
            })
    });
    await new Promise((resolve, reject) => mdns.query('_services._dns-sd._udp.local', 'PTR', err => err ? reject(err) : resolve));
    await new Promise((resolve, reject) => mdns.query('_services._dns-sd._tcp.local', 'PTR', err => err ? reject(err) : resolve));
}
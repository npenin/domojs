import { CliContext } from '@akala/cli'
import { ProxyConfiguration } from '@akala/config';
import { each, eachAsync, Http } from '@akala/core';
import { AggregatorEndpoint, BridgeConfiguration, clusterFactory, MatterClusterIds, registerNode } from '@domojs/devices'
import sidecar, { SidecarConfiguration } from '@akala/sidecar'
import { SSDP, SSDPDevice } from '../index.js';
import { parseXml, XmlElement } from '@rgrove/parse-xml'

function getByTag(source: XmlElement, tag: string)
{
    return source.children.filter(c => c instanceof XmlElement && c.name == tag) as XmlElement[];
}

export default async function (context: CliContext<any, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, http: Http)
{
    const logger = context.logger;
    const app = await sidecar(context);
    const fabric = await registerNode('upnp', app, context.state, context.abort.signal);

    await fabric.attach(app.pubsub);

    const devices: Record<string, NodeJS.Timeout> = {};
    const typeEndpoints: Record<string, AggregatorEndpoint<never>> = {};

    async function handle(device: SSDPDevice)
    {
        // console.log(device);
        const endpointId = await fabric.getEndpointId(device.uniqueServiceName);
        const endpointTypeId = await fabric.getEndpointId(device.searchTarget);
        if (!devices[device.uniqueServiceName])
        {
            const res = await http.get(device.location);

            const xml = parseXml(await res.text());

            await eachAsync(getByTag(xml.root, 'device'), async function (deviceElement: XmlElement)
            {
                var icons = {};

                const iconList = getByTag(deviceElement, 'iconList')

                if (iconList?.[0] && iconList[0]?.children?.length)
                {
                    const iconsTag = getByTag(iconList[0], 'icon');
                    if (iconsTag.length)
                        each(iconsTag, function (icon)
                        {
                            icons[getByTag(icon, 'width')[0].text] = new URL(getByTag(icon, 'url')[0].text, device.location);
                        })
                }

                await eachAsync(getByTag(getByTag(deviceElement, 'serviceList')?.[0], 'service'), async function (svc)
                {
                    const service = {
                        name: getByTag(deviceElement, 'friendlyName')[0].text,
                        icons: icons,
                        type: getByTag(svc, 'serviceType')[0].text,
                        descriptor: {
                            scpd: getByTag(svc, 'SCPDURL')[0].text,
                            control: getByTag(svc, 'controlURL')[0].text,
                            event: getByTag(svc, 'eventSubURL')[0].text,
                        },
                        headers: device
                    };

                    if (!typeEndpoints[service.type])
                    {
                        typeEndpoints[service.type] = new AggregatorEndpoint(endpointTypeId, {
                            fixedLabel: clusterFactory({
                                id: MatterClusterIds.FixedLabel,
                                LabelList: [{
                                    Label: 'type',
                                    Value: service.type
                                }]
                            })
                        });
                        await typeEndpoints[service.type].attach(app.pubsub, `domojs/${fabric.name}`, service.type);

                        fabric.endpoints.push(typeEndpoints[service.type]);
                    }
                    if (!fabric.endpoints.find(ep => ep.id == endpointId))
                    {
                        const serviceEndpoint = await fabric.newEndpoint(endpointId, {
                            fixedLabel: clusterFactory({
                                id: MatterClusterIds.FixedLabel,
                                LabelList: Object.entries(device).map(e => ({ Label: e[0], Value: e[1] })).concat([{
                                    Label: 'SCPDURL',
                                    Value: service.descriptor.scpd
                                }, {
                                    Label: 'controlURL',
                                    Value: service.descriptor.control
                                }, {
                                    Label: 'eventSubURL',
                                    Value: service.descriptor.event
                                }])
                            })
                        });

                        fabric.endpoints.push(serviceEndpoint);
                        typeEndpoints[service.type].endpoints.push(serviceEndpoint);
                    }
                });
            });
        }

        clearTimeout(devices[device.uniqueServiceName]);
        devices[device.uniqueServiceName] = setTimeout(() =>
        {
            fabric.endpoints.splice(fabric.endpoints.findIndex(ep => ep.id == endpointId), 1);
            typeEndpoints[device.searchTarget]?.endpoints.splice(typeEndpoints[device.searchTarget]?.endpoints.findIndex(ep => ep.id == endpointId), 1);
        }, Number(device.cacheControl.substring('max-age='.length)) * 1000);

    }

    const client = new SSDP();
    client.on('device', handle);




    await client.startSearch('ssdp:all', 5, context.abort.signal);
}
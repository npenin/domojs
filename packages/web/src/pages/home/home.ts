import { e, Page, page, RootElement, content, t, OutletService, serviceModule } from '@akala/client'
import template from './home.html?raw'
import { ClusterMap, EndpointProxy } from '@domojs/devices';
import { AsyncEventBus, asyncEventBuses, ObservableArray, ObservableObject } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';
import { ConstantExpression, MemberExpression } from '@akala/core/expressions';

@page({ template, 'inject': [RootElement, [serviceModule, 'mqtt']] })
export default class Home extends Page
{
    public readonly rooms: ObservableArray<{ name: string, devices: ObservableArray<EndpointProxy> }> = new ObservableArray([]);
    public readonly devices = new ObservableObject({ 'domojs/devices': new ObservableArray([]) } as Record<string, ObservableArray<EndpointProxy>>);

    constructor(el: HTMLElement, private mqtt: AsyncEventBus<MqttEvents>)
    {
        super(el);
        document.addEventListener('keydown', (ev) =>
        {
            const debug = document.querySelector('#debug')!;
            debug?.append(content(e('div'), t(ev.code)));
            if (debug?.childNodes.length > 10)
                debug.childNodes[0].remove();
        });
    }

    public watch(name: string)
    {
        var processingIds: number[] = [];

        this.teardown(this.devices.target[name].addListener(ev =>
        {
            if ('newItems' in ev)
                ev.newItems.forEach(endpoint =>
                {
                    endpoint.clusters.descriptor.target.PartsList.onChanged(async endpoints =>
                    {
                        await Promise.all(endpoints.value?.map(async ep =>
                        {
                            if (ep === endpoint.id || processingIds.includes(ep))
                                return;
                            processingIds.push(ep);
                            const child = await EndpointProxy.fromBus(this.mqtt, endpoint.parent.name, ep);

                            if (this.devices.target[name].indexOf(child) == -1)
                            {
                                this.devices.target[name].push(child);
                                endpoint.endpoints.push(child);
                            }
                        }));

                        endpoints.value.forEach(ep =>
                        {
                            const indexOfEP = processingIds.indexOf(ep);
                            if (indexOfEP > -1)
                                processingIds.splice(indexOfEP, 1);
                        })
                    });
                });
        }));
    }

    public async[OutletService.onLoad]()
    {
        // const allDevices = await EndpointProxy.fromBus<ClusterMap>(mqtt, 'domojs/devices', '0');

        // const endpoints = await allDevices.clusters.descriptor.target.PartsList;
        // debugger;
        // console.log(endpoints);

        this.watch('domojs/devices');
        const room = { name: 'AllHouse', devices: new ObservableArray<EndpointProxy>([]) };
        this.rooms.push(room);

        this.devices.on('domojs/RFXCOM', ev =>
        {
            ev.value.addListener(l =>
            {
                if ('newItems' in l)
                {
                    const tous = l.newItems.find(ep => ep.id == 6);
                    if (tous)
                    {
                        if (!room.devices.find(d => d.id == tous.id))
                            room.devices.push(tous);
                    }
                }
            })
        })

        await EndpointProxy.fromBus(this.mqtt, 'domojs/devices', 0).then(allDevices =>
        {
            // this.rooms.push({ name: 'AllHouse', devices: [allDevices] });
            this.devices.target['domojs/devices'].push(allDevices)
            allDevices.endpoints.addListener(ev =>
            {
                if ('newItems' in ev)
                {
                    ev.newItems.forEach(ep =>
                    {
                        ep.clusters.fixedLabel?.target.LabelList.onChanged(ev =>
                        {
                            const newTopic = ev.value.find(l => l.Label == 'redirectTopic').Value
                            if (newTopic in this.devices.target)
                                return;
                            ObservableObject.setValue(this.devices.target, new MemberExpression(null, new ConstantExpression(newTopic) as any, false), new ObservableArray([]));
                            this.watch(newTopic);
                            EndpointProxy.fromBus(this.mqtt, newTopic, 0).then(allDevices =>
                                this.devices.target[newTopic].push(allDevices));
                        });
                    });
                }
            })
        })
    }
}


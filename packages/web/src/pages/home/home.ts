import { e, Page, page, RootElement, content, t, OutletService, serviceModule } from '@akala/client'
import template from './home.html?raw'
import { ClusterMap, EndpointProxy } from '@domojs/devices';
import { AsyncEventBus, asyncEventBuses, ObservableArray } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';

@page({ template, 'inject': [RootElement, [serviceModule, 'mqtt']] })
export default class Home extends Page
{
    public readonly rooms = new ObservableArray([]);

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

    public async [OutletService.onLoad]()
    {
        // const allDevices = await EndpointProxy.fromBus<ClusterMap>(mqtt, 'domojs/devices', '0');

        // const endpoints = await allDevices.clusters.descriptor.target.PartsList;
        // debugger;
        // console.log(endpoints);
        await Promise.all(
            [
                EndpointProxy.fromBus(this.mqtt, 'domojs/RFXCOM', 6).then(tous =>
                {
                    debugger;
                    this.rooms.push({ name: 'AllHouse', devices: [tous] })
                }),
                EndpointProxy.fromBus(this.mqtt, 'domojs/devices', 0).then(allDevices =>
                {
                    debugger;
                    this.rooms.push({ name: 'AllHouse 2', devices: [allDevices] });
                })
            ]);

    }
}


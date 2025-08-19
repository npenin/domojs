import { e, Page, page, RootElement, content, t, OutletService } from '@akala/client'
import template from './home.html?raw'
import { ClusterMap, EndpointProxy } from '@domojs/devices';
import { asyncEventBuses, ObservableArray } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';

@page({ template, 'inject': [RootElement] })
export default class Home extends Page
{
    public readonly rooms = new ObservableArray([]);

    constructor(el: HTMLElement)
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
        const mqtt = await asyncEventBuses.process<MqttEvents>(new URL(`mqtt+ws://${location.host}/mqtt`), { username: 'domojs-guest', password: 'domojs' });
        // const allDevices = await EndpointProxy.fromBus<ClusterMap>(mqtt, 'domojs/devices', '0');

        // const endpoints = await allDevices.clusters.descriptor.target.PartsList;
        // debugger;
        // console.log(endpoints);
        await Promise.all(
            [
                EndpointProxy.fromBus(mqtt, 'domojs/RFXCOM', '6').then(tous => this.rooms.push({ name: 'AllHouse', devices: [tous] })),
                EndpointProxy.fromBus(mqtt, 'domojs/devices', '0').then(allDevices => this.rooms.push({ name: 'AllHouse 2', devices: [allDevices] }))
            ]);

    }
}


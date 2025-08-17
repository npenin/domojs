import { e, Page, page, RootElement, content, t, bootstrapModule, Template } from '@akala/client'
import template from './home.html?raw'
import { EndpointProxy } from '@domojs/devices';
import { asyncEventBuses } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';

@page({ template, 'inject': [RootElement] })
export default class Home extends Page
{
    public readonly rooms = asyncEventBuses.process<MqttEvents>(new URL(`mqtt+ws://${location.host}/mqtt`), { username: 'domojs-guest', password: 'domojs' }).then(async mqtt => [
        { name: 'AllHouse', devices: [await EndpointProxy.fromBus(mqtt, 'domojs/RFXCOM', '6')] },
        { name: 'Cuisine', devices: [await EndpointProxy.fromBus(mqtt, 'domojs/devices', '0')] },
        { name: 'Salon', devices: [] }
    ]);

    constructor(private el: HTMLElement)
    {
        super();
        document.addEventListener('keydown', (ev) =>
        {
            const debug = document.querySelector('#debug')!;
            debug?.append(content(e('div'), t(ev.code)));
            if (debug?.childNodes.length > 10)
                debug.childNodes[0].remove();
        });
    }


}


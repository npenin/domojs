/// <reference types="vite/client" />
import { bootstrap } from '@akala/web-ui'
import { bootstrapModule, DataContext, HotKeyTrigger, outletDefinition, OutletService, Scope, serviceModule } from '@akala/client'
import '@akala/core';
import './index.css';
import Home from './pages/home/home.js';
import { configure, connect, Container } from '@akala/commands/browser';
import './components/ibm-icon/ibm-icon.js'
import './components/device-button-selector/device-button-selector.js'
import './components/room-card/room-card.js'
import { IconDescriptor } from './components/ibm-icon/ibm-icon.js';
import './swipe-down.js'

import searchIcon from '@carbon/icons/es/search/24.js'
import bellIcon from '@carbon/icons/es/notification/24.js'
import userIcon from '@carbon/icons/es/user/24.js'
import lightOnIcon from '@carbon/icons/es/light--filled/24.js'
import lightOffIcon from '@carbon/icons/es/light/24.js'
import temperatureIcon from '@carbon/icons/es/temperature/24.js'
import thisSideUpIcon from '@carbon/icons/es/this-side-up/24.js'
import deskAdjustableIcon from '@carbon/icons/es/desk--adjustable/24.js'
import Device from './pages/device/device.js';
import { asyncEventBuses, Formatter, formatters } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';
import { Cluster, ClusterIds, EndpointProxy, RemoteClusterInstance } from '@domojs/devices';

formatters.register('log', class implements Formatter<unknown>
{
    format(value: unknown)
    {
        debugger;
        console.log(value);
        return value;
    }

})

formatters.register('clusterIds', class implements Formatter<ClusterIds[]>
{
    format(value: EndpointProxy)
    {
        return Object.values(value?.clusters || []).map(c => c.target.id);
    }
})

formatters.register('clusters', class implements Formatter<RemoteClusterInstance<any>[]>
{
    format(value: EndpointProxy)
    {
        return Object.values(value?.clusters || []) as any;
    }

})

bootstrapModule.activate([[serviceModule, OutletService.InjectionToken]], (outlet: OutletService) =>
{
    const abort = new AbortController();

    const container = new Container('hotkeys', undefined);
    container.register(configure({
        keyboard: {
            shortcuts: [
                'Numpad0',
                'Digit0',
            ]
        }
    })(() =>
    {
        location.reload();
    }, 'reload'));

    container.register(configure({
        keyboard: {
            shortcuts: [
                'Numpad1',
                'Digit1',
            ]
        }
    })(() =>
    {
        document.body.classList.toggle('dark');
    }, 'dark'));

    container.attach(HotKeyTrigger, { element: document.body });
    bootstrapModule.register('container', container);


    outlet.use('/', 'main', Home[outletDefinition]);
    outlet.use('/device/{fabric}/{endpointId}', 'main', Device[outletDefinition]);
})

bootstrapModule.activateAsync([], async () =>
{
    serviceModule.register('mqtt', await asyncEventBuses.process<MqttEvents>(new URL(`mqtt+ws://${location.host}/mqtt`), { username: 'domojs-guest', password: 'domojs' }));
});

DataContext.propagateProperties.push('icons');

await bootstrap(document.body, {
    icons: {
        search: searchIcon,
        bell: bellIcon,
        user: userIcon,
        lightOn: lightOnIcon,
        lightOff: lightOffIcon,
        temperature: temperatureIcon,
        shutterUp: thisSideUpIcon,
        shutterDown: { ...thisSideUpIcon, attrs: { ...thisSideUpIcon.attrs, transform: 'rotate(180)', } },
        windowCoveringLift: deskAdjustableIcon,
    },
} as any);
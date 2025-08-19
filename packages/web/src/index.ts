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

import searchIcon from '@carbon/icons/es/search/24.js'
import bellIcon from '@carbon/icons/es/notification/24.js'
import userIcon from '@carbon/icons/es/user/24.js'
import lightOnIcon from '@carbon/icons/es/light--filled/24.js'
import lightOffIcon from '@carbon/icons/es/light/24.js'
import temperatureIcon from '@carbon/icons/es/temperature/24.js'
import thisSideUpIcon from '@carbon/icons/es/this-side-up/24.js'
import deskAdjustableIcon from '@carbon/icons/es/desk--adjustable/24.js'

bootstrapModule.activate([[serviceModule, OutletService.InjectionToken], '$rootScope'], (outlet: OutletService, scope: Scope<{ icons: Record<string, IconDescriptor> }>) =>
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
})

DataContext.propagateProperties.push('icons');

await bootstrap(document.getElementById('app'), {
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
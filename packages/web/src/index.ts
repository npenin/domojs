/// <reference types="vite/client" />
import './index.scss'
import { Container } from '@akala/commands'
import { Event, EventEmitter } from '@akala/core';
import { Scope as IScope, LocationService, Template, serviceModule, bootstrapModule, DataContext, DataBind, OutletService, EventComposer, webComponent, EachAsTemplate } from '@akala/client'
import { Processors } from '@akala/commands';
import { Popover } from '@akala/web-ui';
import Home from './pages/home/home.js';
import { ControllableNavigationComposer } from './focusable/table.js';

bootstrapModule.register('services', serviceModule);

type Scope = IScope<{ $authProcessor: Processors.AuthPreProcessor, container: Container<void>, $commandEvents: EventEmitter<Record<string, Event<[unknown]>>> }>;

bootstrapModule.activate(['$rootScope', 'services.$outlet'], async (rootScope: Scope, outlet: OutletService) =>
{
    // Template.composers.push(new FormComposer(rootScope.container))
    Template.composers.push(new DataContext());
    Template.composers.push(new DataBind());
    Template.composers.push(new EventComposer());
    Template.composers.push(new ControllableNavigationComposer());
    webComponent('kl-popover')(Popover);
    webComponent('kl-each', { extends: 'template' })(EachAsTemplate);

    serviceModule.register('templateOptions', {
        $rootScope: rootScope
    })


    outlet.use('/', 'main', Home);

    // outlet.use('/signup', 'main', Signup[outletDefinition]);
    // outlet.use('/login', 'main', Login[outletDefinition]);
})

bootstrapModule.ready(['services.$location', '$rootScope'], async function (location: LocationService, rootScope: IScope<any>)
{
    this.whenDone.then(async () =>
    {
        Template.composeAll([document.getElementById('app')!], document.body, { $rootScope: rootScope });
        location.start({ dispatch: true, hashbang: false })
    })
});

await bootstrapModule.start();
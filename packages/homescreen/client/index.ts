import { bootstrap } from '@akala/web-ui'
import { bootstrapModule, HotKeyTrigger, outletDefinition, OutletService, serviceModule } from '@akala/client'
import './index.css';
import Home from './pages/home/home';
import { configure, connect, Container, SelfDefinedCommand } from '@akala/commands/browser';

bootstrapModule.activate([[serviceModule, OutletService.InjectionToken]], (outlet: OutletService) =>
{
    const abort = new AbortController();
    const domojs = connect(new URL('/pm', location.href).toString().replace(/^http/, 'ws'), abort.signal);

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



await bootstrap(document.body)
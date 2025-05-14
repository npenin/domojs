import { e, Page, page, RootElement, content, t, bootstrapModule } from '@akala/client'
import template from './home.html?raw'

@page({ template, 'inject': [RootElement] })
export default class Home extends Page
{
    public readonly carrefour = Promise.resolve({ displayName: 'Carrefour', currentOpeningHours: { openNow: true } });
    public readonly lidl = Promise.resolve({ displayName: 'Lidl', currentOpeningHours: { openNow: true } });

    constructor(private el: HTMLElement)
    {
        super();
        document.addEventListener('keydown', (ev) =>
        {
            const debug = document.querySelector('#debug')!;
            debug.append(content(e('div'), t(ev.code)));
            if (debug.childNodes.length > 10)
                debug.childNodes[0].remove();

        });
    }
}
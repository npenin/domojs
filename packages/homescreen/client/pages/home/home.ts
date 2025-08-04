import { e, Page, page, RootElement, content, t, bootstrapModule } from '@akala/client'
import template from './home.html?raw'

@page({ template, 'inject': [RootElement] })
export default class Home extends Page
{
    public readonly carrefour =
        fetch('https://places.googleapis.com/v1/places/ChIJDyoiLdOEkUcRItC5kmfPzA0?fields=displayName,currentOpeningHours&key=AIzaSyC6zSNgmdh4AM1QUVlG0TMs4F-Wp-QPsGY').then(res => res.json());
    public readonly lidl =
        fetch('https://places.googleapis.com/v1/places/ChIJN7vPltGEkUcRjgTfwgs8BVo?fields=displayName,currentOpeningHours&key=AIzaSyC6zSNgmdh4AM1QUVlG0TMs4F-Wp-QPsGY').then(res => res.json());

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
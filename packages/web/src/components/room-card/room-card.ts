import { Control, Page, page, RootElement, Template, webComponent } from '@akala/client'
import template from './room-card.html?raw'

@page({ template, 'inject': [RootElement] })
@webComponent('room-card')
export default class RoomCard extends Control<{ title: string, data: any }, HTMLElement>
{
    shadow: ShadowRoot;
    constructor(el: HTMLElement)
    {
        super(el);
        el.classList.add('card', 'actionable');

        this.shadow = this.element.attachShadow({ mode: 'open' });
        this.inheritStylesheets(this.shadow);
        const elements = Array.from(Template.buildElements(template));
        this.shadow.replaceChildren(...elements);

    }

    connectedCallback(): void
    {
        this.teardown(Template.composeAll(this.shadow.children, this.shadow, { controller: this, room: this.bind('data') }));
    }
}
import { Control, Page, page, RootElement, Template, webComponent } from '@akala/client'
import template from './room-card.html?raw'

@page({ template, 'inject': [RootElement] })
@webComponent('room-card')
export default class RoomCard extends Control<{ title: string, data: any }, HTMLElement>
{
    constructor(el: HTMLElement)
    {
        super(el);
        el.classList.add('card', 'actionable');
    }

    connectedCallback(): void
    {
        const shadow = this.element.attachShadow({ mode: 'open' });
        this.inheritStylesheets(shadow);
        const elements = Array.from(Template.buildElements(template));
        shadow.replaceChildren(...elements);
        this.teardown(Template.composeAll(elements, shadow, { controller: this, room: this.bind('data') }));
    }
}
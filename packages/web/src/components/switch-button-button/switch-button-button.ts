import { Page, page, RootElement } from '@akala/client'
import template from './switch-button-button.html?raw'

export default class SwitchButtonButton extends Page
{
    constructor(private el: HTMLElement)
    {
        super();
    }
}

export const outlet = page({ template, 'inject': [RootElement] })(SwitchButtonButton);
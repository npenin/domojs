import { Page, page, RootElement } from '@akala/client'
import template from './lift-window-covering-button.html?raw'

export default class LiftWindowCoveringButton extends Page
{
    constructor(private el: HTMLElement)
    {
        super();
    }
}

export const outlet = page({ template, 'inject': [RootElement] })(LiftWindowCoveringButton);
import { Page, page, RootElement } from '@akala/client'
import template from './windowCovering.html?raw'

export class WindowCovering extends Page
{
    constructor(el: HTMLElement)
    {
        super(el);
    }
}

export default page({ template, 'inject': [RootElement] })(WindowCovering);
import { DataContext, Page, page, RootElement } from '@akala/client'
import template from './lift-window-covering-button.html?raw'
import { ClusterCommands, EndpointProxy } from '@domojs/devices';
import { ClusterMap } from '../../../../devices/dist/codegen/index.js';

export default class LiftWindowCoveringButton extends Page
{
    constructor(el: HTMLElement)
    {
        const parentContext = DataContext.find(el);
        super(el);
    }

    runCommand(context: EndpointProxy<'windowCovering'>, cmd: keyof ClusterCommands<ClusterMap['windowCovering']>)
    {
        return function ()
        {
            // context.clusters.windowCovering.target.CurrentPositionLiftPercentage
            context.clusters.windowCovering.target[cmd]()
        }
    }

    openDialog()
    {
        const el = this.element;
        return function ()
        {
            el.querySelector('dialog').showModal();
        }
    }
    closeDialog()
    {
        const el = this.element;
        return function ()
        {
            el.querySelector('dialog').close();
        }
    }
}

export const outlet = page({ template, 'inject': [RootElement] })(LiftWindowCoveringButton);
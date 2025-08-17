import { Control, webComponent } from "@akala/client";
import { getAttributes, type toSVG } from '@carbon/icon-helpers'
import { Argument0 } from "@akala/core";

export type IconDescriptor = Argument0<typeof toSVG>

@webComponent('ibm-icon')
export class IbmIcon extends Control<{ icon: IconDescriptor }>
{
    constructor(element: HTMLElement)
    {
        super(element);
    }

    connectedCallback(): void
    {
        const shadow = this.element.attachShadow({ mode: 'closed' });
        this.bind('icon').onChanged(async ev =>
            ev.value ?
                shadow.replaceChildren(ev.value && IbmIcon.toSVG(ev.value)) :
                shadow.replaceChildren()
            , true);
    }

    public static toSVG(descriptor: IconDescriptor): SVGElement
    {
        const _descriptor$elem = descriptor.elem,
            elem = _descriptor$elem === void 0 ? 'svg' : _descriptor$elem,
            _descriptor$attrs = descriptor.attrs,
            attrs = _descriptor$attrs === void 0 ? {} : _descriptor$attrs,
            _descriptor$content = descriptor.content,
            content = _descriptor$content === void 0 ? [] : _descriptor$content;
        const node = document.createElementNS('http://www.w3.org/2000/svg', elem);
        const attributes = elem !== 'svg' ? attrs : getAttributes(attrs);
        Object.keys(attributes).forEach(function (key)
        {
            if (attrs[key] !== undefined)
                node.setAttribute(key, attrs[key]);
        });
        for (var i = 0; i < content.length; i++)
        {
            node.appendChild(this.toSVG(content[i]));
        }
        return node;
    }
}
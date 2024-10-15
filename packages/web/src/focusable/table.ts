import { AttributeComposer, Composer, HotKeyTrigger } from "@akala/client";
import { Container, fromObject, helper, Processors } from "@akala/commands";
import { Binding, grep, Subscription } from "@akala/core";

export class ControllableNavigationComposer implements Composer
{
    selector: string | string[] = '.controllable';
    optionGetter(options: object): unknown
    {
        return null;
    }

    apply(item: HTMLElement, options?: unknown, futureParent?: Element | ShadowRoot): Disposable
    {
        switch (item.tagName)
        {
            case 'TABLE':
                if (item.classList.contains('focusable-row'))
                {

                }
                break;
            default:
                item.childNodes.forEach((n) => { if (!(n instanceof HTMLElement) || n.hasAttribute('tabIndex')) return; n.tabIndex = 0 });

                fromObject({
                    'ArrowLeft': () =>
                    {
                        const focused = document.querySelector(':focus-visible');
                        if (!focused)
                        {
                            for (let i = item.childNodes.length - 1; i >= 0; i--)
                            {
                                const element = item.childNodes[i];
                                if (element instanceof HTMLElement && element.tabIndex >= 0)
                                {
                                    element.focus();
                                    return;
                                }
                            }
                        }
                        let current = focused;
                        while (current.previousElementSibling)
                        {
                            if (current.previousElementSibling instanceof HTMLElement && current.previousElementSibling.tabIndex >= 0)
                            {
                                current.previousElementSibling.focus();
                                break;
                            }
                            current = current.previousElementSibling;
                        }

                    },
                    'ArrowRight': () =>
                    {
                        const focused = document.querySelector(':focus-visible');
                        if (!focused)
                        {
                            for (let i = 0; i < item.childNodes.length; i++)
                            {
                                const element = item.childNodes[i] as HTMLElement;
                                if (element instanceof HTMLElement && element.tabIndex >= 0)
                                {
                                    element.focus();
                                    return;
                                }
                            }
                        }
                        let current = focused;
                        while (current.nextElementSibling)
                        {
                            if (current.nextElementSibling instanceof HTMLElement && current.nextElementSibling.tabIndex >= 0)
                            {
                                current.nextElementSibling.focus();
                                break;
                            }
                            current = current.nextElementSibling;
                        }
                    },
                    'Enter': () =>
                    {
                        const focused = item.querySelector(':focus-visible');
                        if (!focused)
                            return;
                        const event = Object.assign(new Event('controllable.selected', { bubbles: false, cancelable: false }), { focused });
                        item.dispatchEvent(event)
                    }
                }, 'focus').attach(HotKeyTrigger);
                break;
        }

        item.focus();

        return { [Symbol.dispose]: () => { } };

    }
}
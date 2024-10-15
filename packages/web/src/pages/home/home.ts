import { DataContext, Page, page, ScopeImpl } from '@akala/client'
import { Container, Metadata } from '@akala/commands';
import { Binding, ParsedArray, ParsedString, parser, Parser } from '@akala/core';

// type Scope = IScope<{ $authProcessor: Processors.AuthPreProcessor, container: Container<void>, $commandEvents: EventEmitter<Record<string, Event<[unknown]>>> }>;

class HomePage extends Page
{
    commands: Promise<Metadata.Command[]>;
    constructor(private container: Container<void>)
    {
        super();
        this.commands = container.dispatch('$metadata', true).then(m => m.commands.filter(c => c.config?.['html-form']));
    }

    cardSelected(ev: Event & { focused: HTMLElement })
    {
        const binding = new Binding({ controller: this, get context() { return DataContext.find(ev.focused) } }, Parser.parameterLess.parse(ev.focused.getAttribute('command')));
        const args = binding.getValue();
        if (typeof args == 'string')
            return this.container.dispatch(args)
        if (Array.isArray(args) && typeof args[0] == 'string')
            return this.container.dispatch.apply(this.container, args);
        throw new Error('Invalid command');
    }
}

export const Home =
    page({
        template: new URL('./home.html', import.meta.url).toString(),
        inject: [[ScopeImpl.injectionToken, 'container']]
    })(HomePage);

export default Home;
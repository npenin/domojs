import * as akala from '@akala/core';
import * as client from '@akala/client';
import * as fa from '@fortawesome/fontawesome-svg-core'
import '../../assets/css/scss/main.scss';

import { BlockColors, TileDef, FaIconLibraryInterface, bootstrap, tileComponent } from './public_api'

bootstrap.addDependency(akala.module('@domojs/theme-default', client.$$injector.name).activate(['$injector'], function (module: akala.Module)
{
    var list: akala.ObservableArray<TileDef> = new akala.ObservableArray<TileDef>([]);

    module.register('tiles', {
        add(tile: TileDef)
        {
            list.push(tile);
        },
        array: list
    })

    akala.module('@domojs/theme-default').service('faIcon')(
        class FaIconLibrary implements FaIconLibraryInterface
        {
            private definitions: { [prefix: string]: { [name: string]: fa.IconDefinition } } = {};

            addIcons(...icons: fa.IconDefinition[])
            {
                for (const icon of icons)
                {
                    if (!(icon.prefix in this.definitions))
                    {
                        this.definitions[icon.prefix] = {};
                    }
                    this.definitions[icon.prefix][icon.iconName] = icon;
                }
            }

            addIconPacks(...packs: fa.IconPack[])
            {
                for (const pack of packs)
                {
                    const icons = Object.keys(pack).map((key) => pack[key]);
                    this.addIcons(...icons);
                }
            }

            getIconDefinition(icon: fa.IconLookup): fa.IconDefinition | null
            {
                if (typeof icon['icon'] != 'undefined')
                    return icon as fa.IconDefinition;

                if (icon.prefix in this.definitions && icon.iconName in this.definitions[icon.prefix])
                {
                    return this.definitions[icon.prefix][icon.iconName];
                }
                return null;
            }
        })

    @client.control('fa')
    // @ts-ignore
    class FA extends client.controls.GenericControlInstance<fa.IconLookup | akala.Proxy<fa.IconLookup, akala.Binding>>
    {
        @akala.inject('@domojs/theme-default.faIcon')
        private library: FaIconLibraryInterface;

        constructor()
        {
            super();
        }

        public init(): any
        {
            if (typeof this.parameter !== 'undefined')
            {
                var parameter = this.parameter;

                if (this.parameter instanceof akala.Binding || this.parameter.prefix instanceof akala.Binding || this.parameter.iconName instanceof akala.Binding)
                    parameter = akala.Binding.unbindify(this.parameter) as fa.IconLookup;

                if (typeof parameter != 'undefined')
                    if (typeof parameter['icon'] != 'undefined')
                        this.element.innerHTML = fa.icon(parameter as fa.IconLookup).html.join('\n');
                    else
                        this.element.innerHTML = fa.icon(this.library.getIconDefinition(parameter as fa.IconLookup)).html.join('\n')
            }
        }
    }

    client.control('color')(
        class BlockColor extends client.controls.GenericControlInstance<string>
        {
            constructor()
            {
                super();
            }

            public init()
            {
                var parameter = this.parameter;
                if (typeof parameter == 'undefined')
                    parameter = BlockColors[Math.floor(Math.random() * Object.keys(BlockColors).length / 2)];
                if (parameter instanceof akala.Binding)
                {
                    var oldValue: string = undefined;
                    parameter.onChanged((ev) =>
                    {
                        if (typeof oldValue !== 'undefined')
                            this.element.classList.remove('block-' + oldValue);
                        if (typeof ev.eventArgs.value == 'undefined')
                            oldValue = BlockColors[Math.floor(Math.random() * Object.keys(BlockColors).length / 2)];
                        else
                            oldValue = ev.eventArgs.value;

                        this.element.classList.add('block-' + oldValue);
                    });
                }
                else
                    this.element.classList.add('block-' + parameter);
            }
        })

    module.activate(['akala-services.$part'], function (part: client.Part)
    {
        part.use('/', 'body', tileComponent(list));
    });
}));


var domReady = function (callback)
{
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};
domReady(function ()
{
    bootstrap.start();
});
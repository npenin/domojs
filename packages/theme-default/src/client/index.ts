import * as akala from '@akala/core';
import * as client from '@akala/client';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import * as fa from '@fortawesome/fontawesome-svg-core'
import '../../assets/css/scss/main.scss';
import tiles from '../../views/tiles.html'

import { Tile, BlockColors, TileDef, FaIconLibraryInterface, bootstrap } from './public_api'

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

  module.register('bootstrap', []);

  @akala.module('@domojs/theme-default').service('faIcon')
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
  }

  @client.control('@domojs/theme-default.faIcon')
  class FA extends client.BaseControl<fa.IconLookup>
  {
    constructor(private library: FaIconLibraryInterface)
    {
      super('fa');
    }

    public apply(scope: any, element: Element, parameter: fa.IconLookup | akala.Proxy<fa.IconLookup, akala.Binding>): any
    {
      if (typeof parameter !== 'undefined')
      {
        if (parameter.prefix instanceof akala.Binding || parameter.iconName instanceof akala.Binding)
          return this.apply(scope, element, akala.Binding.unbindify(parameter) as fa.IconLookup);
      }

      if (typeof parameter['icon'] != 'undefined')
        element.innerHTML = fa.icon(parameter as fa.IconLookup).html.join('\n');
      else
        element.innerHTML = fa.icon(this.library.getIconDefinition(parameter as fa.IconLookup)).html.join('\n')
    }
  }

  @client.control()
  class BlockColor extends client.BaseControl<string>
  {
    constructor()
    {
      super('color');
    }

    public apply(_scope: client.IScope<any>, element: Element, parameter?: string): any
    {
      if (typeof parameter == 'undefined')
        parameter = BlockColors[Math.floor(Math.random() * Object.keys(BlockColors).length / 2)];
      element.classList.add('block-' + parameter);
    }
  }

  module.ready(['akala-services.$part'], function (part: client.Part)
  {
    part.use('/', 'body', {
      template: tiles, controller: function (scope)
      {
        scope['list'] = list;

        scope['tileClick'] = function (tile: Tile, $location: client.LocationService, $http: akala.Http)
        {
          if (tile.url)
            if (akala.isPromiseLike(tile.url))
              tile.url.then(function (url) { $location.show(url) });
            else
              $location.show(tile.url);
          if (tile.cmd)
            $http.get(tile.cmd)
        }
        scope['tileClick'].$inject = ['tile', '$modules.akala-services.$location', '$http'];

      }
    });
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
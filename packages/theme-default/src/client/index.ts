import * as akala from '@akala/core';
import * as client from '@akala/client';
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
          var oldValue = undefined;
          parameter.onChanged((ev) =>
          {
            if (typeof oldValue !== 'undefined')
              this.element.classList.remove('block-' + oldValue);
            this.element.classList.add('block-' + ev.eventArgs.value);
            oldValue = ev.eventArgs.value;
          });
        }
        else
          this.element.classList.add('block-' + parameter);
      }
    })

  module.activate(['akala-services.$part'], function (part: client.Part)
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
          if (tile.click)
            tile.click();
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
import * as akala from '@akala/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import * as fa from '@fortawesome/fontawesome-svg-core'
import { LocationService, applyTemplate, IScope, PartDefinition } from '@akala/client';
import tiles from '../../views/tiles.html'
import * as client from '@akala/client';
import { ObservableArray } from '@akala/core';

export interface Tile
{
    text?: string,
    icon?: fa.IconDefinition,
    url?: string | PromiseLike<string>,
    cmd?: string,
    part?: PartDefinition<any>
    color?: BlockColors;
    click?(...args: any[]): boolean | void | Promise<void>;
}

export enum BlockColors
{
    black,
    blue,
    brown,
    green,
    lime,
    magenta,
    orange,
    pink,
    purple,
    red,
    viridian,
}

type TileCallback = (Tile) => void;
export type TileDef = Tile | PromiseLike<Tile>;

export interface TileService
{
    add<T extends TileDef>(tile: T): void;
    array: akala.ObservableArray<TileDef>;
}

export function tileComponent(list: ObservableArray<TileDef> | TileDef[]): PartDefinition<any>
{
    return {
        template: tiles, controller: function (scope, element)
        {
            if (element.classList.contains('block'))
                element.classList.add('block-container');
            scope.tile = { list };

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
    }
}

export interface FaIconLibraryInterface
{
    addIcons(...icons: fa.IconDefinition[]): void;
    addIconPacks(...packs: fa.IconPack[]): void;
    getIconDefinition(icon: fa.IconLookup): fa.IconDefinition | null;
}

let bootstrapStarted = false;

export var bootstrap = {
    addDependency(module: akala.Module)
    {
        if (module.dep)
            module.dep.forEach(m => bootstrap.addDependency(m));
        bootstrapModule.addDependency(module);

        if (bootstrapStarted)
            module.start();
    },
    start() { bootstrapStarted = true; return bootstrapModule.start() }
}

var bootstrapModule = akala.module('$bootstrap').ready(['akala-services.$location', 'akala.$rootScope'], async function (location: LocationService, rootScope: IScope<any>)
{
    //if (!rootScope)
    this.whenDone.then(async () =>
    {
        await applyTemplate([document.body], rootScope);
        location.start({ dispatch: true, hashbang: false })
    })
});

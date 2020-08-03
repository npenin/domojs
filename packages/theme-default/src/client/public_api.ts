import * as akala from '@akala/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import * as fa from '@fortawesome/fontawesome-svg-core'
import { LocationService, applyTemplate } from '@akala/client';
import { Scope } from '@akala/client/dist/scope';

export interface Tile
{
    text: string,
    icon?: fa.IconDefinition,
    url?: string | PromiseLike<string>,
    cmd?: string,
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
    add(tile: TileDef): void;
    array: akala.ObservableArray<TileDef>;
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

var bootstrapModule = akala.module('$bootstrap').ready(['akala-services.$location', 'akala.$rootScope'], function (location: LocationService, rootScope: Scope<any>)
{
    if (!rootScope)
        debugger;

    applyTemplate([document.body], rootScope);
});

import * as akala from '@akala/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import * as fa from '@fortawesome/fontawesome-svg-core'

export interface Tile
{
    text: string,
    icon?: fa.IconDefinition,
    url?: string | PromiseLike<string>,
    cmd?: string,
    color?: BlockColors;
    click?(...args: any[]): boolean | void;
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
    getIconDefinition(prefix: IconPrefix, name: IconName): fa.IconDefinition | null;
}

export var bootstrap = {
    addDependency(module: akala.Module)
    {
        bootstrapModule.activate([], function ()
        {
            this.waitUntil(module.activateEvent.complete())
            module.start();
        })
        bootstrapModule.ready([], function ()
        {
            this.waitUntil(module.readyEvent.complete())
        })
    },
    start() { return bootstrapModule.start() }
}

var bootstrapModule = akala.module('$bootstrap');

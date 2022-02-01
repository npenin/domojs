import * as akala from '@akala/core';
import * as fa from '@fortawesome/fontawesome-svg-core'
import { LocationService, IScope, PartDefinition, Template, HotKeyTrigger } from '@akala/client';
import template from '../../views/tiles.html'
import * as client from '@akala/client';
import { ObservableArray } from '@akala/core';
import { Metadata, Container, inject } from '@akala/commands';

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

// type TileCallback = (Tile) => void;
export type TileDef = Tile | PromiseLike<Tile>;

export interface TileService
{
    add<T extends TileDef>(tile: T): void;
    array: akala.ObservableArray<TileDef>;
}
var commandContainer = new Container<void>('local', null);
var commands = new ObservableArray<Metadata.Command>([]);
commands.on('collectionChanged', function (ev)
{
    switch (ev.action)
    {
        case 'pop':
        case 'shift':
        case 'replace':
            ev.oldItems.forEach(c => commandContainer.unregister(c.name));
            if (ev.action != 'replace')
                break;
        case 'push':
        case 'unshift':
            ev.newItems.forEach(c => commandContainer.register(c));
            break;
    }
});

export const keyBinding = new Container<void>('keybinding', undefined);
keyBinding.attach(HotKeyTrigger);

export const tiles: string = template;

export function tileComponent(list: ObservableArray<TileDef> | TileDef[], cmds?: Metadata.Command[] | ObservableArray<Metadata.Command>): PartDefinition<any>
{
    return {
        template: template, controller: async function (scope, element)
        {
            if (element.classList.contains('block'))
                element.classList.add('block-container');
            scope.tile = { list };

            scope['$root'].$set('commands', cmds || commands);
            scope.$set('dispatch', inject('command')(function (cmd: Metadata.Command, ...rest: any[]) 
            {
                return commandContainer.dispatch(cmd, ...rest);
            }));


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
        await Template.composeAll([document.body], rootScope);
        location.start({ dispatch: true, hashbang: false })
    })
});

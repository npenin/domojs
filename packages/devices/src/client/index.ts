import * as web from '@domojs/theme-default'
import * as fa from '@fortawesome/free-brands-svg-icons'
import module from './main.module'
import './main.component'

module.ready(['@domojs/theme-default.tiles', '@domojs/theme-default.faIcon'], function (tiles: web.TileService, lib: web.FaIconLibraryInterface)
{
    lib.addIcons(fa.faUsb);

    tiles.add({
        text: 'Périphériques',
        icon: fa.faUsb,
        url: '/devices'
    })
});
import * as akala from '@akala/core'
import * as web from '@domojs/theme-default'
import * as fa from '@fortawesome/free-brands-svg-icons'

web.bootstrap.addDependency(akala.module('@domojs/devices', '@domojs/theme-default').ready(['@domojs/theme-default.tiles', '@domojs/theme-default.faIcon'], function (tiles: web.TileService, lib: web.FaIconLibraryInterface)
{
    lib.addIcons(fa.faUsb);

    tiles.add({
        text: 'Périphériques',
        icon: fa.faUsb,
        url: '/devices'
    })

}))

// module.start();
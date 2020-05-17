import * as akala from '@akala/client'
import * as web from './public_api'
import * as fa from '@fortawesome/free-solid-svg-icons'

web.bootstrap.addDependency(akala.module('@akala/pm', '@domojs/theme-default').ready(['@domojs/theme-default.tiles', '@domojs/theme-default.faIcon'], function (tiles: web.TileService, lib: web.FaIconLibraryInterface)
{
    lib.addIcons(fa.faCogs);

    tiles.add({
        text: 'Commandes',
        icon: 'cogs',
        iconLibrary: 'fas',
        url: '/pm'
    })

}))

// module.start();
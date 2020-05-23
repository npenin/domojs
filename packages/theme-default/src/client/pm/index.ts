import * as web from '../public_api'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { module } from './main.module'
import './main.component'

web.bootstrap.addDependency(module);

module.ready(['@domojs/theme-default.tiles', '@domojs/theme-default.faIcon'],
    function addCogsTile(tiles: web.TileService, lib: web.FaIconLibraryInterface)
    {
        lib.addIcons(fa.faCogs);

        tiles.add({
            text: 'Commandes',
            icon: 'cogs',
            iconLibrary: 'fas',
            url: '/pm'
        });
    });

// module.start();
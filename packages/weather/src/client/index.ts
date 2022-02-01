import { Container } from '@akala/commands';
import { ObservableArray } from '@akala/core';
import * as web from '@domojs/theme-default'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { description } from '../commander';
import mdule, { weatherToIcon } from './main.module'
// import './main.component'

mdule.ready(['@domojs/theme-default.tiles', '@domojs/theme-default.faIcon', 'container'], function (tiles: web.TileService, lib: web.FaIconLibraryInterface, container: Container<void> & description.commands)
{
    lib.addIcons(fa.faSun);
    lib.addIcons(fa.faCloud);
    lib.addIcons(fa.faCloudRain);
    lib.addIcons(fa.faCloudShowersHeavy);
    lib.addIcons(fa.faCloudSun);
    lib.addIcons(fa.faCloudSunRain);
    lib.addIcons(fa.faCloudMoon);
    lib.addIcons(fa.faCloudMoonRain);
    lib.addIcons(fa.faMoon);
    lib.addIcons(fa.faSmog);
    lib.addIcons(fa.faBolt);

    var front = new ObservableArray<web.Tile>([]);
    var back = new ObservableArray<web.Tile>([]);
    var tile = {
        text: 'Meteo',
        icon: fa.faSun,
        part: web.tileComponent(front),
        back: {
            background: '/api/weather/background', part: web.tileComponent(back)
        }
    };
    tiles.add(tile);

    function refreshWeather()
    {
        container.dispatch('today', 47.7401559, 7.2885527).then(v =>
        {
            front.push(
                { icon: weatherToIcon(v.weather, v.isNight), },
                { text: v.temp + '°' },
                { text: 'Aujourd\'hui' }
            );
            [
                { icon: weatherToIcon(v.weather, v.isNight) },
                { text: v.tempMin + '<sup>°C</sup>' },
                // { text: forecast.date.weekday },
                { text: v.tempMax + '<sup>°C</sup>' },
            ]
        });
    }
    setInterval(refreshWeather, 3600000);
    refreshWeather();
})
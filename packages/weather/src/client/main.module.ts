import * as akala from '@akala/core'
import * as ac from '@akala/commands'
import * as web from '@domojs/theme-default'
import { Weather } from '../state';
import * as fa from '@fortawesome/free-solid-svg-icons'

const metaContainer: ac.Metadata.Container = require('../../commands.json')

export const mdule = akala.module('@domojs/weather', '@domojs/theme-default');
const resolveUrl = mdule.resolve('$resolveUrl');
mdule.register('$resolveUrl', (url: string) =>
{
    return resolveUrl('/api/weather/' + url);
})
mdule.register('container', ac.proxy(metaContainer, new ac.Processors.HttpClient(mdule as any)));
web.bootstrap.addDependency(mdule);

export default mdule;

export function weatherToIcon(weather: Weather, isNight?: boolean)
{
    switch (weather)
    {
        case Weather.thunderstorm_with_light_rain:
        case Weather.thunderstorm_with_rain:
        case Weather.thunderstorm_with_heavy_rain:
        case Weather.light_thunderstorm:
        case Weather.thunderstorm:
        case Weather.heavy_thunderstorm:
        case Weather.ragged_thunderstorm:
        case Weather.thunderstorm_with_light_drizzle:
        case Weather.thunderstorm_with_drizzle:
        case Weather.thunderstorm_with_heavy_drizzle:
            return fa.faBolt;
        case Weather.light_intensity_drizzle:
        case Weather.drizzle:
        case Weather.heavy_intensity_drizzle:
        case Weather.light_intensity_drizzle_rain:
        case Weather.drizzle_rain:
        case Weather.heavy_intensity_drizzle_rain:
        case Weather.shower_rain_and_drizzle:
        case Weather.heavy_shower_rain_and_drizzle:
        case Weather.shower_drizzle:
            return isNight ? fa.faCloudMoonRain : fa.faCloudSunRain;
        case Weather.light_rain:
        case Weather.moderate_rain:
        case Weather.heavy_intensity_rain:
        case Weather.very_heavy_rain:
        case Weather.extreme_rain:
            return fa.faCloudRain;
        case Weather.freezing_rain:
            return fa.faSnowflake;
        case Weather.light_intensity_shower_rain:
        case Weather.shower_rain:
        case Weather.heavy_intensity_shower_rain:
        case Weather.ragged_shower_rain:
            return fa.faCloudShowersHeavy;
        case Weather.light_snow:
        case Weather.Snow:
        case Weather.Heavy_snow:
        case Weather.Sleet:
        case Weather.Light_shower_sleet:
        case Weather.Shower_sleet:
        case Weather.Light_rain_and_snow:
        case Weather.Rain_and_snow:
        case Weather.Light_shower_snow:
        case Weather.Shower_snow:
        case Weather.Heavy_shower_snow:
            return fa.faSnowflake;
        case Weather.mist:
        case Weather.Smoke:
        case Weather.Haze:
        case Weather.sand_dust_whirls:
        case Weather.fog:
        case Weather.sand:
        case Weather.dust:
        case Weather.volcanic_ash:
        case Weather.squalls:
        case Weather.tornado:
            return fa.faSmog;
        case Weather.clear_sky:
            return isNight ? fa.faMoon : fa.faSun;
        case Weather.few_clouds_11_25:
            return isNight ? fa.faCloudMoon : fa.faCloudSun;
        case Weather.scattered_clouds_25_50:
            return fa.faCloud;
        case Weather.broken_clouds_51_84:
            return fa.faCloud;
        case Weather.overcast_clouds_85_100:
            return fa.faCloud;
    }

}

export function weatherToProIcon(weather: Weather, isNight?: boolean)
{
    return weatherToIcon(weather, isNight);
}
import { Http } from '@akala/core';
import fs from 'fs/promises'

var baseCachePath = './cache/weather/';

export interface Position
{
    latitude: number;
    longitude: number;
}

var caches: { [key: string]: WeatherProvider } = {};

export interface WeatherProvider
{
    getFromCache(http: Http, position: Position, method: string, url: string): Promise<any>;
    getInfo(http: Http, position: Position): Promise<any>;
    getForecast(http: Http, position: Position): Promise<any>;
}

export function cache(provider: string, weatherUrl: (position: Position) => string, forecastUrl: (position: Position) => string): WeatherProvider
{
    if (provider in caches)
        return caches[provider];
    return caches[provider] = {
        getFromCache: async function getFromCache(http: Http, position: Position, method: string, url: string)
        {
            var cacheData = async function (data)
            {
                try
                {
                    var stats = await fs.stat(baseCachePath);
                    if (stats.isDirectory())
                        await fs.writeFile(fileName, JSON.stringify(data));
                    return data;
                }
                catch (e)
                {
                    if (e.code == 'ENOENT')
                    {
                        await fs.mkdir(baseCachePath, { recursive: true });
                        return await cacheData(data);
                    }
                    throw e;
                }
            }


            var fileName = baseCachePath + provider + '-' + method + '-' + position.latitude + ',' + position.longitude + '.json';
            try
            {
                var stats = await fs.stat(fileName)
                console.log(stats.mtime);
            }
            catch (e)
            {
                if (e.code == 'ENOENT')
                    stats = null;
                else
                    throw e;
            }
            if (stats && (new Date().valueOf() - stats.mtime.valueOf()) / 60000 < 15)
            {
                const data = await fs.readFile(fileName, { encoding: 'utf-8' });
                return JSON.parse(data);
            }
            console.log(url);
            console.log(http);
            return await http.getJSON(url).then(cacheData);
        }
        ,
        getInfo: function getInfo(http: Http, position: Position)
        {
            return this.getFromCache(http, position, 'weather', weatherUrl(position));
        },
        getForecast: function forecastFromCache(http: Http, position: Position)
        {
            return this.getFromCache(http, position, 'forecast', forecastUrl(position));
        }
    }
}


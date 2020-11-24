import { Http } from '@akala/core';
import fs from 'fs/promises'
import { Weather } from '../state';
import { cache as getFromCache, Position } from './common';

const cache = getFromCache('openweathermap',
	(position: Position) => `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=930cde9194d9199d70f37ff56945c548&units=metric`,
	(position: Position) => `https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=930cde9194d9199d70f37ff56945c548&units=metric`,
)

export function today(http: Http, position: Position): PromiseLike<{ temp: number, feelslike: number, tempMin: number, tempMax: number, pressure?: number, humidity?: number, weather: number, isNight?: boolean }>
{
	return cache.getInfo(http, position).then(v =>
	{
		var result = {
			temp: v.main.temp,
			feelslike: v.main.feels_like,
			tempMin: v.main.temp_min,
			tempMax: v.main.temp_max,
			pressure: v.pressure,
			humidity: v.humidity,
			weather: v.weather[0].id as Weather,
			isNight: !(v.dt > v.sys.sunrise && v.dt < v.sys.sunset)
		};
		console.log(result);
		return result;
	});
}
export function temperature(http: Http, position: Position)
{
	return today(http, position).then(data => ({ temp: data.temp, feelslike: data.feelslike }));
}
export function forecast(http: Http, position: Position, id?: number)
{
	return cache.getForecast(http, position).then(data =>
	{
		if (!isNaN(data) || !data || !data.forecast || !data.forecast.simpleforecast || !data.forecast.simpleforecast)
			return data;
		else if (typeof (id) != 'undefined')
			return data.forecast.simpleforecast.forecastday[id];
		else
			return data.forecast.simpleforecast.forecastday;
	});
}

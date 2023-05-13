import { State } from "../state.js";
import interact from '@akala/pm'
import * as helper from '../providers/openweathermap.js'
import { Http } from "@akala/core";

export default async function (this: State, http: Http, latitude: number, longitude: number)
{
    if (typeof (latitude) == 'undefined')
        interact('please specify latitude', 'latitude');
    if (typeof (longitude) == 'undefined')
        interact('please specify longitude', 'longitude');

    return helper.temperature(http, { latitude, longitude });
}
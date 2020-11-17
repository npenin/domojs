import { State } from "../state";
import interact from '@akala/pm'
import * as helper from '../providers/openweathermap'
import { Http } from "@akala/core";

export default async function (this: State, http: Http, latitude: number, longitude: number)
{
    if (typeof (latitude) == 'undefined')
        interact('please specify latitude', 'latitude');
    if (typeof (longitude) == 'undefined')
        interact('please specify longitude', 'longitude');

    return helper.today(http, { latitude, longitude });
}
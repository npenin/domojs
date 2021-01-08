import * as akala from '@akala/core'
import { HttpOptions } from '@akala/core';

export default function call(params: HttpOptions)
{
    var http: akala.Http = akala.defaultInjector.resolve('$http');
    return http.call(params);
}
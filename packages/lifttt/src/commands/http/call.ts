import * as akala from '@akala/core'
import { HttpOptions } from '@akala/core';
// import { Response } from 'node-fetch'

export default function call<T>(params: HttpOptions<T>): PromiseLike<Response>
{
    var http: akala.Http = akala.defaultInjector.resolve('$http');
    return http.call(params);
}
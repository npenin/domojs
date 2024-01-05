import { State } from "../common.js";
import { logger } from '@akala/core';

export const log = logger('domojs:service-discovery');
// export var rooms: { byTypes: { [type: string]: jsonrpc.Connection[] }, byNames: { [type: string]: jsonrpc.Connection[] } } = { byTypes: {}, byNames: {} };

export default function (this: State)
{
    this.services = { byTypes: {}, byNames: {} };
}
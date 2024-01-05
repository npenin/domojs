import * as jsonrpc from '@akala/json-rpc-ws'
import * as akala from '@akala/server'
import { Service } from './common.js';

// const logger = akala.logger('domojs:service-discovery');

var services: { byTypes: { [type: string]: { [name: string]: Service } }, byNames: { [name: string]: Service } } = { byTypes: {}, byNames: {} };
var rooms: { byTypes: { [type: string]: jsonrpc.Connection[] }, byNames: { [type: string]: jsonrpc.Connection[] } } = { byTypes: {}, byNames: {} };

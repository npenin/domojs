import { CommandProcessor, Container, Metadata, StructuredParameters } from '@akala/commands';
import { MiddlewarePromise } from '@akala/core';
import CastStream, { castMessage } from '@domojs/media-chromecast-parsers'
import net from 'net';
import trigger from './cast-trigger.js';
import { IsomorphicBuffer } from '@akala/core'

export default class CastProcessor extends CommandProcessor
{
    private requestId: number;

    // private requestHandlers: { [key: number]: (response: CastMessage) => void } = {};

    async handle(container: Container<unknown>, cmd: Metadata.Command, param: StructuredParameters): MiddlewarePromise
    {
        if (!this.stream || this.stream['readyState'] !== 'open')
            return new Error('there is no socket or the socket is not writable');

        const requestId = this.requestId++;
        await new Promise<Error>((resolve, reject) => this.socket.write(IsomorphicBuffer.concat(castMessage.write({
            source_id: param.sender as string || 'sender-0',
            destination_id: param.receiver as string || 'receiver-0',
            namespace: param.namespace as string,
            payload_type: 0,
            protocol_version: 0,
            payload_utf8: JSON.stringify(Object.assign({ type: cmd, requestId }, param))
        })).toArray(), err =>
        {
            if (err)
                resolve(err);
            else
                reject();
        }));
    }

    private stream = new CastStream();

    constructor(container: Container<void>, private socket: net.Socket, namespace: string, requestResponseMapping: { [requestCmd: string]: string })
    {
        super('googlecast');
        container.attach(trigger, { socket, namespace, inputOutputMapping: requestResponseMapping });
    }
}
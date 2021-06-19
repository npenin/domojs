import { CommandNameProcessor, Container, Processors, Trigger } from '@akala/commands';
import { MiddlewarePromise } from '@akala/core';
import CastStream, { castMessage, CastMessage, PayloadType } from '@domojs/media-chromecast-parsers'
import net from 'net';


const trigger = new Trigger('googlecast', (container, settings: { socket: net.Socket, namespace: string, inputOutputMapping: { [requestCmd: string]: string } }) =>
{
    settings.socket.pipe(new CastStream()).on('data', async (message: CastMessage) =>
    {
        if (message && (!settings.namespace || message.namespace == settings.namespace))
        {
            if (message.payload_type == PayloadType.STRING)
            {
                var response = JSON.parse(message.payload_utf8);
                const cmd = container.resolve(response.type);
                var result = await Processors.Local.execute(cmd, cmd.handler, container, { ...response, namespace: message.namespace, sender: message.source_id, receiver: message.destination_id, _trigger: 'googlecast' });
                await new Promise<Error>((resolve, reject) => settings.socket.write(Buffer.concat(castMessage.write({
                    source_id: response.receiver as string || 'receiver-0',
                    destination_id: response.sender as string || 'sender-0',
                    namespace: message.namespace as string,
                    payload_type: 0,
                    protocol_version: 0,
                    payload_utf8: JSON.stringify(Object.assign({ type: settings.inputOutputMapping[response.type], requestId: response.requestId }, result))
                })), err =>
                {
                    if (err)
                        console.error(err);
                }));
            }
        }
    });
});

export default trigger;
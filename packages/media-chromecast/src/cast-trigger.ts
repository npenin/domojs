import { Trigger } from '@akala/commands';
import { parserWrite } from '@akala/protocol-parser';
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
                var result = await container.dispatch(response.type, { ...response, namespace: message.namespace, sender: message.source_id, receiver: message.destination_id, _trigger: 'googlecast' });
                await new Promise<Error>((resolve, reject) => settings.socket.write(parserWrite(castMessage, {
                    source_id: response.receiver as string || 'receiver-0',
                    destination_id: response.sender as string || 'sender-0',
                    namespace: message.namespace as string,
                    payload_type: 0,
                    protocol_version: 0,
                    payload_utf8: JSON.stringify(Object.assign({ type: settings.inputOutputMapping[response.type], requestId: response.requestId }, result))
                }).toArray(), err =>
                {
                    if (err)
                        console.error(err);
                }));
            }
        }
    });
});

export default trigger;
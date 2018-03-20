import * as debug from 'debug';
debug.enable('zigate');
import { Zigate } from '../index'
import { MessageType, Protocol } from '../';
import { PassThrough } from 'stream';

// var s = new PassThrough();

// var zigate = new Zigate(s);
// zigate.on('message', function (message)
// {
//     console.log(message);
// })

// s.push(Buffer.from([0x01, 0x80, 0x10, 0x00, 0x05, 0xA4, 0x00, 0x01, 0x00, 0x30, 0x00, 0x03]));

// Zigate.getSerial().then(zigate =>
// {
//     zigate.on('message', function (message) { console.log(message); });
//     zigate.send(MessageType.GetVersion);
// });

console.log(Protocol.send(MessageType.SetChannelMask, { mask: 11 }));
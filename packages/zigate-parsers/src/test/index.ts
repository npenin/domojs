import 'source-map-support/register'
import * as debug from 'debug';
debug.enable('zigate,domojs:protocol-parser');
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

// console.log(Protocol.send(MessageType.SetChannelMask, { mask: 11 }));

console.log(JSON.stringify(Protocol.read(Buffer.from([0x01, 0x80, 0x00, 0x00, 0x05, 0xa4, 0x00, 0x00, 0x00, 0x21, 0x00, 0x03]))));
// console.log(JSON.stringify(Protocol.read(new Buffer([0x01, 0x81, 0x02, 0x00, 0x0f, 0xf7, 0x27, 0x38, 0x44, 0x01, 0x04, 0x03, 0x00, 0x10, 0x00, 0x29, 0x00, 0x02, 0x26, 0xa7, 0x9c, 0x03]))));
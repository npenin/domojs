import { MessageType, messages } from './_common';
import { parsers } from '@domojs/protocol-parser';

// @type(MessageType.GetVersion)
// export class VersionMessage extends StatusMessage
// {
//     public major: number;
//     public installer: number;

//     constructor(frame?: Buffer)
//     {
//         super(frame || MessageType.GetVersion, [parsers.property('major', parsers.uint16), parsers.property('installer', parsers.uint16)]);
//     }
// }

export interface VersionResponse
{
    major: number;
    installer: number;
}

messages.register(MessageType.GetVersion, parsers.object<{}>());
messages.register(MessageType.GetVersion | MessageType.Response, parsers.object<VersionResponse>(
    parsers.property('major', parsers.uint16),
    parsers.property('installer', parsers.uint16)
));
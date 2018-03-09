import { StatusMessage } from './status';
import { Protocol, MessageType } from './common';

// @type(MessageType.GetVersion)
// export class VersionMessage extends StatusMessage
// {
//     public major: number;
//     public installer: number;

//     constructor(frame?: Buffer)
//     {
//         super(frame || MessageType.GetVersion, [{ name: 'major', type: 'uint16' }, { name: 'installer', type: 'uint16' }]);
//     }
// }

export interface VersionResponse
{
    major: number;
    installer: number;
}

Protocol.register<{}>('type', MessageType.GetVersion, []);
Protocol.register<VersionResponse>('type', MessageType.GetVersion | MessageType.Response, [
    { name: 'major', type: 'uint16' },
    { name: 'installer', type: 'uint16' }
]);
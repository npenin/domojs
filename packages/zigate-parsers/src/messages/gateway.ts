import { MessageType, messages } from './_common'
import { DeviceType } from './network';
import { StatusMessage } from './status';
import { Device } from './devices';
import { parsers, uint32, uint64, uint8 } from '@domojs/protocol-parser';

messages.register(MessageType.SetExtendedPanId, parsers.object<SetExtendedPanId>(parsers.property('panId', parsers.uint64)));
messages.register(MessageType.SetChannelMask, parsers.prepare(function (message)
{
    if (message.mask >= 11 || message.mask <= 26)
    {
        var mask = 1;
        for (var i = 0; i < message.mask; i++)
        {
            mask <<= 1;
        }
        message.mask = mask;
    }
},
    parsers.object<SetChannelMask>(parsers.property('mask', parsers.uint32))
));

const device = parsers.object<Device>(
    parsers.property('id', parsers.uint8),
    parsers.property('shortAddress', parsers.uint16),
    parsers.property('IEEEAddress', parsers.uint64),
    parsers.property('powerLined', parsers.boolean(parsers.uint8)),
    parsers.property('linkQuality', parsers.uint8),
);
const devices = parsers.array<Device, any>(-1, device);

messages.register(MessageType.SetSecurityStateAndKey, parsers.object<SetSecurityStateAndKey>(parsers.property('keyType', parsers.uint8), parsers.property('key', parsers.uint64)));
messages.register(MessageType.SetDeviceType, parsers.object<{ type: DeviceType }>(parsers.property('type', parsers.uint8)));
messages.register(MessageType.Reset, parsers.object<StatusMessage>());
messages.register(MessageType.ErasePersistentData, parsers.object<StatusMessage>());
messages.register(MessageType.ZLO_ZLL_FactoryNew_Reset, parsers.object<StatusMessage>());
messages.register(MessageType.GetDevicesList, parsers.object<{}>());
messages.register(MessageType.GetDevicesList | MessageType.Response, parsers.object<GetDeviceList>(
    parsers.property("devices", devices)
));

messages.register(MessageType.NonFactoryNewRestart, parsers.object<FactoryNewRestart>(
    parsers.property('status', parsers.uint8)
))
messages.register(MessageType.FactoryNewRestart, parsers.object<FactoryNewRestart>(
    parsers.property('status', parsers.uint8)
))

export interface FactoryNewRestart
{
    status: RestartStatus
}

export enum RestartStatus
{
    Startup = 0,
    NFN_Start = 2,
    Running = 2
}

export interface SetExtendedPanId
{
    panId: uint64;
}
export interface SetChannelMask
{
    mask: uint32;
}
export interface SetSecurityStateAndKey
{
    keyType: uint8;
    key: uint64;
}

export interface GetDeviceList
{
    devices: Device[]
}
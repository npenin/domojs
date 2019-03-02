import { Protocol, MessageType, uint64, uint32, uint8 } from './common'
import { DeviceType } from './network';
import { StatusMessage } from './status';
import { Device } from './devices';
import { Frame } from '@domojs/protocol-parser';

Protocol.register<SetExtendedPanId>('type', MessageType.SetExtendedPanId, [{ name: 'panId', type: 'uint64' }]);
Protocol.register<SetChannelMask>('type', MessageType.SetChannelMask, [{ name: 'mask', type: 'uint32' }], function (message)
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
});
Protocol.register<SetSecurityStateAndKey>('type', MessageType.SetSecurityStateAndKey, [{ name: 'keyType', type: 'uint8' }, { name: 'key', type: 'uint64' }]);
Protocol.register<{ type: DeviceType }>('type', MessageType.SetDeviceType, [{ name: 'type', type: 'uint8' }]);
Protocol.register<StatusMessage>('type', MessageType.Reset, []);
Protocol.register<StatusMessage>('type', MessageType.ErasePersistentData, []);
Protocol.register<StatusMessage>('type', MessageType.ZLO_ZLL_FactoryNew_Reset, []);
Protocol.register('type', MessageType.GetDevicesList, []);
Protocol.register<GetDeviceList>('type', MessageType.GetDevicesList | MessageType.Response, [
    {
        name: "devices", type: 'subFrame[]', length: undefined, frame: new Frame<Device>([
            { name: 'id', type: 'uint8' },
            { name: 'shortAddress', type: 'uint16' },
            { name: 'IEEEAddress', type: 'uint64' },
            { name: 'powerLined', type: 'uint8' },
            { name: 'linkQuality', type: 'uint8' },
        ])
    }
]);

Protocol.register<FactoryNewRestart>('type', MessageType.NonFactoryNewRestart, [
    { name: 'status', type: 'uint8' }
])
Protocol.register<FactoryNewRestart>('type', MessageType.FactoryNewRestart, [
    { name: 'status', type: 'uint8' }
])

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
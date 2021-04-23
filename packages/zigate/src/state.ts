import { deviceContainer, deviceTypeContainer } from '@domojs/devices';
import { Cluster, Zigate } from 'zigate';

export type ZDevices = ZGateway | ZDevice;

export interface ZGateway
{
    type: 'gateway';
    gateway: Zigate;
    room: string;
}

export interface ZDevice
{
    type: 'device';
    address: number;
    category?: string;
    room: string;
    gateway: Zigate;
    name?: string;
    internalName?: string;
    clusters: Cluster[];
    registered?: boolean;
    attributes: { [key: number]: string | number }
}

export interface State
{
    deviceServer: deviceContainer;
    server: deviceTypeContainer;
    gateway: Promise<Zigate>;
    devices: { [name: string]: ZDevices };
    devicesByAddress: { [address: number]: ZDevice };

}
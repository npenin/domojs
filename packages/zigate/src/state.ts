import { Logger } from '@akala/core';
import { Sidecar } from '@akala/sidecar';
import { Cluster, gateway, Zigate } from '@domojs/zigate-parsers';

export type ZDevices = ZGateway | ZDevice;

export interface ZGateway
{
    type: 'gateway';
    gateway: Promise<Zigate>;
    room: string;
}

export interface ZDevice
{
    type: 'device';
    address: number;
    category?: string;
    room: string;
    gateway: Promise<Zigate>;
    name?: string;
    internalName?: string;
    clusters: Cluster[];
    registered?: boolean;
    attributes: { [key: number]: string | number }
}

export interface State extends Sidecar
{
    devicesByAddress: { [gateway: string]: { [address: number]: ZDevice } };
    devices: { [gateway: string]: { [key: string]: ZDevices } };
    logger: Logger;
}
import { Logger } from '@akala/core';
import { Sidecar } from '@akala/sidecar';
import { Cluster, Zigate } from '@domojs/zigate-parsers';

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
    devicesByAddress: { [address: number]: ZDevice };
    devices: { [key: string]: ZDevices };
    gateway: Promise<Zigate>;
    setGateway(gw: Zigate): Promise<Zigate>;
    logger: Logger;
}
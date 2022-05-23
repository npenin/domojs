import { Logger } from '@akala/core';
import PubSubContainer from '@akala/pubsub';
import { Sidecar } from '@akala/sidecar';
import { deviceContainer } from '@domojs/devices';
import { Cluster, Zigate } from '@domojs/zigate-parsers';

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

export interface State extends Sidecar
{
    devicesByAddress: { [address: number]: ZDevice };
    devices: { [key: string]: ZDevices & { gateway: Promise<Zigate> } };
    gateway: Promise<Zigate>;
    setGateway(gw: Zigate): Promise<Zigate>;
    logger: Logger;
}
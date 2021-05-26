/*
Copyright 2011-2019, RFXCOM

ALL RIGHTS RESERVED.
The RFXtrx protocol is owned by RFXCOM, and is protected under
Netherlands Copyright Laws and Treaties and shall be subject to the 
exclusive jurisdiction of the Netherlands Courts. The information from this
file may freely be used to create programs to exclusively interface with
RFXCOM products only.

The above copyright notice shall be included in all copies or substantial
portions of this file.
'----------------------------------------------------------------------------
*/
import { parsers } from "@domojs/protocol-parser";
import { messages as Protocol, Type } from ".";


export enum SubType
{
    Elec2 = 0x01,
    CM119 = 0x01,
    CM160 = 0x01,
    Elec3 = 0x02,
    CM180 = 0x02,
};

export enum Command
{
}

export interface BaseDevice
{
    sensorId: number;
    count: number;
    instant: number;
    total: number;
    batteryLevel: number;
    rssi: number;
}

export namespace Elec2
{
    export type Device = BaseDevice;
}

export namespace Elec3
{
    export type Device = BaseDevice;
}

export type Device = BaseDevice;

export function init()
{
    Protocol.register(Type.ENERGY.CM119, parsers.object<Elec2.Device>(
        parsers.property('sensorId', parsers.uint16),
        parsers.property('count', parsers.uint8),
        parsers.property('instant', parsers.uint32),
        parsers.property('total', parsers.uint8),
        parsers.property('batteryLevel', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));

    Protocol.register(Type.ENERGY.CM180, parsers.object<Elec3.Device>(
        parsers.property('sensorId', parsers.uint16),
        parsers.property('count', parsers.uint8),
        parsers.property('instant', parsers.uint32),
        parsers.property('total', parsers.uint8),
        parsers.property('batteryLevel', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
}
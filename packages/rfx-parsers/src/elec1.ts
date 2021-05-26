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
    CM113 = 0x01,
    Electrisave = 0x01,
    CentaMeter = 0x01,
};

export enum Command
{

}

export enum HouseCode
{
}

export namespace Elec1
{
    export interface Device
    {
        sensorId: number;
        count: number;
        channel1: number;
        channel2: number;
        channel3: number;
        batteryLevel: number;
        rssi: number;
    }
}

export type Device = Elec1.Device;

export function init()
{
    Protocol.register(Type.CURRENT_ENERGY.CM113, parsers.object<Elec1.Device>(
        parsers.property('sensorId', parsers.uint16),
        parsers.property('count', parsers.uint8),
        parsers.property('channel1', parsers.uint16),
        parsers.property('channel2', parsers.uint16),
        parsers.property('channel3', parsers.uint16),
        parsers.property('batteryLevel', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
}
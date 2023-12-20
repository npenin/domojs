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
import { parsers } from "@akala/protocol-parser";
import { messages as Protocol, Type } from "./index.js";


export enum SubType
{
    Harrison = 0x00,
};

export enum Command
{
    Open = 0x00,
    Close = 0x01,
    Stop = 0x02,
    Program = 0x03,
}

export enum HouseCode
{
    A = 0x41,
    B = 0x42,
    C = 0x43,
    D = 0x44,
    E = 0x45,
    F = 0x46,
    G = 0x47,
    H = 0x48,
    I = 0x49,
    J = 0x4A,
    K = 0x4B,
    L = 0x4C,
    M = 0x4D,
    N = 0x4E,
    O = 0x4F,
    P = 0x50,
}

export enum UnitCode
{
    Unit1 = 0x01
}

export namespace Curtain1
{
    export interface Device
    {
        houseCode: HouseCode;
        unitCode: UnitCode;
        command: Command;
        batteryLevel: number;
        rssi: number;
    }
}

export function init()
{
    Protocol.register(Type.CURTAIN1.Harrison, parsers.object<Curtain1.Device>(
        parsers.property('houseCode', parsers.uint8),
        parsers.property('unitCode', parsers.uint8),
        parsers.property('command', parsers.uint8),
        parsers.property('batteryLevel', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
}
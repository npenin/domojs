import { parsers } from "@akala/protocol-parser";
import { messages as Protocol, Type } from "./index.js";

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
export enum SubType
{
    Blyss = 0x00,
    Cuveo = 0x01,
};

export enum Command
{
    Off = 0x00,
    On = 0x01,
    GroupOn = 0x02,
    GroupOff = 0x03,
}

export namespace Internal
{
    export interface Device<TGroupCode extends number, TUnitCode extends number>
    {
        id: number;
        groupCode: TGroupCode;
        unitCode: TUnitCode;
        command: Command;
        commandSequenceNumber: number;
        sequenceNumber2: number;
        filler: number;
        rssi: number;
    }

    export namespace Blyss
    {
        export type Device = Internal.Device<GroupCode, UnitCode>;

        export enum UnitCode
        {
            Unit1 = 0x01,
            Unit2 = 0x02,
            Unit3 = 0x03,
            Unit4 = 0x04,
            Unit5 = 0x05,
        }

        export enum GroupCode
        {
            GroupA = 0x41,
            GroupB = 0x42,
            GroupC = 0x43,
            GroupD = 0x44,
            GroupE = 0x45,
            GroupF = 0x46,
            GroupG = 0x47,
            GroupH = 0x48,
            GroupI = 0x49,
            GroupJ = 0x4A,
            GroupK = 0x4B,
            GroupL = 0x4C,
            GroupM = 0x4D,
            GroupN = 0x4E,
            GroupO = 0x4F,
            GroupP = 0x50,
        }
    }

    export namespace Cuveo
    {
        export type Device = Internal.Device<0, 0x01 | 0x02> |
            Internal.Device<GroupCode, UnitCode>;

        export enum UnitCode
        {
            Unit1 = 0x01,
            Unit2 = 0x02,
            Unit3 = 0x03,
            Unit4 = 0x04,
            Unit5 = 0x05,
            Unit6 = 0x06,
            Unit7 = 0x07,
            Unit8 = 0x08,
        }

        export enum GroupCode
        {
            Group1 = 0x01,
            Group2 = 0x02,
            Group3 = 0x03,
        }
    }
}

export type Device =
    Internal.Blyss.Device |
    Internal.Cuveo.Device;

export function init()
{
    Protocol.register(Type.LIGHTING6.Blyss, parsers.object<Internal.Blyss.Device>(
        parsers.property('id', parsers.uint16),
        parsers.property('groupCode', parsers.uint8),
        parsers.property('unitCode', parsers.uint8),
        parsers.property('command', parsers.uint8),
        parsers.property('commandSequenceNumber', parsers.uint8),
        parsers.property('sequenceNumber2', parsers.uint8),
        parsers.skip(.5),
        parsers.property('rssi', parsers.uint4),
    ));

    Protocol.register(Type.LIGHTING6.Cuveo, parsers.object<Internal.Cuveo.Device>(
        parsers.property('id', parsers.uint16),
        parsers.property('groupCode', parsers.uint8),
        parsers.property('unitCode', parsers.uint8),
        parsers.property('command', parsers.uint8),
        parsers.property('commandSequenceNumber', parsers.uint8),
        parsers.property('sequenceNumber2', parsers.uint8),
        parsers.property('filler', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
}
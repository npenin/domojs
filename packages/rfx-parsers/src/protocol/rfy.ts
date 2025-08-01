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
    Standard = 0x00,
    Extended = 0x01,
    RESERVED = 0x02,
    ASA = 0x03,
};

export namespace Internal
{
    export enum Commands
    {
        StopMotion = 0x00,
        UpOrOpen = 0x01,
        UpStop = 0x02,
        DownOrClose = 0x03,
        DownStop = 0x04,
        UpDown = 0x05,
        List = 0x06,
        Program = 0x07,
        ProgramLong = 0x08,
        ProgramVeryLong = 0x09,
        StopLong = 0x0A,
        StopVeryLong = 0x0B,
        UpDownLong = 0x0C,
        RemoveRemote = 0x0D,
        RemoteRemotes = 0x0E,
        UpShort = 0x0F,
        DownShort = 0x10,
        UpLong = 0x11,
        DownLong = 0x12,
        EnableSunWindDetection = 0x13,
        DisableSunWindDetection = 0x14,
    };

    export interface Device<TUnitCode extends number>
    {
        id1: number;
        id2: number;
        id3: number;
        unitCode: TUnitCode;
        command: Commands;
        rssi: number;
    }

    type baseDevice<TUnitCode extends number> = Device<TUnitCode>;

    export namespace RfyStandard
    {
        export type Device = baseDevice<UnitCode>;

        export enum UnitCode
        {
            Unit0 = 0x00,
            Unit1 = 0x01,
            Unit2 = 0x02,
            Unit3 = 0x03,
            Unit4 = 0x04,
        }
    }

    export namespace RfyExtended
    {
        export type Device = baseDevice<UnitCode>;

        export enum UnitCode
        {
            Unit0 = 0x00,
            Unit1 = 0x01,
            Unit2 = 0x02,
            Unit3 = 0x03,
            Unit4 = 0x04,
            Unit5 = 0x05,
            Unit6 = 0x06,
            Unit7 = 0x07,
            Unit8 = 0x08,
            Unit9 = 0x09,
            Unit10 = 0x0A,
            Unit11 = 0x0B,
            Unit12 = 0x0C,
            Unit13 = 0x0D,
            Unit14 = 0x0E,
            Unit15 = 0x0F,
        }
    }

    export namespace Asa
    {
        export type Device = baseDevice<UnitCode>;

        export enum UnitCode
        {
            Unit1 = 0x01,
            Unit2 = 0x02,
            Unit3 = 0x03,
            Unit4 = 0x04,
            Unit5 = 0x05,
        }

        export enum Commands
        {
            Stop = 0x00,
            Up = 0x01,
            UpAndStop = 0x02,
            Down = 0x03,
            DownAndStop = 0x04,
            UpAndDown = 0x05,
            ListRemotes = 0x06,
            Program = 0x07,
            EraseCurrentRemote = 0x0D,
            EraseAllRemotes = 0x0E,
            EnableSunWindDetection = 0x13,
            DisableSunWindDetection = 0x14,
        }
    }
}

export const Commands =
{
    stopMotion: Internal.Commands.StopMotion,
    upOrOpen: Internal.Commands.UpOrOpen,
    downOrClose: Internal.Commands.DownOrClose,
    program: Internal.Commands.Program,
    removeRemote: Internal.Commands.RemoveRemote,
    remoteRemotes: Internal.Commands.RemoteRemotes,
    upShort: Internal.Commands.UpShort,
    downShort: Internal.Commands.DownShort,
    upLong: Internal.Commands.UpLong,
    downLong: Internal.Commands.DownLong,
    enableSunWindDetection: Internal.Commands.EnableSunWindDetection,
    disableSunWindDetection: Internal.Commands.DisableSunWindDetection,
};

export type Device =
    Internal.Asa.Device |
    Internal.RfyExtended.Device |
    Internal.RfyStandard.Device;

export function init()
{
    Protocol.register(Type.RFY.Standard, parsers.object<Internal.RfyStandard.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('id3', parsers.uint8),
        parsers.property('unitCode', parsers.uint8),
        parsers.property('command', parsers.uint8),
        parsers.skip(3.5),
        parsers.property('rssi', parsers.uint4),
    ));

    Protocol.register(Type.RFY.Extended, parsers.object<Internal.RfyExtended.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('id3', parsers.uint8),
        parsers.property('unitCode', parsers.uint8),
        parsers.property('command', parsers.uint8),
        parsers.skip(3.5),
        parsers.property('rssi', parsers.uint4),
    ));

    Protocol.register(Type.RFY.ASA, parsers.object<Internal.Asa.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('id3', parsers.uint8),
        parsers.property('unitCode', parsers.uint8),
        parsers.property('command', parsers.uint8),
        parsers.skip(3.5),
        parsers.property('rssi', parsers.uint4),
    ));
}
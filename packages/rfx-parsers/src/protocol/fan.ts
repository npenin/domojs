import { parsers } from "@domojs/protocol-parser";
import { Type, messages as Protocol } from ".";

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
    SiemensSF01 = 0x00,
    IthoCVERFT = 0x01,
    LucciAirFan = 0x02,
    SEAV = 0x03,
    WestingHouse = 0x04,
    LucciAirDC = 0x05,
    CasaFan = 0x06,
    FT1211RFan = 0x07,
    Falmec = 0x08,
    LucciAirDCII = 0x09,
};

export namespace Fan
{
    export interface Device<TCommand extends number>
    {
        j1: boolean;
        sw2: number;
        id1: number;
        id2: boolean;
        sw1: number;
        filler: number;
        sw12: number;
        remId: number;
        command: TCommand;
        rssi: number;
    }

    export namespace Siemens
    {
        export enum Command
        {
            Timer = 0x01,
            Minus = 0x02,
            Learn = 0x03,
            Plus = 0x04,
            Confirm = 0x05,
            Light = 0x06,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace Itho
    {
        export enum Command
        {
            Step1 = 0x01,
            Step2 = 0x02,
            Step3 = 0x03,
            Timer = 0x04,
            NotAtHome = 0x05,
            Learn = 0x06,
            EraseAllRemotes = 0x07,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace LucciAirFan
    {
        export enum Command
        {
            High = 0x01,
            Medium = 0x02,
            Low = 0x03,
            Off = 0x04,
            Light = 0x05,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace WestingHouse
    {
        export enum Command
        {
            High = 0x01,
            Medium = 0x02,
            Low = 0x03,
            Off = 0x04,
            Light = 0x05,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace Seav
    {
        export enum Command
        {
            T1 = 0x01,
            T2 = 0x02,
            T3 = 0x03,
            T4 = 0x04,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace LucciAirDC
    {
        export enum Command
        {
            Power = 0x01,
            Plus = 0x02,
            Minus = 0x03,
            Light = 0x04,
            Reverse = 0x05,
            NaturalFlow = 0x06,
            Pair = 0x07,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace CasaFan
    {
        export enum Command
        {
            High = 0x01,
            Medium = 0x02,
            Low = 0x03,
            Off = 0x04,
            Light = 0x05,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace FT1211R
    {
        export enum Command
        {
            Power = 0x01,
            Light = 0x02,
            Speed1 = 0x03,
            Speed2 = 0x04,
            Speed3 = 0x05,
            Speed4 = 0x06,
            Speed5 = 0x07,
            F_R = 0x08,
            H1 = 0x09,
            H4 = 0x0A,
            H8 = 0x0B,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace Falmec
    {
        export enum Command
        {
            PowerOff = 0x01,
            Speed1 = 0x02,
            Speed2 = 0x03,
            Speed3 = 0x04,
            Speed4 = 0x05,
            Timer1 = 0x06,
            Timer2 = 0x07,
            Timer3 = 0x08,
            Timer4 = 0x09,
            LightOn = 0x0A,
            LightOff = 0x0B,
        }

        export type Device = Fan.Device<Command>;
    }

    export namespace LucciAirDCII
    {
        export enum Command
        {
            PowerOff = 0x01,
            Speed1 = 0x02,
            Speed2 = 0x03,
            Speed3 = 0x04,
            Speed4 = 0x05,
            Speed5 = 0x06,
            Speed6 = 0x07,
            Light = 0x08,
            Reverse = 0x09,
        }

        export type Device = Fan.Device<Command>;
    }
}

export type Device =
    Fan.Siemens.Device |
    Fan.Itho.Device |
    Fan.LucciAirFan.Device |
    Fan.Seav.Device |
    Fan.WestingHouse.Device |
    Fan.LucciAirDC.Device |
    Fan.CasaFan.Device |
    Fan.FT1211R.Device |
    Fan.Falmec.Device |
    Fan.LucciAirDCII.Device;


var frames = parsers.object<Device>(
    parsers.property('j1', parsers.boolean()),
    parsers.property('sw2', parsers.uint2),
    parsers.property('id1', parsers.uint5),
    parsers.property('id2', parsers.boolean()),
    parsers.property('sw1', parsers.uint7),
    parsers.property('sw12', parsers.uint3),
    parsers.property('remId', parsers.uint5),
    parsers.property('command', parsers.uint8),
    parsers.property('filler', parsers.uint4),
    parsers.property('rssi', parsers.uint4),
);

export function init()
{
    Protocol.register(Type.FAN.SiemensSF01, frames);
    Protocol.register(Type.FAN.IthoCVERFT, frames);
    Protocol.register(Type.FAN.LucciAirFan, frames);
    Protocol.register(Type.FAN.SEAV, frames);
    Protocol.register(Type.FAN.WestingHouse, frames);
    Protocol.register(Type.FAN.LucciAirDC, frames);
    Protocol.register(Type.FAN.CasaFan, frames);
    Protocol.register(Type.FAN.FT1211RFan, frames);
    Protocol.register(Type.FAN.Falmec, frames);
    Protocol.register(Type.FAN.LucciAirDCII, frames);
}
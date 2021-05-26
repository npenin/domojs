import { parsers } from "@domojs/protocol-parser";
import { messages as Protocol, Type } from ".";

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
    ByronSX = 0x00,
    ByronMP001 = 0x01,
    SelectPlus = 0x02,
    Envivo = 0x04,
};

export namespace Internal
{
    export class Device<TSound extends number>
    {
        public id1: number;
        public id2: number;
        public sound: TSound;
        public filler: number;
        public rssi: number;
    }

    export namespace ByronSX
    {
        export enum Sound
        {
            Tubular3Notes1 = 0x01,
            BigBen1 = 0x03,
            Tubular2Notes1 = 0x05,
            Solo1 = 0x09,
            Tubular3Notes2 = 0x0D,
            BigBen2 = 0x0E,
            Tubular2Notes2 = 0x06,
            Solo2 = 0x02,
        }

        export type Device = Internal.Device<Sound>;
    }

    export namespace ByronMP001
    {
        export enum Sound
        {
            Default = 0x54
        }

        export type Device = Internal.Device<Sound>;
    }

    export namespace SelectPlus
    {
        export type Device = Internal.Device<number>;
    }

    export namespace Envivo
    {
        export type Device = Internal.Device<number>;
    }
}
export function init()
{
    Protocol.register(Type.CHIME.ByronSX, parsers.object<Internal.ByronSX.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('sound', parsers.uint8),
        parsers.property('filler', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));

    Protocol.register(Type.CHIME.ByronMP001, parsers.object<Internal.ByronMP001.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('sound', parsers.uint8),
        parsers.property('filler', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
    Protocol.register(Type.CHIME.SelectPlus, parsers.object<Internal.SelectPlus.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('sound', parsers.uint8),
        parsers.property('filler', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
    Protocol.register(Type.CHIME.Envivo, parsers.object<Internal.Envivo.Device>(
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('sound', parsers.uint8),
        parsers.property('filler', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    ));
}
export type Device =
    Internal.ByronSX.Device |
    Internal.ByronMP001.Device |
    Internal.SelectPlus.Device |
    Internal.Envivo.Device;
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
    PT2262 = 0x00,
}

export interface Device
{
    command1: number;
    command2: number;
    command3: number;
    pulse: number;
    filler: number;
    rssi: number;
}

export function init()
{
    var frames = parsers.object<Device>(
        parsers.property('command1', parsers.uint8),
        parsers.property('command2', parsers.uint8),
        parsers.property('command3', parsers.uint8),
        parsers.property('pulse', parsers.uint16),
        parsers.property('filler', parsers.uint4),
        parsers.property('rssi', parsers.uint4),
    );

    Protocol.register(Type.LIGHTING4.PT2262, frames);
}
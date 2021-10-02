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
import { messages as Protocol, Type, Message } from ".";
import { Frequences, protocols_msg3, protocols_msg4, protocols_msg5, protocols_msg6 } from './0.interface.mode'

export enum SubType
{
    mode = 0x00,
    unknownRTSRemote = 0x01,
    noExtendedHardwarePresent = 0x02,
    listRFYRemotes = 0x03,
    listASARemotes = 0x04,
    start = 0x07,
    unknown = 0xff,
};

export enum FirmwareType
{
    Type1_RFXrec = 0x00,
    Type1 = 0x01,
    Type2 = 0x02,
    Ext = 0x03,
    Ext2 = 0x04,
}

export interface ModeResponse
{
    command: number; //2
    transceiverType: Frequences;
    firmwareVersion: number;
    emitPower: number;
    msg3: protocols_msg3;
    msg4: protocols_msg4;
    msg5: protocols_msg5;
    msg6: protocols_msg6;
    hardwareMajorVersion: number;
    hardwareMinorVersion: number;
    firmwareType: FirmwareType;
    noiseLevel: number;
    filler: number[];
}

export interface ListRFYRemote
{
    command: number;
    location: number;
    id1: number;
    id2: number;
    id3: number;
    unitNumber: number;
    randomCode: number;
    rollingCodeHigh: number;
    rollingCodeLow: number;
    filler: number[];
}

export interface UnknownRTSRemote
{
    command: number; //2
}

export interface CheckRFXCOMDevice
{
    command: number; //7
    copyright: string;
}

export interface Response
{
    ack: ResponseAck;
}

export enum ResponseAck
{
    // transmit OK  
    ACK = 0x00,
    // but transmit started after 3 seconds delay anyway with RF receive data  
    ACKDelayed = 0x01,
    // transmitter did not lock on the requested transmit frequency  
    NAKFrequency = 0x02,
    // AC address zero in id1-id4 not allowed 
    NAK = 0x03,
}

export function init()
{
    Protocol.register(Type.INTERFACE_MESSAGE.mode, parsers.object<ModeResponse>(
        parsers.property('command', parsers.uint8),
        parsers.property('transceiverType', parsers.uint8),
        parsers.property('firmwareVersion', parsers.uint8),
        parsers.property('msg3', parsers.uint8),
        parsers.property('msg4', parsers.uint8),
        parsers.property('msg5', parsers.uint8),
        parsers.property('msg6', parsers.uint8),
        parsers.property('hardwareMajorVersion', parsers.uint8),
        parsers.property('hardwareMinorVersion', parsers.uint8),
        parsers.property('emitPower', parsers.uint8),
        parsers.property('firmwareType', parsers.uint8),
        parsers.property('noiseLevel', parsers.uint8),
        parsers.skip(5),
    ));

    Protocol.register(Type.INTERFACE_MESSAGE.listRFYRemotes, parsers.object<ListRFYRemote>(
        parsers.property('command', parsers.uint8),
        parsers.property('location', parsers.uint8),
        parsers.property('id1', parsers.uint8),
        parsers.property('id2', parsers.uint8),
        parsers.property('id3', parsers.uint8),
        parsers.property('unitNumber', parsers.uint8),
        parsers.property('randomCode', parsers.uint8),
        parsers.property('rollingCodeHigh', parsers.uint8),
        parsers.property('rollingCodeLow', parsers.uint8),
        parsers.skip(7)
    ));

    Protocol.register(Type.INTERFACE_MESSAGE.unknownRTSRemote, parsers.object<UnknownRTSRemote>(
        parsers.property('command', parsers.uint8),
        parsers.skip(7)
    ));

    Protocol.register(Type.INTERFACE_MESSAGE.start, parsers.object<CheckRFXCOMDevice>(
        parsers.property('command', parsers.uint8),
        parsers.property('copyright', parsers.string(16)),
    ));

    Protocol.register(Type.TRANSMITTER_MESSAGE.Response, parsers.object<Response>(
        parsers.property('ack', parsers.uint8),
    ));
    Protocol.register(Type.TRANSMITTER_MESSAGE.Error, parsers.object<Response>(
        parsers.property('ack', parsers.uint8),
    ));
}
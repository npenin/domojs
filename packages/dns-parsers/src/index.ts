import { parsers, uint16, uint32 } from "@akala/protocol-parser";
import { OpCode, MessageType, ResponseCode } from "./enums.js";
import { Question, questionParser } from "./question.js";
import { ResourceRecord, resourceRecordParser } from "./answer.js";


export interface Message
{
    from: { address: uint32, port: uint16 };
    type: MessageType;
    id: uint16;
    opCode: OpCode;
    authoritativeAnswer: boolean;
    truncated: boolean;
    recursionDesired: boolean;
    recursionAvailble: boolean;
    responseCode: ResponseCode;
    questionsLength: number;
    answersLength: number;
    authoritiesLength: number;
    additionalsLength: number;
    questions: Question[];
    answers: ResourceRecord[];
    authorities: ResourceRecord[];
    additionals: ResourceRecord[];
}

export const message = parsers.object<Message>(
    parsers.property('id', parsers.uint16),
    parsers.property('type', parsers.uint4),
    parsers.property('opCode', parsers.bit),
    parsers.property('authoritativeAnswer', parsers.boolean(parsers.bit)),
    parsers.property('truncated', parsers.boolean(parsers.bit)),
    parsers.property('recursionDesired', parsers.boolean(parsers.bit)),
    parsers.property('recursionAvailble', parsers.boolean(parsers.bit)),
    parsers.property('responseCode', parsers.uint7),
    parsers.property('questionsLength', parsers.uint16),
    parsers.property('answersLength', parsers.uint16),
    parsers.property('authoritiesLength', parsers.uint16),
    parsers.property('additionalsLength', parsers.uint16),
    parsers.property('questions', parsers.array('questionsLength', questionParser)),
    parsers.property('answers', parsers.array('answersLength', resourceRecordParser)),
    parsers.property('authorities', parsers.array('authoritiesLength', resourceRecordParser)),
    parsers.property('additionals', parsers.array('additionalsLength', resourceRecordParser)),
);
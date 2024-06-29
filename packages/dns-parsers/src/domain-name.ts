import { parsers, uint8 } from "@akala/protocol-parser";

export type DomainName = {
    type: 0;
    label: string;
} | { type: 3, pointer: uint8 }

type AnyDomainName = {
    type: 0 | 3;
    label: string;
    pointer: uint8
}

export const domainNameParser = parsers.object<AnyDomainName>(
    parsers.property('type', parsers.uint2 as parsers.AnyParser<0 | 3, DomainName>),
    parsers.property('label', parsers.condition<string, AnyDomainName>(m => m.type == 0, parsers.string(parsers.uint6, 'utf-8'))),
    parsers.property('pointer', parsers.condition<uint8, AnyDomainName>(m => m.type == 3, parsers.uint6))
) as parsers.AnyParser<DomainName, unknown>;
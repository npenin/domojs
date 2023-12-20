import { parsers, uint16, uint32 } from "@akala/protocol-parser";
import { DomainName, domainNameParser } from "./domain-name.js";

export type ResponseData = IPv4Address | IPv6Address | CName | Ptr | Srv | Txt | Ns;

export const ipv4 = parsers.object<IPv4Address>(
    parsers.property('ipv4', parsers.uint32)
);

export const ipv6 = parsers.object<IPv6Address>(
    parsers.property('ipv6', parsers.uint64)
);

export const cname = parsers.object<CName>(
    parsers.property('cname', domainNameParser)
);

export const mx = parsers.object<MX>(
    parsers.property('preference', parsers.uint16),
    parsers.property('exchange', domainNameParser),
);

export const ns = parsers.object<Ns>(
    parsers.property('DomainName', domainNameParser),
);
export const ptr = parsers.object<Ptr>(
    parsers.property('DomainName', domainNameParser),
);

export const txt = parsers.object<Txt>(
    parsers.property('txt', parsers.string(-1, 'utf-8')),
);

export const srv = parsers.object<Srv>(
    parsers.property('priority', parsers.uint16),
    parsers.property('weight', parsers.uint16),
    parsers.property('port', parsers.uint16),
    parsers.property('target', domainNameParser),
);

export interface CName
{
    cname: DomainName;
}

export interface IPv4Address 
{
    ipv4: uint32
}

export interface IPv6Address 
{
    ipv6: bigint
}

export interface MX
{
    exchange: DomainName;
    preference: uint16;
}

export interface DomainNameResponseData 
{
    DomainName: DomainName;
}

export interface Ptr extends DomainNameResponseData
{
}

export interface Ns extends DomainNameResponseData
{
}

export interface Srv
{
    priority: uint16
    weight: uint16
    port: uint16
    target: DomainName
}

export interface Txt
{
    txt: string;
}
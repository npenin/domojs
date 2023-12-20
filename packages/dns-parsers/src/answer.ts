import { parsers, uint32 } from "@akala/protocol-parser";
import { Class, Type } from "./enums.js";
import { ResponseData, cname, ipv4, ipv6, mx, ptr, srv, txt } from "./response-data.js";
import { DomainName, domainNameParser } from "./domain-name.js";

export interface ResourceRecord
{
     domainName: DomainName;
     type: Type;
     class: Class;
     ttl: uint32;
     data: ResponseData;
}

export const resourceRecordParser = parsers.object<ResourceRecord>(
     parsers.property('domainName', domainNameParser),
     parsers.property('type', parsers.uint16),
     parsers.property('class', parsers.uint16),
     parsers.property('ttl', parsers.uint32),
     parsers.chooseProperty<ResourceRecord>('type', 'data', {
          [Type.A]: ipv4,
          [Type.AAAA]: ipv6,
          [Type.NS]: ipv4,
          [Type.CNAME]: cname,
          // [Type.SOA]:,
          // [Type.WKS]:,
          [Type.PTR]: ptr,
          [Type.MX]: mx,
          [Type.TXT]: txt,
          [Type.SRV]: srv,
          // [Type.OPT]:opt,
     }),
)
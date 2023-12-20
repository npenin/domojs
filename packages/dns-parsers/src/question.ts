import { parsers, uint8 } from "@akala/protocol-parser";
import { QClass, QType } from "./enums.js";
import { DomainName, domainNameParser } from "./domain-name.js";

export const questionParser = parsers.object<Question>(
    parsers.property('domainName', domainNameParser),
    parsers.property('type', parsers.uint16),
    parsers.property('class', parsers.uint16),
)

export interface Question
{
    // public Question(string domainName)
    //     : this()
    // {
    //     if (!domainName.EndsWith("."))
    //     {
    //         if (domainName.EndsWith(".local"))x
    //             domainName += ".";
    //         else
    //             domainName += ".local.";
    //     }
    //     else
    //     {
    //         if (!domainName.EndsWith("local."))
    //             domainName += "local.";
    //     }
    //     DomainName.AddRange(domainName.Split('.'));
    //     Type = QType.ALL;
    //     Class = QClass.ALL;
    // }

    domainName: DomainName;

    type: QType
    class: QClass

    cacheFlush: boolean
}

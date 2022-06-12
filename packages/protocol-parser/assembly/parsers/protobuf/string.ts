import { BufferEncoding } from "../../core";
import PrefixedString from "../string-prefixed";
import { Parsers } from "../_common";
import { WireType } from "./field";

export default class String extends PrefixedString
{
    public readonly wireType: WireType = 'length-delimited'

    constructor(parser: Parsers<number>, encoding?: BufferEncoding)
    {
        super(parser, encoding);
    }
}
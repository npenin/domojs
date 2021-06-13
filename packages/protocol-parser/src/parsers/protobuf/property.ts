import CoreProperty from "../property";
import { Cursor, AnyParser, ParserWithMessageWithoutKnownLength, ParserWithMessage, parserWrite } from "../_common";
import { WireType } from "./field";

export type ArrayItem<T> = T extends ((infer X)[]) ? X : T;

export default class Property<T, TKey extends keyof T> extends CoreProperty<T, TKey>
{
    constructor(name: TKey, public readonly wireType: WireType, parser: AnyParser<T[TKey], Partial<T>>)
    {
        super(name, parser);
    }
}
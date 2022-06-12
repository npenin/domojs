import CoreProperty from "../property";
import { AnyParser } from "../_common";
import { WireType } from "./field";

export type ArrayItem<T> = T extends ((infer X)[]) ? X : T;

export default class Property<T, TKey extends keyof T> extends CoreProperty<T, TKey>
{
    public wireType: WireType;

    constructor(name: TKey, wireType: WireType, parser: AnyParser<T[TKey] | null, Partial<T>>)
    {
        super(name, parser);
        this.wireType = wireType;
    }
}
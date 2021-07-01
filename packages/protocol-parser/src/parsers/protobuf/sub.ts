import { Sub as CoreSub } from "../sub";
import { ParsersWithMessage } from "../_common";
import { WireType } from "./field";


export class Sub<TResult, TMessage> extends CoreSub<TResult, TMessage>
{
    constructor(lengthParser: ParsersWithMessage<number, TMessage>, inner: ParsersWithMessage<TResult, TMessage>)
    {
        super(lengthParser, inner);
    }

    wireType: WireType = 'length-delimited';
}

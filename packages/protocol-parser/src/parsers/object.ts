import Property from "./property";
import { AnyParser, Cursor, Parser, ParserWithMessage, ParserWithMessageWithoutKnownLength, ParserWithoutKnownLength, parserWrite } from "./type";

export interface ObjectMap<T, TKey extends keyof T = keyof T>
{
    name: TKey;
    type: AnyParser<T[TKey], T>
}

// export default class ObjectParser<T extends object> implements ParserWithMessage<T, T>
// {
//     maps: AnyParser<T[keyof T], T>[];
//     constructor(...maps: ObjectMap<T, keyof T>[])
//     {
//         this.maps = maps.map(m => new Property(m.name, m.type));
//         var counts = { knownLength: 0, unknownLength: 0 };
//         maps.forEach((parser) =>
//         {
//             if (parser.type.length == -1)
//                 counts.unknownLength++;
//             else
//                 counts.knownLength++;
//         });
//         if (counts.knownLength > 0 && counts.unknownLength > 0)
//             throw new Error('known and unknown length cannot be mixed');
//         if (counts.unknownLength == 0)
//             this.length = maps.reduce((previous, parser) => previous == -1 ? -1 : previous + parser.type.length, 0);
//         else
//             this.length = -1;
//     }
//     length: number;
//     read(buffer: Buffer, cursor: Cursor, message: T): T
//     {
//         var result: T = message || {} as T;

//         for (let index = 0; index < this.maps.length; index++)
//             result[this.maps[index].name] = this.maps[index].read(buffer, cursor, result);

//         return result;

//     }
//     write(value: T, message: T): Buffer[]
//     write(buffer: Buffer, cursor: Cursor, value: T, message: T): void
//     write(buffer: Buffer | T, cursor?: Cursor | T, value?: T, message?: T)
//     {
//         if (Buffer.isBuffer(buffer) && cursor instanceof Cursor)
//         {
//             for (let index = 0; index < this.maps.length; index++)
//                 parserWrite(this.maps[index], buffer, cursor as Cursor, value[this.maps[index].name], message);
//             return;
//         }
//         value = buffer as T;
//         message = cursor as T;
//         if (this.length > -1)
//         {
//             buffer = Buffer.alloc(Math.ceil(length));
//             this.write(buffer, new Cursor(), value, message);
//             return [buffer];
//         }

//         var buffers: Buffer[] = [];

//         for (let index = 0; index < this.maps.length; index++)
//         {
//             buffers.push(...parserWrite(this.maps[index], value[this.maps[index].name], message || value));
//         }

//         return buffers;
//     }

// }
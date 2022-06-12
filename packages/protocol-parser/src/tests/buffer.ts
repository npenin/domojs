import assert from "assert";
import { Buffer } from "../../build/debug.js";
assert.strictEqual(Buffer.from('\u00e9').toString(), '\u00e9');
console.log("ok");

let buffer = Buffer.alloc(4);
buffer.writeUint32BE(0xffd7c477, 0);
assert.strictEqual(buffer.readUint32BE(0), 2636681);
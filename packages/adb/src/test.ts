import { ADB, algorithm, hashAlgorithm } from './index.js'
import { Socket } from 'net'
import { generateKeyPair, webcrypto } from 'crypto'
import fs from 'fs/promises'
import { createWriteStream } from 'fs'

const socket = new Socket();
await new Promise<void>(resolve => socket.connect({ host: process.argv[2], port: Number(process.argv[3]) }, resolve));
console.log('socket connected');
let adb: ADB | null = null;
try
{
    const jwk: JsonWebKey = JSON.parse(await fs.readFile('private.jwk', 'utf-8'));
    const privateKey = await crypto.subtle.importKey('jwk', jwk, { name: algorithm, hash: hashAlgorithm }, true, ['sign']);
    delete jwk.d;
    jwk.key_ops = ["verify"];
    const publicKey = await crypto.subtle.importKey('jwk', jwk, { name: algorithm, hash: hashAlgorithm }, true, ['verify']);
    adb = new ADB(socket, { privateKey, publicKey });
}
catch (e)
{
    if (e.code == 'ENOENT')
    {
        const keys = await crypto.subtle.generateKey({ name: algorithm, hash: hashAlgorithm, modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) }, true, ['sign', 'verify']) as CryptoKeyPair;
        await fs.writeFile('private.jwk', JSON.stringify(await crypto.subtle.exportKey('jwk', keys.privateKey)))
        adb = new ADB(socket, keys);
    }
    else
        throw e;
}

try
{
    const pubKey = await crypto.subtle.importKey('spki', (await fs.readFile(`${process.argv[2]}.pub`)).buffer as ArrayBuffer, algorithm, true, ['verify']);
    adb.remotePublicKey = pubKey;
}
catch (e)
{
    if (e.code !== 'ENOENT')
    {
        throw e;
    }
}

await adb.connect({ systemtype: 'host', serialno: 'domojs-adb', banner: 'features=shell_v2' })
console.log('adb connected');
const shell = adb.open('shell:ls -la');
const f = createWriteStream('./adb.log')
shell.pipe(f);
// process.stdin.pipe(shell);
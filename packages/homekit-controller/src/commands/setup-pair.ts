import { SRP, SrpClient } from "fast-srp-hap";
import tweetnacl from "tweetnacl";
import { Http } from "@akala/core";
import hkdf from 'futoin-hkdf'
import { Cursor, parsers, parserWrite, tlv } from '@domojs/protocol-parser'
import assert from 'assert/strict'
import State from "../state";

const tlv8 = tlv(parsers.uint8, 0xFF, 'utf8');

export type PairMessage = {
    method: PairMethod;
    identifier: string;
    salt: Buffer;
    publicKey: Buffer;
    proof: Buffer;
    encryptedData: Buffer;
    state: PairState;
    error: PairErrorCode;
    retryDelay: number;
    certificate: Buffer;
    signature: Buffer;
    permissions: number;
    fragmentData: Buffer;
    fragmentLast: Buffer;
    flags: number;
}

export enum PairMethod
{
    Setup = 0x0,
    SetupWithAuth = 0x1,
    Verify = 0x2,
    AddPairing = 0x3,
    RemovePairing = 0x4,
    ListPairings = 0x5
}
export enum PairState
{
    M1 = 0x01,
    M2 = 0x02,
    M3 = 0x03,
    M4 = 0x04,
    M5 = 0x05,
    M6 = 0x06
}
export enum PairErrorCode
{
    Unknown = 0x01,
    Authentication = 0x02,
    Backoff = 0x03,
    MaxPeers = 0x04,
    MaxTries = 0x05,
    Unavailable = 0x06,
    Busy = 0x07,
}

export enum PairTypeFlags
{
    Transient = 0b00000010,
    Split = 0b01000000,
}

export default async function pair(this: State, accessoryAddress: string, accessoryFqdn: string, http: Http, pinCode: string)
{
    const clientKeyPair = tweetnacl.sign.keyPair();
    const clientInfo: PairSetupClientInfo = {
        privateKey: Buffer.from(clientKeyPair.secretKey),
        publicKey: Buffer.from(clientKeyPair.publicKey),
        username: crypto.getRandomValues(Buffer.alloc(16)).toString('base64')
    };
    const accessory = await new PairSetupClient(accessoryAddress, http).sendPairSetup(pinCode, clientInfo);
    this.pairedAccessories[accessoryFqdn] = { controllerInfo: clientInfo, accessory, fqdn: accessoryFqdn };
}

export const pairMessage = tlv8.objectByName<Partial<PairMessage>>({
    method: { index: 0, parser: tlv8.number },
    identifier: { index: 1, parser: tlv8.string },
    salt: { index: 2, parser: tlv8.buffer },
    publicKey: { index: 3, parser: tlv8.buffer },
    proof: { index: 4, parser: tlv8.buffer },
    encryptedData: { index: 5, parser: tlv8.buffer },
    state: { index: 6, parser: tlv8.number },
    error: { index: 7, parser: tlv8.number },
    retryDelay: { index: 8, parser: tlv8.number },
    certificate: { index: 9, parser: tlv8.number },
    signature: { index: 10, parser: tlv8.number },
    permissions: { index: 11, parser: tlv8.number },
    fragmentData: { index: 12, parser: tlv8.number },
    fragmentLast: { index: 13, parser: tlv8.number },
    flags: { index: 0x13, parser: tlv8.number },
});

export type PairSetupM2 = Pick<PairMessage, 'state' | 'publicKey' | 'salt'>;
export type PairSetupM3 = Pick<PairMessage, 'state' | 'proof'>;
export type PairSetupM4 = Pick<PairMessage, 'state' | 'proof' | 'encryptedData'>;
export type PairSetupM5 = Pick<PairMessage, 'state' | 'publicKey' | 'encryptedData'>;
export type PairSetupM6 = Pick<PairMessage, 'state' | 'encryptedData'>;
export type SubPairSetupM6 = Pick<PairMessage, 'identifier' | 'signature' | 'publicKey'>;

export interface PairSetupClientInfo
{
    username: string;
    publicKey: Buffer;
    privateKey: Buffer
}

interface EncryptedData
{
    ciphertext: Buffer;
    authTag: Buffer;
}

export interface PairedAccessory
{
    publicKey: Buffer;
    identifier: string;
}

/**
 * @group Cryptography
 */
export function chacha20_poly1305_encryptAndSeal(key: Buffer, nonce: Buffer, aad: Buffer | null, plaintext: Buffer): EncryptedData
{
    if (nonce.length < 12)
    { // openssl 3.x.x requires 98 bits nonce length
        nonce = Buffer.concat([
            Buffer.alloc(12 - nonce.length, 0),
            nonce,
        ]);
    }

    // @ts-expect-error: types for this are really broken
    const cipher = crypto.createCipheriv("chacha20-poly1305", key, nonce, { authTagLength: 16 });

    if (aad)
    {
        cipher.setAAD(aad);
    }

    const ciphertext = cipher.update(plaintext);
    cipher.final(); // final call creates the auth tag
    const authTag = cipher.getAuthTag();

    return { // return type is a bit weird, but we are going to change that on a later code cleanup
        ciphertext: ciphertext,
        authTag: authTag,
    };
}

/**
 * @group Cryptography
 */
export function chacha20_poly1305_decryptAndVerify(key: Buffer, nonce: Buffer, aad: Buffer | null, ciphertext: Buffer, authTag: Buffer): Buffer
{
    if (nonce.length < 12)
    { // openssl 3.x.x requires 98 bits nonce length
        nonce = Buffer.concat([
            Buffer.alloc(12 - nonce.length, 0),
            nonce,
        ]);
    }

    // @ts-expect-error: types for this are really broken
    const decipher = crypto.createDecipheriv("chacha20-poly1305", key, nonce, { authTagLength: 16 });
    if (aad)
    {
        decipher.setAAD(aad);
    }
    decipher.setAuthTag(authTag);
    const plaintext = decipher.update(ciphertext);
    decipher.final(); // final call verifies integrity using the auth tag. Throws error if something was manipulated!

    return plaintext;
}

class PairSetupClient
{
    constructor(private readonly accessoryAddress: string, private readonly http: Http)
    {
    }

    async sendPairSetup(pincode: string, clientInfo: PairSetupClientInfo): Promise<PairedAccessory>
    {
        const m2 = await this.sendM1();

        const srp = await this.prepareM3(m2, pincode);
        const m4 = await this.sendM3(srp);

        const m5 = this.prepareM5(m4, clientInfo);
        return await this.sendM5(m5.encryptedData, m5.sessionKey);
    }

    sendM1(): PromiseLike<PairSetupM2>
    {
        return this.http.call({
            url: `http://${this.accessoryAddress}/pair-setup`, body: Buffer.concat(parserWrite(pairMessage,
                {
                    state: PairState.M1,
                    method: PairMethod.Setup,
                    flags: PairTypeFlags.Split & PairTypeFlags.Transient
                })).buffer,
            method: 'post',
            type: 'raw'
        }).
            then(r => r.arrayBuffer()).
            then(b => pairMessage.read(Buffer.from(b), new Cursor()) as PairSetupM2).
            then(m =>
            {
                assert.equal(m.state, PairState.M2, 'an M2 response was expected');

                return m
            });
    }

    async prepareM3(m2: PairSetupM2, pincode: string): Promise<SrpClient>
    {
        const srpKey = await SRP.genKey(32);
        const srpClient = new SrpClient(SRP.params.hap, m2.salt, Buffer.from("Pair-Setup"), Buffer.from(pincode), srpKey);
        srpClient.setB(m2.publicKey);

        return srpClient;
    }

    sendM3(m3: SrpClient): PromiseLike<Buffer>
    {
        return this.http.call({
            url: `http://${this.accessoryAddress}/pair-setup`,
            body: Buffer.concat(pairMessage.write({
                state: PairState.M3,
                publicKey: m3.computeA(),
                proof: m3.computeM1()
            })),
            type: 'raw'
        }).
            then(r => r.arrayBuffer()).
            then(b => pairMessage.read(Buffer.from(b), new Cursor()) as PairSetupM4).
            then(b => { m3.checkM2(b.proof); return b }).
            then(b => m3.computeK()) //sharedSecret
            ;
    }

    prepareM5(sharedSecret: Buffer, clientInfo: PairSetupClientInfo)
    {
        const iOSDeviceX = hkdf(
            sharedSecret,
            32,
            {
                hash: 'sha512',
                salt: Buffer.from("Pair-Setup-Controller-Sign-Salt"),
                info: Buffer.from("Pair-Setup-Controller-Sign-Info"),
            });

        const iOSDeviceInfo = Buffer.concat([
            iOSDeviceX,
            Buffer.from(clientInfo.username),
            clientInfo.publicKey,
        ]);

        const iOSDeviceSignature = tweetnacl.sign.detached(iOSDeviceInfo, clientInfo.privateKey);

        const subTLV_M5 = Buffer.concat(pairMessage.write({
            identifier: clientInfo.username,
            publicKey: clientInfo.publicKey,
            signature: Buffer.from(iOSDeviceSignature)
        }));

        const sessionKey = hkdf(
            sharedSecret,
            32,
            {
                hash: "sha512",
                salt: Buffer.from("Pair-Setup-Encrypt-Salt"),
                info: Buffer.from("Pair-Setup-Encrypt-Info"),
            }
        );

        const encrypted = chacha20_poly1305_encryptAndSeal(sessionKey, Buffer.from("PS-Msg05"), null, subTLV_M5);

        return {
            sessionKey,
            encryptedData: encrypted,
        };
    }

    sendM5(m5: EncryptedData, sessionKey: Buffer)
    {
        return this.http.call(
            {
                url: `http://${this.accessoryAddress}/pair-setup`,
                body: Buffer.concat(pairMessage.write({
                    state: PairState.M6,
                    encryptedData: Buffer.concat([m5.ciphertext, m5.authTag])
                })),
                type: 'raw'
            }).
            then(r => r.arrayBuffer()).
            then(r => pairMessage.read(Buffer.from(r), new Cursor()) as PairSetupM6).
            then(m => m.encryptedData).
            then(m => ({ encryptedData: m.subarray(0, -16), authTag: m.subarray(-16) })).
            then(m =>
                chacha20_poly1305_decryptAndVerify(
                    sessionKey,
                    Buffer.from("PS-Msg06"),
                    null,
                    m.encryptedData,
                    m.authTag,
                )).
            then(m => pairMessage.read(m, new Cursor())).
            then(m =>
            {
                if (tweetnacl.sign.detached.verify(Buffer.concat([sessionKey, Buffer.from(m.identifier), m.publicKey]), m.signature, m.publicKey))
                    return {
                        publicKey: m.publicKey,
                        identifier: m.identifier
                    };
                throw new Error('accessory is not what it is claiming to be');
            })
            ;
    }
}
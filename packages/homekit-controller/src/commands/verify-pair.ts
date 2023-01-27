import { Http, parser } from "@akala/core";
import { Cursor, parserWrite } from "@domojs/protocol-parser";
import State from "../state";
import { chacha20_poly1305_decryptAndVerify, chacha20_poly1305_encryptAndSeal, PairMessage, pairMessage, PairMethod, PairState, PairTypeFlags } from "./setup-pair";
import assert from 'assert/strict'
import { SrpClient } from "fast-srp-hap";
import hkdf from 'futoin-hkdf'
import tweetnacl from "tweetnacl";


export default async function verifyPair(this: State, accessoryFqdn: string)
{
    if (!this.pairedAccessories[accessoryFqdn])
        throw new Error('There is no such accessory');
}

type Unpromisify<T> = T extends Promise<infer X> ? X : never;

export type PairVerifyM2 = Pick<PairMessage, 'state' | 'publicKey' | 'encryptedData'>;
export type PairVerifyM3 = Pick<PairMessage, 'state' | 'proof'>;
export type PairVerifyM4 = Pick<PairMessage, 'state' | 'error'>;
export type PairVerifyM5 = Pick<PairMessage, 'state' | 'publicKey' | 'encryptedData'>;
export type PairVerifyM6 = Pick<PairMessage, 'state' | 'encryptedData'>;
export type SubPairVerifyM6 = Pick<PairMessage, 'identifier' | 'signature' | 'publicKey'>;


interface PairVerifyServerInfo
{
    username: string;
    publicKey: Buffer;
}

interface PairVerifyClientInfo
{
    username: string;
    privateKey: Buffer;
}


export class HAPEncryption
{

    readonly clientPublicKey: Buffer;
    readonly secretKey: Buffer;
    readonly publicKey: Buffer;
    readonly sharedSecret: Buffer;
    readonly hkdfPairEncryptionKey: Buffer;

    accessoryToControllerCount = 0;
    controllerToAccessoryCount = 0;
    accessoryToControllerKey: Buffer;
    controllerToAccessoryKey: Buffer;

    incompleteFrame?: Buffer;

    public constructor(clientPublicKey: Buffer, secretKey: Buffer, publicKey: Buffer, sharedSecret: Buffer, hkdfPairEncryptionKey: Buffer)
    {
        this.clientPublicKey = clientPublicKey;
        this.secretKey = secretKey;
        this.publicKey = publicKey;
        this.sharedSecret = sharedSecret;
        this.hkdfPairEncryptionKey = hkdfPairEncryptionKey;

        this.accessoryToControllerKey = Buffer.alloc(0);
        this.controllerToAccessoryKey = Buffer.alloc(0);
    }
}


class PairSetupClient
{
    private readonly keyPair: tweetnacl.BoxKeyPair;
    constructor(private readonly accessoryAddress: string, private readonly http: Http, private readonly accessories: State['pairedAccessories'])
    {
        this.keyPair = tweetnacl.box.keyPair();
    }


    async sendPairVerify(): Promise<HAPEncryption>
    {
        // M1
        const m2 = await this.sendM1();

        const m4 = await this.sendM3(m2);

        // verify that encryption works!
        const encryption = new HAPEncryption(
            m2.pairedAccessory.accessory.publicKey,
            m2.pairedAccessory.controllerInfo.privateKey,
            m2.pairedAccessory.controllerInfo.publicKey,
            m2.sharedSecret,
            m2.sessionKey,
        );

        // our HAPCrypto is engineered for the server side, so we have to switch the keys here (deliberately wrongfully)
        // such that hapCrypto uses the controllerToAccessoryKey for encryption!
        encryption.accessoryToControllerKey = m4.controllerToAccessoryKey;
        encryption.controllerToAccessoryKey = m4.accessoryToControllerKey;

        return encryption;
    }

    async sendM1()
    {
        return await this.http.call({
            url: `http://${this.accessoryAddress}/pair-verify`, body: Buffer.concat(parserWrite(pairMessage,
                {
                    state: PairState.M1,
                    publicKey: Buffer.from(this.keyPair.publicKey),

                })).buffer,
            method: 'post',
            type: 'raw'
        }).
            then(async r => pairMessage.read(Buffer.from(await r.arrayBuffer()), new Cursor()) as PairVerifyM2).
            then(m =>
            {
                assert.equal(m.state, PairState.M2, 'an M2 response was expected');
                const accessoryPublicKey = m.publicKey;
                const sharedSecret = Buffer.from(tweetnacl.scalarMult(
                    this.keyPair.secretKey,
                    accessoryPublicKey,
                ));

                const sessionKey = hkdf(
                    sharedSecret,
                    32,
                    {
                        hash: "sha512",
                        salt: Buffer.from("Pair-Verify-Encrypt-Salt"),
                        info: Buffer.from("Pair-Verify-Encrypt-Info"),
                    }
                );
                const cipherTextM2 = m.encryptedData.subarray(0, -16);
                const authTagM2 = m.encryptedData.subarray(-16);

                const plaintextM2 = Buffer.alloc(0);
                chacha20_poly1305_decryptAndVerify(
                    sessionKey,
                    Buffer.from("PV-Msg02"),
                    null,
                    cipherTextM2,
                    authTagM2,
                );

                const m2 = pairMessage.read(plaintextM2, new Cursor());
                const accessoryIdentifier = m2.identifier;
                const pairedAccessory = Object.values(this.accessories).find(a => a.accessory.identifier == accessoryIdentifier);
                if (!pairedAccessory)
                    throw new Error('The accessory is not recorded as paired, please run setup-pair beforehand');
                const accessorySignature = m2.signature;

                const accessoryInfo = Buffer.concat([
                    accessoryPublicKey,
                    Buffer.from(m2.identifier),
                    this.keyPair.publicKey,
                ]);

                if (!tweetnacl.sign.detached.verify(accessoryInfo, accessorySignature, pairedAccessory.controllerInfo.publicKey))
                    throw new Error('signature could not be verified');

                return {
                    sharedSecret,
                    sessionKey,
                    serverEphemeralPublicKey: accessoryPublicKey,
                    pairedAccessory
                };
            });
    }

    async sendM3(m2: Unpromisify<ReturnType<PairSetupClient['sendM1']>>)
    {
        const controllerInfo = Buffer.concat([
            this.keyPair.publicKey,
            Buffer.from(m2.pairedAccessory.controllerInfo.username),
            m2.serverEphemeralPublicKey,
        ]);

        // step 8
        const controllerSignature = Buffer.from(
            tweetnacl.sign.detached(controllerInfo, m2.pairedAccessory.controllerInfo.privateKey),
        );

        // step 9
        const plainTextTLV_M3 = Buffer.concat(parserWrite(pairMessage, {
            identifier: m2.pairedAccessory.accessory.identifier,
            signature: controllerSignature,
        }));

        // step 10
        const encrypted_M3 = chacha20_poly1305_encryptAndSeal(
            m2.sessionKey,
            Buffer.from("PV-Msg03"),
            null,
            plainTextTLV_M3,
        );


        return this.http.call({
            url: `http://${this.accessoryAddress}/pair-verify`,
            body: Buffer.concat(parserWrite(pairMessage, {

                state: PairState.M3,
                encryptedData: Buffer.concat([encrypted_M3.ciphertext, encrypted_M3.authTag]),
            })).buffer,
            type: "raw"
        }).
            then(r => r.arrayBuffer()).
            then(b => pairMessage.read(Buffer.from(b), new Cursor()) as PairVerifyM4).
            then(m4 =>
            {
                assert.equal(m4.state, PairState.M4);
                assert.equal(m4.error, undefined);

                const salt = Buffer.from("Control-Salt");
                const accessoryToControllerKey = hkdf(
                    m2.sharedSecret,
                    32,
                    {
                        hash: "sha512",
                        salt,
                        info: Buffer.from("Control-Read-Encryption-Key"),
                    });

                const controllerToAccessoryKey = hkdf(
                    m2.sharedSecret,
                    32,
                    {
                        hash: "sha512",
                        salt,
                        info: Buffer.from("Control-Write-Encryption-Key"),
                    }
                );

                return {
                    accessoryToControllerKey,
                    controllerToAccessoryKey,
                };

            })
            ;
    }
}
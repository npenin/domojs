import * as crypto from 'crypto';
import * as http from 'http';
import * as https from 'https';
import { base64 } from '@akala/core'
import { jwt } from '@akala/jwt'

export interface VAPIDPublicKey
{
    publicKey: string;
}

export interface VAPIDSubscription
{
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export interface BrowserRegistration
{
    browserId: string;
    subscription: VAPIDSubscription;
    userAgent?: string;
    registeredAt: Date;
}

export interface VAPIDConfig<TPrivateKey, TPublicKey = TPrivateKey>
{
    subject?: string; // mailto:your-email@example.com or https://example.com
    publicKey: TPublicKey;
    privateKey: TPrivateKey;
}

/**
 * Creates a VAPID Authorization header
 */
export async function createVAPIDAuthHeader(vapidConfig: VAPIDConfig<CryptoKey>, endpoint: string): Promise<string>
{
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        aud: new URL(endpoint).origin,
        sub: vapidConfig.subject || 'https://domojs.local',
        exp: now + 12 * 60 * 60 // valid for 12 hours
    };

    const token = await jwt.serialize({
        header: {
            alg: 'ES256',
            typ: 'JWT'
        }, payload
    }, vapidConfig.privateKey);

    const publicKeyBytes = base64.base64EncArrBuff(await crypto.subtle.exportKey('raw', vapidConfig.publicKey));

    return `vapid t=${token}, k=${publicKeyBytes}`;
}

export default {
    createVAPIDAuthHeader
};

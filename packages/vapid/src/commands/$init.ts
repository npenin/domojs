import { CliContext } from '@akala/cli'
import { ProxyConfiguration } from '@akala/config';
import { Endpoint, BridgeConfiguration, clusterFactory, MatterClusterIds, registerNode, actionsCluster, messages, ClusterIds, RootNode, keypadInput } from '@domojs/devices'
import sidecar, { SidecarConfiguration } from '@akala/sidecar'
import { base64, logger as globalLogger, IsomorphicBuffer, ObservableArray } from '@akala/core';
import { BrowserRegistration, createVAPIDAuthHeader, VAPIDConfig, VAPIDSubscription } from '../index.js';
import { MqttEvents } from '@domojs/mqtt';
import { jwt } from '@akala/jwt'

const logger = globalLogger.use('domojs:vapid');

interface State
{
    browsers: Record<string, BrowserRegistration>;
    vapidConfig?: VAPIDConfig<string>;
}

/**
 * Handles a browser registration request
 */
async function registerBrowser(state: ProxyConfiguration<State>, subscription: VAPIDSubscription, userAgent?: string): Promise<BrowserRegistration>
{
    const browserId = `browser-${crypto.randomUUID()}`;

    const registration: BrowserRegistration = {
        browserId,
        subscription,
        userAgent,
        registeredAt: new Date()
    };

    if (!state.has('browsers'))
        state.set('browsers', {});
    state.browsers.set(browserId, registration);
    logger.info(`Browser registered: ${browserId} (${userAgent})`);

    return registration;
}

/**
 * Sends a push notification to a registered browser
 */
async function sendNotification(state: ProxyConfiguration<State>, browserId: string, title: string, options?: any): Promise<void>
{
    const registration = state.browsers.get<BrowserRegistration>(browserId);
    if (!registration)
    {
        throw new Error(`Browser ${browserId} not found`);
    }

    if (!state.vapidConfig)
    {
        throw new Error('VAPID config not initialized');
    }

    const endpoint = registration.subscription.endpoint;
    const payload = JSON.stringify({
        title,
        ...options
    });

    const authHeader = await createVAPIDAuthHeader(await importKeys(state.vapidConfig), endpoint);

    const url = new URL(endpoint);
    const options_req: RequestInit = {
        method: 'POST',
        body: payload,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': payload.length.toString(),
            'Authorization': authHeader,
            'TTL': '24',
            'Urgency': 'normal'
        }
    };

    const res = await fetch(url, options_req)

    if (res.status === 201 || res.status === 200)
    {
        logger.info(`Notification sent to ${browserId}`);
        return;
    }
    else
    {
        throw new Error(`Push service returned ${res.status}`);
    }

}

export async function importKeys(config: VAPIDConfig<string>): Promise<VAPIDConfig<CryptoKey>>
{
    return {
        subject: config.subject,
        privateKey: await crypto.subtle.importKey('pkcs8', base64.base64DecToArr(config.privateKey),
            { name: 'ECDSA', namedCurve: 'P-256' },
            false,
            ['sign']
        ),
        publicKey: await crypto.subtle.importKey('raw', base64.base64UrlDecToArr(config.publicKey),
            { name: 'ECDH', namedCurve: 'P-256' },
            false,
            []
        )
    };
}

/**
 * Loads or generates VAPID configuration
 */
async function initializeVAPIDConfig(state: ProxyConfiguration<State>): Promise<VAPIDConfig<CryptoKey>>
{
    try
    {
        if (!state.has('vapidConfig'))
            throw new Error('No VAPID config in state');
        logger.info('VAPID configuration loaded from file');
        const config = state.vapidConfig.extract();
        if (typeof config.privateKey !== 'string')
            config.privateKey = await state.getSecret('vapidConfig.privateKey');

        return importKeys(config);
    }
    catch (err)
    {
        logger.info('Generating new VAPID keys...');
        const keyPair = await crypto.subtle.generateKey(
            { name: 'ECDSA', namedCurve: 'P-256' },
            true,
            ['sign']
        )

        const config: VAPIDConfig<CryptoKey> = {
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey,
            subject: 'mailto:admin@domojs.local'
        };

        // Save configuration
        state.set('vapidConfig', {
            subject: config.subject,
            publicKey: base64.base64UrlEncArrBuff(await crypto.subtle.exportKey('raw', keyPair.publicKey)),
        });
        await state.setSecret('vapidConfig.privateKey', base64.base64EncArrBuff(await crypto.subtle.exportKey('pkcs8', config.privateKey)));
        await state.commit();
        logger.info(`VAPID configuration saved to ${state.path}`);
        logger.info(`Public key: ${JSON.stringify(config.publicKey)}`);

        return config;
    }
}

export async function encryptPayload(
    subscription: VAPIDSubscription,
    payload: unknown
)
{
    // Import browser's P256DH key from subscription
    const browserKey = await crypto.subtle.importKey(
        'raw',
        base64.base64DecToArr(subscription.keys.p256dh),
        { name: 'ECDH', namedCurve: 'P-256' },
        false,
        []
    );

    // Ephemeral server key
    const serverKeyPair = await crypto.subtle.generateKey(
        { name: 'ECDH', namedCurve: 'P-256' },
        true,
        ['deriveBits']
    );

    // Import auth secret
    const authKey = await crypto.subtle.importKey(
        'raw',
        base64.base64DecToArr(subscription.keys.auth),
        'HKDF',
        false,
        ['deriveKey']
    );

    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Derive CEK (Content Encryption Key) and nonce using HKDF
    const cek = await crypto.subtle.deriveKey(
        {
            name: 'HKDF',
            hash: 'SHA-256',
            salt,
            info: new TextEncoder().encode('Content-Encoding: aes128gcm\0')
        },
        authKey,
        { name: 'AES-GCM', length: 128 },
        false,
        ['encrypt']
    );

    // Derive nonce
    const nonceBuffer = await crypto.subtle.deriveBits(
        {
            name: 'HKDF',
            hash: 'SHA-256',
            salt,
            info: new TextEncoder().encode('Content-Encoding: nonce\0')
        },
        authKey,
        96 // 12 bytes for GCM nonce
    );
    const nonce = new Uint8Array(nonceBuffer);

    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: nonce },
        cek,
        new TextEncoder().encode(JSON.stringify(payload))
    );

    const serverPublicKeyRaw = new Uint8Array(
        await crypto.subtle.exportKey('raw', serverKeyPair.publicKey)
    );

    return {
        ciphertext: new Uint8Array(ciphertext),
        salt,
        serverPublicKeyRaw,
    };
}

export default async function (context: CliContext<any, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration & State>>)
{
    const app = await sidecar<undefined, MqttEvents>(context);

    // Initialize VAPID configuration
    const config = await initializeVAPIDConfig(context.state);

    const fabric: RootNode<'commissionning'> = await registerNode('vapid', app, context.state, context.abort.signal, false, {
        fixedLabel: clusterFactory({
            id: MatterClusterIds.FixedLabel,
            LabelList: [
                { Label: 'VAPID_PUBLIC_KEY', Value: context.state.vapidConfig.publicKey }
            ]
        }),
        commissionning: clusterFactory({
            id: ClusterIds.commissionning,
            registerCommand: async (message: string) =>
            {
                const request = JSON.parse(message);
                const registration = await registerBrowser(
                    context.state,
                    request as VAPIDSubscription
                );

                // context.state.set('browsers.' + registration.browserId, registration);
                await context.state.commit();
                const endpointId = await fabric.getEndpointId(registration.browserId);
                const messages = new ObservableArray<messages.MessageStruct>([]);
                messages.addListener(ev =>
                {
                    async function sendPush(sub: VAPIDSubscription, payload)
                    {
                        // 1️⃣ Compute VAPID header
                        // const audience = new URL(sub.endpoint).origin;
                        const vapidHeader = await createVAPIDAuthHeader(config, sub.endpoint);

                        // 2️⃣ Encrypt payload
                        const subscription = sub as VAPIDSubscription;
                        const { ciphertext, salt, serverPublicKeyRaw } = await encryptPayload(
                            subscription,
                            payload);

                        // 3️⃣ Send HTTP request
                        const headers = {
                            'TTL': '60',
                            'Content-Encoding': 'aes128gcm',
                            'Authorization': vapidHeader,
                            'Encryption': `salt=${base64.base64UrlEncArr(salt)}`,
                            'Crypto-Key': `dh=${base64.base64UrlEncArr(serverPublicKeyRaw)}`
                        };

                        await fetch(sub.endpoint, { method: 'POST', headers, body: ciphertext });
                        console.log('Push sent to', sub.endpoint);
                    }

                    sendPush(request.subscription, message);
                });

                fabric.endpoints.push(await fabric.newEndpoint(registration.browserId, {
                    messages: clusterFactory({
                        id: MatterClusterIds.Messages,
                        ActiveMessageIDs: [],
                        async CancelMessagesRequestCommand(messageIds)
                        {
                            while (messageIds.length)
                                messages.splice(messages.findIndex(m => messageIds.includes(m.MessageID)), 1);
                        },
                        Messages: messages.array,
                        async PresentMessagesRequestCommand(messageId, priority, control, startTime, duration, text, responses)
                        {
                            messages.push({
                                Duration: duration,
                                MessageControl: control,
                                MessageID: messageId,
                                MessageText: text,
                                Priority: priority,
                                StartTime: startTime,
                                Responses: responses
                            })
                        },
                        SupportsConfirmationReply: true,
                        SupportsConfirmationResponse: true,
                        SupportsProtectedMessages: false,
                        SupportsReceivedConfirmation: false
                    })
                }, endpointId));
                return [null, endpointId];
            }
        })
    });

    await fabric.attach(app.pubsub);

    logger.info('VAPID fabric initialized');

    fabric.endpoints.addListener(ev =>
    {
        if ('newItems' in ev)
        {
            ev.newItems.forEach(endpoint =>
            {

            });
        }
    })
}

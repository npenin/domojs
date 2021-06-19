import { Cursor, protobuf } from '@domojs/protocol-parser'

export enum ProtocolVersion
{
    CASTV2_1_0 = 0,
}
export enum PayloadType
{
    STRING = 0,
    BINARY = 1,
}

export class CastMessage
{
    // Always pass a version of the protocol for future compatibility
    // requirements.
    protocol_version: ProtocolVersion;

    // source and destination ids identify the origin and destination of the
    // message.  They are used to route messages between endpoints that share a
    // device-to-device channel.
    //
    // For messages between applications:
    //   - The sender application id is a unique identifier generated on behalf of
    //     the sender application.
    //   - The receiver id is always the the session id for the application.
    //
    // For messages to or from the sender or receiver platform, the special ids
    // 'sender-0' and 'receiver-0' can be used.
    //
    // For messages intended for all endpoints using a given channel, the
    // wildcard destination_id '*' can be used.
    source_id: string;
    destination_id: string;

    // This is the core multiplexing key.  All messages are sent on a namespace
    // and endpoints sharing a channel listen on one or more namespaces.  The
    // namespace defines the protocol and semantics of the message.
    namespace: string;

    // Encoding and payload info follows.

    // What type of data do we have in this message.
    payload_type: PayloadType;

    // Depending on payload_type, exactly one of the following optional fields
    // will always be set.
    payload_utf8?: string;
    payload_binary?: Buffer;
}

export enum SignatureAlgorithm
{
    UNSPECIFIED = 0,
    RSASSA_PKCS1v15 = 1,
    RSASSA_PSS = 2,
}

export enum HashAlgorithm
{
    SHA1 = 0,
    SHA256 = 1,
}

// Messages for authentication protocol between a sender and a receiver.
export class AuthChallenge
{
    signature_algorithm?: SignatureAlgorithm = SignatureAlgorithm.RSASSA_PKCS1v15
    sender_nonce?: Buffer;
    hash_algorithm?: HashAlgorithm = HashAlgorithm.SHA1;
}

export class AuthResponse
{
    signature: Buffer;
    client_auth_certificate: Buffer;
    intermediate_certificate: Buffer[];
    signature_algorithm: SignatureAlgorithm = SignatureAlgorithm.RSASSA_PKCS1v15;
    sender_nonce?: Buffer;
    hash_algorithm?: HashAlgorithm = HashAlgorithm.SHA1;
    crl?: Buffer;
}

export enum ErrorType
{
    INTERNAL_ERROR = 0,
    NO_TLS = 1,  // The underlying connection is not TLS
    SIGNATURE_ALGORITHM_UNAVAILABLE = 2,
}


export class AuthError
{
    error_type: ErrorType;
}

export class DeviceAuthMessage
{
    // Request fields
    challenge?: protobuf.ProtobufMessage<AuthChallenge>;
    // Response fields
    response?: protobuf.ProtobufMessage<AuthResponse>;
    error?: protobuf.ProtobufMessage<AuthError>;
}

export const castMessage = protobuf.message<protobuf.ProtobufMessage<CastMessage>>(
    protobuf.property('protocol_version', protobuf.varint),
    protobuf.property('source_id', protobuf.string()),
    protobuf.property('destination_id', protobuf.string()),
    protobuf.property('namespace', protobuf.string()),
    protobuf.property('payload_type', protobuf.varint),
    protobuf.property('payload_utf8', protobuf.string()),
    protobuf.property('payload_binary', protobuf.raw),
);

export const authChallenge = protobuf.object<protobuf.ProtobufMessage<AuthChallenge>>(
    protobuf.property('signature_algorithm', protobuf.varint),
    protobuf.property('sender_nonce', protobuf.raw),
    protobuf.property('hash_algorithm', protobuf.varint),
)
export const authResponse = protobuf.object<protobuf.ProtobufMessage<AuthResponse>>(
    protobuf.property('signature', protobuf.raw),
    protobuf.property('client_auth_certificate', protobuf.raw),
    protobuf.property('intermediate_certificate', protobuf.raw),
    protobuf.property('signature_algorithm', protobuf.varint),
    protobuf.property('sender_nonce', protobuf.raw),
    protobuf.property('hash_algorithm', protobuf.varint),
    protobuf.property('crl', protobuf.raw),
)
export const authError = protobuf.object<protobuf.ProtobufMessage<AuthError>>(
    protobuf.property('error_type', protobuf.varint),
)
export const deviceAuthMessage = protobuf.message<protobuf.ProtobufMessage<DeviceAuthMessage>>(
    protobuf.property('challenge', protobuf.sub(authChallenge)),
    protobuf.property('response', protobuf.sub(authResponse)),
    protobuf.property('error', protobuf.sub(authError)),
)

import tls from 'tls'
if (require.main == module)
{
    (async function ()
    {
        const socket = await new Promise<tls.TLSSocket>((resolve, reject) =>
        {
            var socket = tls.connect(8009, '10.68.3.223', { rejectUnauthorized: false }, function ()
            {
                resolve(socket);
            });
        });
        socket.on('error', (err) => console.error(err));
        socket.on('data', function (buffer)
        {
            console.log('received data');
            var cast = castMessage.read(buffer, new Cursor());
            console.log(cast);
        });

        await new Promise<void>((resolve, reject) =>
        {
            const msg = {
                source_id: 'sender-0', destination_id: 'receiver-0', protocol_version: ProtocolVersion.CASTV2_1_0, namespace: 'urn:x-cast:com.google.cast.tp.connection', payload_type: PayloadType.STRING, payload_utf8: JSON.stringify({
                    type: 'CONNECT'
                })
            };
            console.log(msg);
            var buffer = Buffer.concat(castMessage.write(msg));
            console.log(buffer.toJSON());
            if (!socket.write(buffer
                , err => { if (err) reject(err); resolve() }))
                throw new Error('not written')

        });

        await new Promise<void>((resolve, reject) =>
        {
            const msg: CastMessage = {
                source_id: 'sender-0', destination_id: 'receiver-0', protocol_version: ProtocolVersion.CASTV2_1_0, namespace: 'urn:x-cast:com.google.cast.receiver', payload_type: PayloadType.STRING, payload_utf8: JSON.stringify({
                    type: 'GET_STATUS',
                    requestId: 0
                })
            };
            console.log(msg);
            var buffer = Buffer.concat(castMessage.write(msg));
            console.log(buffer.toJSON());
            if (!socket.write(buffer
                , err => { if (err) reject(err); resolve() }))
                throw new Error('not written')

        });
    })().then(() => setTimeout(function ()
    {
        process.exit();
    }, 7000));
}
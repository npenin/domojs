import { parsers } from '@domojs/protocol-parser'

const protobuf = parsers.protobuf;

enum ProtocolVersion
{
    CASTV2_1_0 = 0,
}
enum PayloadType
{
    STRING = 0,
    BINARY = 1,
}

class CastMessage
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
    payload_utf8: string;
    payload_binary: Buffer;
}

enum SignatureAlgorithm
{
    UNSPECIFIED = 0,
    RSASSA_PKCS1v15 = 1,
    RSASSA_PSS = 2,
}

enum HashAlgorithm
{
    SHA1 = 0,
    SHA256 = 1,
}

// Messages for authentication protocol between a sender and a receiver.
class AuthChallenge
{
    signature_algorithm?: SignatureAlgorithm = SignatureAlgorithm.RSASSA_PKCS1v15
    sender_nonce?: Buffer;
    hash_algorithm?: HashAlgorithm = HashAlgorithm.SHA1;
}

class AuthResponse
{
    signature: Buffer;
    client_auth_certificate: Buffer;
    intermediate_certificate: Buffer[];
    signature_algorithm: SignatureAlgorithm = SignatureAlgorithm.RSASSA_PKCS1v15;
    sender_nonce?: Buffer;
    hash_algorithm?: HashAlgorithm = HashAlgorithm.SHA1;
    crl?: Buffer;
}

enum ErrorType
{
    INTERNAL_ERROR = 0,
    NO_TLS = 1,  // The underlying connection is not TLS
    SIGNATURE_ALGORITHM_UNAVAILABLE = 2,
}


class AuthError
{
    error_type: ErrorType;
}

class DeviceAuthMessage
{
    // Request fields
    challenge?: AuthChallenge;
    // Response fields
    response?: AuthResponse;
    error?: AuthError;
}

export const castMessage = protobuf.object<CastMessage>(
    protobuf.property('protocol_version', 'varint', protobuf.varint),
    protobuf.property('source_id', 'length-delimited', protobuf.string()),
    protobuf.property('destination_id', 'length-delimited', protobuf.string()),
    protobuf.property('namespace', 'length-delimited', protobuf.string()),
    protobuf.property('payload_type', 'varint', protobuf.string()),
    protobuf.property('payload_utf8', 'length-delimited', protobuf.string()),
    protobuf.property('payload_binary', 'length-delimited', protobuf.raw),
)

export const authChallenge = protobuf.object<AuthChallenge>(
    protobuf.property('signature_algorithm', 'varint', protobuf.varint),
    protobuf.property('sender_nonce', 'length-delimited', protobuf.raw),
    protobuf.property('hash_algorithm', 'varint', protobuf.varint),
)
export const authResponse = protobuf.object<AuthResponse>(
    protobuf.property('signature', 'length-delimited', protobuf.raw),
    protobuf.property('client_auth_certificate', 'length-delimited', protobuf.raw),
    protobuf.property('intermediate_certificate', 'length-delimited', protobuf.raw),
    protobuf.property('signature_algorithm', 'varint', protobuf.varint),
    protobuf.property('sender_nonce', 'length-delimited', protobuf.raw),
    protobuf.property('hash_algorithm', 'varint', protobuf.varint),
    protobuf.property('crl', 'length-delimited', protobuf.raw),
)
export const authError = protobuf.object<AuthError>(
    protobuf.property('error_type', 'varint', protobuf.varint),
)
export const deviceAuthMessage = protobuf.object<DeviceAuthMessage>(
    protobuf.property('challenge', 'length-delimited', authChallenge),
    protobuf.property('response', 'length-delimited', authResponse),
    protobuf.property('error', 'length-delimited', authError),
)
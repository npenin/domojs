import { protobuf } from "@akala/protocol-parser";

enum EventType
{
    EVENT_TYPE_UNKNOWN = 0,
    CAST_SOCKET_CREATED = 1,
    READY_STATE_CHANGED = 2,
    CONNECTION_STATE_CHANGED = 3,
    READ_STATE_CHANGED = 4,
    WRITE_STATE_CHANGED = 5,
    ERROR_STATE_CHANGED = 6,
    CONNECT_FAILED = 7,
    TCP_SOCKET_CONNECT = 8,  // Logged with RV.
    TCP_SOCKET_SET_KEEP_ALIVE = 9,
    SSL_CERT_WHITELISTED = 10,
    SSL_SOCKET_CONNECT = 11,  // Logged with RV.
    SSL_INFO_OBTAINED = 12,
    DER_ENCODED_CERT_OBTAIN = 13,  // Logged with RV.
    RECEIVED_CHALLENGE_REPLY = 14,
    AUTH_CHALLENGE_REPLY = 15,
    CONNECT_TIMED_OUT = 16,
    SEND_MESSAGE_FAILED = 17,
    MESSAGE_ENQUEUED = 18,   // Message
    SOCKET_WRITE = 19,       // Logged with RV.
    MESSAGE_WRITTEN = 20,    // Message
    SOCKET_READ = 21,        // Logged with RV.
    MESSAGE_READ = 22,       // Message
    SOCKET_CLOSED = 25,
    SSL_CERT_EXCESSIVE_LIFETIME = 26,
    CHANNEL_POLICY_ENFORCED = 27,
    TCP_SOCKET_CONNECT_COMPLETE = 28,   // Logged with RV.
    SSL_SOCKET_CONNECT_COMPLETE = 29,   // Logged with RV.
    SSL_SOCKET_CONNECT_FAILED = 30,     // Logged with RV.
    SEND_AUTH_CHALLENGE_FAILED = 31,    // Logged with RV.
    AUTH_CHALLENGE_REPLY_INVALID = 32,
    PING_WRITE_ERROR = 33,              // Logged with RV.
}

enum ChannelAuth
{
    // SSL over TCP.
    SSL = 1,
    // SSL over TCP with challenge and receiver signature verification.
    SSL_VERIFIED = 2,
}

enum ReadyState
{
    READY_STATE_NONE = 1,
    READY_STATE_CONNECTING = 2,
    READY_STATE_OPEN = 3,
    READY_STATE_CLOSING = 4,
    READY_STATE_CLOSED = 5,
}

enum ConnectionState
{
    CONN_STATE_UNKNOWN = 1,
    CONN_STATE_TCP_CONNECT = 2,
    CONN_STATE_TCP_CONNECT_COMPLETE = 3,
    CONN_STATE_SSL_CONNECT = 4,
    CONN_STATE_SSL_CONNECT_COMPLETE = 5,
    CONN_STATE_AUTH_CHALLENGE_SEND = 6,
    CONN_STATE_AUTH_CHALLENGE_SEND_COMPLETE = 7,
    CONN_STATE_AUTH_CHALLENGE_REPLY_COMPLETE = 8,
    CONN_STATE_START_CONNECT = 9,
    // Terminal states follow.
    CONN_STATE_FINISHED = 100,
    CONN_STATE_ERROR = 101,
    CONN_STATE_TIMEOUT = 102,
}

enum ReadState
{
    READ_STATE_UNKNOWN = 1,
    READ_STATE_READ = 2,
    READ_STATE_READ_COMPLETE = 3,
    READ_STATE_DO_CALLBACK = 4,
    READ_STATE_HANDLE_ERROR = 5,
    READ_STATE_ERROR = 100,  // Terminal state.
}

enum WriteState
{
    WRITE_STATE_UNKNOWN = 1,
    WRITE_STATE_WRITE = 2,
    WRITE_STATE_WRITE_COMPLETE = 3,
    WRITE_STATE_DO_CALLBACK = 4,
    WRITE_STATE_HANDLE_ERROR = 5,

    // Terminal states follow.
    WRITE_STATE_ERROR = 100,
    WRITE_STATE_IDLE = 101,
}

enum ErrorState
{
    CHANNEL_ERROR_NONE = 1,
    CHANNEL_ERROR_CHANNEL_NOT_OPEN = 2,
    CHANNEL_ERROR_AUTHENTICATION_ERROR = 3,
    CHANNEL_ERROR_CONNECT_ERROR = 4,
    CHANNEL_ERROR_SOCKET_ERROR = 5,
    CHANNEL_ERROR_TRANSPORT_ERROR = 6,
    CHANNEL_ERROR_INVALID_MESSAGE = 7,
    CHANNEL_ERROR_INVALID_CHANNEL_ID = 8,
    CHANNEL_ERROR_CONNECT_TIMEOUT = 9,
    CHANNEL_ERROR_UNKNOWN = 10,
}

enum ChallengeReplyErrorType
{
    CHALLENGE_REPLY_ERROR_NONE = 1,
    CHALLENGE_REPLY_ERROR_PEER_CERT_EMPTY = 2,
    CHALLENGE_REPLY_ERROR_WRONG_PAYLOAD_TYPE = 3,
    CHALLENGE_REPLY_ERROR_NO_PAYLOAD = 4,
    CHALLENGE_REPLY_ERROR_PAYLOAD_PARSING_FAILED = 5,
    CHALLENGE_REPLY_ERROR_MESSAGE_ERROR = 6,
    CHALLENGE_REPLY_ERROR_NO_RESPONSE = 7,
    CHALLENGE_REPLY_ERROR_FINGERPRINT_NOT_FOUND = 8,
    CHALLENGE_REPLY_ERROR_CERT_PARSING_FAILED = 9,
    CHALLENGE_REPLY_ERROR_CERT_NOT_SIGNED_BY_TRUSTED_CA = 10,
    CHALLENGE_REPLY_ERROR_CANNOT_EXTRACT_PUBLIC_KEY = 11,
    CHALLENGE_REPLY_ERROR_SIGNED_BLOBS_MISMATCH = 12,
    CHALLENGE_REPLY_ERROR_TLS_CERT_VALIDITY_PERIOD_TOO_LONG = 13,
    CHALLENGE_REPLY_ERROR_TLS_CERT_VALID_START_DATE_IN_FUTURE = 14,
    CHALLENGE_REPLY_ERROR_TLS_CERT_EXPIRED = 15,
    CHALLENGE_REPLY_ERROR_CRL_INVALID = 16,
    CHALLENGE_REPLY_ERROR_CERT_REVOKED = 17,
}

class SocketEvent
{
    // Required
    type?: EventType;
    timestamp_micros: bigint;

    details: string;

    net_return_value: number;

    message_namespace: string;

    ready_state: ReadyState;
    connection_state: ConnectionState;
    read_state: ReadState;
    write_state: WriteState;
    error_state: ErrorState;

    challenge_reply_error_type: ChallengeReplyErrorType = 11;
    // No longer used.
    nss_error_code: number;
}

class AggregatedSocketEvent
{
    id: number;
    endpoint_id: number;
    channel_auth_type: ChannelAuth;
    socket_event: SocketEvent[];
    bytes_read: bigint;
    bytes_written: bigint;
}

class Log
{
    // Each AggregatedSocketEvent represents events recorded for a socket.
    aggregated_socket_event: AggregatedSocketEvent;

    // Number of socket log entries evicted by the logger due to size constraints.
    num_evicted_aggregated_socket_events: number;

    // Number of event log entries evicted by the logger due to size constraints.
    num_evicted_socket_events: number;
}

export const socketEvent = protobuf.object<SocketEvent>(
    protobuf.property('type', 'varint', protobuf.varint),
    protobuf.property('timestamp_micros', protobuf.int64),
    protobuf.property('details', 'length-delimited', protobuf.string()),
    protobuf.property('net_return_value', protobuf.int32),
    protobuf.property('message_namespace', 'length-delimited', protobuf.string()),
    protobuf.property('ready_state', 'varint', protobuf.varint),
    protobuf.property('connection_state', 'varint', protobuf.varint),
    protobuf.property('read_state', 'varint', protobuf.varint),
    protobuf.property('write_state', 'varint', protobuf.varint),
    protobuf.property('error_state', 'varint', protobuf.varint),
    protobuf.property('challenge_reply_error_type', 'varint', protobuf.varint),
    protobuf.property('nss_error_code', 'varint', protobuf.varint),
);


export const aggregateSocketEvent = protobuf.object<AggregatedSocketEvent>(
    protobuf.property('id', '32-bit', protobuf.int32),
    protobuf.property('endpoint_id', '32-bit', protobuf.int32),
    protobuf.property('channel_auth_type', 'varint', protobuf.varint),
    protobuf.property('socket_event', '32-bit', protobuf.sub(socketEvent)),
    protobuf.property('bytes_read', '64-bit', protobuf.int64),
    protobuf.property('bytes_written', '64-bit', protobuf.int64),
);

export const log = protobuf.object<protobuf.ProtobufMessage<Log>>(
    protobuf.property('aggregated_socket_event', protobuf.sub(aggregateSocketEvent)),
    protobuf.property('num_evicted_aggregated_socket_events', protobuf.int32),
    protobuf.property('num_evicted_socket_events', protobuf.varint),
);
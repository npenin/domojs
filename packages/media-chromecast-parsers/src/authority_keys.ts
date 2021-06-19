import { parsers } from "@domojs/protocol-parser";
import { ProtobufMessage } from "@domojs/protocol-parser/src/parsers/protobuf";

const protobuf = parsers.protobuf;

class Key
{
    fingerprint: Buffer;
    public_key: Buffer;
}

class AuthorityKeys
{
    keys: Key[];
}

export const authorityKeys = protobuf.object<ProtobufMessage<AuthorityKeys>>(
    protobuf.property('keys', protobuf.sub(protobuf.object<Key>(
        protobuf.property('fingerprint', protobuf.raw),
        protobuf.property('public_key', protobuf.raw),
    )))
);
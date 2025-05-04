import { protobuf } from "@akala/protocol-parser";
import { IsomorphicBuffer } from '@akala/core'


class Key
{
    fingerprint: IsomorphicBuffer;
    public_key: IsomorphicBuffer;
}

class AuthorityKeys
{
    keys: Key[];
}

export const authorityKeys = protobuf.object<protobuf.ProtobufMessage<AuthorityKeys>>(
    protobuf.property('keys', protobuf.sub(protobuf.object<Key>(
        protobuf.property('fingerprint', protobuf.raw),
        protobuf.property('public_key', protobuf.raw),
    )))
);
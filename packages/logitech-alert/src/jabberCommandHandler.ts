import { IncompleteMessageError, IsomorphicBuffer, LogLevels, SocketProtocolTransformer, SocketAdapter, SocketProtocolAdapter, AsyncTeardownManager, EventEmitter, LongMessageProtocolTransformer } from '@akala/core'
import { log as logger } from '@domojs/devices';
import { XMLParser } from 'fast-xml-parser';

const log = logger.use('logitech-alert:jabber', LogLevels.silly);
type Stanzas = Message | Presence | IQ | StreamFeatures | Auth | Success | Bind | StreamStart;

interface StreamStart
{
    type: 'stream:stream';
    to?: string;
    from?: string;
    id?: string;
    version?: string;
}

interface Message
{
    type?: 'message';
    from?: string;
    to?: string;
    id?: string;
    event?: any
}

interface Presence
{
    type?: 'presence';
}

interface StreamFeatures
{
    type: 'stream:features';
    mechanisms?: string[];
    bind?: boolean;
    session?: boolean;
}

interface Auth
{
    type: 'auth';
    mechanism?: string;
    data?: string;
}

interface Success
{
    id?: string;
    type: 'success';
}

interface Bind
{
    type: 'bind';
    resource?: string;
}

interface IQBindPayload
{
    resource?: string;
    jid?: string;
}

interface IQSessionPayload
{
    // Session typically has no content
}

interface MotionZone
{
    x: number;
    y: number;
    width: number;
    height: number;
}

interface MotionZones
{
    maxCount: number;
    zones: MotionZone[];
}

interface MotionDetectionPayload
{
    Device: { '@_id': string };
    overall?: number;
    fullExtent?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    zones?: MotionZones;
}

type IQPayload =
    {
        '@'?: Record<string, string>,
    } & {
        [key in string]: key extends `@_` ? string : IQPayload | IQPayload[] | string;
    }

type IQ = IQSet | IQGet | IQResult | IQError;

interface IQPayloads
{
    id?: string;
    from?: string;
    to?: string;
    bind?: IQBindPayload;
    session?: IQSessionPayload;
    query?: { '@_xmlns': string, '#text': string };
    pubsub?: IQPayload;
    command?: IQPayload;
    MotionDetection?: MotionDetectionPayload;
}

interface IQGet extends IQPayloads
{
    type: 'get';

}
interface IQSet extends IQPayloads
{
    type: 'set';
}
interface IQResult extends IQPayloads
{
    type: 'result';
}
interface IQError extends IQPayloads
{
    type: 'error';
}

const xmlnsMapping = {
    bind: 'urn:ietf:params:xml:ns:xmpp-bind',
    session: 'urn:ietf:params:xml:ns:xmpp-session',
    pubsub: 'http://jabber.org/protocol/pubsub',
    MotionDetection: 'urn:logitech-com:logitech-alert:device:video:motion-detection'
}

function isIsomorphicBufferArray(arr: any[]): arr is IsomorphicBuffer[]
{
    return arr.length > 0 && arr[0] instanceof IsomorphicBuffer;
}

function combine(chunks: string[] | IsomorphicBuffer[], start: { offset: number, chunkOffset: number }, end?: { offset: number, chunkOffset: number }): string | IsomorphicBuffer
{
    if (end && start.chunkOffset == end.chunkOffset)
    {
        if (chunks[start.chunkOffset] instanceof IsomorphicBuffer)
            return (chunks[start.chunkOffset] as IsomorphicBuffer).subarray(start.offset, end.offset);
        else
            return (chunks[start.chunkOffset] as string).substring(start.offset, end.offset);
    }
    if (isIsomorphicBufferArray(chunks))
    {
        let combined: IsomorphicBuffer[];
        combined = [chunks[start.chunkOffset]];
        if (start.offset > 0)
            combined[0] = combined[0].subarray(start.offset);
        if (end?.chunkOffset > chunks.length)
            throw new Error('end chunk offset exceeds chunks length');
        if (end)
            for (let i = start.chunkOffset + 1; i <= end.chunkOffset; i++)
            {
                if (i == end.chunkOffset)
                    combined.push((chunks[i]).subarray(0, end.offset));
                else
                    combined.push(chunks[i]);
            }
        else
            combined.push(...chunks.slice(start.chunkOffset + 1));
        return IsomorphicBuffer.concat(combined);
    }
    else
    {
        let combined: string[];
        combined = [chunks[start.chunkOffset]];
        if (start.offset > 0)
            combined[0] = combined[0].substring(start.offset);
        if (end?.chunkOffset > chunks.length)
            throw new Error('end chunk offset exceeds chunks length');
        if (end)
            for (let i = start.chunkOffset + 1; i <= end.chunkOffset; i++)
            {
                if (i == end.chunkOffset)
                    combined.push((chunks[i]).substring(0, end.offset));
                else
                    combined.push(chunks[i]);
            }
        else
            combined.push(...chunks.slice(start.chunkOffset + 1));
        return combined.join('');
    }
}

const parser = new XMLParser({ allowBooleanAttributes: true, ignoreAttributes: false });
const jabber: SocketProtocolTransformer<Stanzas, string[]> = {
    receive(chunks: string[] | IsomorphicBuffer[], self: SocketAdapter)
    {
        let cursor = {
            offset: 0,
            chunkOffset: 0
        }
        let root: RegExpExecArray = null;
        const results: Stanzas[] = [];
        for (let i = 0; i < chunks.length; i++)
        {
            let data = chunks[i];
            let xmlObj: any;
            if (data instanceof IsomorphicBuffer)
                data = chunks[i] = data.toArray().toString();
            console.debug('received: \n' + data);
            if (typeof data == 'string')
            {
                try
                {
                    if (!root)
                    {
                        const rootRegexp = /<((?:\w+:)?\w+)(?:[^>\/]|\/[^>])*(\/)?>/g;
                        rootRegexp.lastIndex = cursor.offset;
                        root = rootRegexp.exec(data);
                    }
                    if (!root)
                    {
                        throw new IncompleteMessageError(results, [combine(chunks, cursor)]);
                    }
                    if (!root[2])
                    {
                        let indexOfRootClose = data.indexOf(`</${root[1]}>`, root.index + root.length);
                        if (indexOfRootClose == -1)
                        {
                            if (root[1] !== 'stream:stream')
                                if (i < chunks.length - 1)
                                    continue;
                                else
                                    throw new IncompleteMessageError(results, [combine(chunks, cursor)]);
                            else
                            {
                                indexOfRootClose = data.length;
                                chunks[i] = data + '</stream:stream>';
                            }
                        }
                        xmlObj = parser.parse(combine(chunks, cursor, { offset: indexOfRootClose + root[1].length + 3, chunkOffset: i }) as string);
                        cursor.offset = indexOfRootClose + root[1].length + 3;
                        if (cursor.offset >= data.length)
                            cursor = { offset: 0, chunkOffset: i + 1 };
                    }
                    else
                    {
                        xmlObj = parser.parse(data.substring(cursor.offset, root.index + root[0].length));
                        cursor.offset = root.index + root[0].length;
                        if (cursor.offset >= data.length)
                            cursor = { offset: 0, chunkOffset: i + 1 };
                    }

                    switch (root[1])
                    {
                        case 'stream:stream':
                            {
                                const s = xmlObj['stream:stream'] || xmlObj;
                                const stanza: StreamStart = {
                                    type: 'stream:stream',
                                    to: s['@_to'],
                                    from: s['@_from'],
                                    id: s['@_id'],
                                    version: s['@_version']
                                };
                                results.push(stanza);
                                break;
                            }
                        case 'message':
                            {
                                const m = xmlObj.message || xmlObj;
                                const msg: Message = {
                                    type: 'message',
                                    from: m['@_from'] || m.from,
                                    to: m['@_to'] || m.to,
                                    id: m['@_id'] || m.id,
                                    event: m.event
                                };
                                results.push(msg);
                                break;
                            }
                        case 'presence':
                            {
                                const p = xmlObj.presence || xmlObj;
                                const presence: Presence = {
                                    type: 'presence'
                                };
                                results.push(presence);
                                break;
                            }
                        case 'stream:features':
                            {
                                const f = xmlObj['stream:features'];
                                const features: StreamFeatures = {
                                    type: 'stream:features',
                                    mechanisms: [],
                                    bind: false,
                                    session: false
                                };

                                // Parse mechanisms
                                if (f && f.mechanisms)
                                {
                                    const mechs = f.mechanisms.mechanism;
                                    if (Array.isArray(mechs))
                                        features.mechanisms = mechs;
                                    else if (typeof mechs === 'string')
                                        features.mechanisms = [mechs];
                                }

                                // Check for bind and session
                                if (f)
                                {
                                    features.bind = typeof f.bind !== 'undefined';
                                    features.session = typeof f.session !== 'undefined';
                                }

                                results.push(features);
                                break;
                            }
                        case 'auth':
                            {
                                const a = xmlObj.auth;
                                const auth: Auth = {
                                    type: 'auth',
                                    mechanism: a['@_mechanism'],
                                    data: a['#text'] || ''
                                };
                                results.push(auth);
                                break;
                            }
                        case 'success':
                            {
                                const success: Success = {
                                    type: 'success'
                                };
                                results.push(success);
                                break;
                            }
                        case 'iq':
                            {
                                const i = xmlObj.iq;
                                const iqType = i['@_type'] || i.type;
                                const iq: IQ = {
                                    type: iqType,
                                    id: i['@_id'],
                                    from: i['@_from'],
                                    to: i['@_to']
                                } as IQ;

                                // Check for MotionDetection element
                                if (i.MotionDetection)
                                {
                                    const md = i.MotionDetection;
                                    const zones = md.MotionZones?.MotionZone || [];
                                    const zoneArray = Array.isArray(zones) ? zones : zones ? [zones] : [];

                                    (iq as IQResult).MotionDetection = {
                                        Device: md.Device,
                                        overall: parseInt(md.MotionSensitivity?.['@_overall'] || '0'),
                                        fullExtent: {
                                            x: parseInt(md.MotionZoneFullExtent?.['@_x'] || '0'),
                                            y: parseInt(md.MotionZoneFullExtent?.['@_y'] || '0'),
                                            width: parseInt(md.MotionZoneFullExtent?.['@_width'] || '0'),
                                            height: parseInt(md.MotionZoneFullExtent?.['@_height'] || '0')
                                        },
                                        zones: {
                                            maxCount: parseInt(md.MotionZones?.['@_maxCount'] || '0'),
                                            zones: zoneArray.map((zone: any) => ({
                                                x: parseInt(zone['@_x'] || '0'),
                                                y: parseInt(zone['@_y'] || '0'),
                                                width: parseInt(zone['@_width'] || '0'),
                                                height: parseInt(zone['@_height'] || '0')
                                            }))
                                        }
                                    };
                                }

                                // Check for bind element
                                if (i.bind)
                                {
                                    iq.bind = {
                                        resource: i.bind.resource,
                                        jid: i.bind.jid
                                    };
                                }

                                // Check for session element
                                if (i.session)
                                {
                                    iq.session = {};
                                }

                                // Check for query element
                                if (i.query)
                                {
                                    iq.query = i.query;
                                }

                                // Check for pubsub element
                                if (i.command)
                                {
                                    iq.command = i.command;
                                }

                                // Store any other child elements as generic payload
                                // const knownElements = ['bind', 'session', 'query', 'pubsub'];
                                for (const key of Object.keys(i))
                                {
                                    if (!key.startsWith('@_'))// && !knownElements.includes(key))
                                    {
                                        iq.command = iq.command || {};
                                        iq.command[key] = i[key];
                                    }
                                }

                                results.push(iq);
                            }
                        default:
                            break;
                    }
                }
                catch (e)
                {
                    throw new IncompleteMessageError<Stanzas>(results, chunks)
                }
            }
        }
        return results;
    },

    send(data, self)
    {
        function attrs(obj: any)
        {
            let s = '';
            if (!obj) return s;
            for (const k of Object.keys(obj))
            {
                const v = obj[k];
                if (v == null) continue;
                s += ` ${k}="${String(v).replace(/"/g, '&quot;')}"`;
            }
            return s;
        }

        // Helper function to serialize XML objects back to strings
        function serializeXmlObject(tagName: string, obj: any, xmlns?: string): string
        {
            if (!obj) return '';

            let xml = `<${tagName}`;
            if (xmlns) xml += ` xmlns='${xmlns}'`;

            // Add attributes
            if (obj['@'])
            {
                xml += attrs(obj['@']);
            }
            const objEntries = Object.entries(obj);
            xml += attrs(Object.fromEntries(objEntries.filter(e => e[0].startsWith('@_')).map(e => [e[0].substring(2), e[1]])));

            // Check if there's text content
            const hasChildren = Object.keys(obj).some(k => k !== '@' && k !== '#text' && !k.startsWith('@_'));
            const text = obj['#text'] || '';

            if (!hasChildren && !text)
            {
                return xml + '/>';
            }

            xml += '>';

            // Add child elements
            for (const [key, value] of Object.entries(obj))
            {
                if (key.startsWith('@_') || key === '#text' || key === '@')
                    continue;

                if (Array.isArray(value))
                {
                    for (const item of value)
                    {
                        xml += serializeXmlObject(key, item);
                    }
                }
                else if (typeof value === 'object' && value !== null)
                {
                    xml += serializeXmlObject(key, value);
                }
                else
                {
                    xml += `<${key}>${String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</${key}>`;
                }
            }

            if (text) xml += text;
            xml += `</${tagName}>`;

            return xml;
        }

        let xml = '';
        const stanza = data as Stanzas;

        switch (stanza.type)
        {
            case 'stream:stream':
                // Stream start
                const streamAttrs: Record<string, any> = {
                    'xmlns:stream': 'http://etherx.jabber.org/streams',
                    'xmlns': 'jabber:client',
                    'version': '1.0'
                };
                if (stanza.to) streamAttrs['to'] = stanza.to;
                if (stanza.from) streamAttrs['from'] = stanza.from;
                if (stanza.id) streamAttrs['id'] = stanza.id;

                xml = `<?xml version='1.0'?><stream:stream${attrs(streamAttrs)}>`;
                break;
            case 'auth':
                // Auth stanza
                const authAttrs: Record<string, any> = {
                    'xmlns': 'urn:ietf:params:xml:ns:xmpp-sasl'
                };
                if (stanza.mechanism) authAttrs['mechanism'] = stanza.mechanism;

                const authData = stanza.data || '';
                xml = `<auth${attrs(authAttrs)}>${authData}</auth>`;
                break;
            case 'success':
                // Success stanza
                xml = `<success xmlns='urn:ietf:params:xml:ns:xmpp-sasl'/>`;
                break;
            case 'get':
            case 'set':
            case 'result':
            case 'error':
                // IQ stanza
                const iqAttrs: Record<string, any> = {
                    'xmlns': 'jabber:client',
                    'type': stanza.type
                };
                if (stanza['id']) iqAttrs['id'] = stanza['id'];
                if (stanza['from']) iqAttrs['from'] = stanza['from'];
                if (stanza['to']) iqAttrs['to'] = stanza['to'];

                let iqContent = '';
                if (stanza.type == 'set' || stanza.type == 'get')
                {
                    // Add bind payload
                    if (stanza.bind && !stanza.bind['@_xmlns'] && !stanza.bind['@']?.xmlns)
                        stanza.bind['@_xmlns'] = 'urn:ietf:params:xml:ns:xmpp-bind';

                    // Add session payload
                    if (stanza.session)
                        stanza.session['@_xmlns'] = 'urn:ietf:params:xml:ns:xmpp-session';


                    Object.entries(stanza).map(e =>
                    {
                        if (e[0] === 'type' || e[0] === 'id' || e[0] === 'from' || e[0] === 'to')
                            return;

                        iqContent += serializeXmlObject(e[0], e[1], xmlnsMapping[e[0]]);
                    })
                }

                xml = `<iq${attrs(iqAttrs)}>${iqContent}</iq>`;
                break;
            case 'message':
                if (stanza.from !== undefined)
                {
                    // Message
                    const msgAttrs: Record<string, any> = {
                        'xmlns': 'jabber:client'
                    };
                    if ((stanza as Message).id) msgAttrs['id'] = (stanza as Message).id;
                    if ((stanza as Message).from) msgAttrs['from'] = (stanza as Message).from;
                    if ((stanza as Message).to) msgAttrs['to'] = (stanza as Message).to;

                    xml = `<message${attrs(msgAttrs)}></message>`;
                }
                break;
            case 'presence':
                // Presence
                xml = `<presence xmlns='jabber:client'/>`;
            default:
                console.error('unknown stanza: %o', data);
                return; // unknown stanza type
        }
        console.debug('sending: \n' + xml);

        return [xml];
    }

};
export class Jabber extends SocketProtocolAdapter<Stanzas>
{
    constructor(socket: SocketAdapter)
    {
        super(LongMessageProtocolTransformer(jabber), socket);
    }

    public async dialog(stanza: StreamStart): Promise<StreamFeatures>
    public async dialog(stanza: IQ): Promise<IQResult>
    public async dialog(stanza: Stanzas): Promise<Stanzas>
    public async dialog(stanza: Stanzas)
    {
        switch (stanza.type)
        {
            case 'message':
            case 'error':
            case 'presence':
            case 'stream:features':
            case 'success':
                return this.send(stanza);
            case 'auth':
                return new Promise<Success>((resolve, reject) =>
                {
                    const sub = this.on('message', st =>
                    {
                        if (st.type == 'success')
                        {
                            sub();
                            resolve(st);
                        }
                        if (st.type == 'error')
                        {
                            sub();
                            reject(st);
                        }
                    });
                    this.send(stanza);
                });
            case 'get':
            case 'set':
                if (!stanza.id)
                    stanza.id = crypto.randomUUID();
                return new Promise<Stanzas>((resolve, reject) =>
                {
                    const sub = this.on('message', st =>
                    {
                        if ((st.type == 'result' || st.type == 'success') && st.id == stanza.id)
                        {
                            sub();
                            resolve(st);
                        }
                        if (st.type == 'error' && st.id == stanza.id)
                        {
                            sub();
                            reject(st);
                        }
                    });
                    this.send(stanza);
                });
            case 'stream:stream':
                return new Promise<Stanzas>((resolve, reject) =>
                {
                    const sub = this.on('message', st =>
                    {
                        if (st.type == 'stream:features')
                        {
                            sub();
                            resolve(st);
                        }
                    });
                    this.send(stanza);
                });
            default:
                throw new Error('unsupported stanza: ' + JSON.stringify(stanza, null, 4));
        }
    }
}
import { eachAsync, Http, toCamelCase, toPascalCase, toSnakeCase } from '@akala/core'
import { XMLParser } from 'fast-xml-parser';
import { FileGenerator } from '@akala/commands'
import { pathToFileURL } from 'url'

const GITHUB_API_URL = 'https://api.github.com/repos/project-chip/connectedhomeip/contents/data_model/1.5/clusters';
const GITHUB_API_URL_GLOBAL = 'https://api.github.com/repos/project-chip/connectedhomeip/contents/data_model/1.5/globals';

export default async function generateFromZap(http: Http, signal: AbortSignal, folder: string, version: string = 'master')
{
    if (!folder.endsWith('/'))
        folder += '/'

    const folderURL = new URL(folder, pathToFileURL(process.cwd()) + '/');

    const { output } = await FileGenerator.outputHelper(folderURL.toString(), 'clusters-index.ts', true);

    const clusterIds: Record<string, Record<string, number>> = {};

    const jsonGlobals = await http.getJSON<{ name: string, download_url: string }[]>(GITHUB_API_URL_GLOBAL)//, new URLSearchParams({ ref: version }));
    // 1. Fetch the list of files in the folder
    for (const file of jsonGlobals)
    {
        if (!file.name.endsWith('.xml'))
            continue;

        file.name = 'global-' + file.name;
        // console.log(file)
        // 2. Fetch the content of each XML file
        const fileRes = await http.call({ url: file.download_url, type: 'xml' });
        if (!fileRes.ok)
        {
            console.warn(`Failed to fetch ${file.name}`);
            continue;
        }
        const xmlContent = await fileRes.text();

        // 3. Parse the XML content
        let parsedXml: { enums: { enum: XmlCluster['dataTypes']['enum'] } }
            | { bitmaps: { bitmap: XmlCluster['dataTypes']['bitmap'] } }
            | { structs: { struct: XmlCluster['dataTypes']['struct'] } }
            | { typeDefs: { number: XmlCluster['dataTypes']['number'] } }
            ;
        try
        {
            parsedXml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@', allowBooleanAttributes: true }).parse(xmlContent);
        } catch (e)
        {
            console.warn(`Failed to parse XML for ${file.name}:`, e);
            continue;
        }

        signal.throwIfAborted();

        // 4. Generate TypeScript code from parsed XML
        if ('enums' in parsedXml)
            if (!Array.isArray(parsedXml.enums.enum))
                await generateTypescriptFromXml(folderURL, { dataTypes: { enum: [parsedXml.enums.enum] } }, file.name, signal);
            else
                await generateTypescriptFromXml(folderURL, { dataTypes: { enum: parsedXml.enums.enum } }, file.name, signal);
        else if ('bitmaps' in parsedXml)
            if (!Array.isArray(parsedXml.bitmaps.bitmap))
                await generateTypescriptFromXml(folderURL, { dataTypes: { bitmap: [parsedXml.bitmaps.bitmap] } }, file.name, signal);
            else
                await generateTypescriptFromXml(folderURL, { dataTypes: { bitmap: parsedXml.bitmaps.bitmap } }, file.name, signal);
        else if ('structs' in parsedXml)
            if (!Array.isArray(parsedXml.structs.struct))
                await generateTypescriptFromXml(folderURL, { dataTypes: { struct: [parsedXml.structs.struct] } }, file.name, signal);
            else
                await generateTypescriptFromXml(folderURL, { dataTypes: { struct: parsedXml.structs.struct } }, file.name, signal);
        else if ('typeDefs' in parsedXml)
            if (!Array.isArray(parsedXml.typeDefs.number))
                await generateTypescriptFromXml(folderURL, { dataTypes: { number: [parsedXml.typeDefs.number] } }, file.name, signal);
            else
                await generateTypescriptFromXml(folderURL, { dataTypes: { number: parsedXml.typeDefs.number } }, file.name, signal);
        else
            continue;
        const importName = validTSIdentifier(toCamelCase(file.name.replace(/\.xml$/, '')));

        await output.write(`import * as ${importName} from "./${file.name.replace(/\.xml$/, '.js')}";
export { ${importName} };`);
    }

    const json = await http.getJSON<{ name: string, download_url: string }[]>(GITHUB_API_URL)//, new URLSearchParams({ ref: version }));
    // 1. Fetch the list of files in the folder
    for (const file of json)
    {
        if (!file.name.endsWith('.xml'))
            continue;
        // console.log(file)
        // 2. Fetch the content of each XML file
        const fileRes = await http.call({ url: file.download_url, type: 'xml' });
        if (!fileRes.ok)
        {
            console.warn(`Failed to fetch ${file.name}`);
            continue;
        }
        const xmlContent = await fileRes.text();

        // 3. Parse the XML content
        let parsedXml: XmlCluster;
        try
        {
            parsedXml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@', allowBooleanAttributes: true }).parse(xmlContent).cluster;
        } catch (e)
        {
            console.warn(`Failed to parse XML for ${file.name}:`, e);
            continue;
        }

        if (parsedXml.clusterIds?.clusterId && !Array.isArray(parsedXml.clusterIds.clusterId))
            parsedXml.clusterIds.clusterId = [parsedXml.clusterIds.clusterId];
        else if (!parsedXml.clusterIds && parsedXml['@id'] && parsedXml['@name'])
            parsedXml.clusterIds = { clusterId: [{ '@id': parsedXml['@id'], '@name': parsedXml['@name'] }] };
        if (parsedXml.dataTypes?.number && !Array.isArray(parsedXml.dataTypes.number))
            parsedXml.dataTypes.number = [parsedXml.dataTypes.number];
        if (parsedXml.dataTypes?.enum && !Array.isArray(parsedXml.dataTypes.enum))
            parsedXml.dataTypes.enum = [parsedXml.dataTypes.enum];
        if (parsedXml.dataTypes?.struct && !Array.isArray(parsedXml.dataTypes.struct))
            parsedXml.dataTypes.struct = [parsedXml.dataTypes.struct];
        if (parsedXml.dataTypes?.bitmap && !Array.isArray(parsedXml.dataTypes.bitmap))
            parsedXml.dataTypes.bitmap = [parsedXml.dataTypes.bitmap];

        signal.throwIfAborted();

        // 4. Generate TypeScript code from parsed XML
        await generateTypescriptFromXml(folderURL, parsedXml, file.name, signal);

        const importName = validTSIdentifier(toCamelCase(file.name.replace(/\.xml$/, '')));

        if (parsedXml['@name'] && !isNaN(Number(parsedXml['@id'])))
            clusterIds[importName] = { [parsedXml['@name']]: Number(parsedXml['@id']) };
        if (Array.isArray(parsedXml.clusterIds?.clusterId))
            clusterIds[importName] = Object.fromEntries(parsedXml.clusterIds.clusterId.map(c => [c['@name'], Number(c['@id'])] as const).filter(([_, id]) => !isNaN(id)));


        await output.write(`import * as ${importName} from "./${file.name.replace(/\.xml$/, '.js')}";
export { ${importName} };`);
    }

    await output.write('\n\nexport enum ClusterIds {')
    for (const name in clusterIds)
        await eachAsync(clusterIds[name], (id, c) => output.write(`\n\t${validTSIdentifier(toPascalCase(c))} = ${id},`));
    await output.write('\n}')


    await output.write('\n\nexport type ClusterIdMap = {')
    for (const name in clusterIds)
        await eachAsync(clusterIds[name], (id, c) => output.write(`\n\t[ClusterIds.${validTSIdentifier(toPascalCase(c))}]: ${name}.${validTSIdentifier(toPascalCase(c))},`));
    await output.write('\n}')

    await output.write('\n\nexport type ClusterMap = {')
    for (const name in clusterIds)
        await eachAsync(clusterIds[name], (_id, c) => output.write(`\n\t${validTSIdentifier(toCamelCase(c))}: ${name}.${validTSIdentifier(toPascalCase(c))},`));
    await output.write('\n}')

    await output.write('\n\nexport const ClusterMap = {')
    for (const name in clusterIds)
        await eachAsync(clusterIds[name], (id, c) => output.write(`\n\t[${id}]: ${name}.${validTSIdentifier(toCamelCase(c))},`));
    await output.write('\n}')

    await output.write('\n\nexport enum ClusterIdNames {')
    for (const name in clusterIds)
        await eachAsync(clusterIds[name], (id, c) => output.write(`\n\t${validTSIdentifier(toCamelCase(c))} = ClusterIds.${validTSIdentifier(toPascalCase(c))},`));
    await output.write('\n}')

    await output.write('\n\nexport type ReverseClusterIdNames = {')
    for (const name in clusterIds)
        await eachAsync(clusterIds[name], (id, c) => output.write(`\n\t[${id}]: '${validTSIdentifier(toCamelCase(c))}',`));
    await output.write('\n}')

    await output.close();

}

type XmlCluster = {
    '@id'?: string;
    '@name'?: string;
    clusterIds?: { clusterId?: { '@id': string, '@name': string }[] }
    dataTypes: {
        number?: Array<{ '@name': string, '@type': string }>;
        enum?: Array<{
            '@name': string;
            '@type': string;
            cluster?: {
                '@code': string;
            };
            item: Array<{
                '@name'?: string;
                '@value'?: string;
                '@apiMaturity'?: string;
            }>;
        }>;
        struct?: Array<{
            '@name': string;
            cluster?: {
                '@code': string;
            };
            field: Array<{
                '@fieldId'?: string;
                '@name'?: string;
                '@optional'?: 'true';
                '@type': string;
                array?: 'true';
                length?: string;
                mandatoryConform?: {};
            }>;
        }>;
        bitmap?: Array<{
            '@name': string;
            cluster?: {
                '@code': string;
            };
            bitfield: Array<{
                '@bit'?: string;
                '@name'?: string;
                '@summary'?: string;
                '@from': number;
                '@to': number;
            }>;
        }>;
    };
    features?: {
        feature: Array<{
            '@bit': string;
            '@code': string;
            '@name': string;
            '@summary': string;
            '@apiMaturity'?: string;
            provisionalConform?: any;
        }>;
    };
    attributes?: {
        attribute?: Array<{
            '@side'?: string;
            '@code'?: string;
            '@name'?: string;
            '@define'?: string;
            '@type': string;
            '@writable'?: string;
            '@default'?: string;
            '@min'?: string;
            '@max'?: string;
            '@length'?: string;
            '@minLength'?: string;
            '@optional'?: 'true';
            '@apiMaturity'?: string;
            access?: {
                '@op'?: string;
                '@privilege'?: string;
            };
            mandatoryConform?: {};
            optionalConform?: { feature: { '@name': string }, orTerm: { feature: { '@name': string }[] } };
            otherwiseConform?: any;
        }>
    };
    commands?: {
        command?: Array<{
            '@source'?: string;
            '@code'?: string;
            '@name'?: string;
            '@optional'?: 'true';
            '@response'?: string;
            '@cli'?: string;
            '@disableDefaultResponse'?: string;
            '@isFabricScoped'?: string;
            '@apiMaturity'?: string;
            mandatoryConform?: '' | {};
            optionalConform?: { feature: { '@name': string }, orTerm: { feature: { '@name': string }[] } };
            otherwiseConform?: { feature: { '@name': string }, orTerm: { feature: { '@name': string }[] } };
            description?: string;
            field?: Array<{
                '@id'?: string;
                '@name'?: string;
                '@type': string;
                '@default'?: string;
                '@min'?: string;
                '@max'?: string;
                '@array'?: 'true';
                '@length'?: string;
                '@minLength'?: string;
                '@apiMaturity'?: string;
            }>;
            access?: {
                '@op'?: string;
                '@privilege'?: string;
            };
        }>;
    };
    events?: {
        event?: Array<{
            '@side'?: string;
            '@code'?: string;
            '@priority'?: string;
            '@name'?: string;
            description?: string;
            field?: Array<{
                '@id'?: string;
                '@name'?: string;
                '@type': string;
                '@min'?: string;
                '@max'?: string;
            }>;
        }>;
    };
};

function mapType(x: { '@type': string, '@array'?: 'true', entry?: { '@type': string }, '@entryType'?: string }, knownTypes?: string[])
{
    if (knownTypes?.includes(x['@type']))
        return x['@type'];

    if (x['@type'].match(/^[A-Z_\d]+$/))
        x['@type'] = x['@type'].toLowerCase();

    if (x['@array'])
        return mapType({ '@type': 'array', '@entryType': x['@type'] }, knownTypes);

    switch (x['@type'])
    {
        case 'bool':
            return 'boolean';
        case 'uint8':
        case 'uint16':
        case 'uint24':
        case 'uint32':
        case 'int8u':
        case 'int16u':
        case 'int24u':
        case 'int32u':
        case 'int8s':
        case 'int16s':
        case 'int24s':
        case 'int32s':
        case 'int8':
        case 'int16':
        case 'int24':
        case 'int32':
        case 'single':
        case 'double':
        case 'percent':
        case 'fabric-idx':
        case 'fabric-id':
        case 'vendor-id':
        case 'attrib-id':
        case 'attribute-id':
        case 'message-id':
        case 'enum8':
        case 'enum16':
        case 'power-mVA':
        case 'power-mVAR':
        case 'energy-mVAh':
        case 'energy-mVARh':
        case 'status':
        case 'money':
        case 'epoch-s':
        case 'elapsed-s':
        case 'endpoint-no':
        case 'endpoint-id':
        case 'devtype-id':
        case 'group-id':
        case 'power-mW':
        case 'energy-mWh':
        case 'amperage-mA':
        case 'voltage-mV':
        case 'systime-ms':
        case 'epoch-us':
        case 'ipv4adr':
        case 'percent100ths':
        case 'temperature':
        case 'int8s':
        case 'systime-us':
        case 'systemtime-us':
        case 'posix-ms':
        case 'tag':
        case 'namespace':
            return 'number';
        case 'map16':
            return 'number[]';
        case 'uint40':
        case 'uint48':
        case 'uint56':
        case 'uint64':
        case 'int40u':
        case 'int48u':
        case 'int56u':
        case 'int64u':
        case 'int40s':
        case 'int48s':
        case 'int56s':
        case 'int64s':
        case 'int40':
        case 'int48':
        case 'int56':
        case 'int64':
        case 'ipv6pre':
        case 'ipv6adr':
        case 'hwadr':
        case 'bitmap16':
            return ('bigint');
        case 'node-id':
        case 'subject-id':
        case 'char_string':
        case 'CHAR_STRING':
        case 'long_char_string':
        case 'LONG_CHAR_STRING':
        case 'string':
            return ('string');
        case 'octstr':
        case 'octet_string':
        case 'long_octet_string':
            return 'import ("@akala/core").IsomorphicBuffer';
        case 'cluster-id':
            return 'import ("./clusters-index.js").ClusterIds'
        case 'list':
        case 'array':
        case 'ARRAY':
            return `readonly ${mapType(x.entry || { '@type': x['@entryType'] }, knownTypes)}[]`;
        case 'struct':
            return '{}'
        case 'ModeOptionStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./mode-base-cluster.js").' + x['@type'];
        case 'TestGlobalEnum':
        case 'StreamUsageEnum':
        case 'MeasurementTypeEnum':
        case 'PowerThresholdSourceEnum':
        case 'TariffPriceTypeEnum':
        case 'ThreeLevelAutoEnum':
        case 'TariffUnitEnum':
        case 'WebRTCEndReasonEnum':
        case 'AtomicRequestTypeEnum':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./global-Enums.js").' + x['@type'];
        case 'WebRTCSessionID':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./global-TypeDefs.js").' + x['@type'];
        case 'MeasurementAccuracyStruct':
        case 'TestGlobalStruct':
        case 'LocationDescriptorStruct':
        case 'PowerThresholdStruct':
        case 'CurrencyStruct':
        case 'ViewportStruct':
        case 'WebRTCSessionStruct':
        case 'ICEServerStruct':
        case 'ICECandidateStruct':
        case 'AtomicAttributeStatusStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./global-Structs.js").' + x['@type'];
        case 'LabelStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./Label-Cluster.js").' + x['@type'];
        case 'LandmarkTag':
        case 'RelativePositionTag':
        case 'AreaTypeTag':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./semantic-tag-namespace-enums.js").' + x['@type'];
        case 'OperationalStateStruct':
        case 'ErrorStateStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./operational-state-cluster.js").' + x['@type'];
        case 'ApplicationStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ApplicationBasic.js").' + x['@type'];
        case 'TestGlobalBitmap':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./global-Bitmaps.js").' + x['@type'];
        case 'ZoneID':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ZoneManagement.js").' + x['@type'];
        case 'AccessControlEntryStruct':
        case 'AccessControlEntryPrivilegeEnum':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ACL-Cluster.js").' + x['@type'];
        case 'TargetStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./Binding-Cluster.js").' + x['@type'];
        case 'CapabilityMinimaStruct':
        case 'ProductAppearanceStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./basic-information-cluster.js").' + x['@type'];
        case 'CharacteristicEnum':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./MediaPlayback.js").' + x['@type'];
        case 'GroupKeySetStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./Group-Key-Management-Cluster.js").' + x['@type'];

        case 'AdditionalInfoStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ContentLauncher.js").' + x['@type'];
        case 'VideoStreamID':
        case 'AudioStreamID':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./CameraAVStreamManagement.js").' + x['@type'];
        case 'DeviceTypeStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./Descriptor-Cluster.js").' + x['@type'];
        case 'SemanticTagStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ModeSelect.js").SemanticTagStruct';
        case 'SemanticTagStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ModeSelect.js").SemanticTagStruct';
        case 'tlscaid':
        case 'tlsccdid':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./TLSCertificateManagement.js").' + x['@type'].toUpperCase();
        case 'TLSEndpointID':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./TLSClientManagement.js").' + x['@type'];
        default:
            if (!knownTypes || knownTypes.includes(x['@type']))
                return x['@type'];
            return x['@type'];
            throw new Error(x['@type'] + ' is not supported and not listed in ' + knownTypes);
    }
}

function isMandatory(field: { mandatoryConform?: any, optionalConform?: any })
{
    if (field.mandatoryConform === '')
        return true;
    return false;
    if (field.mandatoryConform?.andTerm)
        return false;
    else if (field.mandatoryConform?.feature)
        return false;
    return true;
}

function validTSIdentifier(s: string)
{
    const result = s.replace(/^\d/, m => '_' + m).replace(/[-\/\.]/g, '_');
    switch (result)
    {
        case 'switch':
            return 'switch_';
        default:
            return result;
    }
}

async function generateTypescriptFromXml(folderURL: URL, parsedXml: XmlCluster, fileName: string, signal: AbortSignal)
{
    const { output } = await FileGenerator.outputHelper(folderURL.toString(), fileName.replace('.xml', '.ts'), true);

    await output.write(`// This file is generated from ${fileName} - do not edit it directly\n`);
    await output.write(`// Generated on ${new Date().toISOString()}\n\n`);
    await output.write(`import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';\n`);

    const knownTypes = [];
    console.log(fileName);
    if (parsedXml.dataTypes?.number?.length)
        await eachAsync(parsedXml.dataTypes.number, async x =>
        {
            const processedKeys = new Map<string, number>();

            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport type ${validTSIdentifier(x['@name'])} = number;`);
            await output.write(`\n`);
        }, true)

    if (parsedXml.dataTypes?.enum?.length)
        await eachAsync(parsedXml.dataTypes.enum, async x =>
        {
            const processedKeys = new Map<string, number>();

            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport enum ${validTSIdentifier(x['@name'])} {`);
            if (!Array.isArray(x.item))
                x.item = [x.item]
            for (const element of x.item)
            {
                if (!processedKeys.has(element['@name']))
                {
                    processedKeys.set(element['@name'], 1);

                    if (/^\d/.test(element['@name']))
                        await output.write(`\n\t_${validTSIdentifier(toPascalCase(element['@name']))} = ${Number(element['@value'])},`);
                    else
                        await output.write(`\n\t${validTSIdentifier(toPascalCase(element['@name']))} = ${Number(element['@value'])},`);
                }
                else
                {
                    const suffix = processedKeys.get(element['@name'])! + 1;
                    processedKeys.set(element['@name'], suffix);

                    if (/^\d/.test(element['@name']))
                        await output.write(`\n\t_${validTSIdentifier(toPascalCase(element['@name']))}_${suffix} = ${Number(element['@value'])},`);
                    else
                        await output.write(`\n\t${validTSIdentifier(toPascalCase(element['@name']))}_${suffix} = ${Number(element['@value'])},`);
                }
            }
            await output.write(`\n}`);
        }, true)

    if (parsedXml.dataTypes?.bitmap?.length)
        await eachAsync(parsedXml.dataTypes.bitmap, async x =>
        {
            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport enum ${validTSIdentifier(x['@name'])} {`);
            await output.write(`\n\t__NotSet = 0,`);

            if (x.bitfield)
            {
                if (!Array.isArray(x.bitfield))
                    x.bitfield = [x.bitfield]
                for (const field of x.bitfield)
                    if (field['@name'] !== 'Reserved for future use')
                    {
                        if (field['@summary'])
                        {
                            await output.write('\n\t\t/** ')
                            await output.write(field['@summary'])
                            await output.write(' */')
                        }
                        if (field['@bit'])
                            await output.write(`\n\t${validTSIdentifier(field['@name'])}= 1<<${field['@bit']},`);
                        else if (field['@from'] !== undefined && field['@to'] !== undefined)
                        {
                            // handle ranges: compute mask from from/to inclusive
                            const from = Number(field['@from']);
                            const to = Number(field['@to']);
                            const width = to - from + 1;
                            // compute using BigInt for correctness, then format as literal
                            const maskBig = ((BigInt(1) << BigInt(width)) - BigInt(1)) << BigInt(from);
                            // prefer hex literal for readability
                            const hex = '0x' + maskBig.toString(16);
                            // if mask fits into JS safe integer, emit as number, otherwise emit bigint literal (may require lib support)
                            if (maskBig <= BigInt(Number.MAX_SAFE_INTEGER))
                                await output.write(`\n\t${validTSIdentifier(field['@name'])}= ${hex},`);
                            else
                                await output.write(`\n\t${validTSIdentifier(field['@name'])}= ${hex}n,`);
                        }
                        else
                        {
                            // fallback
                            await output.write(`\n\t${validTSIdentifier(field['@name'])}= 0,`);
                        }
                    }
            }
            await output.write(`\n}`);
        }, true)
    if (parsedXml.dataTypes?.struct?.length)
        await eachAsync(parsedXml.dataTypes.struct, async x =>
        {
            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport interface ${validTSIdentifier(x['@name'])} {`);
            if (x.field)
            {
                if (!Array.isArray(x.field))
                    x.field = [x.field];
                for (const element of x.field)
                    if (element['@type'])
                        await output.write(`\n\t${validTSIdentifier(element['@name'])}${!isMandatory(element) ? '?' : ''}:${mapType(element, knownTypes)},`);
            }
            await output.write(`\n}`);
        }, true)

    // await eachAsync(parsedXml.configurator.cluster, async cluster =>
    // {
    signal.throwIfAborted();
    // if (parsedXml.description)
    //     await output.write(`\n\n/**\n * ${parsedXml.description}\n */`)
    if (parsedXml['@name'])
    {
        const clusterInterfaceName = validTSIdentifier(toPascalCase(parsedXml['@name']));

        if (Array.isArray(parsedXml.clusterIds?.clusterId))
            for (const cluster of parsedXml.clusterIds?.clusterId)
                await output.write(`\n\nexport type ${validTSIdentifier(toPascalCase(cluster['@name']))} = ${clusterInterfaceName} & { id: ${cluster['@id']}};`)

        await output.write(`\n\nexport interface ${clusterInterfaceName} {`);

        if (parsedXml.attributes?.attribute && !Array.isArray(parsedXml.attributes.attribute))
            parsedXml.attributes.attribute = [parsedXml.attributes.attribute];

        if (parsedXml.features?.feature && !Array.isArray(parsedXml.features.feature))
            parsedXml.features.feature = [parsedXml.features.feature];

        if (parsedXml['@id'])
            await output.write('\n\id: ' + parsedXml['@id'] + ';');

        const processedAttributes = new Set<string>();

        await output.write('\n\tattributes: {')
        if (parsedXml.attributes?.attribute?.length)
            await eachAsync(parsedXml.attributes.attribute, async att =>
            {
                if (!att['@type'])
                    return;
                if (processedAttributes.has(att['@name'] || att['#text'] || att['@define']))
                    return;
                if (att['@name'] || att['#text'] || att['@define'])
                    processedAttributes.add(att['@name'] || att['#text'] || att['@define']);
                await output.write('\n\t\t')
                if (att['@writable'] !== 'true')
                    await output.write('readonly ');
                await output.write(att['@name'] || att['#text'] || att['@define'])
                if (!isMandatory(att))
                    await output.write('?:');
                else
                    await output.write(':');

                await output.write(mapType(att, knownTypes));
            }, true);
        if (parsedXml.features?.feature?.length)
            await eachAsync(parsedXml.features.feature, async ft =>
            {
                if (ft['@summary'])
                {
                    await output.write('\n\t\t/** ')
                    await output.write(ft['@summary'])
                    await output.write(' */')
                }
                await output.write('\n\t\treadonly Supports');
                await output.write(validTSIdentifier(toPascalCase(ft['@name'])))
                await output.write(': boolean');
            }, true);
        await output.write('\n}')

        if (parsedXml.commands?.command && !Array.isArray(parsedXml.commands.command))
            parsedXml.commands.command = [parsedXml.commands.command];

        await output.write('\n\tcommands: {')
        if (parsedXml.commands?.command?.length)
            await eachAsync(parsedXml.commands.command, async cmd =>
            {
                if (cmd['@direction'] === 'commandToServer')
                {
                    if (cmd.description)
                    {
                        await output.write('\n\t\t/** ')
                        await output.write(cmd.description)
                        await output.write(' */')
                    }
                    await output.write(`\n\t\t${validTSIdentifier(cmd['@name'])}${!isMandatory(cmd) ? '?' : ''}: {
\t\t\tinputparams: readonly [`);

                    if (cmd.field && !Array.isArray(cmd.field))
                        cmd.field = [cmd.field];

                    if (cmd.field?.length)
                        await eachAsync(cmd.field, async f => 
                        {
                            if (f['@type'])
                                await output.write(`\n\t\t\t\t${f['@name']}: ${mapType(f, knownTypes)}, `)
                        }, true);

                    await output.write(`\n\t\t\t],\n\t\t\t outputparams: readonly [`)

                    if (cmd['@response'] && cmd['@response'] !== 'Y' && cmd['@response'] !== 'N')
                    {
                        const response = parsedXml.commands.command.find(c => c['@name'] === cmd['@response']);
                        if (!response)
                            throw new Error('cannout find ' + cmd['@response']);

                        if (response.field && !Array.isArray(response.field))
                            response.field = [response.field];

                        if (response.field)
                            await eachAsync(response.field, async f => 
                            {
                                await output.write(`\n\t\t\t\t${f['@name']}: ${mapType(f, knownTypes)}, `)
                            }, true);
                    }

                    await output.write(`]
            }`);
                }
            }, true)
        await output.write('\n}')



        if (parsedXml.events?.event && !Array.isArray(parsedXml.events.event))
            parsedXml.events.event = [parsedXml.events.event];

        await output.write('\n\tevents: {')
        if (parsedXml.events?.event?.length)
            await eachAsync(parsedXml.events.event, async ev =>
            {
                // if (ev['@side'] === 'server' || ev['@side'] === 'both')
                // {
                await output.write(`\n\t\t${validTSIdentifier(ev['@name'])}${ev['@optional'] === 'true' ? '?' : ''}: [
\t\t\t`);

                if (ev.field && !Array.isArray(ev.field))
                    ev.field = [ev.field];

                if (ev.field?.length)
                    await eachAsync(ev.field, async f => 
                    {
                        await output.write(`\n\t\t\t${f['@name']}: ${mapType(f, knownTypes)}, `)
                    }, true);

                await output.write(`];`);
                // }
            }, true)

        await output.write(`\n\t}`)
        await output.write(`\n}`)

        for (const cluster of parsedXml.clusterIds?.clusterId)
        {
            await output.write(`\n\nexport const ${validTSIdentifier(toCamelCase(cluster['@name']))}: ClusterDefinition<${validTSIdentifier(toPascalCase(cluster['@name']))}> = {`);

            await output.write('\n\id: ' + cluster['@id'] + ',');
            await output.write('\n\tattributes: [')
            if (parsedXml.attributes?.attribute?.length)
                await eachAsync(parsedXml.attributes.attribute, async att =>
                {
                    if (!att['@type'])
                        return;
                    await output.write('\n\t\t')

                    await output.write(JSON.stringify(att['@name'] || att['#text'] || att['@define']))
                    await output.write(',');
                }, true);
            if (parsedXml.features?.feature?.length)
                await eachAsync(parsedXml.features.feature, async ft =>
                {
                    await output.write('\n\t\t');
                    await output.write(JSON.stringify("Supports" + validTSIdentifier(toPascalCase(ft['@name']))));
                    await output.write(',');
                }, true);
            await output.write('\n\t] as const,')

            if (parsedXml.commands?.command && !Array.isArray(parsedXml.commands.command))
                parsedXml.commands.command = [parsedXml.commands.command];

            await output.write('\n\tcommands: [')
            if (parsedXml.commands?.command?.length)
                await eachAsync(parsedXml.commands.command, async cmd =>
                {
                    if (cmd['@direction'] === 'commandToServer')
                        await output.write(`\n\t\t${JSON.stringify(validTSIdentifier(cmd['@name']))},`);

                }, true)
            await output.write('\n\t] as const,')



            if (parsedXml.events?.event && !Array.isArray(parsedXml.events.event))
                parsedXml.events.event = [parsedXml.events.event];

            await output.write('\n\tevents: [')
            if (parsedXml.events?.event?.length)
                await eachAsync(parsedXml.events.event, async ev =>
                {
                    if (ev['@side'] === 'server' || ev['@side'] === 'both')
                        await output.write(`\n\t\t${JSON.stringify(validTSIdentifier(ev['@name']))},`);
                }, true)

            await output.write(`\n\t] as const`)
            await output.write(`\n}`)

            if (parsedXml['@id'] == cluster['@id'])
                await output.write(`\n\nexport default ${validTSIdentifier(toCamelCase(cluster['@name']))};`);

        }
    }
    await output.close();
}
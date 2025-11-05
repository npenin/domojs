import { eachAsync, Http, toCamelCase, toPascalCase, toSnakeCase } from '@akala/core'
import { XMLParser } from 'fast-xml-parser';
import { FileGenerator } from '@akala/commands'
import { pathToFileURL } from 'url'

const GITHUB_API_URL = 'https://api.github.com/repos/project-chip/connectedhomeip/contents/src/app/zap-templates/zcl/data-model/chip';

export default async function generateFromXml(http: Http, signal: AbortSignal, folder: string, version: string = 'master')
{
    if (!folder.endsWith('/'))
        folder += '/'

    const folderURL = new URL(folder, pathToFileURL(process.cwd()) + '/');

    const { output } = await FileGenerator.outputHelper(folderURL.toString(), 'clusters-index.ts', true);

    const clusterIds: Record<string, Record<string, number>> = {};

    // 1. Fetch the list of files in the folder
    for (const file of await http.getJSON<{ name: string, download_url: string }[]>(GITHUB_API_URL, new URLSearchParams({ ref: version })))
    {
        if (!file.name.endsWith('.xml'))
            continue;

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
            parsedXml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@', allowBooleanAttributes: true }).parse(xmlContent);
        } catch (e)
        {
            console.warn(`Failed to parse XML for ${file.name}:`, e);
            continue;
        }

        if (parsedXml.configurator?.enum && !Array.isArray(parsedXml.configurator.enum))
            parsedXml.configurator.enum = [parsedXml.configurator.enum];
        if (parsedXml.configurator?.struct && !Array.isArray(parsedXml.configurator.struct))
            parsedXml.configurator.struct = [parsedXml.configurator.struct];
        if (parsedXml.configurator?.bitmap && !Array.isArray(parsedXml.configurator.bitmap))
            parsedXml.configurator.bitmap = [parsedXml.configurator.bitmap];
        if (parsedXml.configurator?.cluster && !Array.isArray(parsedXml.configurator.cluster))
            parsedXml.configurator.cluster = [parsedXml.configurator.cluster];

        signal.throwIfAborted();

        // 4. Generate TypeScript code from parsed XML
        await generateTypescriptFromXml(folderURL, parsedXml, file.name, signal);

        const importName = validTSIdentifier(toCamelCase(file.name.replace(/\.xml$/, '')));

        if (parsedXml.configurator.cluster?.length)
            clusterIds[importName] = Object.fromEntries(parsedXml.configurator.cluster?.map(c => [c.name, Number(c.code)]));

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
    configurator: {
        '@xmlns:xsi'?: string;
        '@xsi:noNamespaceSchemaLocation'?: string;
        domain?: {
            '@name'?: string;
        };
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
            item: Array<{
                '@fieldId'?: string;
                '@name'?: string;
                '@optional'?: 'true';
                '@type': string;
                array?: 'true';
                length?: string;
            }>;
        }>;
        bitmap?: Array<{
            '@name': string;
            cluster?: {
                '@code': string;
            };
            field: Array<{
                '@mask'?: string;
                '@name'?: string;
            }>;
        }>;
        cluster: Array<{
            domain?: string;
            name: string;
            code: string;
            define?: string;
            globalAttribute?: {
                '@side'?: string;
                '@code'?: string;
                '@value'?: string;
            };
            description?: string;
            client?: string | {
                '@init'?: string;
                '@tick'?: string;
            };
            server?: string | {
                '@init'?: string;
                '@tick'?: string;
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
                otherwiseConform?: any;
            }>;
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
                description?: string;
                arg?: Array<{
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
                otherwiseConform?: any;
            }>;
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
        }>;
    };
};

function mapType(x: { '@type': string, '@array'?: 'true', entry?: { '@type': string }, '@entryType'?: string }, knownTypes?: string[])
{
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
        case 'fabric_idx':
        case 'fabric_id':
        case 'vendor_id':
        case 'attrib_id':
        case 'attribute_id':
        case 'message-id':
        case 'message_id':
        case 'enum8':
        case 'enum16':
        case 'power_mva':
        case 'power_mvar':
        case 'energy_mvah':
        case 'energy_mvarh':
        case 'status':
        case 'money':
        case 'epoch_s':
        case 'elapsed_s':
        case 'endpoint_no':
        case 'endpoint_id':
        case 'devtype_id':
        case 'group_id':
        case 'power_mw':
        case 'energy_mwh':
        case 'amperage_ma':
        case 'voltage_mv':
        case 'systime_ms':
        case 'epoch_us':
        case 'ipv4adr':
        case 'percent100ths':
        case 'temperature':
        case 'int8s':
        case 'systime_us':
        case 'posix_ms':
            return ('number');
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
        case 'node_id':
        case 'subject_id':
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
        case 'cluster_id':
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
                return 'import("./global-enums.js").' + x['@type'];
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
                return 'import("./global-structs.js").' + x['@type'];
        case 'LabelStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./fixed-label-cluster.js").' + x['@type'];
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
                return 'import("./application-launcher-cluster.js").' + x['@type'];
        case 'TestGlobalBitmap':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./global-bitmaps.js").' + x['@type'];

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
        case 'DeviceTypeStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./Descriptor-Cluster.js").' + x['@type'];
        case 'SemanticTagStruct':
            if (!knownTypes?.includes(x['@type']))
                return 'import("./ModeSelect.js").SemanticTagStruct';
        default:
            if (!knownTypes || knownTypes.includes(x['@type']))
                return x['@type'];
            return x['@type'];
            throw new Error(x['@type'] + ' is not supported and not listed in ' + knownTypes);
    }
}

function getDefault(type: string): string
{
    switch (type)
    {
        case 'bool':
            return 'false';
        case 'number':
            return '0';
        default:
            if (type.endsWith('[]'))
                return '[]';
            return 'null';
    }
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
    if (parsedXml.configurator.enum?.length)
        await eachAsync(parsedXml.configurator.enum, async x =>
        {
            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport enum ${validTSIdentifier(x['@name'])} {`);
            if (!Array.isArray(x.item))
                x.item = [x.item]
            for (const element of x.item)
                if (/^\d/.test(element['@name']))
                    await output.write(`\n\t_${validTSIdentifier(toPascalCase(element['@name']))}= ${Number(element['@value'])},`);
                else
                    await output.write(`\n\t${validTSIdentifier(toPascalCase(element['@name']))}= ${Number(element['@value'])},`);
            await output.write(`\n}`);
        }, true)

    if (parsedXml.configurator.bitmap?.length)
        await eachAsync(parsedXml.configurator.bitmap, async x =>
        {
            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport enum ${validTSIdentifier(x['@name'])} {`);
            if (x.field)
            {
                if (!Array.isArray(x.field))
                    x.field = [x.field]
                for (const element of x.field)
                    if (element['@name'] !== 'Reserved for future use')
                        await output.write(`\n\t${validTSIdentifier(element['@name'])}= ${element['@mask']},`);
            }
            await output.write(`\n}`);
        }, true)
    if (parsedXml.configurator.struct?.length)
        await eachAsync(parsedXml.configurator.struct, async x =>
        {
            signal.throwIfAborted();
            knownTypes.push(x['@name']);
            await output.write(`\n\nexport interface ${validTSIdentifier(x['@name'])} {`);
            if (x.item)
            {
                if (!Array.isArray(x.item))
                    x.item = [x.item];
                for (const element of x.item)
                    await output.write(`\n\t${validTSIdentifier(element['@name'])}${element['@optional'] === 'true' ? '?' : ''}:${mapType(element, knownTypes)},`);
            }
            await output.write(`\n}`);
        }, true)

    if (parsedXml.configurator.cluster?.length)
    {
        await eachAsync(parsedXml.configurator.cluster, async cluster =>
        {
            signal.throwIfAborted();
            if (cluster.description)
                await output.write(`\n\n/**\n * ${cluster.description}\n */`)

            const clusterInterfaceName = validTSIdentifier(toPascalCase(cluster.name));

            await output.write(`\n\nexport interface ${clusterInterfaceName} {`);

            if (cluster.attribute && !Array.isArray(cluster.attribute))
                cluster.attribute = [cluster.attribute];
            if (cluster.features?.feature && !Array.isArray(cluster.features.feature))
                cluster.features.feature = [cluster.features.feature];

            await output.write('\n\id: ' + cluster.code + ';');
            await output.write('\n\tattributes: {')
            if (cluster.attribute?.length)
                await eachAsync(cluster.attribute, async att =>
                {
                    if (!att['@type'])
                        return;
                    await output.write('\n\t\t')
                    if (att['@writable'] !== 'true')
                        await output.write('readonly ');
                    await output.write(att['@name'] || att['#text'] || att['@define'])
                    if (att['@optional'] || att['@isNullable'])
                        await output.write('?:');
                    else
                        await output.write(':');

                    await output.write(mapType(att, knownTypes));
                }, true);
            if (cluster.features?.feature?.length)
                await eachAsync(cluster.features.feature, async ft =>
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

            if (cluster.command && !Array.isArray(cluster.command))
                cluster.command = [cluster.command];

            await output.write('\n\tcommands: {')
            if (cluster.command?.length)
                await eachAsync(cluster.command, async cmd =>
                {
                    if (cmd['@source'] === 'client')
                    {
                        if (cmd.description)
                        {
                            await output.write('\n\t\t/** ')
                            await output.write(cmd.description)
                            await output.write(' */')
                        }
                        await output.write(`\n\t\t${validTSIdentifier(cmd['@name'])}${cmd['@optional'] === 'true' ? '?' : ''}: {
\t\t\tinputparams: readonly [`);

                        if (cmd.arg && !Array.isArray(cmd.arg))
                            cmd.arg = [cmd.arg];

                        if (cmd.arg?.length)
                            await eachAsync(cmd.arg, async f => 
                            {
                                await output.write(`\n\t\t\t\t${f['@name']}: ${mapType(f, knownTypes)}, `)
                            }, true);

                        await output.write(`\n\t\t\t],\n\t\t\t outputparams: readonly [`)

                        if (cmd['@response'])
                        {
                            const response = cluster.command.find(c => c['@name'] === cmd['@response']);
                            if (!response)
                                throw new Error('cannout find ' + cmd['@response']);

                            if (response.arg && !Array.isArray(response.arg))
                                response.arg = [response.arg];

                            await eachAsync(response.arg, async f => 
                            {
                                await output.write(`\n\t\t\t\t${f['@name']}: ${mapType(f, knownTypes)}, `)
                            }, true);
                        }

                        await output.write(`]
            }`);
                    }
                }, true)
            await output.write('\n}')



            if (cluster.event && !Array.isArray(cluster.event))
                cluster.event = [cluster.event];

            await output.write('\n\tevents: {')
            if (cluster.event?.length)
                await eachAsync(cluster.event, async ev =>
                {
                    if (ev['@side'] === 'server' || ev['@side'] === 'both')
                    {
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
                    }
                }, true)

            await output.write(`\n\t}`)
            await output.write(`\n}`)


            await output.write(`\n\nexport const ${validTSIdentifier(toCamelCase(cluster.name))}: ClusterDefinition<${clusterInterfaceName}> = {`);

            await output.write('\n\id: ' + cluster.code + ',');
            await output.write('\n\tattributes: [')
            if (cluster.attribute?.length)
                await eachAsync(cluster.attribute, async att =>
                {
                    if (!att['@type'])
                        return;
                    await output.write('\n\t\t')

                    await output.write(JSON.stringify(att['@name'] || att['#text'] || att['@define']))
                    await output.write(',');
                }, true);
            if (cluster.features?.feature?.length)
                await eachAsync(cluster.features.feature, async ft =>
                {
                    await output.write('\n\t\t');
                    await output.write(JSON.stringify("Supports" + validTSIdentifier(toPascalCase(ft['@name']))));
                    await output.write(',');
                }, true);
            await output.write('\n\t] as const,')

            if (cluster.command && !Array.isArray(cluster.command))
                cluster.command = [cluster.command];

            await output.write('\n\tcommands: [')
            if (cluster.command?.length)
                await eachAsync(cluster.command, async cmd =>
                {
                    if (cmd['@source'] === 'client')
                        await output.write(`\n\t\t${JSON.stringify(validTSIdentifier(cmd['@name']))},`);

                }, true)
            await output.write('\n\t] as const,')



            if (cluster.event && !Array.isArray(cluster.event))
                cluster.event = [cluster.event];

            await output.write('\n\tevents: [')
            if (cluster.event?.length)
                await eachAsync(cluster.event, async ev =>
                {
                    if (ev['@side'] === 'server' || ev['@side'] === 'both')
                        await output.write(`\n\t\t${JSON.stringify(validTSIdentifier(ev['@name']))},`);
                }, true)

            await output.write(`\n\t] as const`)
            await output.write(`\n}`)
        });

        if (parsedXml.configurator.cluster.length == 1)
            await output.write(`\n\nexport default ${validTSIdentifier(toCamelCase(parsedXml.configurator.cluster[0].name))};`);
    }

    await output.close();
}
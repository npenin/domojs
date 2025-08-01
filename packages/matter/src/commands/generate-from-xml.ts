import { eachAsync, Http, toCamelCase, toPascalCase, toSnakeCase } from '@akala/core'
import { XMLParser } from 'fast-xml-parser';
import { FileGenerator } from '@akala/commands'
import { pathToFileURL } from 'url'

const GITHUB_API_URL = 'https://api.github.com/repos/project-chip/connectedhomeip/contents/data_model/1.4.1/device_types';

export default async function generateFromXml(http: Http, signal: AbortSignal, folder: string)
{
    if (!folder.endsWith('/'))
        folder += '/'

    const folderURL = new URL(folder, pathToFileURL(process.cwd()) + '/');

    const { output } = await FileGenerator.outputHelper(folderURL.toString(), 'devicetypes-index.ts', true);
    const { output: sharedOutput } = await FileGenerator.outputHelper(folderURL.toString(), 'devicetypes-shared.ts', true);

    await sharedOutput.write('export enum DeviceTypes {');

    // 1. Fetch the list of files in the folder
    for (const file of await http.getJSON<{ name: string, download_url: string }[]>(GITHUB_API_URL))
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

        if (parsedXml.deviceType.clusters.cluster && !Array.isArray(parsedXml.deviceType.clusters.cluster))
            parsedXml.deviceType.clusters.cluster = [parsedXml.deviceType.clusters.cluster];

        // 4. Generate TypeScript code from parsed XML
        await generateTypescriptFromXml(folderURL, parsedXml, file.name, signal);

        await sharedOutput.write(`\n\t${validTSIdentifier(toPascalCase(parsedXml.deviceType['@name']))} = ${parsedXml.deviceType['@id']},`)

        await output.write(`export {default as ${validTSIdentifier(toPascalCase(parsedXml.deviceType['@name']))} } from "./${file.name.replace(/\.xml$/, '.js')}";\n`);
    }

    await sharedOutput.write('}');

    await output.write('export * from "./devicetypes-shared.js";\n');

    await output.close();
    await sharedOutput.close();
}

type XmlCluster = {
    deviceType: {
        '@id': string;
        '@name': string;
        '@revision': string;
        revisionHistory?: {
            revision: Array<{
                '@revision': string;
                '@summary': string;
            }>;
        };
        classification?: {
            '@class': string;
            '@scope': string;
        };
        conditions?: {
            condition: Array<{
                '@name': string;
                '@summary': string;
            }>;
        };
        clusters: {
            cluster: Array<{
                '@id': string;
                '@name': string;
                '@side': string;
                mandatoryConform?: {
                    condition?: {
                        '@name': string;
                    };
                };
                optionalConform?: Record<string, never>;
                otherwiseConform?: {
                    provisionalConform?: Record<string, never>;
                    optionalConform?: Record<string, never>;
                };
            }>;
        };
    };
};

function validTSIdentifier(s: string)
{
    return s.replace(/^\d/, m => '_' + m).replace(/[-\/\.]/g, '_')
}

async function generateTypescriptFromXml(folderURL: URL, parsedXml: XmlCluster, fileName: string, signal: AbortSignal)
{
    console.log(fileName);
    const { output } = await FileGenerator.outputHelper(folderURL.toString(), fileName.replace('.xml', '.ts'), true);

    await output.write('import { ReverseClusterIdNames, ClusterMap } from "../clusters/clusters-index.js";')
    await output.write('\nimport { Endpoint, MixedClusterMap } from "../../server/clients/Endpoint.js";')
    // await output.write('\nimport { DeviceTypes } from "./devicetypes-shared.js";')

    const exports = validTSIdentifier(toPascalCase(parsedXml.deviceType['@name']));

    await output.write('\n\nexport type MandatoryKeys = ')

    let first = true;

    if (fileName !== 'BaseDeviceType.xml')
    {
        await output.write('import ("./BaseDeviceType.js").MandatoryKeys');
        first = false;
    }

    if (parsedXml.deviceType.clusters.cluster?.length)
        await eachAsync(parsedXml.deviceType.clusters.cluster, async cluster =>
        {
            if (cluster['@side'] == 'server')
            {
                if (fileName == 'BaseDeviceType.xml' && cluster['@name'] == 'Descriptor')
                    return;
                if (first)
                    first = false;
                else
                    await output.write(` | `)
                await output.write(`ReverseClusterIdNames[${cluster['@id']}]`)
            }
        }, true)


    await output.write(`\n\nexport default class DeviceType extends Endpoint<ClusterMap, MandatoryKeys>\n{`);

    if (fileName !== 'BaseDeviceType.xml')
    {
        if (fileName === 'RootNodeDeviceType.xml')
            await output.write(`
   
	constructor(clusters: MixedClusterMap<MandatoryKeys, ClusterMap>)
	{
		super(0, clusters);
	}
`);
        else

            await output.write(`
   
	constructor(id: number, clusters: MixedClusterMap<MandatoryKeys, ClusterMap>)
	{
		super(id, clusters);
	}
`);
    }

    await output.write(`}`);

    await output.close();

    return exports;
}
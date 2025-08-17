import { administratorCommissioningCluster, Binding, BridgeConfiguration, clusterFactory, ClusterIds, generalCommissioningCluster, globalEnums, identifyCluster, MatterClusterIds, registerNode, RootNode, timeFormatLocalizationCluster, timeSynchronizationCluster, unitLocalizationCluster } from '@domojs/devices';
import { State } from '../state.js'
import { Zigate } from '@domojs/zigate-parsers';
import { CliContext } from '@akala/cli';
import { Container } from '@akala/commands';
import app, { SidecarConfiguration } from '@akala/sidecar'
import { ProxyConfiguration } from '@akala/config';
import os from 'os';

var setGateway: (gw: Zigate) => void = null;

export default async function (this: State, context: CliContext<{ debug: boolean }, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, container: Container<void>, signal: AbortSignal)
{
    this.devicesByAddress = {};
    this.devices = {};
    this.logger = context.logger;

    this.gateway = new Promise((resolve) =>
    {
        setGateway = resolve;
    });
    this.setGateway = async (gw: Zigate) =>
    {
        await gw.start(signal, context.options.debug);
        setGateway(gw);
        return gw;
    };

    // await fs.readFile(fileURLToPath(new URL('../../views/device.html', import.meta.url)), 'utf-8').then(newDeviceTemplate =>
    // );

    const self = await app(context);
    const fabric = await registerNode('zigate', self, context.state, context.abort.signal);

    try
    {
        Zigate.listEligibleSerials().then(async serials =>
        {
            if (serials && serials.length)
            {
                for (const serial of serials)
                {

                    const nodeName = serial.replace(/^\/dev\//, '') + '@' + os.hostname();

                    const discriminator = crypto.randomUUID().replace(/-/g, '').substring(0, 16);

                    fabric.endpoints.push(await fabric.newEndpoint(serial,
                        {
                            basicInformation: clusterFactory({
                                id: MatterClusterIds.BasicInformation,
                                VendorName: 'Zigate',
                                VendorID: 1027,
                                NodeLabel: 'Zigate',
                                ProductName: serial,
                                ProductLabel: serial,
                                ProductID: 20577,
                                CapabilityMinima: {
                                    CaseSessionsPerFabric: 1,
                                    SubscriptionsPerFabric: 1
                                },
                                ConfigurationVersion: 1,
                                DataModelRevision: 1,
                                HardwareVersion: 1,
                                HardwareVersionString: '',
                                Location: '',
                                MaxPathsPerInvoke: 1,
                                SoftwareVersion: 1,
                                SoftwareVersionString: '',
                                SpecificationVersion: 142,
                                UniqueID: discriminator
                            }),
                        }
                    ));
                }
            }

            setGateway(await Zigate.getSerial(serials[0]));
        });
    }
    catch (e)
    {
        console.error(e);
    }
    // Object.assign(this, await app(context, fileURLToPath(new URL('../../devicetype-app.json', import.meta.url))));

    // this.deviceServer = await sidecar()['@domojs/devices'];
}
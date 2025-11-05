import { AsyncEventBus, Deferred, delay, ErrorWithStatus, HttpStatusCode } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';
import { Bytes, ChannelType, Duration, Lifespan, Seconds, ServerAddress, ServerAddressUdp, Time, Timestamp } from '@matter/general';
import { CommissionableDevice, CommissionableDeviceIdentifiers, Fabric, MATTER_SERVICE_QNAME, OperationalDevice, Scanner, getCommissionableDeviceQname, getCommissioningModeQname, getDeviceTypeQname, getLongDiscriminatorQname, getOperationalDeviceQname, getShortDiscriminatorQname, getVendorQname } from '@matter/protocol'
import { NodeId, VendorId } from '@matter/types';
import { EndpointProxy } from '@domojs/devices';


type MatterServerRecordWithExpire = ServerAddressUdp & Lifespan;

/** Type for commissionable Device records including Lifespan details. */
type CommissionableDeviceRecordWithExpire = Omit<CommissionableDevice, "addresses"> &
    Lifespan & {
        addresses: Map<string, MatterServerRecordWithExpire>; // Override addresses type to include expiration
        instanceId: string; // instance ID
        SD: number; // Additional Field for Short discriminator
        V?: number; // Additional Field for Vendor ID
        P?: number; // Additional Field for Product ID
    };

class OperationalDeviceProxy implements OperationalDevice, AsyncDisposable
{
    constructor(protected readonly endpoint: EndpointProxy<'fixedLabel'>) { }
    [Symbol.asyncDispose](): PromiseLike<void>
    {
        return this.endpoint[Symbol.asyncDispose]();
    }
    public get VP() { return this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'VP')?.Value }
    public get DN() { return this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'DN')?.Value }
    public get RI() { return this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'RI')?.Value }
    public get PI() { return this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'PI')?.Value }
    public get DT() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'DT')?.Value; if (v) return Number(v); return undefined; }
    public get PH() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'PH')?.Value; if (v) return Number(v); return undefined; }
    public get SII() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'SII')?.Value; if (v) return Duration(v); return undefined; }
    public get SAI() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'SAI')?.Value; if (v) return Duration(v); return undefined; }
    public get SAT() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'SAT')?.Value; if (v) return Duration(v); return undefined; }
    public get T() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'T')?.Value; if (v) return Number(v); return undefined; }
    public get ICD() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'ICD')?.Value; if (v) return Number(v); return undefined; }
    discoveredAt?: Timestamp = Time.nowMs;
    ttl?: Duration;
    public get addresses()
    {
        const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'Addresses')?.Value; if (v) return v.split(',').map(a => ({
            type: 'udp',
            ip: a,
            port: Number(this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'Port').Value)
        } as ServerAddressUdp)); return undefined;
    }
    deviceIdentifier: string;
}

class CommissionableDeviceProxy extends OperationalDeviceProxy implements CommissionableDevice
{
    public get D() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'D')?.Value; if (v) return Number(v); return undefined; }
    public get CM() { const v = this.endpoint.clusters.fixedLabel.target.localLabelList.find(l => l.Label == 'CM')?.Value; if (v) return Number(v); return undefined; }
}


export class MqttScanner implements Scanner
{
    constructor(private pubsub: AsyncEventBus<MqttEvents>) { }

    private readonly endpoints: Record<string, EndpointProxy> = {};
    private readonly operationalDevices: Record<string, OperationalDevice> = {};
    private readonly commissionableDevices: Record<string, CommissionableDevice[]> = {};

    readonly type: ChannelType = ChannelType.UDP;
    async findOperationalDevice(fabric: Fabric, nodeId: NodeId, timeout?: Duration, ignoreExistingRecords?: boolean): Promise<OperationalDevice | undefined>
    {
        if (!ignoreExistingRecords)
        {
            const existing = this.getDiscoveredOperationalDevice(fabric, nodeId);
            if (existing)
                return existing;
        }

        let p = new Deferred<void>();

        if (!this.endpoints[MATTER_SERVICE_QNAME])
        {
            this.endpoints[MATTER_SERVICE_QNAME] = await EndpointProxy.fromBus(this.pubsub, 'mdns', MATTER_SERVICE_QNAME);
            this.endpoints[MATTER_SERVICE_QNAME].clusters.descriptor.target.PartsList.onChanged(async ev =>
            {
                for (const endpointId of ev.value)
                {
                    if (!this.endpoints[endpointId])
                    {
                        this.endpoints[endpointId] = await EndpointProxy.fromBus<'fixedLabel'>(this.pubsub, 'mdns', endpointId);
                        this.endpoints[endpointId].clusters.fixedLabel.target.LabelList.onChanged(ev =>
                        {
                            const fqdn = ev.value.find(l => l.Label == 'FQDN')?.Value;
                            if (!fqdn)
                                throw new ErrorWithStatus(HttpStatusCode.BadRequest, 'Weird MDNS record with no FQDN: ' + JSON.stringify(ev.value, null, 4));
                            if (fqdn && !this.operationalDevices[fqdn])
                                this.operationalDevices[fqdn] = new OperationalDeviceProxy(this.endpoints[endpointId] as EndpointProxy<'fixedLabel'>);
                        }, true)
                    }
                    for (const disposedEndpoint of Object.keys(this.endpoints).filter(k => k != MATTER_SERVICE_QNAME && ev.value.some(v => v.toString() == k)))
                    {
                        await this.endpoints[disposedEndpoint][Symbol.asyncDispose]();
                        delete this.operationalDevices[disposedEndpoint];
                        delete this.endpoints[disposedEndpoint];
                    }


                    p.resolve();
                }
            }, true)
        }

        if (timeout)
            await delay(timeout);

        return this.operationalDevices[getOperationalDeviceQname(Bytes.toHex(fabric.operationalId).toUpperCase(), NodeId.toHexString(nodeId))];
    }
    getDiscoveredOperationalDevice(fabric: Fabric, nodeId: NodeId): OperationalDevice | undefined
    {
        const name = getOperationalDeviceQname(Bytes.toHex(fabric.operationalId).toUpperCase(), NodeId.toHexString(nodeId));
        return this.operationalDevices[name];
    }

    /**
     * Builds an identifier string for commissionable queries based on the given identifier object.
     * Some identifiers are identical to the official DNS-SD identifiers, others are custom.
     */
    public static buildCommissionableQueryIdentifier(identifier: CommissionableDeviceIdentifiers)
    {
        if ("instanceId" in identifier)
        {
            return getCommissionableDeviceQname(identifier.instanceId);
        }

        if ("longDiscriminator" in identifier)
        {
            return getLongDiscriminatorQname(identifier.longDiscriminator);
        }

        if ("shortDiscriminator" in identifier)
        {
            return getShortDiscriminatorQname(identifier.shortDiscriminator);
        }

        if ("vendorId" in identifier && "productId" in identifier)
        {
            // Custom identifier because normally productId is only included in TXT record
            return `_VP${identifier.vendorId}+${identifier.productId}`;
        }

        if ("vendorId" in identifier)
        {
            return getVendorQname(identifier.vendorId);
        }

        if ("deviceType" in identifier)
        {
            return getDeviceTypeQname(identifier.deviceType);
        }

        if ("productId" in identifier)
        {
            // Custom identifier because normally productId is only included in TXT record
            return `_P${identifier.productId}`;
        }

        return getCommissioningModeQname();
    }

    public static extractInstanceId(instanceName: string)
    {
        const instanceNameSeparator = instanceName.indexOf(".");
        if (instanceNameSeparator !== -1)
        {
            return instanceName.substring(0, instanceNameSeparator);
        }
        return instanceName;
    }


    /**
     * Check all options for a query identifier and return the most relevant one with an active query
     */
    private findCommissionableQueryIdentifier(instanceName: string, record: CommissionableDeviceRecordWithExpire)
    {
        const instanceQueryId = MqttScanner.buildCommissionableQueryIdentifier({
            instanceId: MqttScanner.extractInstanceId(instanceName),
        });
        if (instanceQueryId in this.endpoints)
        {
            return instanceQueryId;
        }

        const longDiscriminatorQueryId = MqttScanner.buildCommissionableQueryIdentifier({ longDiscriminator: record.D });
        if (longDiscriminatorQueryId in this.endpoints)
        {
            return longDiscriminatorQueryId;
        }

        const shortDiscriminatorQueryId = MqttScanner.buildCommissionableQueryIdentifier({ shortDiscriminator: record.SD });
        if (shortDiscriminatorQueryId in this.endpoints)
        {
            return shortDiscriminatorQueryId;
        }

        if (record.V !== undefined && record.P !== undefined)
        {
            const vendorProductIdQueryId = MqttScanner.buildCommissionableQueryIdentifier({
                vendorId: VendorId(record.V),
                productId: record.P,
            });
            if (vendorProductIdQueryId in this.endpoints)
            {
                return vendorProductIdQueryId;
            }
        }

        if (record.V !== undefined)
        {
            const vendorIdQueryId = MqttScanner.buildCommissionableQueryIdentifier({ vendorId: VendorId(record.V) });
            if (vendorIdQueryId in this.endpoints)
            {
                return vendorIdQueryId;
            }
        }

        if (record.DT !== undefined)
        {
            const deviceTypeQueryId = MqttScanner.buildCommissionableQueryIdentifier({ deviceType: record.DT });
            if (deviceTypeQueryId in this.endpoints)
            {
                return deviceTypeQueryId;
            }
        }

        if (record.P !== undefined)
        {
            const productIdQueryId = MqttScanner.buildCommissionableQueryIdentifier({ productId: record.P });
            if (productIdQueryId in this.endpoints)
            {
                return productIdQueryId;
            }
        }

        const commissioningModeQueryId = MqttScanner.buildCommissionableQueryIdentifier({});
        if (commissioningModeQueryId in this.endpoints)
        {
            return commissioningModeQueryId;
        }

        return undefined;
    }

    async findCommissionableDevices(identifier: CommissionableDeviceIdentifiers, timeout?: Duration, ignoreExistingRecords?: boolean): Promise<CommissionableDevice[]>
    {
        if (!ignoreExistingRecords)
            return this.findCommissionableDevicesContinuously(identifier, () => { }, timeout, delay(Seconds.one).then(() => { }))

        const query = MqttScanner.buildCommissionableQueryIdentifier(identifier);

        const queryEndpoint = await EndpointProxy.fromBus(this.pubsub, 'mdns', query);
        return new Promise((resolve, reject) => queryEndpoint.clusters.descriptor.target.PartsList.onChanged(async ev =>
        {
            let result: CommissionableDevice[] = [];
            for (const endpointId of ev.value)
            {
                if (!this.endpoints[endpointId])
                {
                    this.endpoints[endpointId] = await EndpointProxy.fromBus<'fixedLabel'>(this.pubsub, 'mdns', endpointId);
                    this.endpoints[endpointId].clusters.fixedLabel.target.LabelList.onChanged(ev =>
                    {
                        const fqdn = ev.value.find(l => l.Label == 'FQDN')?.Value;
                        if (!fqdn)
                            throw new ErrorWithStatus(HttpStatusCode.BadRequest, 'Weird MDNS record with no FQDN: ' + JSON.stringify(ev.value, null, 4));
                        result.push(new CommissionableDeviceProxy(this.endpoints[endpointId] as EndpointProxy<'fixedLabel'>));
                    }, true)
                }
            }

            if (timeout)
                await delay(timeout);

            if (!this.commissionableDevices[query])
                this.commissionableDevices[query] = result;
            else
                this.commissionableDevices[query].push(...result);

            if (ignoreExistingRecords)
                resolve(result);
            else
                resolve(this.commissionableDevices[query]);

        }, true));
    }
    async findCommissionableDevicesContinuously(identifier: CommissionableDeviceIdentifiers, callback: (device: CommissionableDevice) => void, timeout?: Duration, cancelSignal?: Promise<void>): Promise<CommissionableDevice[]>
    {
        const query = MqttScanner.buildCommissionableQueryIdentifier(identifier);

        const queryEndpoint = await EndpointProxy.fromBus(this.pubsub, 'mdns', query);
        return new Promise((resolve) => queryEndpoint.clusters.descriptor.target.PartsList.onChanged(async ev =>
        {
            let result: CommissionableDevice[] = [];
            for (const endpointId of ev.value)
            {
                if (!this.endpoints[endpointId])
                {
                    this.endpoints[endpointId] = await EndpointProxy.fromBus<'fixedLabel'>(this.pubsub, 'mdns', endpointId);
                    const sub = this.endpoints[endpointId].clusters.fixedLabel.target.LabelList.onChanged(ev =>
                    {
                        const fqdn = ev.value.find(l => l.Label == 'FQDN')?.Value;
                        if (!fqdn)
                            throw new ErrorWithStatus(HttpStatusCode.BadRequest, 'Weird MDNS record with no FQDN: ' + JSON.stringify(ev.value, null, 4));
                        const device = new CommissionableDeviceProxy(this.endpoints[endpointId] as EndpointProxy<'fixedLabel'>);
                        callback?.(device);
                        result.push(device);
                    }, true);
                    cancelSignal.then(sub);
                }
            }

            if (timeout)
                await Promise.race([cancelSignal, delay(timeout)]);

            if (!this.commissionableDevices[query])
                this.commissionableDevices[query] = result;
            else
                this.commissionableDevices[query].push(...result);

            resolve(this.commissionableDevices[query]);

        }, true));
    }
    getDiscoveredCommissionableDevices(identifier: CommissionableDeviceIdentifiers): CommissionableDevice[]
    {
        return this.commissionableDevices[MqttScanner.buildCommissionableQueryIdentifier(identifier)];
    }
    cancelCommissionableDeviceDiscovery(identifier: CommissionableDeviceIdentifiers, resolvePromise?: boolean): void
    {
        const query = MqttScanner.buildCommissionableQueryIdentifier(identifier);
        if (this.endpoints[query])
        {
            const ep = this.endpoints[query];
            for (const endpointId of ep.clusters.descriptor.target.localPartsList)
                this.commissionableDevices[endpointId][Symbol.asyncDispose]();
            this.endpoints[query][Symbol.asyncDispose]();

        }
    }
    async close(): Promise<void>
    {
        for (const endpointId in this.endpoints)
            await this.endpoints[endpointId][Symbol.asyncDispose]();
        for (const endpointId in this.operationalDevices)
            await this.operationalDevices[endpointId][Symbol.asyncDispose]();
        for (const endpointId in this.commissionableDevices)
            await this.commissionableDevices[endpointId][Symbol.asyncDispose]();
    }

}
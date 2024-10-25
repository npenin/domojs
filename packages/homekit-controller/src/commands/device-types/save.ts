import { IDevice, ISaveDevice } from '@domojs/devices'
import { SRP } from 'fast-srp-hap'
import hap from 'hap-nodejs'

export default async function save(body: unknown, device: ISaveDevice & Partial<IDevice>): Promise<IDevice>
{
    hap

    return device as IDevice;
}
import * as ac from '@akala/commands'
import * as  types from '../../devices'


export namespace DeviceType
{
    export interface Contract
    {
        save(device: types.IDeviceCollection, body: any): PromiseLike<types.IDevice>;
        exec(): PromiseLike<any>
    }

    export async function create(type: types.DeviceType, processor: ac.CommandProcessor)
    {
        var container = new ac.Container('deviceTypes', {}, processor);

        await container.dispatch('register', type)
        return container
    }
}
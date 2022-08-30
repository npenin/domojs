import { BinaryOperator } from '@akala/core/expressions';;
import * as db from '@akala/storage'
import { LiveStore } from "../../store";

export default async function getDevice(store: LiveStore, name: string)
{
    var device = await store.Devices.where('name', BinaryOperator.Equal, name).firstOrDefault();
    if (!device)
    {
        let indexOfDot = name.indexOf('.');
        if (~indexOfDot)
            device = await store.Devices.where('name', BinaryOperator.Equal, name.substr(0, indexOfDot)).firstOrDefault();
        if (!device)
            return Promise.reject({ status: 404, message: 'Device not found' });
        device = device.subdevices.find(function (subDevice)
        {
            return subDevice.name == name;
        })
        if (!device)
            return Promise.reject({ status: 404 });
    }
    return device;
}
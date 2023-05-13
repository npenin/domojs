import { Container } from '@akala/commands';
import { BinaryOperator } from '@akala/core/expressions';;
import { deviceTypeContainer } from '../../../index.js';
import { LiveStore } from "../../store.js";

export default async function exec(store: LiveStore, name: string, command: string, value: any, deviceTypeContainer: deviceTypeContainer.container & Container<void>)
{
    var device = await store.Devices.where('name', BinaryOperator.Equal, name).firstOrDefault();
    await deviceTypeContainer.dispatch(`${device.type}.exec`, name, command, value)
}
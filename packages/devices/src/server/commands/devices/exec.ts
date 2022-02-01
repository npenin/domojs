import { Container } from '@akala/commands';
import * as db from '@akala/storage'
import { deviceTypeContainer } from '../../..';
import { LiveStore } from "../../store";

export default async function exec(store: LiveStore, name: string, command: string, value: any, deviceTypeContainer: deviceTypeContainer.container & Container<void>)
{
    var device = await store.Devices.where('name', db.expressions.BinaryOperator.Equal, name).firstOrDefault();
    await deviceTypeContainer.dispatch(`${device.type}.exec`, name, command, value)
}
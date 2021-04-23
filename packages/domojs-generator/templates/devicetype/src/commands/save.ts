import { devices } from "@domojs/devices";
import { State } from "../state";
import * as ac from '@akala/commands'

export default async function save(this: State, body: any, device: devices.IDevice, container: ac.Container<any>)
{
    if (!body)
        return device;

}
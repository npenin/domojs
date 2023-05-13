import { devices } from "@domojs/devices";
import { State } from "../state.js";

export default async function save(this: State, body: any, device: devices.IDevice)
{
    this.locations.set(device.name, body);
    await this.locations.commit();
    return device;
}
import { DeviceClass, IDevice, ISaveDevice } from "@domojs/devices";
import { State } from "../state.js";

export default async function save(this: State, body: any, device: ISaveDevice & Partial<IDevice>): Promise<IDevice>
{
    this.locations.set(device.name, body);
    device.class = DeviceClass.SingleValueSensor;
    await this.locations.commit();
    return device as IDevice;
}
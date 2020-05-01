import * as devices from "../../../devices";
import { Container } from "@akala/commands";
import { Store } from "../../store";
import { deviceContainer } from '../../..';

export default async function persist(this: { initializing?: boolean }, deviceTypeContainer: Container<devices.DeviceTypeCollection>, deviceContainer: Container<devices.IDeviceCollection> & deviceContainer, store: Store, device: devices.IDevice, body)
{
    if (!device)
        device = {
            name: body.name,
            type: body.type.name,
            category: body.category,
            commands: null
        };

    if (body && !this.initializing)
    {
        await store.Devices.createSingle(body);
    }

    device = await deviceTypeContainer.dispatch(device.type + '.save', { device: device, body: body });

    await deviceContainer.dispatch('register', deviceTypeContainer, device);
};
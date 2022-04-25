import * as devices from "../../../devices";
import { Container } from "@akala/commands";
import { Store } from "../../store";
import { deviceContainer } from '../../..';
import { State } from "..";

export default async function persist(this: State,
    // deviceTypeContainer: Container<devices.DeviceTypeCollection>,
    deviceContainer: Container<devices.IDeviceCollection> & deviceContainer.container,
    type: string,
    bodyasync: Promise<any>)
{
    var body = await bodyasync;

    console.log(arguments);

    var device = {
        name: body.name,
        type: type,
        category: body.category,
        root: body.room,
        commands: null
    };

    if (body && !this.initializing)
    {
        await this.store.DevicesInit.createSingle({ ...body, type });
    }

    device = await (await this.sidecars['@domojs/devicetype']).dispatch(type + '.save', body, device);

    await deviceContainer.dispatch('register', device);
};
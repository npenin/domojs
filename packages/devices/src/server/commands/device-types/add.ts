import * as devices from "../../../devices";
import { Container } from "@akala/commands";
import { deviceContainer } from '../../..';

export default async function persist(this: devices.DeviceTypeState,
    self: Container<devices.DeviceTypeCollection>,
    type: string,
    bodyasync: Promise<any> | string)
{
    if (typeof bodyasync == 'string')
        var body = JSON.parse(bodyasync);
    else
        var body = await bodyasync;

    console.log(arguments);

    var device = {
        name: body.name,
        type: type,
        category: body.category,
        root: body.room,
        commands: null
    };

    if (body && this.initializing.indexOf(type) == -1)
    {
        await this.store.DeviceInit.createSingle({ ...body, type });
    }

    device = await self.dispatch(type + '.save', body, device);

    await this.pubsub?.publish('/device/new', device);
    await this.pubsub?.publish('/device/' + type, device);

};
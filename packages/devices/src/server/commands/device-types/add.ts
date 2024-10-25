import * as devices from "../../../devices.js";
import { Container, Metadata, registerCommands } from "@akala/commands";
import { logger } from "@akala/core";

const log = logger('domojs:devices:types:add')

export default async function persist(this: devices.DeviceTypeState,
    self: Container<devices.DeviceTypeCollection>,
    type: string,
    bodyasync: Promise<any> | string)
{
    if (typeof bodyasync == 'string')
        var body = JSON.parse(bodyasync);
    else
        var body = await bodyasync;

    log.info(arguments);
    log.debug(body);

    var device: devices.IDevice = await self.dispatch(type + '.save', body, {
        name: body.name,
        type: type,
        category: body.category,
        room: body.room
    });

    if (body && this.initializing.indexOf(type) == -1)
    {
        await this.store.DeviceInit.createSingle({ body, type, name: body.name, class: device.class });
    }

    const deviceContainer = new Container(device.name, null);
    const remoteDeviceType = self.resolve<Container<void>>(type);
    remoteDeviceType.register(deviceContainer);
    registerCommands(device.commands, remoteDeviceType.processor, deviceContainer);


    await this.pubsub?.publish('/device/new', device);
    await this.pubsub?.publish('/device/' + type, device);

};
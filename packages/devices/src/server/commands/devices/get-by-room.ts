import { LiveStore } from "../../store";
import * as db from "@akala/storage";
import { BinaryOperator } from "@akala/core/expressions";

export default async function getByCategory(store: LiveStore, room?: string)
{
    console.log(arguments);
    if (room)
        return await store.Devices.where('room', BinaryOperator.Equal, room)
            .select({ name: 'name', length: 'commands && commands.length + subdevices && subdevices.length' }).toArray();
    else
        return await store.Devices
            .groupBy('room').select({ name: 'key', length: 'value.length' }).toArray();
}
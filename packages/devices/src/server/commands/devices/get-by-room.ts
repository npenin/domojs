import { LiveStore } from "../../store";
import * as db from "@akala/storage";

export default async function getByCategory(store: LiveStore, room?: string)
{
    console.log(arguments);
    if (room)
        return await store.Devices.where('room', db.expressions.BinaryOperator.Equal, room)
            .select({ name: 'name', length: 'commands && commands.length + subdevices && subdevices.length' }).toArray();
    else
        return await store.Devices
            .groupBy('room').select({ name: 'key', length: 'value.length' }).toArray();
}
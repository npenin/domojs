import { LiveStore } from "../../store";
import * as db from "@akala/storage";

export default async function getByCategory(store: LiveStore, category?: string)
{
    console.log(arguments);
    if (category)
        return await store.Devices.where('category', db.expressions.BinaryOperator.Equal, category)
            .select({ name: 'name', length: 'commands && commands.length + subdevices && subdevices.length' }).toArray();
    else
        return await store.Devices
            .groupBy('category').select({ name: 'key', length: 'value.length' }).toArray();
}
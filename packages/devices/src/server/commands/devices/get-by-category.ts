import { LiveStore } from "../../store.js";
import { BinaryOperator } from "@akala/core/expressions";

export default async function getByCategory(store: LiveStore, category?: string)
{
    console.log(arguments);
    if (category)
        return await store.Devices.where('category', BinaryOperator.Equal, category)
            .select({ name: 'name', length: 'commands && commands.length + subdevices && subdevices.length' }).toArray();
    else
        return await store.Devices
            .groupBy('category').select({ name: 'key', length: 'value.length' }).toArray();
}
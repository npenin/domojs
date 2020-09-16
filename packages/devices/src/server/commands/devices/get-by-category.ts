import * as akala from '@akala/server'
import { Store } from "../../store";
import * as db from "@akala/storage";

export default async function getByCategory(store: Store, category?: string)
{
    if (category)
        return await store.Devices.where('category', db.expressions.BinaryOperator.Equal, category)
            .select({ name: 'name', length: 'commands.length + subdevices.length' }).toArray();
    else
        return await store.Devices.where('category', db.expressions.BinaryOperator.Equal, category)
            .groupBy('category').select({ name: 'key', length: 'value.length' }).toArray();
}
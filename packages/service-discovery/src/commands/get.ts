import { grep } from "@akala/core";
import { Service, State } from "../common.js";

export default async function (this: State, serviceQuery: Partial<Service>)
{
    var queryable: { [name: string]: any };
    if (serviceQuery.type)
        queryable = this.services.byTypes;
    else
        queryable = this.services.byNames;

    if (serviceQuery.name)
        return grep(queryable, function (_: Service, name: string)
        {
            return name.indexOf(serviceQuery.name!) >= 0;
        }, true);
    else
        return queryable;
}
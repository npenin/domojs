import { delay } from "@akala/core";
import { State } from "../state.js";
import { Endpoint } from "@domojs/devices";

export default async function (this: State, typeOrFqdn: string, waitTime: number = 4)
{
    // Perform probe if wait time is specified
    if (waitTime > 0)
    {
        await this.browser.probe(waitTime * 1000);
    }

    // Filter endpoints based on FQDN or type
    const result = this.fabric.endpoints.filter(e => !typeOrFqdn || (e as Endpoint)?.clusters.fixedLabel?.target.LabelList.find(l => l.Label === 'FQDN')?.Value.includes(typeOrFqdn));

    return result.map(e => Object.fromEntries(
        ([['id', e.id]] as [PropertyKey, unknown][]).concat(
            (e as Endpoint).clusters.fixedLabel?.target.LabelList.map(l => [l.Label, l.Value] as const) || []
        )
    ));
}

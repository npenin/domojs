import { delay } from "@akala/core";
import { State } from "../state.js";
import { ClusterMap, Endpoint } from "@domojs/devices";

export default async function (this: State, typeOrFqdn: string, waitTime: number, trigger: string)
{
    await delay(waitTime * 1000);

    const result = this.fabric.endpoints.filter(e => !typeOrFqdn || (e as Endpoint<ClusterMap>)?.clusters.fixedLabel.target.LabelList.find(l => l.Label == 'FQDN')?.Value.includes(typeOrFqdn));

    if (trigger = 'cli')
        this.browser.destroy();

    return result.map(e => Object.fromEntries(([['id', e.id]] as [PropertyKey, unknown][]).concat((e as Endpoint<ClusterMap>).clusters.fixedLabel.target.LabelList.map(l => [l.Label, l.Value] as const))));
    ;
}
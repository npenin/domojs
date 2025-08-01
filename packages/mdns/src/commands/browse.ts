import { delay } from "@akala/core";
import { State } from "../state.js";
import { ClusterMap, Endpoint } from "@domojs/devices";

export default async function (this: State, typeOrFqdn: string, waitTime: number, trigger: string)
{
    await delay(waitTime * 1000);

    const result = this.fabric.endpoints.filter((e) => !typeOrFqdn || e[0] == typeOrFqdn);

    if (trigger = 'cli')
        this.browser.destroy();

    return typeOrFqdn ?
        result.find(e => e.clusters.aggregator)?.clusters.aggregator.getValue('endpoints') :
        result.filter(e => !e.clusters.aggregator).map(e => e.clusters.fixedLabel?.target.LabelList.find(l => (l.Label == 'Type' || l.Label == 'Host') && l.Value == typeOrFqdn))
        ;
}
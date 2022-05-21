import * as akala from '@akala/core';
import { Cluster } from '@domojs/zigate-parsers';
import { State, ZDevice } from '../state'

export default function (this: State)
{
    return akala.map(this.devices, function (device)
    {
        return device.type == 'device' && {
            name: (device.internalName || device.address) + ' (' + (device.clusters.map(function (cluster)
            {
                return Cluster[cluster];
            }).toString()) + ')', address: device.address
        };
    }, true);
}
import * as akala from '@akala/core';
import { Cluster } from 'zigate';
import { State, ZDevice } from '../state'

export default function (this: State)
{
    return akala.map(this.devices, function (device: ZDevice)
    {
        return {
            name: (device.internalName || device.address) + ' (' + (device.clusters.map(function (cluster)
            {
                return Cluster[cluster];
            }).toString()) + ')', address: device.address
        };
    }, true);
}
import { Cluster as ZigbeeCluster } from '@domojs/zigate-parsers';
import { ClusterMap, MatterClusterIds, clusterFactory } from '@domojs/devices';
import { ClusterMapping, zigbeeToMatterClusterMap } from './cluster-mapping.js';

interface ZigbeeAttributeValue
{
    attributeId: number;
    value: any;
}

/**
 * Creates a Matter cluster from a Zigbee cluster ID and its attributes
 */
export function createMatterClusterFromZigbee(zigbeeClusterId: ZigbeeCluster, zigbeeAttributes: ZigbeeAttributeValue[] = [])
{
    const mapping = zigbeeToMatterClusterMap.get(zigbeeClusterId);
    if (!mapping)
    {
        return null;
    }

    // Convert Zigbee attributes to Matter attributes
    const matterAttributes: Record<string, unknown> = {};

    for (const zigbeeAttr of zigbeeAttributes)
    {
        const matterId = mapping.attributes.find(att => att.zigbeeId == zigbeeAttr.attributeId);
        if (typeof matterId === 'number')
        {
            // TODO: Add value conversions based on attribute types
            matterAttributes[matterId] = zigbeeAttr.value;
        }
    }

    return clusterFactory({
        id: mapping.matterId,
        ...matterAttributes
    });
}

/**
 * Convert a single Zigbee attribute to its Matter equivalent
 */
export function convertToMatterAttribute(zigbeeClusterId: ZigbeeCluster, attributeId: number, value: any): { matterId: number, value: any } | null
{
    const mapping = zigbeeToMatterClusterMap.get(zigbeeClusterId);
    if (!mapping)
    {
        return null;
    }

    const matterId = mapping.attributes.find(att => att.zigbeeId == attributeId);
    if (typeof matterId !== 'number')
    {
        return null;
    }

    // TODO: Add value conversions based on attribute types
    return {
        matterId,
        value
    };
}

/**
 * Convert a Matter attribute to its Zigbee equivalent
 */
export function convertToZigbeeAttribute(matterClusterId: MatterClusterIds, matterId: string, value: any): { zigbeeCluster: ZigbeeCluster, attributeId: number, value: any } | null
{
    const [zigbeeCluster, mapping]: [ZigbeeCluster, ClusterMapping | undefined] = zigbeeToMatterClusterMap.entries().find(e => e[1].matterId == matterClusterId);
    if (!mapping)
    {
        return null;
    }

    // Find the Zigbee attribute ID that maps to this Matter ID
    const match = mapping.attributes.find(att => att.matterId === matterId);
    if (!match)
    {
        return null;
    }

    const attributeId = match.zigbeeId;

    // TODO: Add value conversions based on attribute types
    return {
        zigbeeCluster,
        attributeId,
        value
    };
}
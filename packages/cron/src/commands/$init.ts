import { CliContext } from "@akala/cli";
import app, { SidecarConfiguration } from "@akala/sidecar";
import { Boolean, BridgeConfiguration, clusterFactory, ClusterIds, ClusterInstance, MatterClusterIds, onOff, registerNode } from "@domojs/devices";
import { ProxyConfiguration } from '@akala/config'
import { Scheduler } from "@akala/cron";
import { Subscription } from '@akala/core';
import State from "../state.js";

export async function start(this: State, context: CliContext<{}, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>)
{
    this.app = await app(context);

    this.scheduler = new Scheduler(context.abort.signal);

    const root = this.root = await registerNode('cron', this.app, context.state, context.abort.signal);

    const refs: Record<number, { refs: number, subscription: Subscription }> = {}

    this.root.patch({
        manualAdmin: {
            id: ClusterIds.manualAdmin,
            addCommand: async (cron: string) =>
            {
                const endpointId = await root.getEndpointId(cron);
                let endpoint = this.root.endpoints.find(ep => ep.id == endpointId);

                if (!endpoint)
                {
                    endpoint = await root.newEndpoint(cron, {
                        onOff: clusterFactory({
                            id: MatterClusterIds.OnOff, // OnOff cluster ID
                            async OnCommand()
                            {
                                // Handle manual on command for cron job
                                console.log(`Manual trigger for cron job: ${cron}`);
                            },
                            async OffCommand()
                            {
                                // Handle manual off command for cron job
                                console.log(`Manual stop for cron job: ${cron}`);
                            },
                            async ToggleCommand()
                            {
                                // Handle manual toggle command for cron job
                                console.log(`Manual toggle for cron job: ${cron}`);
                            },
                            OnOff: false,
                            SupportsDeadFrontBehavior: false,
                            SupportsLighting: false,
                            SupportsOffOnly: false,
                        })
                    });

                    // Create the cron schedule
                    const schedule = this.scheduler.on(cron, () =>
                    {
                        console.log(`Cron job executed: ${cron} at ${new Date().toISOString()}`);
                        // Trigger the onOff cluster to indicate the cron job ran
                        (endpoint.clusters.onOff as ClusterInstance<onOff.OnOff>)?.setValue('OnOff', true);
                        // Optionally turn it off after a short delay
                        setTimeout(() =>
                        {
                            (endpoint.clusters.onOff as ClusterInstance<onOff.OnOff>)?.setValue('OnOff', false);
                        }, 1000);
                    });

                    if (!refs[endpointId])
                        refs[endpointId] = { refs: 0, subscription: schedule };

                    this.root.endpoints.push(endpoint);
                }

                // Increment reference count
                refs[endpoint.id].refs++;

                return [[endpointId]];
            },
            removeCommand: async (endpointId: number) =>
            {
                if (refs[endpointId])
                {
                    // Decrement reference count
                    refs[endpointId].refs = (refs[endpointId].refs || 0) - 1;

                    // Only remove if no more references
                    if (refs[endpointId].refs <= 0)
                    {
                        refs[endpointId].subscription();
                        delete refs[endpointId];

                        // Remove endpoint from the list
                        const index = this.root.endpoints.findIndex(ep => ep.id == endpointId);
                        if (index > -1)
                        {
                            this.root.endpoints.splice(index, 1);
                        }
                    }
                }
            }
        }
    })
}

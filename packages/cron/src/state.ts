import { Scheduler } from "@akala/cron";
import { Sidecar } from "@akala/sidecar";
import { RootNode } from "@domojs/devices";

export default interface State
{
    root: RootNode<never>;
    app: Sidecar<{}, {}>;
    scheduler: Scheduler;
}
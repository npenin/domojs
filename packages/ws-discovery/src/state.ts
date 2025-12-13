import { WSDiscovery } from "./index.js";
import { RootNode } from "@domojs/devices";

export interface State
{
    fabric: RootNode<never>;
    browser: WSDiscovery;
}

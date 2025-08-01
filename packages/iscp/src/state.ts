import { Container } from "@akala/commands";
import { RootNode } from "@domojs/devices";

export interface State
{
    collection: { [key: string]: Container<any> };
    fabric: RootNode<never>
}
import { Container } from "@akala/commands";
import { devices } from "@domojs/devices";

export interface State
{
    collection: { [key: string]: Container<any> };
    getMainDevice(name: string): Container<any>;
}
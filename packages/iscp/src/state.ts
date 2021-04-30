import { Container } from "@akala/commands";

export interface State
{
    collection: { [key: string]: Container<any> };
    getMainDevice(name: string): Container<any>;
}
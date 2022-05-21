import * as akala from "@akala/core";
import * as  devices from "../../../devices";

export default async function list(this: devices.DeviceTypeState): Promise<{ name: string }[]>
{
    return akala.map(this.types, (dt, name: string) => ({ name }), true)
}
import * as akala from "@akala/core";
import * as  devices from "../../../devices";

export default async function list(this: devices.DeviceTypeCollection): Promise<{ name: string }[]>
{
    return akala.map(this, (dt) => { return { name: dt.name } }, true)
}
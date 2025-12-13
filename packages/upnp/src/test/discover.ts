import { SSDP } from "../index.js";
try
{
    using client = new SSDP();
    await client.ready;
    const devices = await client.search();
    console.log(devices);
}
catch (e)
{
    console.error(e);
}
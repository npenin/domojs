import { Container } from '@akala/commands'
import { registerDeviceType } from '@domojs/devices'

export default async function init(container: Container<void>, signal: AbortSignal)
{
    await registerDeviceType(container, signal);
}
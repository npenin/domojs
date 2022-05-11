import { State } from "../state";
import fs from 'fs/promises'
import { registerDeviceType } from "@domojs/devices";
import { Container } from "@akala/commands";

var state: State = null;

export default async function init(this: State, container: Container<void>)
{
    state = this;
    state.collection = {};
    state.getMainDevice = function getMainDevice(name)
    {
        var indexOfDot = name.indexOf('.');
        if (indexOfDot > 0)
            var mainDevice = name.substr(0, indexOfDot);
        else
            var mainDevice = name;

        return this.collection[mainDevice];
    };

    await fs.readFile(require.resolve('../../views/device.html'), 'utf-8').then(newDeviceTemplate =>
        registerDeviceType(container, {
            name: 'iscp',
            view: newDeviceTemplate,
            commandMode: 'dynamic'
        }));
}
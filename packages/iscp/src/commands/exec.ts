import { State } from "../state";
import * as api from '../api'

export default function (this: State, deviceName: string, command: string)
{
    var cmd = command;
    var mainDevice = this.getMainDevice(deviceName);
    if (deviceName != mainDevice.name)
    {
        switch (deviceName.substring(mainDevice.name.length + 1))
        {
            case 'power':
                if (command == 'off')
                    cmd = 'PF'
                else
                    cmd = 'PO'
                break;
            case 'mute':
                if (command == 'off')
                    cmd = 'MF';
                else
                    cmd = 'MO';
                break;
            case 'volume':
                switch (command)
                {
                    case 'up':
                        cmd = 'VU';
                        break;
                    case 'down':
                        cmd = 'VD';
                        break;
                    case 'set':
                        cmd = 'VL';
                        break;
                }
                break;
            case 'input':
                switch (command)
                {
                    case 'Game':
                        cmd = '49FN';
                        break;
                    case 'Dvd':
                        cmd = '04FN';
                        break;
                    case 'Sat/Cbl':
                        cmd = '06FN';
                        break;
                    case 'Dvr/Bdr':
                        cmd = '15FN';
                        break;
                    case 'iPod':
                        cmd = '17FN';
                        break;
                    case 'Video':
                        cmd = '10FN';
                        break;
                    case 'BD':
                        cmd = '25FN';
                        break;
                }
                break;
        }
    }
    return api.send(cmd, mainDevice['address']).then(() => undefined);
}
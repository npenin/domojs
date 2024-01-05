import { Service, State } from "../common.js";

export default function (this: State, service: Service)
{

    if (this.services.byTypes[service.type])
        delete this.services.byTypes[service.type][service.name];
    delete this.services.byNames[service.name];

    // if (rooms.byTypes[service.type])
    //     rooms.byTypes[service.type].forEach(function (socket)
    //     {
    //         socket.sendMethod('delete', service as any);
    //     });
    // if (rooms.byNames[service.name])
    //     rooms.byNames[service.name].forEach(function (socket)
    //     {
    //         socket.sendMethod('delete', service as any);
    //     });
}
import { Service, State } from "../common.js";
import { log } from "./$init.js";

export default async function (this: State, service: Service)
{

    // akala.extend(service, { connection: this });
    log.info(service);
    this.services.byTypes[service.type] = this.services.byTypes[service.type] || {};
    this.services.byTypes[service.type][service.name] = service;
    this.services.byNames[service.name] = service;

    // if (rooms.byTypes[service.type])
    //     rooms.byTypes[service.type].forEach(function (socket)
    //     {
    //         socket.sendMethod('add', service as any);
    //     });
    // if (rooms.byNames[service.name])
    //     rooms.byNames[service.name].forEach(function (socket)
    //     {
    //         socket.sendMethod('add', service as any);
    //     });
}
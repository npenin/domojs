import { Service } from "../common.js";

export default async function (service: Service)
{

    // if (service.type)
    // {
    //     if (!rooms.byTypes[service.type])
    //         rooms.byTypes[service.type] = [];
    //     rooms.byTypes[service.type].push(socket);
    //     if (services.byTypes[service.type])
    //         akala.each(services.byTypes[service.type], (service) =>
    //         {
    //             akala.api.jsonrpcws(meta).createClientProxy(socket).add(service);
    //         });
    // }

    // if (service.name)
    // {
    //     if (!rooms.byNames[service.name])
    //         rooms.byNames[service.name] = [];
    //     rooms.byNames[service.name].push(socket);
    //     if (services.byNames[service.name])
    //         akala.api.jsonrpcws(meta).createClientProxy(socket).add(services.byNames[service.name]);
    // }
}
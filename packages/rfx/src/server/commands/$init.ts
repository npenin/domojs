import { State } from "../state.js";
import { InterfaceControl, InterfaceMessage, Message, PacketType, Rfxtrx, Rfy, Type } from "@domojs/rfx-parsers";
import { Cluster, ClusterMap, ClusterIds, PairingHints, windowCovering, EndpointProxy, Commissionnee, Commissionning, clusterProxyFactory, CommissionningCluster, RootNode, registerNode, AggregatorEndpoint, BridgeConfiguration } from '@domojs/devices';
import { Device, usb as usbType } from 'usb'
import { Container } from "@akala/commands";
import { eachAsync, logger as Logger, ObservableArray } from "@akala/core";
import Configuration, { ProxyConfiguration } from "@akala/config";
import os from 'os';
import app, { pubsub, SidecarConfiguration } from "@akala/sidecar";
import { CliContext } from "@akala/cli";
import { MqttEvents } from "@domojs/mqtt";
import { gatewayHandler, Node, Endpoint } from "@domojs/devices";
import { punch } from "http-punch-hole";
import net from 'net'
import { ModeEndpoint } from "../endpoints/mode.js";
import { RfyEndpoint } from "../endpoints/rfy.js";
import { GatewayEndpoint } from "../endpoints/gateway.js";

var state: State = null;
// var setGateway: (gw: Rfxtrx) => void = null;
const logger = Logger('@domojs/rfx');

// class RfxCommissionner extends Commissionner
// {
//     private readonly pendingCommissionning: Record<string, () => Promise<Rfxtrx>> = {};

//     async startCommissionning(node: NodeDiscoveryAnnouncement)
//     {
//         switch (node.deviceType)
//         {
//             case DeviceTypes.Aggregator:
//             case DeviceTypes.AirPurifier:
//             case DeviceTypes.AirQualitySensor:
//             case DeviceTypes.BaseDeviceType:
//             case DeviceTypes.BasicVideoPlayer:
//             case DeviceTypes.BatteryStorage:
//             case DeviceTypes.BridgedNode:
//             case DeviceTypes.CastingVideoClient:
//             case DeviceTypes.CastingVideoPlayer:
//             case DeviceTypes.ColorDimmerSwitch:
//             case DeviceTypes.ColorTemperatureLight:
//             case DeviceTypes.ContactSensor:
//             case DeviceTypes.ContentApp:
//             case DeviceTypes.CookSurface:
//             case DeviceTypes.Cooktop:
//             case DeviceTypes.DeviceEnergyManagement:
//             case DeviceTypes.DimmableLight:
//             case DeviceTypes.DimmablePlugInUnit:
//             case DeviceTypes.DimmerSwitch:
//             case DeviceTypes.Dishwasher:
//             case DeviceTypes.DoorLock:
//             case DeviceTypes.DoorLockController:
//             case DeviceTypes.EnergyEVSE:
//             case DeviceTypes.ElectricalSensor:
//             case DeviceTypes.ExtendedColorLight:
//             case DeviceTypes.ExtractorHood:
//             case DeviceTypes.Fan:
//             case DeviceTypes.FlowSensor:
//             case DeviceTypes.GenericSwitch:
//             case DeviceTypes.HeatPump:
//             case DeviceTypes.HumiditySensor:
//             case DeviceTypes.JointFabricAdministrator:
//             case DeviceTypes.LaundryDryer:
//             case DeviceTypes.LaundryWasher:
//             case DeviceTypes.LightSensor:
//             case DeviceTypes.MicrowaveOven:
//             case DeviceTypes.ModeSelect:
//             case DeviceTypes.MountedDimmableLoadControl:
//             case DeviceTypes.MountedOnOffControl:
//             case DeviceTypes.NetworkInfrastructureManager:
//             case DeviceTypes.OccupancySensor:
//             case DeviceTypes.OnOffLight:
//             case DeviceTypes.OnOffLightSwitch:
//             case DeviceTypes.OnOffPlugInUnit:
//             case DeviceTypes.OnOffSensor:
//             case DeviceTypes.OTAProvider:
//             case DeviceTypes.OTARequestor:
//             case DeviceTypes.Oven:
//             case DeviceTypes.PowerSource:
//             case DeviceTypes.PressureSensor:
//             case DeviceTypes.Pump:
//             case DeviceTypes.PumpController:
//             case DeviceTypes.RainSensor:
//             case DeviceTypes.Refrigerator:
//             case DeviceTypes.RoboticVacuumCleaner:
//             case DeviceTypes.RoomAirConditioner:
//             case DeviceTypes.RootNode:
//             case DeviceTypes.SecondaryNetworkInterface:
//             case DeviceTypes.SmokeCOAlarm:
//             case DeviceTypes.SolarPower:
//             case DeviceTypes.Speaker:
//             case DeviceTypes.TemperatureControlledCabinet:
//             case DeviceTypes.TemperatureSensor:
//             case DeviceTypes.Thermostat:
//             case DeviceTypes.ThreadBorderRouter:
//             case DeviceTypes.VideoRemoteControl:
//             case DeviceTypes.WaterFreezeDetector:
//             case DeviceTypes.WaterHeater:
//             case DeviceTypes.WaterLeakDetector:
//             case DeviceTypes.WaterValve:
//             case DeviceTypes.WindowCovering:
//             case DeviceTypes.WindowCoveringController:
//                 break;
//             case DeviceTypes.ControlBridge:
//                 const gateway = await this.pendingCommissionning[node.discriminator]?.();
//                 if (!gateway)
//                     throw new Error('no gateway found for ' + node.deviceName);

//                 delete this.pendingCommissionning[node.discriminator];
//                 await gateway.start();

//                 await this.completeCommissionning(new GatewayEndpoint(node.deviceName, node.discriminator.toString(), gateway));
//         }
//     }
// }

export const rfxGatewayHandler = gatewayHandler<Rfxtrx>();

rfxGatewayHandler.useProtocol('usb', url =>
{
    logger.info('creating new RFXCOM gateway for %s', url.pathname);
    return Rfxtrx.getSerial(url.pathname);
});

rfxGatewayHandler.useProtocol('http', async url =>
{
    const socket: net.Socket = await punch(url.toString(), 'raw')
    socket.setKeepAlive(true, 60000);
    const gateway = new Rfxtrx(socket, socket.readyState == "open");
    async function reopen()
    {
        if (gateway.isOpen)
        {
            const socket = await punch(url.toString(), 'raw');
            socket.on('close', reopen);
            socket.on('error', e =>
            {
                if (e && e['code'] == 'EPIPE')
                    socket.end();
            })
            gateway.replaceClosedSocket(socket, socket.readyState == 'open');
            await gateway.start()
        }
    }
    socket.on('close', reopen);
    socket.on('error', e =>
    {
        if (e && e['code'] == 'EPIPE')
            socket.end();
    })
    return gateway;
})

rfxGatewayHandler.useProtocol('tcp', async url =>
{
    if (!url.port)
        throw new Error('no port specified in ' + url.href);

    return new Rfxtrx(net.connect({ host: url.hostname, port: Number(url.port) } as net.TcpNetConnectOpts).setKeepAlive(true, 60000), true)
});

export default async function init(this: State, context: CliContext<{ configFile: string }, ProxyConfiguration<SidecarConfiguration & BridgeConfiguration>>, signal: AbortSignal)
{
    state = this;
    state.endpoints = {};
    this.gateways = new Proxy<Record<string, Rfxtrx>>({}, {
        set(target, path, gateway)
        {
            if (!(gateway instanceof Rfxtrx) || typeof path !== 'string')
                return false;

            if (!(path in target))
            {
                target[path] = gateway;
                gateway.start();
                signal?.addEventListener('abort', async () =>
                {
                    await this.gateways[path].close();
                    delete this.gateways[path]
                });
            }
            return true;
        },
        deleteProperty(target, path)
        {
            if (!(path in target) || typeof path !== 'string')
                return false;

            target[path].close();
            delete target[path]
            return true;

        },
    });

    const sidecar = await app<unknown, MqttEvents>(context);

    const fabric = await registerNode('RFXCOM', sidecar, context.state, context.abort.signal)

    await fabric.attach(sidecar.pubsub);

    try
    {
        const { usb } = await import('usb')
        await addDeviceIfMatch(usb, this);
        usb.on('attach', function ()
        {
            logger.info('detected new usb device');
            addDeviceIfMatch(usb, this);
        });
    }
    catch (e)
    {
        if (e.code !== 'ERR_MODULE_NOT_FOUND')
            console.error(e);
    }

    // return Promise.all([p1, p2]);

    async function addDeviceIfMatch(usb: typeof usbType, state: State)
    {
        var serials = await Rfxtrx.listEligibleSerials();
        await eachAsync(serials, async serial =>
        {
            logger.info('idenfified a RFXCOM potential serial device');

            const nodeName = encodeURIComponent(serial.replace(/^\/dev\//, '')) + '@' + os.hostname();

            // const discriminator = crypto.randomUUID().replace(/-/g, '').substring(0, 16);

            const gatewayNode = new GatewayEndpoint(await fabric.getEndpointId(nodeName), nodeName, await Rfxtrx.getSerial(serial), fabric);
            fabric.endpoints.push(gatewayNode);
            // (new GatewayEndpoint(nodeName, discriminator, await Rfxtrx.getSerial(serial)));

            try
            {
                usb.on('detach', async function ()
                {
                    var newSerials = await Rfxtrx.listEligibleSerials();
                    if ((newSerials.length == 0 || newSerials.indexOf(device) === -1))
                        gatewayNode.offline();
                });
            }
            catch (e)
            {
                console.error('detaching is not supported on this platform');
            }
        });
        if (serials && serials.length > 0)
        {
            var device = serials[0]
            logger.info('idenfified a RFXCOM potential serial device');
            if (!state.gateways['usb://' + device])
                state.gateways['usb://' + device] = await Rfxtrx.getSerial(device);

            // setGateway(await Rfxtrx.getSerial(device))


            return device;

        }
        else
            logger.warn('no RFXCOM device found');
    }
}

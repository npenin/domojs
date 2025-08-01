For its rewriting, domojs devices tries to be as close to matter terminology as possible

## Terminology

- Fabric: represents an ecosystem/network that enriches the access scope of domojs
- Node: represents a hardware that is supported 
- Endpoint
- Cluster
  - Attributes
  - Commands
  - Events

## Topics

| topic | usage | example |
|--|--|--|
| domojs/`fabric`/`node`/`endpoint`/`command`[/`value`]| send a command with an optional value | domojs/`RFXCOM`/`ttyUSB0@rpi4`/`shutter1`/`up` domojs/`RFXCOM`/`ttyUSB0@rpi4`/`light1`/`on` domojs/`RFXCOM`/`ttyUSB0@rpi4`/`light1`/`brightness`/25 |

## Adapters

Creating an adapter/fabric will register a dedicated user (using mosquitto dynsec). This user is granted full access in the topic `domojs/{fabric}` where `fabric` is the name provided at registration time.

Adapters will be **nodes** in the `domojs/devices` **fabric** and at the same time, they own their own fabric, with their set of **nodes**. 

When a new endpoint (service / device / ...) supported by an adapter is discovered, the adapter will report it to `domojs/{adapter}`.

### Examples


#### mDNS

mDNS is a common use case as it provides service discovery. In this case, `mdns` is the **fabric** name. Each **node** would be the service type on the network and the **endpoints** would be the advertising IPs. Since an IP may provide for example both an http and ssh servers. Both endpoints would be advertised in the respective nodes. 

Practially speaking,

|Type| example |
|--|--|
| Node | `_http._tcp`, `_ssh._tcp`, ... |
| Endpoint | `192.168.1.1` |
| Cluster | Basic information as in Matter |
| Attributes | attributes from the mDNS records |

#### Specific Serial adapter (RFXCOM, Zigate, ...)

Serial adapters are the most common use case as it provides access to another network/networks (RTS, Zigbee, ...). In the rest of this example, we will use `RFXCOM` as an example to help understanding without complexifying explanations. In this case, `RFXCOM` is the **fabric** name. Each **node** would be the serial device physically connected to the host and the **endpoints** would be the controlled devices. 

Practially speaking,

|Type| example |
|--|--|
| Node | `ttyUSB0@rpi4` |
| Endpoint | `rfy-0-0-0-1` |
| Cluster | Basic information as in Matter and Window covering shutter |
| Commands | `up`, `down`, ... |
 
## Commissionning

After the report, domojs will publish on the same topic (`domojs/{adapter}`) the commissionned (configured) node with a scoped topic (`domojs/{adapter}/{node}`), a friendly name, (an optional location), ...
The adapter will then report a new node on `domojs/devices/{adapter}`.

## Endpoints

Each commissionned adapter will report their endpoints within their scoped topic (`domojs/{adapter}/{node}`). Further down endpoints have at least 1 cluster and will publish events on `domojs/{adapter}/{node}/{endpoint}/{cluster}/{event}`, and controllable when publishing on `domojs/{adapter}/{node}/{endpoint}/{cluster}/{command || attribute}`

commands and attributes are accessible through the same endpoint.

- `{command}/get` will get the `command` metadata
- `{command}` runs the `command` with the provided payload as arguments
- `{attribute}` updates the `attribute` to the value provided in the payload (if payload is empty, this is a no op) and publishes the update to the above mentioned topic

Remarks:
- attributes and commands cannot share the same name
- if there are events named as attributes, publishing on event topics the attribute values might lead to inconsistencies
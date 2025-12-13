# WS-Discovery Implementation

This module implements Web Services Dynamic Discovery (WS-Discovery) for the DomoJS project, following the patterns established by the `upnp` and `mdns` packages.

## Architecture

### Core Components

#### 1. **WSDiscovery Class** (`src/index.ts`)
- Implements the WS-Discovery protocol using UDP multicast
- Sends and receives SOAP/WS-Addressing messages on port 3702
- Main methods:
  - `probe()`: Sends a Probe message and waits for ProbeMatches responses
  - `startProbe()`: Sends a Probe message without waiting
  - Parses incoming WS-Discovery messages and emits device events

#### 2. **UdpSocketAdapter** (`src/index.ts`)
- Abstracts UDP socket communication
- Inherited from the SSDP implementation in the `upnp` package
- Handles multicast membership management
- Provides event-based message handling

#### 3. **State Interface** (`src/state.ts`)
- Maintains the fabric (device tree) and WS-Discovery browser instance
- Follows the pattern used in the `mdns` package

### Commands

#### `$init` - Initialize WS-Discovery Service
- Starts the WS-Discovery browser
- Registers the ws-discovery node in the device fabric
- Listens for device discoveries
- Creates endpoints for discovered devices with metadata

#### `$stop` - Stop WS-Discovery Service
- Cleanly shuts down the WS-Discovery browser
- Handles cleanup on abort signal

#### `browse` - Browse for Devices
- Performs a probe to discover devices
- Filters results by FQDN or type
- Returns endpoints with their metadata (address, types, scopes, XAddrs)

### Message Format

WS-Discovery uses SOAP-based messages wrapped in WS-Addressing envelopes:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope"
           xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing"
           xmlns:wsd="http://schemas.xmlsoap.org/ws/2005/04/discovery">
  <Header>
    <wsa:Action>http://schemas.xmlsoap.org/ws/2005/04/discovery/Probe\</wsa:Action\>
    <wsa:MessageID>uuid:...</wsa:MessageID>
    ...
  </Header>
  <Body>
    <wsd:Probe/>
  </Body>
</Envelope>
```

### Device Discovery

When devices respond to Probe messages, they provide:
- **EndpointReference**: Unique identifier (FQDN)
- **Types**: WS-Discovery service types
- **Scopes**: Device scopes/categories
- **XAddrs**: Service addresses for device metadata/interaction

All discovered devices are added to the fabric with:
- Fixed label cluster containing metadata
- Address, types, scopes, and XAddrs stored as labels
- Event emission for frontend updates

## Configuration

Package.json includes:
- CLI support via akala/cli
- Commands framework via akala/commands
- Sidecar integration for IoT device management
- DeviceTree integration via @domojs/devices

## Dependencies

- `@akala/sidecar`: IoT device framework
- `@akala/commands`: Command routing
- `@akala/cli`: CLI interface
- `@domojs/devices`: Device tree and clustering
- `ws-discovery`: WS-Discovery protocol implementation

## Usage

### As a Command Handler
```typescript
import { registerModule } from '@domojs/devices';
const wsDiscoveryModule = await registerModule('@domojs/ws-discovery');
```

### CLI
```bash
# Browse for all WS-Discovery devices
@domojs/ws-discovery browse

# Browse with wait time (default 4 seconds)
@domojs/ws-discovery browse --wait 8

# Browse for specific device type
@domojs/ws-discovery browse _http._tcp.local
```

## Key Implementation Details

1. **Multicast Communication**: Uses 239.255.255.250:3702 for device discovery
2. **Async Device Discovery**: Probe() method waits for responses before returning
3. **Device Metadata**: All discovered device information stored in fabric endpoints
4. **Error Handling**: Graceful error handling for malformed messages
5. **Cleanup**: Proper resource cleanup on service stop

## Testing

Run tests with:
```bash
npm test
```

Currently uses placeholder test script.

## Future Enhancements

- Device filtering by service type
- Support for Hello/Bye messages (device announcements)
- Device metadata caching
- Performance optimization for large networks
- Custom probe filters

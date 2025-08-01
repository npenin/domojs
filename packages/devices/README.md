# Devices Package

This package is part of the `domojs` project and provides device management functionality.

## Features

- Device discovery and registration
- Device state management
- API for interacting with devices

## Installation

```bash
npm install @domojs/devices
```

## Usage

```js
import devices from '@domojs/devices';

// Example: Register a new device
devices.register({
    id: 'device-1',
    type: 'sensor',
    name: 'Temperature Sensor'
});
```

## API

- `register(device)`: Register a new device.
- `get(id)`: Retrieve a device by ID.
- `list()`: List all registered devices.

## License

MIT  
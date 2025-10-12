# @domojs/phone

DomoJS Companion App for Android and iOS - Turn your smartphone into a smart home sensor node!

## Overview

This Capacitor-based app integrates your phone's sensors with your DomoJS home automation system via MQTT, reusing 100% of your existing TypeScript infrastructure.

### Features

- ✅ **Full TypeScript Code Reuse** - Uses @domojs/devices and @domojs/mqtt packages directly
- ✅ **Background Sensor Service** - Continuous monitoring that survives app closure
- ✅ **Auto-Restart After Reboot** - Service automatically restarts after phone reboot
- ✅ **Multi-Platform** - Supports both Android and iOS
- ✅ **Real-Time Updates** - Live sensor data display in app
- ✅ **Matter-like Architecture** - Node/Endpoint/Cluster pattern

### Supported Sensors

- 📍 GPS (location tracking)
- 📳 Accelerometer
- 🔄 Gyroscope
- 💡 Light sensor

## Architecture

```
TypeScript App (Vite + @domojs/*)
        ↓
Capacitor Plugin API
        ↓
Native Sensor Service (Kotlin/Swift)
        ↓
Phone Sensors → MQTT Broker → DomoJS Backend
```

## Quick Start

### 1. Install Dependencies

```bash
cd packages/phone
yarn install
```

### 2. Configure MQTT Broker

Edit `src/domojs-integration.ts` and set your MQTT broker URL:

```typescript
const mqttUrl = 'mqtt+wss://your-broker:9001';  // Replace with your broker
const username = 'domojs-guest';
const password = 'domojs';
```

### 3. Development

#### Run in Browser (Web Development)

```bash
yarn dev
```

Open http://localhost:5174 - the app will use simulated sensor data.

#### Run on Android

```bash
# Build web app
yarn build

# Sync with Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# Or run directly
npx cap run android
```

#### Run on iOS

```bash
yarn build
npx cap sync ios
npx cap open ios
```

## Project Structure

```
packages/phone/
├── src/
│   ├── index.html              # Main HTML
│   ├── main.ts                 # App entry point
│   ├── domojs-integration.ts   # DomoJS/MQTT integration
│   └── plugins/
│       ├── domojs-sensors.ts   # Plugin TypeScript interface
│       └── domojs-sensors-web.ts  # Web stub (for development)
├── android/                    # Android native code
│   └── app/src/main/java/
│       └── org/domojs/companion/
│           ├── DomoJsSensorsPlugin.kt      # Capacitor plugin
│           ├── SensorBackgroundService.kt  # Background service
│           └── BootReceiver.kt             # Reboot receiver
├── ios/                        # iOS native code (TODO)
├── capacitor.config.ts         # Capacitor configuration
├── vite.config.ts              # Vite build configuration
└── package.json
```

## Configuration

### capacitor.config.ts

```typescript
const config: CapacitorConfig = {
    appId: 'org.domojs.companion',
    appName: 'DomoJS Companion',
    webDir: 'dist',
    server: {
        // For development - comment out for production
        url: 'http://10.0.2.2:5174',  // Android emulator
        // url: 'http://192.168.1.X:5174',  // Physical device
        cleartext: true
    }
};
```

For **production**: Remove the `server` section and the app will use the bundled web assets.

## How It Works

### 1. Sensor Service Flow

```
Phone Sensor Event
    ↓
SensorBackgroundService (Kotlin)
    ↓
DomoJsSensorsPlugin.notifySensorData()
    ↓
Capacitor Bridge
    ↓
TypeScript Event Listener
    ↓
DomoJS Endpoint Update
    ↓
MQTT Publish to Backend
```

### 2. Background Service

The Android service (`SensorBackgroundService.kt`) runs as a foreground service:
- Monitors selected sensors
- Publishes data to TypeScript via Capacitor plugin
- Persists through app closure
- Auto-restarts after reboot via `BootReceiver`

### 3. DomoJS Integration

TypeScript code (`domojs-integration.ts`) handles:
- MQTT connection using @domojs/mqtt
- Node registration using @domojs/devices
- Endpoint creation/updates following Matter-like pattern
- Event handling from native plugin

## Development Workflow

### Web Development

```bash
yarn dev
```

- Fast hot-reload
- Simulated sensor data
- No native build required

### Android Development

```bash
# 1. Start dev server
yarn dev

# 2. Configure Capacitor to use dev server (capacitor.config.ts)
server: {
    url: 'http://10.0.2.2:5174',
    cleartext: true
}

# 3. Open in Android Studio
npx cap open android

# 4. Run app - web code hot-reloads!
```

### Production Build

```bash
# 1. Remove server config from capacitor.config.ts

# 2. Build web app
yarn build

# 3. Sync with native platforms
npx cap sync

# 4. Build APK/IPA
npx cap open android  # Build via Android Studio
npx cap open ios      # Build via Xcode
```

## MQTT Topics

The app publishes to standard DomoJS topics:

```
domojs/devices/<phone-name>/sensor/gps
domojs/devices/<phone-name>/sensor/accelerometer
domojs/devices/<phone-name>/sensor/gyroscope
domojs/devices/<phone-name>/sensor/light
```

## Customization

### Adding New Sensors

1. **Update Plugin Interface** (`src/plugins/domojs-sensors.ts`):
```typescript
export interface SensorData {
    sensorType: string;
    // ... add new fields
}
```

2. **Update Android Service** (`android/.../SensorBackgroundService.kt`):
```kotlin
if ("temperature" in enabledSensors) {
    sensorManager.getDefaultSensor(Sensor.TYPE_AMBIENT_TEMPERATURE)?.let {
        sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
    }
}
```

3. **Update TypeScript Integration** (`src/domojs-integration.ts`):
```typescript
case 'temperature':
    await updateTemperatureEndpoint(data);
    break;
```

### Adjusting Sensor Rates

Edit `SensorBackgroundService.kt`:

```kotlin
// GPS update frequency
locationManager.requestLocationUpdates(
    LocationManager.GPS_PROVIDER,
    30000L, // Every 30 seconds
    10f,    // Or every 10 meters
    this
)

// Other sensors
sensorManager.registerListener(
    this,
    sensor,
    SensorManager.SENSOR_DELAY_NORMAL  // Change to FAST, GAME, etc.
)
```

## Troubleshooting

### Sensors Not Working

1. Check permissions granted:
```bash
adb shell dumpsys package org.domojs.companion | grep permission
```

2. Check service status:
```bash
adb shell dumpsys activity services SensorBackgroundService
```

3. View logs:
```bash
adb logcat -s DomoJsSensorsPlugin:* SensorBackgroundService:*
```

### MQTT Not Connecting

1. Verify broker is accessible from phone
2. Check WebSocket support on broker (port 9001)
3. Review SSL/TLS settings
4. Check credentials

### Service Stops After Reboot

Some OEMs (Xiaomi, Huawei) aggressively kill background services:
- Add app to battery optimization whitelist
- Enable "Autostart" permission
- Disable battery saver for the app

## Testing

### Test Sensor Service

```bash
# Start service
adb shell am start-foreground-service org.domojs.companion/.SensorBackgroundService

# Check if running
adb shell dumpsys activity services | grep SensorBackgroundService

# View sensor events
adb logcat -s SensorBackgroundService:*
```

### Test MQTT Publishing

```bash
# Subscribe to topics
mosquitto_sub -h your-broker -t "domojs/devices/+/sensor/#" -v
```

## Dependencies

- **@capacitor/core**: Cross-platform runtime
- **@domojs/devices**: Device/endpoint management
- **@domojs/mqtt**: MQTT client
- **@akala/core**: Core utilities
- **vite**: Build tool

## iOS Support

iOS native code is planned but not yet implemented. The plugin interface and TypeScript code are ready - only the Swift implementation is needed.

## License

MIT

/**
 * DomoJS Integration Layer
 *
 * Connects Android sensor plugin with DomoJS device infrastructure using static endpoint IDs
 */

import { Capacitor } from '@capacitor/core';
import { asyncEventBuses, logger } from '@akala/core';
import { registerNode, Endpoint, clusterFactory, ClusterIds, MatterClusterIds, RootNode, occupancySensingCluster, BridgeConfiguration } from '@domojs/devices';
import { pubsub, Sidecar, SidecarConfiguration } from '@akala/sidecar';
import { connect, Container } from '@akala/commands';
import { Container as pmContainer } from '@akala/pm'
import Configuration from '@akala/config';
import { Directory } from '@capacitor/filesystem';
import './akala/fs.js';
import { MqttEvents } from '@domojs/mqtt';

// Static Endpoint IDs for phone capabilities
export enum PhoneEndpoints
{
    // Core capabilities
    FRONT_CAMERA = 1,
    BACK_CAMERA = 2,
    ACCELEROMETER = 3,
    GPS = 4,

    // Extended capabilities
    IR_BLASTER = 10,
    PROXIMITY = 11,
    AMBIENT_LIGHT = 12,
    BAROMETER = 13,

    // Communication
    BLUETOOTH = 20,
    WIFI = 21,
    NFC = 22,

    // Media
    MICROPHONE = 30,
    SPEAKER = 31,
    DISPLAY = 32,

    // System
    BATTERY = 40,
    THERMAL = 41
}

interface DomoJSCallbacks
{
    onMqttConnected?: () => void;
    onMqttDisconnected?: () => void;
    onSensorData?: (data: any) => void;
    onServiceStarted?: () => void;
    onServiceStopped?: () => void;
}

let root: RootNode<never> | null = null;
let callbacks: DomoJSCallbacks = {};
let DomoJsSensors: any = null;
let mqttClient: any = null;
const endpoints = new Map<number, Endpoint>();

/**
 * Initialize DomoJS integration
 */
export async function initDomoJS(abort: AbortController, cbs: DomoJSCallbacks)
{
    callbacks = cbs;

    // Only proceed if on Android
    if (Capacitor.getPlatform() !== 'android')
    {
        console.warn('Not on Android platform, skipping sensor service');
        return;
    }

    try
    {
        // Dynamically import the Capacitor plugin (will be created next)
        const plugin = await import('./plugins/domojs-sensors');
        DomoJsSensors = plugin.DomoJsSensors;

        // Listen for sensor data
        await DomoJsSensors.addListener('sensorData', handleSensorData);

        console.log('Sensor plugin initialized');
    } catch (error)
    {
        console.error('Failed to load sensor plugin:', error);
        throw error;
    }

    // Initialize MQTT connection and create static endpoints
    try
    {
        await connectToMQTT(abort);
        await createStaticEndpoints();
    } catch (error)
    {
        console.error('Failed to initialize DomoJS:', error);
        throw error;
    }
}

/**
 * Connect to MQTT broker and register as DomoJS node
 */
async function connectToMQTT(abort: AbortController)
{
    try
    {
        // TODO: Get MQTT config from storage/settings
        const mqttUrl = new URL('mqtt+wss://mqtt.dragon-angel.fr');  // Replace with your broker
        const username = 'domojs-guest';
        const password = 'domojs';

        // Connect to MQTT
        mqttClient = await asyncEventBuses.process(mqttUrl, {
            username,
            password,
            clientId: `${Capacitor.getPlatform()}-${getAppInstanceId()}`
        });

        const config = await Configuration.load<SidecarConfiguration & BridgeConfiguration>(`capacitor://${Directory.Data}/akala.json`, true);

        const sidecar: Sidecar<any, MqttEvents> = {
            abort: abort.signal,
            config,
            pm: await connect('wss://mqtt.dragon-angel.fr', abort.signal) as pmContainer & Container<void>,
            sidecars: {} as any
        };

        root = await registerNode('mobile.' + getAppInstanceId(), sidecar, config, abort.signal, true);

        console.log('Connected to MQTT broker');
        callbacks.onMqttConnected?.();

        // Register as DomoJS node
        // Note: This is simplified - you'll need proper context/config setup
        const deviceName = `android-${getDeviceModel()}`;

        // For now, create a mock config - you'll need to integrate with @akala/sidecar properly
        // This is a placeholder that shows the integration pattern

        console.log(`Registered as node: ${deviceName}`);

    } catch (error)
    {
        console.error('MQTT connection failed:', error);
        callbacks.onMqttDisconnected?.();
        throw error;
    }
}

/**
 * Create static endpoints for phone capabilities
 */
async function createStaticEndpoints()
{
    if (!root) throw new Error('Root node not initialized');

    // Create Front Camera Endpoint (selfie camera, no flash)
    const frontCameraEndpoint = new Endpoint(PhoneEndpoints.FRONT_CAMERA, {
        onOff: clusterFactory({
            id: MatterClusterIds.OnOff, // OnOff cluster ID
            OnOff: false,
            SupportsLighting: false,
            SupportsDeadFrontBehavior: false,
            SupportsOffOnly: false,
            OnCommand: async () => { },
            OffCommand: async () => { },
            ToggleCommand: async () => { }
        })
    });

    // Create Back Camera Endpoint (main camera, with flash)
    const backCameraEndpoint = new Endpoint(PhoneEndpoints.BACK_CAMERA, {
        onOff: clusterFactory({
            id: 6, // OnOff cluster ID
            OnOff: false,
            SupportsLighting: false,
            SupportsDeadFrontBehavior: false,
            SupportsOffOnly: false,
            OnCommand: async () => { },
            OffCommand: async () => { },
            ToggleCommand: async () => { }
        })
    });

    // Create Accelerometer/Motion Endpoint
    const accelerometerEndpoint = new Endpoint(PhoneEndpoints.ACCELEROMETER, {
        occupancySensing: clusterFactory({
            id: MatterClusterIds.OccupancySensing, // OccupancySensing cluster ID
            Occupancy: occupancySensingCluster.OccupancyBitmap.Empty,
            OccupancySensorType: occupancySensingCluster.OccupancySensorTypeEnum.PIR,
            OccupancySensorTypeBitmap: occupancySensingCluster.OccupancySensorTypeBitmap.PIR,
            SupportsActiveInfrared: false,
            SupportsOther: false,
            SupportsPassiveInfrared: false,
            SupportsPhysicalContact: false,
            SupportsRadar: false,
            SupportsRFSensing: false,
            SupportsUltrasonic: false,
            SupportsVision: false
        })
    });

    // Create GPS/Location Endpoint
    const gpsEndpoint = new Endpoint(PhoneEndpoints.GPS, {
        location: clusterFactory({
            id: ClusterIds.location, // LocalizationConfiguration cluster ID
            accuracy: 0,
            altitude: 0,
            location: '0 0'
        })
    });

    // Create IR Blaster Endpoint (Bridge)
    const irBlasterEndpoint = await root.newEndpoint(PhoneEndpoints.IR_BLASTER, {
        bridgedDeviceBasicInformation: clusterFactory({
            id: 57, // BridgedDeviceBasicInformation cluster ID
            VendorName: 'Android Phone',
            ProductName: 'IR Blaster',
            NodeLabel: 'IR Remote Control',
            HardwareVersion: 1,
            SoftwareVersion: 1,
            Reachable: true,
            UniqueID: 'ir-blaster-001',
            SupportsBridgedICDSupport: false
        }),
    });


    // Create Ambient Light Endpoint
    const lightEndpoint = new Endpoint(PhoneEndpoints.AMBIENT_LIGHT, {
        illuminanceMeasurement: clusterFactory({
            id: MatterClusterIds.IlluminanceMeasurement, // IlluminanceMeasurement cluster ID
            MeasuredValue: 0,
            MinMeasuredValue: 0,
            MaxMeasuredValue: 65535
        })
    });

    // Create Battery Endpoint
    const batteryEndpoint = new Endpoint(PhoneEndpoints.BATTERY, {
        powerSource: clusterFactory({
            id: MatterClusterIds.PowerSource, // PowerSource cluster ID
            Status: 1, // Active
            Order: 1,
            Description: 'Battery',
            EndpointList: [],
            SupportsWired: false,
            SupportsBattery: true,
            SupportsRechargeable: true,
            SupportsReplaceable: true
        })
    });

    // Store endpoints for later updates
    endpoints.set(PhoneEndpoints.FRONT_CAMERA, frontCameraEndpoint);
    endpoints.set(PhoneEndpoints.BACK_CAMERA, backCameraEndpoint);
    endpoints.set(PhoneEndpoints.ACCELEROMETER, accelerometerEndpoint);
    endpoints.set(PhoneEndpoints.GPS, gpsEndpoint);
    endpoints.set(PhoneEndpoints.IR_BLASTER, irBlasterEndpoint);
    endpoints.set(PhoneEndpoints.AMBIENT_LIGHT, lightEndpoint);
    endpoints.set(PhoneEndpoints.BATTERY, batteryEndpoint);

    // Attach all endpoints to MQTT
    for (const [id, endpoint] of endpoints)
    {
        await endpoint.attach(mqttClient, 'domojs/devices');
        root.endpoints.push(endpoint);
    }

    console.log('Static endpoints created and attached');
}

/**
 * Handle sensor data from native plugin
 */
async function handleSensorData(data: any)
{
    console.log('Sensor data received:', data);

    callbacks.onSensorData?.(data);

    if (!root)
    {
        console.warn('Root node not initialized');
        return;
    }

    try
    {
        const { sensorType } = data;

        switch (sensorType)
        {
            case 'gps':
                await updateGPSEndpoint(data);
                break;
            case 'accelerometer':
            case 'gyroscope':
                await updateMotionEndpoint(data);
                break;
            case 'light':
                await updateLightEndpoint(data);
                break;
            case 'ir_blast':
                await handleIRCommand(data);
                break;
        }
    } catch (error)
    {
        console.error('Failed to handle sensor data:', error);
    }
}

/**
 * Update GPS endpoint with location data
 */
async function updateGPSEndpoint(data: any)
{
    const endpoint = endpoints.get(PhoneEndpoints.GPS);
    if (!endpoint) return;

    endpoint.patch({
        localizationConfiguration: {
            // Update location data - you might need to extend this cluster
            ActiveLocale: data.locale || 'en-US'
        }
    });
}

/**
 * Update motion/accelerometer endpoint
 */
async function updateMotionEndpoint(data: any)
{
    const endpoint = endpoints.get(PhoneEndpoints.ACCELEROMETER);
    if (!endpoint) return;

    const { values } = data;
    const motionDetected = values ?
        Math.sqrt(values[0] ** 2 + values[1] ** 2 + values[2] ** 2) > 1.0 : false;

    endpoint.patch({
        occupancySensing: {
            Occupancy: occupancySensingCluster.OccupancyBitmap.Empty,
            OccupancySensorType: 1,
            OccupancySensorTypeBitmap: 1
        }
    });
}

/**
 * Update ambient light endpoint
 */
async function updateLightEndpoint(data: any)
{
    const endpoint = endpoints.get(PhoneEndpoints.AMBIENT_LIGHT);
    if (!endpoint) return;

    const { values } = data;
    endpoint.patch({
        illuminanceMeasurement: {
            MeasuredValue: Math.round(values[0] || 0)
        }
    });
}

/**
 * Handle IR blaster commands
 */
async function handleIRCommand(data: any)
{
    const endpoint = endpoints.get(PhoneEndpoints.IR_BLASTER);
    if (!endpoint) return;

    // Handle IR blaster commands to control other devices
    // This would integrate with your IR blaster hardware
    console.log('IR command:', data);

    // Update IR blaster status
    endpoint.patch({
        onOff: {
            OnOff: data.command === 'power_on'
        }
    });
}

/**
 * Start sensor background service
 */
export async function startSensorService()
{
    if (!DomoJsSensors)
    {
        throw new Error('Sensor plugin not initialized');
    }

    try
    {
        await DomoJsSensors.startService({
            sensors: ['gps', 'accelerometer', 'gyroscope', 'light']
        });

        console.log('Sensor service started');
        callbacks.onServiceStarted?.();
    } catch (error)
    {
        console.error('Failed to start sensor service:', error);
        throw error;
    }
}

/**
 * Stop sensor background service
 */
export async function stopSensorService()
{
    if (!DomoJsSensors)
    {
        throw new Error('Sensor plugin not initialized');
    }

    try
    {
        await DomoJsSensors.stopService();

        console.log('Sensor service stopped');
        callbacks.onServiceStopped?.();
    } catch (error)
    {
        console.error('Failed to stop sensor service:', error);
        throw error;
    }
}

/**
 * Get unique app instance ID
 */
export function getAppInstanceId(): string
{
    // Try to get existing ID from storage
    const existingId = localStorage.getItem('domojs-app-instance-id');
    if (existingId)
    {
        return existingId;
    }

    // Generate new unique ID
    const newId = generateUniqueId();
    localStorage.setItem('domojs-app-instance-id', newId);
    return newId;
}

/**
 * Generate a unique identifier for this app instance
 */
function generateUniqueId(): string
{
    // Use timestamp + random string for uniqueness
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `app-${timestamp}-${randomStr}`;
}

/**
 * Get device model name
 */
function getDeviceModel(): string
{
    // You can get this from Capacitor Device plugin if needed
    return 'phone';
}

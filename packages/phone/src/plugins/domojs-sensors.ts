/**
 * DomoJS Sensors Capacitor Plugin
 *
 * Bridge between TypeScript and native Android sensor service
 */

import { registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

export interface SensorData
{
    sensorType: string;
    timestamp: number;
    values?: number[];
    latitude?: number;
    longitude?: number;
    altitude?: number;
    accuracy?: number;
}

export interface StartServiceOptions
{
    sensors: string[];
}

export interface DomoJsSensorsPlugin
{
    /**
     * Start the background sensor service
     */
    startService(options: StartServiceOptions): Promise<void>;

    /**
     * Stop the background sensor service
     */
    stopService(): Promise<void>;

    /**
     * Check if service is running
     */
    isServiceRunning(): Promise<{ running: boolean }>;

    // /**
    //  * Listen for sensor data events
    //  */
    // addListener(
    //     eventName: 'sensorData',
    //     listenerFunc: (data: SensorData) => void
    // ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

const DomoJsSensors = registerPlugin<DomoJsSensorsPlugin>('DomoJsSensors', {
    web: () => import('./domojs-sensors-web').then(m => new m.DomoJsSensorsWeb()),
});

export { DomoJsSensors };

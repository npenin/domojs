/**
 * Web implementation of DomoJS Sensors (stub for development)
 */

import { WebPlugin } from '@capacitor/core';
import type { DomoJsSensorsPlugin, StartServiceOptions } from './domojs-sensors';

export class DomoJsSensorsWeb extends WebPlugin implements DomoJsSensorsPlugin {
    async startService(options: StartServiceOptions): Promise<void> {
        console.log('Web: startService called with', options);
        // Simulate sensor data for web development
        this.simulateSensorData();
    }

    async stopService(): Promise<void> {
        console.log('Web: stopService called');
    }

    async isServiceRunning(): Promise<{ running: boolean }> {
        return { running: false };
    }

    private simulateSensorData() {
        // Emit fake GPS data every 5 seconds for testing
        setInterval(() => {
            this.notifyListeners('sensorData', {
                sensorType: 'gps',
                timestamp: Date.now(),
                latitude: 48.8566 + (Math.random() - 0.5) * 0.01,
                longitude: 2.3522 + (Math.random() - 0.5) * 0.01,
                altitude: 35,
                accuracy: 10
            });
        }, 5000);

        // Emit fake accelerometer data every 2 seconds
        setInterval(() => {
            this.notifyListeners('sensorData', {
                sensorType: 'accelerometer',
                timestamp: Date.now(),
                values: [
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    9.8 + (Math.random() - 0.5) * 0.5
                ]
            });
        }, 2000);
    }
}

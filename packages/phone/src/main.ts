/**
 * DomoJS Phone Companion App
 *
 * Main entry point - initializes DomoJS integration and sensor service
 */

import { Capacitor } from '@capacitor/core';
import { getAppInstanceId, initDomoJS } from './domojs-integration';

// UI Elements
const mqttStatus = document.getElementById('mqtt-status')!;
const serviceStatus = document.getElementById('service-status')!;
const deviceName = document.getElementById('device-name')!;
const sensorsDiv = document.getElementById('sensors')!;
const startBtn = document.getElementById('start-btn')! as HTMLButtonElement;
const stopBtn = document.getElementById('stop-btn')! as HTMLButtonElement;

// Sensor data cache for UI
const sensorDataCache = new Map<string, any>();

async function init()
{
    console.log('DomoJS Companion starting...');
    console.log('Platform:', Capacitor.getPlatform());

    // Set device name and unique instance ID
    const platform = Capacitor.getPlatform();
    const instanceId = getAppInstanceId();
    deviceName.textContent = `${platform === 'android' ? 'Android Device' : 'Unknown'} (${instanceId})`;


    const abort = new AbortController();
    // Initialize DomoJS integration
    try
    {
        await initDomoJS(abort, {
            onMqttConnected: () =>
            {
                mqttStatus.textContent = 'Connected';
                mqttStatus.style.color = '#4CAF50';
            },
            onMqttDisconnected: () =>
            {
                mqttStatus.textContent = 'Disconnected';
                mqttStatus.style.color = '#f44336';
            },
            onSensorData: (data) =>
            {
                updateSensorUI(data);
            },
            onServiceStarted: () =>
            {
                serviceStatus.textContent = 'Running';
                serviceStatus.style.color = '#4CAF50';
                startBtn.disabled = true;
                stopBtn.disabled = false;
            },
            onServiceStopped: () =>
            {
                serviceStatus.textContent = 'Stopped';
                serviceStatus.style.color = '#f44336';
                startBtn.disabled = false;
                stopBtn.disabled = true;
            }
        });

        console.log('DomoJS integration initialized');
    } catch (error)
    {
        console.error('Failed to initialize DomoJS:', error);
        mqttStatus.textContent = 'Error';
        mqttStatus.style.color = '#f44336';
    }

    // Button handlers
    startBtn.addEventListener('click', async () =>
    {
        try
        {
            const { startSensorService } = await import('./domojs-integration');
            await startSensorService();
        } catch (error)
        {
            console.error('Failed to start sensors:', error);
            if (error instanceof Error)
                alert('Failed to start sensors: ' + error.message);
        }
    });

    stopBtn.addEventListener('click', async () =>
    {
        try
        {
            const { stopSensorService } = await import('./domojs-integration');
            await stopSensorService();
        } catch (error)
        {
            console.error('Failed to stop sensors:', error);
        }
    });
}

function updateSensorUI(data: any)
{
    sensorDataCache.set(data.sensorType, data);

    // Rebuild sensor display
    sensorsDiv.innerHTML = '';

    for (const [type, sensorData] of sensorDataCache.entries())
    {
        const div = document.createElement('div');
        div.className = 'sensor-data';

        const title = document.createElement('div');
        title.className = 'sensor-title';
        title.textContent = type.toUpperCase();
        div.appendChild(title);

        const value = document.createElement('div');
        value.className = 'sensor-value';
        value.textContent = JSON.stringify(sensorData, null, 2);
        div.appendChild(value);

        sensorsDiv.appendChild(div);
    }
}

// Start app
init();

package org.domojs.companion

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import org.json.JSONArray
import org.json.JSONObject

class SensorBackgroundService : Service(), SensorEventListener, LocationListener {
    private lateinit var sensorManager: SensorManager
    private lateinit var locationManager: LocationManager
    private var enabledSensors = setOf<String>()

    companion object {
        private const val CHANNEL_ID = "domojs_sensors"
        private const val NOTIFICATION_ID = 1
        private var running = false

        fun isRunning(): Boolean = running
    }

    override fun onCreate() {
        super.onCreate()
        running = true
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager

        createNotificationChannel()
        startForeground(NOTIFICATION_ID, createNotification())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        intent?.getStringArrayListExtra("sensors")?.let { sensors ->
            enabledSensors = sensors.toSet()
            registerSensors()
        }

        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "DomoJS Sensors",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Background sensor monitoring"
            }
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun createNotification(): Notification {
        val intent = packageManager.getLaunchIntentForPackage(packageName)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("DomoJS Companion")
            .setContentText("Monitoring sensors")
            .setSmallIcon(android.R.drawable.ic_menu_compass)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .build()
    }

    private fun registerSensors() {
        // Unregister all first
        sensorManager.unregisterListener(this)
        try {
            locationManager.removeUpdates(this)
        } catch (e: SecurityException) {
            // Permission not granted
        }

        // Register based on enabled sensors
        if ("accelerometer" in enabledSensors) {
            sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)?.let {
                sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
            }
        }

        if ("gyroscope" in enabledSensors) {
            sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)?.let {
                sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
            }
        }

        if ("light" in enabledSensors) {
            sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)?.let {
                sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
            }
        }

        if ("gps" in enabledSensors) {
            try {
                locationManager.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER,
                    30000L, // 30 seconds
                    10f, // 10 meters
                    this
                )
            } catch (e: SecurityException) {
                // Permission not granted
            }
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        event?.let {
            val sensorType = when (it.sensor.type) {
                Sensor.TYPE_ACCELEROMETER -> "accelerometer"
                Sensor.TYPE_GYROSCOPE -> "gyroscope"
                Sensor.TYPE_LIGHT -> "light"
                else -> return
            }

            val data = JSONObject().apply {
                put("sensorType", sensorType)
                put("timestamp", System.currentTimeMillis())
                put("values", JSONArray(it.values.toList()))
            }

            notifyPlugin(data)
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Not needed
    }

    override fun onLocationChanged(location: Location) {
        val data = JSONObject().apply {
            put("sensorType", "gps")
            put("timestamp", System.currentTimeMillis())
            put("latitude", location.latitude)
            put("longitude", location.longitude)
            put("altitude", location.altitude)
            put("accuracy", location.accuracy)
        }

        notifyPlugin(data)
    }

    private fun notifyPlugin(data: JSONObject) {
        DomoJsSensorsPlugin.notifySensorData(data)
    }

    override fun onDestroy() {
        super.onDestroy()
        running = false
        sensorManager.unregisterListener(this)
        try {
            locationManager.removeUpdates(this)
        } catch (e: SecurityException) {
            // Ignore
        }
    }
}

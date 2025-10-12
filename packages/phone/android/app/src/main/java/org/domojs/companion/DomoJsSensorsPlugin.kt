package org.domojs.companion

import android.content.Intent
import android.os.Build
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "DomoJsSensors")
class DomoJsSensorsPlugin : Plugin() {

    companion object {
        private var instance: DomoJsSensorsPlugin? = null

        fun getInstance(): DomoJsSensorsPlugin? = instance

        fun notifySensorData(data: org.json.JSONObject) {
            instance?.notifyListeners("sensorData", com.getcapacitor.JSObject.fromJSONObject(data))
        }
    }

    override fun load() {
        instance = this
    }

    @PluginMethod
    fun startService(call: PluginCall) {
        val sensorsArray = call.getArray("sensors")
        val sensors = mutableListOf<String>()

        for (i in 0 until sensorsArray.length()) {
            sensors.add(sensorsArray.getString(i))
        }

        val intent = Intent(context, SensorBackgroundService::class.java).apply {
            putStringArrayListExtra("sensors", ArrayList(sensors))
        }

        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }

            call.resolve()
        } catch (e: Exception) {
            call.reject("Failed to start service", e)
        }
    }

    @PluginMethod
    fun stopService(call: PluginCall) {
        val intent = Intent(context, SensorBackgroundService::class.java)
        context.stopService(intent)
        call.resolve()
    }

    @PluginMethod
    fun isServiceRunning(call: PluginCall) {
        val running = SensorBackgroundService.isRunning()
        call.resolve(com.getcapacitor.JSObject().apply {
            put("running", running)
        })
    }
}

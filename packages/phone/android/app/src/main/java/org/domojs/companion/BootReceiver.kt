package org.domojs.companion

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            // Check if service was previously running
            val prefs = context.getSharedPreferences("domojs_sensors", Context.MODE_PRIVATE)
            val wasRunning = prefs.getBoolean("service_was_running", false)

            if (wasRunning) {
                val serviceIntent = Intent(context, SensorBackgroundService::class.java)
                // Restore previously enabled sensors
                val sensors = prefs.getStringSet("enabled_sensors", emptySet())
                serviceIntent.putStringArrayListExtra("sensors", ArrayList(sensors ?: emptyList()))

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    context.startForegroundService(serviceIntent)
                } else {
                    context.startService(serviceIntent)
                }
            }
        }
    }
}

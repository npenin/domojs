import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'org.domojs.companion',
    appName: 'DomoJS Companion',
    webDir: 'dist',
    bundledWebRuntime: false,
    server: {
        // For development - point to your dev server
        // Comment out for production builds
        url: 'http://10.0.2.2:5174',
        cleartext: true
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 0
        }
    }
};

export default config;

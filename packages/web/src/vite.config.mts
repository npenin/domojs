import { plugin as akala } from '@akala/vite';
import { defineConfig } from 'vite'
import webui from '@akala/web-ui/vite'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({

    build: {
        // generate .vite/manifest.json in outDir
        manifest: true,
        outDir: '../wwwroot',
    },
    server: {
        host: '0.0.0.0',   // listen on all interfaces
        https: {},
        proxy: {
            '/pm': {
                target: 'http://home.dragon-angel.fr:31415/',
                ws: true,
            },
            '/mqtt': {
                target: 'ws://localhost:9001/',
                ws: true,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/mqtt/, '')
            }
        }
    },
    esbuild: {
        supported: {
            'top-level-await': true //browsers can handle top-level-await features
        },

    },
    optimizeDeps: {
        exclude: ['@akala/pm/akala'],
    },
    plugins: [
        akala({
        }),
        webui({ generateOptions: { grid: true, customMedia: true }, includeDefaultTheme: true }),
        basicSsl()
    ],
});
//# sourceMappingURL=vite.config.mjs.map
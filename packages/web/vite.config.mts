import { plugin as akala } from '@akala/vite';
import { defineConfig } from 'vite'
import webui from '@akala/web-ui/vite'

export default defineConfig({

    build: {
        // generate .vite/manifest.json in outDir
        manifest: true,
        outDir: 'wwwroot',
    },
    server: {
        proxy: {
            '/pm': {
                target: 'http://home.dragon-angel.fr:31415/',
                ws: true,
            },
            '/mqtt': {
                target: 'http://home.dragon-angel.fr:9001/',
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
    ],
});
//# sourceMappingURL=vite.config.mjs.map
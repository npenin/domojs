import { plugin as akala } from '@akala/vite';
import { defineConfig } from 'vite'
import webui from '@akala/web-ui/vite'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
    resolve: {
        // Runtime resolution
        conditions: ['browser', 'import', 'default'],
        alias: {
            'node:tty': 'virtual:empty-module', // stub the module
        }
    },
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
                target: 'ws://localhost:31416/',
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
        esbuildOptions: {
            conditions: ['browser', 'import', 'default'],
        },
    },
    plugins: [
        {
            name: 'empty-module-plugin',
            resolveId(id)
            {
                if (id === 'virtual:empty-module') return id; // your target id
            },
            load(id)
            {
                if (id === 'virtual:empty-module')
                {
                    // Tree‑shakable empty module
                    return { code: 'export {};', moduleSideEffects: false };
                }
            },
        },
        akala({
        }),
        webui({ generateOptions: { grid: true, customMedia: true }, includeDefaultTheme: true }),
        basicSsl()
    ],
});
//# sourceMappingURL=vite.config.mjs.map
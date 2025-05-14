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
            }
        }
    },
    esbuild: {
        supported: {
            'top-level-await': true //browsers can handle top-level-await features
        },
    },
    plugins: [
        akala({
        }),
        webui({ generateOptions: { grid: true }, includeDefaultTheme: true }),
    ],
});
//# sourceMappingURL=vite.config.mjs.map
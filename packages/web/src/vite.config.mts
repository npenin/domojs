import { plugin as akala } from '@akala/vite';
import { defineConfig, Plugin } from 'vite'
import webui from '@akala/web-ui/vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
// import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath } from 'url';


export default defineConfig({
    build: {
        // generate .vite/manifest.json in outDir
        manifest: true,
        outDir: '../wwwroot',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: fileURLToPath(new URL('./index.html', import.meta.url)),
                sw: fileURLToPath(new URL('./sw/index.ts', import.meta.url)),
            },
        },
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
        exclude: ['node:tty'],
    },
    optimizeDeps: {
        exclude: ['@akala/pm/akala'],
        // esbuildOptions: {
        //     conditions: ['browser', 'import', 'default'],
        // },
    },
    plugins: [
        akala({
        }),
        webui({ generateOptions: { grid: true, customMedia: true }, includeDefaultTheme: true }),
        basicSsl({
            certDir: './certs'
        }),
        // {
        //     name: 'service-worker',
        //     apply: "build",
        //     enforce: "post",
        //     config(config, env)
        //     {
        //         if (!config.build)
        //             config.build = {};
        //         if (!config.build.rollupOptions)
        //             config.build.rollupOptions = {};
        //         if (!config.build.rollupOptions.input)
        //             config.build.rollupOptions.input = {
        //                 index: '../index.html',
        //                 sw: ''
        //             }
        //     },
        //     transformIndexHtml(config)
        //     {
        //         return { ...config, }
        //         buildSync({
        //             minify: true,
        //             bundle: true,
        //             entryPoints: [join(process.cwd(), "service-worker.js")],
        //             outfile: join(process.cwd(), "dist", "service-worker.js"),
        //         });
        //     },
        // },
        // VitePWA({
        //     registerType: 'autoUpdate',
        //     injectRegister: 'inline'
        // })
    ],
});
//# sourceMappingURL=vite.config.mjs.map
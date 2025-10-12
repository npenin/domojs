import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'src/index.html',
        },
    },
    server: {
        port: 5174,
        host: '0.0.0.0',
    },
});

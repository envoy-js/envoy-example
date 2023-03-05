import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            plugins: [],
        },
    },
    define: {global: {}},
    resolve: {
        alias: {
            "xmlhttprequest-ssl": "./node_modules/engine.io-client/lib/xmlhttprequest.js"
        }
    }
})

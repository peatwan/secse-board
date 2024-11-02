import react from '@vitejs/plugin-react-swc' // SWC for faster React builds
import tsconfigPaths from 'vite-tsconfig-paths' // Enables tsconfig paths resolution
import { ConfigEnv } from 'vite'
import { UserConfigExport } from 'vite'
import { loadEnv } from 'vite'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  // Load environment variables based on mode
  const viteEnv = loadEnv(mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv

  return {
    // Set the base public path from environment variables
    base: VITE_PUBLIC_PATH,
    plugins: [react(), tsconfigPaths()],
    server: {
      host: true, // Allow access to the server from the network
      port: 5180, // Server port
      cors: true, // Enable Cross-Origin Resource Sharing (CORS)
      proxy: {
        // Proxy for API calls to avoid CORS issues during development
        '/secse': {
          target: 'http://127.0.0.1:5000/',
          changeOrigin: true
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 2048, // Warn if a chunk is larger than 2048KB
      reportCompressedSize: false, // Disable reporting of gzip-compressed file sizes
      rollupOptions: {
        output: {
          manualChunks: {
            // Customize chunking strategy by defining separate chunks for dependencies
            react: ['react', 'react-dom', 'react-router-dom'],
            nextui: ['@nextui-org/react'],
            $3dmol: ['3dmol'],
            echarts: ['echarts']
          }
        }
      }
    },
    esbuild:
      mode === 'development'
        ? undefined
        : {
            pure: ['console.log'], // Remove console.log in production builds
            drop: ['debugger'], // Remove debugger statements in production builds
            legalComments: 'none' // Remove all comments in production builds
          }
  }
}

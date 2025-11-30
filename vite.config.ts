import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This is crucial: it passes the Vercel API_KEY to the browser code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
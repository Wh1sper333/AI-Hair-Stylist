import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Now process.cwd() is typed correctly thanks to @types/node
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This passes the Vercel API_KEY to the browser code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  // or './' if your custom domain is not working yet

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Enable importing CSV files
  assetsInclude: ['**/*.csv'],
});
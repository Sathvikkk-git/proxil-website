import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// base './' lets the built site work from any sub-path (e.g. GitHub Pages project sites).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});

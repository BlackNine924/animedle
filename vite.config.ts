import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'canvas-confetti'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'data-scenes': ['./src/data/scenes/sceneChallenges.ts'],
          'data-voices': ['./src/data/voices/voiceChallenges.ts'],
          'data-exclusive': ['./src/data/exclusiveChallenges.ts'],
        },
      },
    },
  },
});

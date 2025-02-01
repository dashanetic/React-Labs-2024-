import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url'; // ✅ Импортируем fileURLToPath

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // ✅ Используем fileURLToPath

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // ✅ Правильный путь для алиаса
    }
  }
});

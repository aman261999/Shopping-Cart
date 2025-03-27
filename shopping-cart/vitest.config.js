import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: './vitest.setup.js',
        globals: true,
        coverage: {
            provider: 'istanbul', // or 'v8'
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{js,ts,jsx,tsx}'],
            exclude: ['node_modules', 'test/'],
          },
    },
    plugins: [react()]
})
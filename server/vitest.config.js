import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        coverage: {
            provider: 'istanbul', // or 'v8'
            reporter: ['text', 'json', 'html'],
            include: ['**/*.{js,ts,jsx,tsx}'],
            exclude: ['node_modules', 'test/'],
          },
    },
    plugins: [react()]
})
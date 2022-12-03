import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            all: true,
            clean: true,
            enabled: true,
            include: ['src/**/*.ts'],
        },
        dir: 'src',
        include: ['**/*.spec.ts'],
    },
});

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/*.test.ts',
    viewportWidth: 414,
    viewportHeight: 896,
  },
});
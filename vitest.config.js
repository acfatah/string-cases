import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['src/**/*.spec.js'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov']
    }
  },
})

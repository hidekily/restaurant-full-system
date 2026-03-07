import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./src/tests/setupfile.ts']
  }
})
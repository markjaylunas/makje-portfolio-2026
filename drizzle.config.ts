import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: ['.env.local', '.env'] })

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  casing: 'snake_case',
 dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_DATABASE_TOKEN!,
  },
})

import { env } from '@/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, anonymous } from "better-auth/plugins"
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '../db'

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL, 
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      prompt: "select_account",
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    anonymous(
      {
        generateRandomEmail: () => {
          const id = crypto.randomUUID()
          return `guest-${id}@makje.com`
        },
        onLinkAccount: async ({ anonymousUser, newUser }) => {
          console.log("onLinkAccount", { anonymousUser, newUser })
          // TODO: move user data from anonymous user to new user
        }
      }
    ),
    admin(),
    tanstackStartCookies()  // should always be last
  ],
})

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db/index.js"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
    }),
    trustedOrigins: ['http://localhost:3000', 'https://ayusynk.vercel.app'],
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',

    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
        skipStateCookieCheck: true,
    },

    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        },
    }
})
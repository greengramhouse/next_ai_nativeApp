import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { ac, admin, manager, user } from "./permissions"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
    plugins: [
        adminClient({
            ac,
            roles: {
                admin,
                manager,
                user
            }
        })
    ],
})

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient
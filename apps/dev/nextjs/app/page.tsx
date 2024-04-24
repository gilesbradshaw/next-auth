import { auth, unstable_update as update } from "auth"
import { auth as auth2, unstable_update as update2 } from "auth-2"

import { SessionsProvider } from "next-auth/react"
import Client from "./multi-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth()
  const session2 = await auth2()
  return (
    <div className="container">
      <h1>NextAuth.js Multi session Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://nextjs.authjs.dev">NextAuth.js</a> for authentication
        with multiple sessions.
        <a href="https://github.com/gilesbradshaw/next-auth/tree/multi-sessions-demo">
          repo
        </a>
      </p>
      {/* 
       NOTE: The `auth()` result is not run through the `session` callback, be careful passing down data
       to a client component, this will be exposed via the /api/auth/session endpoint
      */}
      <SessionsProvider
        sessions={[
          { name: "auth", basePath: "/auth", session },
          { name: "auth-2", basePath: "/auth-2", session: session2 },
        ]}
      >
        <Client />
      </SessionsProvider>
    </div>
  )
}

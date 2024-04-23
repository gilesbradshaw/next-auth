"use client"

import { useSession, useSessions } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Client() {
  const { data: session, signIn, signOut, update, status } = useSession()
  const b = useSessions();
  const router = useRouter()
  return (
    <div className="card">
      <pre>{JSON.stringify({b}, null, 2)}</pre>
      <div className="card-header">
        <h3>Client Component</h3>
      </div>
      <div className="card-body">
        <h4>Session</h4>
        <pre>
          {status === "loading"
            ? "Loading..."
            : JSON.stringify(session, null, 2)}
        </pre>
        <div className="btn-wrapper">
          {session ? (
            <>
              <button
                onClick={async () => {
                  await update({ user: { name: "Client Fill Murray" } })
                  router.refresh()
                }}
              >
                Update Session - New Name
              </button>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => signIn("facebook")}>
                Sign in Facebook
              </button>
              <button onClick={() => signIn("github")}>Sign in Github</button>
              <button onClick={() => signIn("credentials", {})}>
                Sign in Credentials
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

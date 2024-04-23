"use client"

import { useSession, useSessions } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Client() {
  const { data: session, signIn, signOut, update, status } = useSession()
  const sessions = useSessions()
  const router = useRouter()
  return (
    <div className="card">
      {sessions.map(({ name, signOut, signIn, update, data, status }) => (
        <div key={name}>
          <h2>
            {name}: {status}
          </h2>
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          {data && (
            <button
              onClick={async () => {
                await update({ user: { name: "updated from multi session" } })
                router.refresh()
              }}
            >
              Update: {name}
            </button>
          )}
          {data && <button onClick={() => signOut()}>Sign out: {name}</button>}
          {!data && (
            <>
              <button onClick={() => signIn("facebook")}>
                Sign in facebook: {name}
              </button>
              <button onClick={() => signIn("google")}>
                Sign in google: {name}
              </button>
              <button
                onClick={() => signIn("credentials", { password: "password" })}
              >
                Sign in Credentials: {name}
              </button>
            </>
          )}
        </div>
      ))}
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
              <button onClick={() => signIn("credentials")}>
                Sign in Credentials
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

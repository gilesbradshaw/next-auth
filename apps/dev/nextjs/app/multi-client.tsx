"use client"

import { useSessions } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Client() {
  const sessions = useSessions()
  const router = useRouter()
  return (
    <div>
      {sessions.map(({ name, signOut, signIn, update, data, status }) => (
        <div key={name} className="card">
          <div className="card-header">
            <h3>
              {name}: {status}
            </h3>
          </div>
          <div className="card-body">
            <h4>Session</h4>
            <pre>
              {status === "loading"
                ? "Loading..."
                : JSON.stringify(data, null, 2)}
            </pre>
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
            {data && (
              <button onClick={() => signOut()}>Sign out: {name}</button>
            )}
            {!data && (
              <>
                <button
                  onClick={() =>
                    signIn("credentials", { password: "password" })
                  }
                >
                  Sign in Credentials: {name}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

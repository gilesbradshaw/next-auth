import { auth, signIn, signOut, unstable_update as update } from "auth"
import {
  auth as auth2,
  signIn as signIn2,
  signOut as signOut2,
  unstable_update as update2,
} from "auth-2"
import Footer from "components/footer"
import { Header } from "components/header"
import styles from "components/header.module.css"
import "./styles.css"
import { AuthError } from "next-auth"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AppHeader />
        <main>{props.children}</main>
        <Footer />
      </body>
    </html>
  )
}

export async function AppHeader() {
  const [session, session2] = await Promise.all([auth(), auth2()])
  return (
    <>
      <Header
        sessions={[
          {
            session,
            signIn: null,
            signOut: null,
          },
          {
            session: session2,
            signIn: null,
            signOut: null,
          },
        ]}
      />
    </>
  )
}

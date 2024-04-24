import { auth, signIn, signIn2, signOut, unstable_update as update } from "auth"
import Footer from "components/footer"
import { Header } from "components/header"
import styles from "components/header.module.css"
import "./styles.css"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

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
  const session = await auth()
  return (
    <>
      <Header
        session={session}
        signIn={
          <form
            action={async () => {
              "use server"
              try {
                await signIn()
              } catch (error) {
                if (error instanceof AuthError) {
                  console.log(error)
                }
                throw error
              }
            }}
          >
            <button className={styles.buttonPrimary}>Sign in</button>
          </form>
        }
        signOut={
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button className={styles.buttonPrimary}>Sign out</button>
          </form>
        }
      />
      <form
        action={async () => {
          "use server"
          redirect(
            "https://next-auth-nextjs-gold.vercel.app/auth/signin?callbackUrl=https%3A%2F%2Fnext-auth-nextjs-gold.vercel.app%2F"
          )
        }}
      >
        <button className={styles.buttonPrimary}>test</button>
      </form>
    </>
  )
}

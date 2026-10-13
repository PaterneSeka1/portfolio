import LoginForm from "./LoginForm"

export const metadata = { title: "Connexion — Administration" }

export default async function AdminLoginPage({ searchParams }) {
  const query = await searchParams
  const notice = query.expired
    ? { tone: "warning", text: "Votre session a expiré. Reconnectez-vous pour continuer." }
    : query.logout
      ? { tone: "info", text: "Vous êtes déconnecté." }
      : null

  return <LoginForm next={typeof query.next === "string" ? query.next : ""} notice={notice} />
}

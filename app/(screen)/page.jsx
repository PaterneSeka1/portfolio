import Hero from "./components/Hero"
import { getProfile } from "../../lib/db/profile"

export const dynamic = "force-dynamic"

export default async function Home() {
  const profile = await getProfile()
  return <Hero profile={profile} />
}

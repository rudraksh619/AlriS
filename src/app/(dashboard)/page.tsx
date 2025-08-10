import { Home_view } from "@/modules/auth/ui/views/home/ui/view/home-view"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
const HomePage = async ()=>{

  const session = await auth.api.getSession({
    headers : await headers(),
  })


if(!session)
  {
    redirect("/sign-in")
  }

  return(
    <Home_view/>
  )
}

export default HomePage;
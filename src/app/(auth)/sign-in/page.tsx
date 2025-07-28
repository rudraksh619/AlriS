import React from 'react'
import {Card} from "@/components/ui/card"
import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
const page = () => {
  console.log("sign in page")
  return (
      <SignInView/> 
  )
}

export default page

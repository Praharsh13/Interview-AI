import React from 'react'
import { getCurrentUser } from '@/lib/actions/auth'
import Agent from '@/components/Agent'

const page = async() => {

    const user=await getCurrentUser()
  return (
   <>
   <h3>Interview generation</h3>

   <Agent
   userName={user?.name!}
   userId={user?.id}
   type="generate" />
   </>
  )
}

export default page
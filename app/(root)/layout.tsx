import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link  from 'next/link'
import { isAuthenticated } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'


const rootlayout = async ({children}:{children:ReactNode}) => {

    const isUserAuthenticated=await isAuthenticated()
    console.log(isAuthenticated)
    if(!isUserAuthenticated) redirect("/sign-in")
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} suppressHydrationWarning/>
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default rootlayout
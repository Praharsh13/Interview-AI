import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentUser, isAuthenticated } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'
import ProfileDropdown from '@/components/ProfileDropdown'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated()
  const user = await getCurrentUser()

  if (!isUserAuthenticated) redirect('/sign-in')

  return (
    <div className="min-h-screen px-4 py-2">
      <nav className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded shadow">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PrepWise Logo" width={38} height={32} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">PrepWise</h2>
        </Link>

        {/* Profile Dropdown rendered only if user exists */}
        {user?.id && <ProfileDropdown userId={user.id} />}
      </nav>

      <main className="mt-6">{children}</main>
    </div>
  )
}

export default RootLayout
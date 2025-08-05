'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from '@/lib/actions/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const ProfileDropdown = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null) // start as null
  const router = useRouter()

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000)
    setAvatar("https://randomuser.me/api/portraits/men/75.jpg")
  }, [])

  async function signout(){
    try {
        await signOut()
        toast.success('Sign out successful')
        router.push('/sign-in')
      } catch (err) {
        toast.error('Error signing out')
        console.error(err)
      }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(prev => !prev)} className="focus:outline-none">
        {avatar ? (
          <Image
            src="/hi.png"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full border border-gray-300 dark:border-gray-700"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" /> // placeholder
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded shadow z-50">
          <Link
            href={`/profile/${userId}`}
            className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Profile
          </Link>
         
            <button
              onClick={signout}
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sign Out
            </button>
          
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown

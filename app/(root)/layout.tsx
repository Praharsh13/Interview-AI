import React, { ReactNode } from 'react'
import Image from 'next/image'
import { Link } from 'lucide-react'


const rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default rootlayout
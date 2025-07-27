import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser } from '@/lib/actions/auth'


const page = async () => {

    const user=await getCurrentUser()
  return (
   <>
   <section className='card-cta'>
   <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
   </section>
   <section>
    <h2>Your Interviews</h2>

   {dummyInterviews.map((interview)=>(
    <InterviewCard {...interview} key={interview.id}/>
   )
   )}

   </section>
   </>
  )
}

export default page
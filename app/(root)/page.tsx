// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// //import { dummyInterviews } from '@/constants'
// import InterviewCard from '@/components/InterviewCard'
// import { getCurrentUser } from '@/lib/actions/auth'
// import { getInterviewByUserId, getLaterstInterviews } from '@/lib/actions/interview'

// //Home Page 
// const page = async () => {

//     const user=await getCurrentUser()

//     const [userInterview,allInterview]=await Promise.all([
//         getInterviewByUserId(user?.id!),
//         getLaterstInterviews({userId:user?.id!})
//     ])

//     const hasPastInterviews = userInterview?.length! > 0;
//     const hasUpcomingInterviews = allInterview?.length! > 0;
//   return (
//    <>
//    <section className='card-cta'>
//    <div className="flex flex-col gap-6 max-w-lg">
//           <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
//           <p className="text-lg">
//             Practice real interview questions & get instant feedback
//           </p>

//           <Button asChild className="btn-primary max-sm:w-full">
//             <Link href="/interview">Start an Interview</Link>
//           </Button>
//         </div>

//         <Image
//           src="/robot.png"
//           alt="robo-dude"
//           width={400}
//           height={400}
//           className="max-sm:hidden"
//         />
//    </section>
//    <section className="flex flex-col gap-6 mt-8">
//         <h2>Your Interviews</h2>

//         <div className="interviews-section">
//           {hasPastInterviews ? (
//             userInterview?.map((interview) => (
//               <InterviewCard
//                 key={interview.id}
//                 userId={user?.id}
//                 interviewId={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//               />
//             ))
//           ) : (
//             <p>You haven&apos;t taken any interviews yet</p>
//           )}
//         </div>
//       </section>

//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Take Interviews</h2>

//         <div className="interviews-section">
//           {hasUpcomingInterviews ? (
//             allInterview?.map((interview) => (
//               <InterviewCard
//                 key={interview.id}
//                 userId={user?.id}
//                 interviewId={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//               />
//             ))
//           ) : (
//             <p>There are no interviews available</p>
//           )}
//         </div>
//       </section>
//    </>
//   )
// }

// export default page
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth";
import { getInterviewByUserId, getLaterstInterviews } from "@/lib/actions/interview";

// Home Page
const Page = async () => {
  const user = await getCurrentUser();

  const [userInterview, allInterview] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLaterstInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = (userInterview?.length ?? 0) > 0;
  const hasUpcomingInterviews = (allInterview?.length ?? 0) > 0;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-b from-white to-neutral-50 px-6 py-12 shadow-sm dark:border-white/10 dark:from-gray-950 dark:to-black md:px-10 md:py-16">
        {/* Glow accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-10%] h-72 w-96 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute right-[-10%] bottom-[-10%] h-72 w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              AI interview coach • instant feedback
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-tight text-gray-900 dark:text-white md:text-4xl">
              Get Interview-Ready with <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">AI-Powered practice</span> & real-time feedback
            </h1>

            <p className="text-pretty text-lg text-gray-600 dark:text-gray-300">
              Run mock interviews tailored to your role and tech stack. Receive structured scores, improvement tips, and follow-up questions—instantly.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href="/interview">Start an Interview</Link>
              </Button>

              {/* <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 underline-offset-4 hover:underline dark:text-gray-200"
              >
                View Dashboard
              </Link> */}
            </div>

            {/* Highlights */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center md:max-w-md">
              <div className="rounded-xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">+500</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Questions</p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">Real-time</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Feedback</p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">Role-based</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Practice</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-sky-400/10 to-emerald-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
              <Image
                src="/ai-interview-hero.png"
                alt="AI interview coaching visual"
                width={960}
                height={720}
                priority
                className="h-auto w-full object-cover"
                sizes="(min-width: 768px) 480px, 100vw"
              />
            </div>

            {/* Optional decorative grid image */}
            {/* <div className="pointer-events-none absolute -bottom-8 -right-8 hidden w-48 opacity-90 md:block">
              <Image
                src="/ai-interview-grid.png"
                alt=""
                width={400}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Your Interviews */}
      <section className="mx-auto mt-12 max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Interviews</h2>
          {hasPastInterviews && (
            <Link
              href="/interview/history"
              className="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300"
            >
              View all
            </Link>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasPastInterviews ? (
            userInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="rounded-xl border border-black/5 bg-white/60 p-5 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
              You haven&apos;t taken any interviews yet.
            </p>
          )}
        </div>
      </section>

      {/* Available / Latest Interviews */}
      <section className="mx-auto mt-12 max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Take Interviews</h2>
          {hasUpcomingInterviews && (
            <Link
              href="/interview"
              className="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300"
            >
              Browse more
            </Link>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="rounded-xl border border-black/5 bg-white/60 p-5 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
              There are no interviews available right now.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;

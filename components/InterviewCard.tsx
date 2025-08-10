// import { cn,getRandomInterviewCover } from '@/lib/utils';
// import React from 'react'
// import Image from 'next/image';
// import DisplayTechIcons from './DisplayTechIcons';
// import dayjs from "dayjs";
// import Link from "next/link";
// import { Button } from './ui/button';
// import { getFeedbackByInterviewId } from '@/lib/actions/interview';


// const InterviewCard = async ({
//     interviewId,
//     userId,
//     role,
//     type,
//     techstack,
//     createdAt,
//   }: InterviewCardProps) => {
//     const feedback =
//       userId && interviewId
//         ? await getFeedbackByInterviewId({
//             interviewId,
//             userId,
//           })
//         : null;
  
//     const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  
//     const badgeColor =
//       {
//         Behavioral: "bg-light-400",
//         Mixed: "bg-light-600",
//         Technical: "bg-light-800",
//       }[normalizedType] || "bg-light-600";
  
//     const formattedDate = dayjs(
//       feedback?.createdAt || createdAt || Date.now()
//     ).format("MMM D, YYYY");
  
//     return (
//       <div className="card-border w-[360px] max-sm:w-full min-h-96">
//         <div className="card-interview">
//           <div>
//             {/* Type Badge */}
//             <div
//               className={cn(
//                 "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
//                 badgeColor
//               )}
//             >
//               <p className="badge-text ">{normalizedType}</p>
//             </div>
  
//             {/* Cover Image */}
//             <Image
//               src={getRandomInterviewCover()}
//               alt="cover-image"
//               width={90}
//               height={90}
//               className="rounded-full object-fit size-[90px]"
//             />
  
//             {/* Interview Role */}
//             <h3 className="mt-5 capitalize">{role} Interview</h3>
  
//             {/* Date & Score */}
//             <div className="flex flex-row gap-5 mt-3">
//               <div className="flex flex-row gap-2">
//                 <Image
//                   src="/calendar.svg"
//                   width={22}
//                   height={22}
//                   alt="calendar"
//                 />
//                 <p>{formattedDate}</p>
//               </div>
  
//               <div className="flex flex-row gap-2 items-center">
//                 <Image src="/star.svg" width={22} height={22} alt="star" />
//                 <p>{feedback?.totalScore || "---"}/100</p>
//               </div>
//             </div>
  
//             {/* Feedback or Placeholder Text */}
//             <p className="line-clamp-2 mt-5">
//               {feedback?.finalAssessment ||
//                 "You haven't taken this interview yet. Take it now to improve your skills."}
//             </p>
//           </div>
  
//           <div className="flex flex-row justify-between">
//             <DisplayTechIcons techstack={techstack} />
  
//             <Button className="btn-primary">
//               <Link
//                 href={
//                   feedback
//                     ? `/interview/${interviewId}/feedback`
//                     : `/interview/${interviewId}`
//                 }
//               >
//                 {feedback ? "Check Feedback" : "View Interview"}
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default InterviewCard;

import { cn, getRandomInterviewCover } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import DisplayTechIcons from "./DisplayTechIcons";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { getFeedbackByInterviewId } from "@/lib/actions/interview";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div
      className={cn(
        "relative w-[360px] max-sm:w-full min-h-96",
        "rounded-3xl border border-black/5 bg-white/70 p-5 shadow-lg backdrop-blur",
        "transition hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
      )}
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-r from-sky-400/10 via-emerald-400/10 to-indigo-400/10 blur-2xl" />

      <div className="relative">
        {/* Type Badge */}
        <div
          className={cn(
            "absolute right-0 top-0 w-fit rounded-bl-2xl px-3 py-1.5",
            "text-xs font-semibold text-gray-900 dark:text-white",
            badgeColor
          )}
        >
          <p className="badge-text">{normalizedType}</p>
        </div>

        {/* Cover Avatar */}
        <div className="relative mx-auto mt-1 w-fit">
          <div className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-tr from-sky-400/25 to-emerald-400/25 blur-xl" />
          <div className="grid place-items-center rounded-full border border-black/5 bg-white/70 p-2 shadow-sm dark:border-white/10 dark:bg-white/10">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={90}
              height={90}
              className="size-[90px] rounded-full object-cover ring-1 ring-white/40"
            />
          </div>
        </div>

        {/* Role */}
        <h3 className="mt-5 text-center text-lg font-semibold text-gray-900 dark:text-white">
          {role} Interview
        </h3>

        {/* Meta: Date & Score */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Image src="/calendar.svg" width={20} height={20} alt="calendar" />
            <p>{formattedDate}</p>
          </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Image src="/star.svg" width={20} height={20} alt="star" />
            <p>{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>

        {/* Summary */}
        <p className="mt-4 line-clamp-2 text-center text-sm text-gray-600 dark:text-gray-300">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <DisplayTechIcons techstack={techstack} />

          <Button className="btn-primary rounded-xl">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;


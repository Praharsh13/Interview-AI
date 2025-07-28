import { cn,getRandomInterviewCover } from '@/lib/utils';
import React from 'react'
import Image from 'next/image';
import DisplayTechIcons from './DisplayTechIcons';
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from './ui/button';

const InterviewCard = ({interviewId,
userId,
role,
type,
techstack,
createdAt}:InterviewCardProps) => {
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type; // Regular expression to check the if type contain mix or not

    
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
        <div className="card-interview">
            <Image 
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className='mt-5 capitalize'>{role} Interview</h3>

           {/* Date & Score */}
           <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{createdAt}</p>

              <DisplayTechIcons techstack={techstack}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default InterviewCard


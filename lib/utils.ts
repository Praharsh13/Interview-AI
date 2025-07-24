import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { interviewCovers, mappings } from "@/constants";

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

//Normalixation of name so we can use with mapping object
const normalizeTechName=(tech:string)=>{
  const key=tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings]
}

const checkIcon=async(url:string)=>{
  try{
    const response= await fetch(url,{
      method:"HEAD"
    })
    return response.ok   //return true if response is okat

  }catch(e){

    return false

  }
}

export const getTechLogos=async(techArray:string[])=>{
  const logoUrls=techArray.map((tech)=>{
    const normalText=normalizeTechName(tech)
    return {
      tech,
      url:`${techIconBaseURL}/${normalText}/${normalText}-original.svg`,
    }
  })

  const result= await Promise.all(
    (logoUrls.map(async({tech,url})=>({
      tech,
      url:(await checkIcon(url))? url : "/tech.svg"
    })))
  )

  return result
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
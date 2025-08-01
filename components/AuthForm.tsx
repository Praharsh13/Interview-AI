"use client";
import React from 'react'
import Link from 'next/link'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" 
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import Image from 'next/image'
import { toast } from 'sonner'

import FormField from './FormInput'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { SignUp, signIn } from '@/lib/actions/auth'
import { useRouter } from "next/navigation";
const authFormSchema=(type:FormType) =>{
    return z.object({
        name:type==="sign-up"? z.string().min(3):z.string().optional(),
        email:z.string().email(),
        password:z.string().min(4)

    })
}

const AuthForm = ({type}:{type:FormType}) => {
    const router=useRouter()

    const formSchema= authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email:"",
          password:""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
       try{

        if(type==="sign-up"){

            const {name,email,password}=values
            console.log(email, password)
            

            const userCredentials= await createUserWithEmailAndPassword(
                auth,
                email,password
            )

            const result=await SignUp({
                uid:userCredentials.user.uid,
                name:name!,
                email,
                password
            })

            if(!result?.success){
                toast.error(result?.message)
                return
            }
            toast.message("Account created successfully. Please sign in")
            router.push("/sign-in")
            
        }
        if(type==="sign-in"){
            const {email,password}=values

            console.log(email, password)

            const userCredentials=await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const tokenID=await userCredentials.user.getIdToken()
            if(!tokenID){
                toast.error("Login fail , Please try again")
                return
            }

            await signIn({
                email,
                tokenID
            })

            toast.success("Signed in successfully.");
            router.push("/");
        }

       

       }catch(error){

        console.log(error)
        toast.error(`There was some errors ${error}`)

       }
      }

      const isSignIn= type==="sign-in"?true :false
  return (
    <div className='card-border lg:min-w-[566px]'>
        <div className='flex flex-col gap-6 card py-14 px-10'>
            <div className='flex flex-row gap-2 justify-center'>
            <Image src="/logo.svg" 
            alt="logo" 
            height={32} 
            width={38} />
            <h2 className="text-primary-100">PrepWise</h2>
          
          

            </div>
            <h3>Practice job interviews with AI</h3>
        
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">

        {!isSignIn  && (
            <FormField 
               control={form.control}
               name="name"
               label="Name"
               placeholder='Your Name'
               />
        )}

    <FormField 
               control={form.control}
               name="email"
               label="Email"
               placeholder='Your Email example@hmail.com'
               type="email"
               />

     <FormField 
               control={form.control}
               name="password"
               label="Password"
               placeholder='Your Password'
               type="password"
               />       
       
        <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create a Account'}</Button>
      </form>
    </Form>

    <p className='text-center'>
        {isSignIn? "No account yet ?" : "Have a account already ?"}

        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn? 'Sign In':"Sign-up" }</Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm